import jwt
import datetime
from flask import request, g, current_app
from app.models.user import User
from app.utils.validators import validate_login_input, sanitize_email
from app.utils.response import send_success, send_error
from app.middleware.auth_middleware import TOKEN_BLACKLIST

def login():
    """
    Handles user login.
    POST /api/auth/login
    """
    try:
        data = request.get_json()
        
        # ── Step 1: Input Validation ─────────────────────────────
        validation_errors = validate_login_input(data)
        if validation_errors:
            return send_error("Validation failed.", errors=validation_errors, status_code=400)
            
        email = sanitize_email(data.get("email"))
        password = data.get("password")
        
        # ── Step 2: Fetch User from DB ───────────────────────────
        user = User.query.filter_by(email=email).first()
        if not user:
            return send_error("Invalid email or password.", status_code=401)
            
        # ── Step 3: Check Account Status ─────────────────────────
        if not user.is_active:
            return send_error("Your account has been deactivated. Please contact your admin.", status_code=403)
            
        # ── Step 4: Verify Password ──────────────────────────────
        if not user.check_password(password):
            return send_error("Invalid email or password.", status_code=401)
            
        # ── Step 5: Generate JWT Token ───────────────────────────
        expires_in = current_app.config['JWT_EXPIRES_IN_HOURS']
        expiration_time = datetime.datetime.utcnow() + datetime.timedelta(hours=expires_in)
        
        payload = {
            "id": user.id,
            "email": user.email,
            "role": user.role,
            "name": user.name,
            "exp": expiration_time
        }
        
        token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm="HS256")
        
        # ── Step 6: Return Response ──────────────────────────────
        response_data = {
            "token": token,
            "expiresIn": f"{expires_in}h",
            "user": user.to_dict()
        }
        
        return send_success("Login successful.", response_data)
        
    except Exception as e:
        return send_error(f"An unexpected error occurred during login: {str(e)}", status_code=500)

def get_profile():
    """
    Gets logged in user's profile.
    GET /api/auth/profile
    """
    try:
        # User is already attached by the token_required middleware
        return send_success("Profile retrieved successfully.", {"user": g.user.to_dict()})
    except Exception as e:
        return send_error(f"Error retrieving profile: {str(e)}", status_code=500)

def logout():
    """
    Invalidates the current session token by blacklisting it.
    POST /api/auth/logout
    """
    try:
        # Token is already attached by the token_required middleware
        token = getattr(g, 'token', None)
        if token:
            TOKEN_BLACKLIST.add(token)
            
        return send_success("Logout successful.")
    except Exception as e:
        return send_error(f"Error during logout: {str(e)}", status_code=500)
