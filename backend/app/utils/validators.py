import re

# Simple RFC 5322 email validation regex
EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")

def validate_login_input(data):
    """
    Validates email and password parameters.
    Returns a list of error messages (empty list means valid input).
    """
    errors = []
    
    if not data:
        return ["Request body is missing."]
        
    email = data.get("email")
    password = data.get("password")
    
    if not email:
        errors.append("Email is required.")
    elif not isinstance(email, str) or not EMAIL_REGEX.match(email.strip()):
        errors.append("Please provide a valid email address.")
        
    if not password:
        errors.append("Password is required.")
    elif not isinstance(password, str) or len(password) < 6:
        errors.append("Password must be at least 6 characters long.")
        
    return errors

def sanitize_email(email):
    """
    Trims whitespace and converts email to lowercase.
    """
    if not email:
        return ""
    return email.strip().lower()

