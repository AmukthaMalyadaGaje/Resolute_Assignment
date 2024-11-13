
from pydantic import BaseModel, Field
from bson import ObjectId
from typing import Optional


class ItemModel(BaseModel):
    id: Optional[str] = Field(default_factory=str, alias="_id")
    name: str
    description: str


class UserModel(BaseModel):
    username: str
    password: str
