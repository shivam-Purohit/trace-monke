from pydantic import BaseModel
class userSignInRequest(BaseModel):
    email : str
    password: str


class userSignUpRequest(BaseModel):
    username: str
    email: str
    password: str
