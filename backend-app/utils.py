

def _any_value_to_str(value):
    if value.HasField("string_value"):
        return value.string_value
    elif value.HasField("int_value"):
        return value.int_value
    elif value.HasField("double_value"):
        return value.double_value
    elif value.HasField("bool_value"):
        return value.bool_value
    return None

