import re

def patternValidator(string, pattern):
        return re.search(pattern, string)

def validateKeys(users):
    response = {
        "status" : True,
        "message": ""
    }
    valid_keys  = ["firstName", "lastName", "email", "password" ]
    key = [i for i in users.keys()]
    if len(key) < 4:
        response['status'] = False
        response['message'] = "Not enough fields"
        return response
    for i in key:
        if i not in valid_keys:
            response['status'] = False
            response['message'] = i + " not a valid field"
            return response
    return response
    

def user_validation(user):

    if(validateKeys(user)['status']):
        
        results = {
        "firstName":[False, ""],
        "lastName": [False, ""],
        "email": [False, ""],
        "password": [False, ""]
        }

        namePattern = re.compile("^[A-Za-z]+$")

        # first name validation
        if(user['firstName'] != "" and len(user['firstName']) >= 4):
            
            if(patternValidator(user['firstName'], namePattern)):
                
                results['firstName'][0] = True;
            else:
                results['firstName'][1] = "First name can contain only alphabets" 
                
        else:
            results['firstName'][1] = "First name cannot be empty or should atleast be 4 characters"

        #last name validation
        if(user['lastName'] != "" and len(user['lastName']) >= 4):
            
            if(patternValidator(user['lastName'], namePattern)):
                results['lastName'][0] = True;
            else:
                results['lastName'][1] = "Last name can contain only alphabets" 
        else:
            
            results['lastName'][1] = "Last name cannot be empty or should atleast be 4 characters"

        # Email validation
        emailPattern = re.compile("^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$")

        if(user['email'] != ""):
            if(patternValidator(user['email'], emailPattern)):
                results['email'][0] = True
            else:
                results['email'][1] = "Enter a valid email"
        else:
            
            results['email'][1] = "Email Cannot be empty"
        
        # password Validation
        passwordPattern = re.compile("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}")

        if(user['password'] != ""):
            if(patternValidator(user['password'], passwordPattern)):
                results['password'][0] = True
            else:
                results['password'][1] = "Enter a valid password"
        else:
            
            results['password'][1] = "password Cannot be empty"

        keys = results.keys()
        response = {
            "status": True,
            "message": ""
        }
        for i in keys:
            if(results[i][0] == False):
                response['status'] = False
                response['message'] = results[i][1]
                break
    else:
        response = validateKeys(user)
        
    return response
