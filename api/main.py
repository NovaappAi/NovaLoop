from fastapi import FastAPI
import uuid

app = FastAPI()


@app.post("/session/create")
def create_session():
    return {"session_id": str(uuid.uuid4())}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
