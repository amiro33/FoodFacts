# uvicorn main:app --reload

from fastapi import FastAPI
app = FastAPI()
@app.get ("/get-message")
async def read_root() :
    return {"Message": "Congrats! This is your first API!"}


# //http://127.0.0.1:8000
#//GET ALL 
#//CREATE NEW 
#//GET BY ID 
#//DELETE BY ID 
#//UPDATE BY ID
