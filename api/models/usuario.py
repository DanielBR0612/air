from flask_sqlalchemy import SQLAlchemy
from models.item import db

class Usuario(db.Model):
    __tablename__ = "usuarios"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120), nullable=False)
    senha = db.Column(db.String(120), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "senha": self.senha
        }
