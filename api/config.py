class Config:
    # SQLALCHEMY_DATABASE_URI = "postgresql://flask_user:12345@localhost/flask_demo" (Caso queira usar PostgreSQL)
    SQLALCHEMY_DATABASE_URI = "sqlite:///meuappdb.sqlite"
    SQLALCHEMY_TRACK_MODIFICATIONS = False