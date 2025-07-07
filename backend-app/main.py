from fastapi import FastAPI, Request, Response
import json
from bson import json_util
import time
import os
from fastapi.responses import JSONResponse
from google.protobuf import json_format
from dotenv import load_dotenv

from proto_gen.proto_otel.proto.collector.trace.v1.trace_service_pb2 import ExportTraceServiceRequest
from proto_gen.proto_otel.proto.trace.v1.trace_pb2 import Span

# my modules
from connectdb import db
from utils import _any_value_to_str
from filter_trace import filter_llm_traces
from schema import userSignInRequest, userSignUpRequest
from auth import sign_up, sign_in
from auth import authenticate_jwt

from deepeval.metrics import AnswerRelevancyMetric
from deepeval.test_case import LLMTestCase
from deepeval.models import GeminiModel

load_dotenv()

gemini_api_key = os.getenv("GEMINI_API_KEY")

app = FastAPI()

@app.get("/")
def main_route(request: Request):
    print("is request here", request)
    return {"hello":"world"}


# In-memory store for spans (replace with DB insert later)
span_store = []
    
@app.get("/show_traces/")
@authenticate_jwt
def retrieve_traces(request: Request, response: Response ):
    print(request.cookies)
    my_trace_collection = db["trace_collection"]
    cursor = my_trace_collection.find()
    result = []
    for doc in cursor:
        doc["_id"] = str(doc["_id"]) 
        result.append(doc)
    print("we are out of wrapper")
    # print(type(response))
    return result


@app.post("/v1/traces")
async def receive_traces(request: Request):
    try:
        body = await request.body()
        # Deserialize OTLP protobuf
        req = ExportTraceServiceRequest()
        req.ParseFromString(body)
        
        # Extract spans
        for resource_span in req.resource_spans:
            for scope_span in resource_span.scope_spans:
                for span in scope_span.spans:
                    span_dict = {
                        "trace_id": span.trace_id.hex(),
                        "span_id": span.span_id.hex(),
                        "parent_span_id": span.parent_span_id.hex(),
                        "name": span.name,
                        "start_time": span.start_time_unix_nano,
                        "end_time": span.end_time_unix_nano,
                        "attributes": {
                            kv.key: _any_value_to_str(kv.value) for kv in span.attributes
                        }
                    }
                    my_trace_collection.insert_one(span_dict)
                    span_store.append(span_dict)

        return JSONResponse(content={"status": "ok", "spans_received": len(span_store)})

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


@app.get('/get_evaluations')
def evaluate_result():
    # model_name = "gemini-1.5-flash"
    model_name = "gemini-2.0-flash-lite"
    # gemini-1.5-pro
    model = GeminiModel(model_name=model_name, api_key=gemini_api_key)
    answer_relevancy_metric  = AnswerRelevancyMetric(model=model, threshold=0.7)
    print("is this printing")
    result = filter_llm_traces(db)
    answer_result=[]
    for item in result:
        test_case = LLMTestCase(
            input=item["question"],
            actual_output=item["answer"],
            retrieval_context=[item["context"]]
        )
        answer_relevancy_metric.measure(test_case)
        score = answer_relevancy_metric.score
        reason = answer_relevancy_metric.reason
        get_result_obj = {
            "score": score,
            "reason": reason,
        }
        answer_result.append(get_result_obj)
        # print(test_case)
    
    return answer_result

@app.post("/auth/signin")
def user_sign_in(req : userSignInRequest, response: Response):
    useremail = req.email
    password = req.password
    try:
        get_response = sign_in(useremail, password, db)
    except Exception as e:
        print(e)
        return e
    token = get_response["token"]
    print(response.set_cookie(key="jwt_token", value=token))
    return {"User signed in successfully"}

@app.post("/auth/signup")
def user_sign_up(req : userSignUpRequest):
    username = req.username
    useremail = req.email
    password = req.password

    response = sign_up(username, useremail, password, db)
    print(response)
    print("user is " + useremail + " password is "+ password)
    return JSONResponse(status_code = 200, content={
        "username": useremail,
        "password": password
    })