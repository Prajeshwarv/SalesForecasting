from flask import request

from Utils.DBconnection import connection
from Utils.validator import user_validation
from Utils.passwordHandler import encode, checkPassword
from Utils.jwt_auth import generateToken
# connection to DB
collections = connection()

def auth_routes(endpoints):
    @endpoints.route('/register-user', methods=['POST'])
    def signup():
        resp = {}
        try:
            req_body = request.json
            print(req_body)
            validate = user_validation(req_body)

            if (validate['status']):
                for x in collections.find({"email": req_body['email']}):
                    if (x['email'] == req_body['email']):
                        raise Exception(
                            "Email Already Exists, enter a different E-Mail")
                        
                req_body['password'] = encode(req_body['password'])

                collections.insert_one(req_body)
                print("User Data Stored Successfully in the Database.")

                token = generateToken(req_body['email'])
                resp = {
                    "email": req_body["email"][:4],
                    "token": token,
                    "statusCode": "200",
                    "statusMessage": "Successfully registered!"
                }
            else:
                print(validate['message'])
                resp = {
                    "email": "",
                    "token": "",
                    "statusCode": 400,
                    "statusMessage": validate['message']
                }
        except Exception as e:
            print(e)
            resp = {
                "email": "",
                "token": "",
                "statusCode": "400",
                "statusMessage": str(e)
            }
        
        return resp

    @endpoints.route('/signin', methods=['GET', 'POST'])
    def signin():
        resp = {}
        try:
            
            email = request.args.get('email')
            password = request.args.get('password')

             
            for x in collections.find({"email": email}):
                result = checkPassword(password, x['password'])
                
                if (result):
                    print(x['email'], " Authenticated")
                    token = generateToken(x['email'])
                    
                    resp['email'] = x['email'][:4]
                    resp['token'] = token
                    resp['statusCode'] = "200"
                    resp['statusMessage'] = "User Authenticated"
                else:
                    raise Exception("User Not Authenticated")
        except Exception as e:
            print(e)
            resp = {
                "email" : "",
                "token" : "",
                "statusCode": "400",
                "statusMessage": str(e)
            }
        return resp
    return endpoints