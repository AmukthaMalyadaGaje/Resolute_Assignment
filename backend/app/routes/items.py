
from fastapi import APIRouter, Depends, HTTPException, status
from app.database import db, item_helper
from app.models import ItemModel
from app.auth import get_current_user
from app.schemas import Item, ItemCreate
from bson import ObjectId

items_router = APIRouter()


# @items_router.get("/items")
# async def get_items():
#     print("Entered get items")
#     items = await db["items"].find().to_list(100)
#     return [item_helper(item) for item in items]


@items_router.get("/items")
async def get_items(user: str = Depends(get_current_user)):
    print("Entered get items")

    # Access the user data (optional, depends on your need)
    print("User authenticated:", user)

    # Fetch items from the database
    items = await db["items"].find({"userid": user}).to_list(100)
    return [item_helper(item) for item in items]


@items_router.post("/items")
async def create_item(item: ItemCreate, current_user: str = Depends(get_current_user)):
    item_data = item.dict()
    print("item_data", item)
    item_data["userid"] = current_user
    await db["items"].insert_one(item_data)
    return item_helper(item_data)


@items_router.delete("/items/{item_id}")
async def delete_item(item_id: str, current_user: str = Depends(get_current_user)):
    print("item_id", item_id)
    result = await db["items"].delete_one({"_id": ObjectId(item_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": "Item deleted successfully"}


@items_router.post("/items", response_model=dict)
async def add_item(item: ItemCreate, current_user: str = Depends(get_current_user)):

    item_data = item.dict()
    item_data["username"] = current_user

    # Insert the item into the database
    result = await db["items"].insert_one(item_data)

    # Return the inserted item with its ID
    item_data["_id"] = str(result.inserted_id)
    return item_data
