from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    from app.routes.afnd_routes import afnd_bp
    from app.routes.afd_routes import afd_bp

    app.register_blueprint(afnd_bp, url_prefix='/api/afnd')
    app.register_blueprint(afd_bp,  url_prefix='/api/afd')

    return app