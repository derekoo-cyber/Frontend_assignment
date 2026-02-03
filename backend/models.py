from sqlalchemy import Column, Integer,String, ForeignKey, Text
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

class Note(Base):
    __tablename__ = "notes"
    id = Column(Integer, index=True, primary_key=True)
    title = Column(String)
    content = Column(Text)
    owner_id = Column(Integer, ForeignKey("users.id"))

    