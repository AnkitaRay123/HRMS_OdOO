import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Base configuration class."""
    SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'hrms_super_secret_jwt_key_change_in_production_2026')
    JWT_EXPIRES_IN_HOURS = int(os.environ.get('JWT_EXPIRES_IN_HOURS', 8))
    
    # Fallback to sqlite only if DATABASE_URL is not provided or if MySQL is not setup (helps in lightweight dev/testing)
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL', 
        'sqlite:///hrms_temp.db'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # CORS Origin
    CORS_ORIGIN = os.environ.get('FRONTEND_ORIGIN', 'http://localhost:5173')
    PORT = int(os.environ.get('PORT', 4000))
    ENV = os.environ.get('FLASK_ENV', 'development')
    DEBUG = ENV == 'development'
