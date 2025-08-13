from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timedelta, timezone
import secrets

app = FastAPI(title="NovaLoop Orchestrator", version="0.1.0")

# CORS موقت برای توسعه
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SessionCreateReq(BaseModel):
    ttl_seconds: int = 3600  # عمر توکن مهمان (۱ ساعت)

class SessionCreateRes(BaseModel):
    token: str
    expires_at: str

@app.get("/health")
def health():
    return {"status": "ok", "time": datetime.now(timezone.utc).isoformat()}

@app.post("/session/create", response_model=SessionCreateRes)
def create_session(body: SessionCreateReq):
    token = secrets.token_urlsafe(32)  # توکن تصادفی امن
    expires = datetime.now(timezone.utc) + timedelta(seconds=body.ttl_seconds)
    return SessionCreateRes(token=token, expires_at=expires.isoformat())

# برای اجرا محلی (در صورت نیاز):
# uvicorn main:app --host 0.0.0.0 --port 8000 --reload
