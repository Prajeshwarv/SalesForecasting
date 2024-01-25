import bcrypt

def encode(string: str):
    bitString = string.encode('utf-8')
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(bitString, salt)

    return hash

def checkPassword(string1: str, password: str):
    bitString = string1.encode('utf-8')
    return bcrypt.checkpw(bitString, password)