from flask_pymongo import pymongo

def connection():
    con_string = "mongodb+srv://praju:praju@cluster0.c0tcxee.mongodb.net"
    client = pymongo.MongoClient(con_string)
    db = client.get_database('salesForecast')
    test_collection = pymongo.collection.Collection(db, 'users')
    return test_collection