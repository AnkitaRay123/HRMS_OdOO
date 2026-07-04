import jwt
from functools import wraps
from flask import request, g, current_app
from app.models.user import User
from app.utils.response import send_error

# In-memory blacklist for logged-out tokens (or token JTIs)
# In production, replace this with a Redis store
TOKEN_BLACKLIST = set()

def token_required(f):
    """
    Decorator to protect routes. Verifies JWT token and attaches user object to Flask's `g.user`.
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        # Check Authorization header
        auth_header = request.headers.get('Authorization')
        if auth_header:
            parts = auth_header.split(" ")
            if len(parts) == 2 and parts[0] == "Bearer":
                token = parts[1]
                
        if not token:
            return send_error("Access denied. Token is missing.", status_code=401)
            
        # Check blacklist (logout verification)
        if token in TOKEN_BLACKLIST:
            return send_error("Token has been invalidated. Please log in again.", status_code=401)
            
        try:
            # Decode token using app's secret key
            payload = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            user_id = payload.get('id')
            
            # Fetch user from DB
            user = User.query.get(user_id)
            if not user:
                return send_error("User does not exist.", status_code=401)
                
            if not user.is_active:
                return send_error("User account is inactive.", status_code=403)
                
            # Bind user and token to g for subsequent middleware/handlers
            g.user = user
            g.token = token
            
        except jwt.ExpiredSignatureError:
            return send_error("Token has expired. Please log in again.", status_code=401)
        except jwt.InvalidTokenError:
            return send_error("Invalid token. Please log in again.", status_code=401)
            
        return f(*args, **kwargs)
        
    return decorated

def roles_accepted(*roles):
    """
    Decorator to restrict route access to specific roles (e.g. Admin, HR, Employee).
    Must be used AFTER @token_required.
    """
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            if not hasattr(g, 'user') or g.user is None:
                return send_error("User authentication required.", status_code=401)
                
            user_role = g.user.role
            if user_role not in roles:
                return send_error(
                    f"Access forbidden. Role '{user_role}' does not have permissions for this action.",
                    status_code=403
                )
                
            return f(*args, **kwargs)
        return decorated
    return decorator
