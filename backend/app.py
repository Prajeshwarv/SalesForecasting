from flask import Flask, Blueprint
from flask_cors import CORS

from routes import userRoutes, authRoutes 




# APP setup

def create_app():
    web_app = Flask(__name__)  # Initialize Flask App
    CORS(web_app)
    web_app.config['SECRET_KEY'] = "afd8a5b29f4c497dbe58216f046ac4b8"

    auth_blueprint = Blueprint('auth_blueprint', __name__)
    auth_blueprint = authRoutes.auth_routes(auth_blueprint)
    
    api_blueprint = Blueprint('api_blueprint', __name__)
    api_blueprint = userRoutes.api_routes(api_blueprint)
    
    
    web_app.register_blueprint(auth_blueprint, url_prefix='/auth')
    web_app.register_blueprint(api_blueprint, url_prefix='/api')
    

    return web_app


app = create_app()






if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
