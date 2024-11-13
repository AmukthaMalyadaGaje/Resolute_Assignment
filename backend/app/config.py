import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB Configuration
MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "Reachify"

# JWT Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "random@secret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
