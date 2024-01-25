from datetime import datetime, timedelta
from functools import wraps
from Utils.DBconnection import connection
import jwt
from flask import request, current_app

collections = connection()


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if "Authorization" in request.headers:

            token = request.headers["Authorization"].split(" ")[1]

        if not token:

            return {
                "statusCode": "404",
                "message": "Authentication Token is missing!",
                "data": None,
                "error": "Unauthorized"
            }
        try:

            data = jwt.decode(
                token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
            print(data)
            current_user = {}
            for x in collections.find({"email": data["email"]}):
                current_user = {"email": x['email'], "active": True}
                break

            print(current_user)
            if current_user is None:
                return {
                    "statusCode": "404",
                    "message": "Invalid Authentication token!",
                    "data": None,
                    "error": "Unauthorized"
                }

        except Exception as e:
            print(e)
            return {
                "statusCode": "404",
                "message": "Something went wrong",
                "data": None,
                "error": str(e)
            }

        return f(current_user, *args, **kwargs)

    return decorated

def generateToken(email: str):
    return  jwt.encode({
                        'email': email,
                        'exp': datetime.utcnow() + timedelta(minutes=60)
                    }, current_app.config['SECRET_KEY'])