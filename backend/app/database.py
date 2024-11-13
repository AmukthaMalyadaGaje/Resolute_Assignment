

from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os

MONGO_URI = "mongodb://localhost:27017"
client = AsyncIOMotorClient(MONGO_URI)
db = client["Resolute"]

# Helper to convert ObjectId to str for JSON response


def item_helper(item):
    return {
        "id": str(item["_id"]),
        "name": item.get("name"),
        "description": item.get("description"),
        "price": item.get("price"),
        "quantity": item.get("quantity"),
    }
