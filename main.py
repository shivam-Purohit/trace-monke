import os
from fastapi import FastAPI
from utils import load_pdf, spit_documents, create_embeddings
from langchain.chains import RetrievalQA
# from langchain_openai.chat_models import ChatOpenAI
from langchain_groq import ChatGroq
from openai import OpenAI
from dotenv import load_dotenv
from traceloop.sdk import Traceloop


app = FastAPI()

load_dotenv()

GROQ_API_KEY= os.getenv("GROQ_API_KEY")

Traceloop.init(disable_batch=True, telemetry_enabled=False)

@app.get("/")
def home_route():
    return {"hello": "world"}


@app.get("/upload_pdf")
def main(question: str):
    # upload the document
    # use the util function to load document
    # use splitter to chunk the document
    # store in vector embeddings

    document = load_pdf("resume_shivam.pdf")
    docs = spit_documents(document)
    vectorstore = create_embeddings(docs)


    
    # llm = ChatOpenAI(model_name="gpt-3.5-turbo")
    llm = ChatGroq(
    model_name="llama-3.3-70b-versatile",
    groq_api_key=GROQ_API_KEY,
)
    qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=vectorstore.as_retriever())

    result  = qa_chain.run(question)
    return result

@app.get("/")
def read_route():
    return {"hello" : "world"}