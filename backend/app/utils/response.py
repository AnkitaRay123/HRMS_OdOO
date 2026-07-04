from flask import jsonify

def send_success(message="Success", data=None, status_code=200):
    """
    Standard success response builder.
    """
    response = {
        "success": True,
        "message": message
    }
    if data is not None:
        response["data"] = data
        
    return jsonify(response), status_code

def send_error(message="Internal Server Error", errors=None, status_code=500):
    """
    Standard error response builder.
    """
    response = {
        "success": False,
        "message": message
    }
    if errors is not None:
        response["errors"] = errors
        
    return jsonify(response), status_code
