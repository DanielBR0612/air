import jwt
import datetime
from werkzeug.security import check_password_hash
from repositories.usuario_repository import UsuarioRepository

SECRET_KEY = "sua_chave_secreta_aqui"

class AuthService:
    
    @staticmethod
    def login(usuario_txt, senha_txt):
        user_db = UsuarioRepository.buscar_por_username(usuario_txt)

        if user_db and check_password_hash(user_db.senha, senha_txt):
            
            payload = {
                "id": user_db.id,
                "nome": user_db.nome,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=4)
            }
            
            token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
            
            if isinstance(token, bytes):
                return token.decode('utf-8')
            
            return token
        
        return None