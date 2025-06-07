import os 
 
class Config: 
    SECRET_KEY = 'dev-secret-key' 
    SQLALCHEMY_TRACK_MODIFICATIONS = False 
    JWT_SECRET_KEY = 'jwt-secret-key' 
    SQLALCHEMY_DATABASE_URI = 'sqlite:///blog.db' 
 
def get_config(): 
    return Config 
