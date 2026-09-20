import os

from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

import models
from database import Base, engine, get_db

Base.metadata.create_all(bind=engine)

app = FastAPI(title="개인과제 메모 API")

allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class MemoIn(BaseModel):
    content: str


class MemoOut(BaseModel):
    id: int
    content: str

    class Config:
        from_attributes = True


@app.get("/")
def read_root():
    return {"message": "개인과제 메모 API에 오신 것을 환영합니다"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/memos", response_model=list[MemoOut])
def list_memos(db: Session = Depends(get_db)):
    return db.query(models.Memo).all()


@app.post("/memos", response_model=MemoOut, status_code=201)
def create_memo(memo: MemoIn, db: Session = Depends(get_db)):
    db_memo = models.Memo(content=memo.content)
    db.add(db_memo)
    db.commit()
    db.refresh(db_memo)
    return db_memo


@app.delete("/memos/{memo_id}", status_code=204)
def delete_memo(memo_id: int, db: Session = Depends(get_db)):
    db_memo = db.query(models.Memo).filter(models.Memo.id == memo_id).first()
    if db_memo is None:
        raise HTTPException(status_code=404, detail="메모를 찾을 수 없습니다")
    db.delete(db_memo)
    db.commit()
