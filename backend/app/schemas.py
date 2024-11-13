
from pydantic import BaseModel


class ItemCreate(BaseModel):
    name: str
    description: str
    price: float
    quantity: int


class Item(ItemCreate):
    id: str


class UserCreate(BaseModel):
    username: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
