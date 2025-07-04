import os
import json

def filter_llm_traces(db):
    my_trace_collection = db["trace_collection"]
    cursor = my_trace_collection.find(
        { "parent_span_id" : { "$ne" : ""}, 
        },
        {
            "attributes" : 1,
            "_id":0,
        }
    )
    results = []
    for doc in cursor:
        try:
            input_str = doc["attributes"]["traceloop.entity.input"]
            output_str = doc["attributes"]["traceloop.entity.output"]            

            input_json = json.loads(input_str)
            output_json = json.loads(output_str)

            question = input_json["inputs"].get("question")
            context = input_json["inputs"].get("context")
            answer = output_json["outputs"].get("text")
            
            if question is not None and context is not None and answer is not None:
                res_obj = {
                    "question": question,
                    "context": context,
                    "answer": answer                   
                }
                results.append(res_obj)

        except (KeyError, json.JSONDecodeError) as e:
            continue  # Skip malformed entries
    # print(results)
    return results
