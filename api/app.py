from flask import Flask
from config import Config
from models.item import db
from routes.item_routes import item_bp
from routes.auth_routes import auth_bp
from flask_migrate import Migrate
from flasgger import Swagger
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)

# Inicializar Swagger
swagger = Swagger(app)

# Blueprints
app.register_blueprint(item_bp)
app.register_blueprint(auth_bp, url_prefix='/auth')

@app.route("/status")
def status():
    """
    Verifica o status da API
    ---
    tags:
      - Status
    responses:
      200:
        description: API funcionando
    """
    return {"status": "ok", "version": "1.0.0"}, 200

if __name__ == "__main__":
    app.run(debug=True, port=5001)