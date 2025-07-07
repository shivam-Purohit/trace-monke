# import userSignInRequest from schema
import hashlib
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta
import jwt
from functools import wraps
from fastapi import Request, HTTPException

load_dotenv()

pwd_salt = os.getenv("PASSWORD_SALT")
secret_key = os.getenv("SECRET_KEY_JWT")
algo = "HS256"

def authenticate_jwt(func):
    @wraps(func)
    def wrapper(request: Request, *args, **kwargs):
        jwt_token = request.cookies.get("jwt_token")

        if not jwt_token:
            return HTTPException(status_code=401, detail = "Invalid or Missing Token")
        print("we are in wrapper function")
        print(jwt_token)
        try:
            payload = jwt.decode(jwt_token, secret_key, algorithms= [algo])
            print(payload)
        except jwt.exceptions.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail = "Expired Token")
        except jwt.exceptions.InvalidTokenError:
             raise HTTPException(status_code=401, detail = "Invalid Token")   

        return func(request, *args, **kwargs)

    return wrapper

def create_jwt_token(data: dict):
    data_copy = data.copy()
    print("copied data ")
    # print(data_copy)
    expire = datetime.utcnow() + timedelta(minutes=15)
    data_copy.update({"exp": expire})
    print(data_copy)
    encode_jwt = jwt.encode(data_copy, secret_key, algorithm= algo)
    return encode_jwt


def sign_in(user_email: str, user_pass: str, db):
    usercollection = db.collection["users"]

    u_email = user_email
    u_pass = user_pass
    user_obj = usercollection.find_one({"email": u_email}, {"_id" : 0})
    print(user_obj)
    if user_obj != None:
        # user exist
        # calculate hash and check against db
        # then generate jwt and return
        combined_pass = u_pass + pwd_salt
        curr_hashed_pass = hashlib.sha256(combined_pass.encode())
        curr_hashed_pass_str = curr_hashed_pass.hexdigest()

        get_user_hashed_str = user_obj["password"]
        if curr_hashed_pass_str == get_user_hashed_str: 
            print("user matched")
            print(user_obj)
            print(type(user_obj))
            jwt_token = create_jwt_token(user_obj)
            print("jwt token " + jwt_token)
            return {
                "message": "User logged in Succesfully",
                "token": jwt_token
            }
        else:
            print("wrong password")
            return "logging failed"
    else:
        return "user does not exist"

def sign_up(user_name: str, user_email: str, user_pass: str, db):
    usercollection = db.collection["users"]

    u_name = user_name
    u_email = user_email
    u_pass = user_pass
    
    user_obj = usercollection.find_one({"email": u_email})
    
    if user_obj != None:
        # user exist
        return "user already exist"

    # calculate hash
    combined_pass = u_pass + pwd_salt
    hashed_pass = hashlib.sha256(combined_pass.encode())
    print(hashed_pass.hexdigest())
    hashed_pass_str= hashed_pass.hexdigest()

    user_obj = {
        "name" : u_name,
        "email": u_email,
        "password": hashed_pass_str
    }
    usercollection.insert_one(user_obj)
    # return the jwt 
    print(user_obj)
    return "user created successfully"

