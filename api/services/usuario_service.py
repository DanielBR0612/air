from models.usuario import Usuario
from repositories.usuario_repository import UsuarioRepository
from werkzeug.security import generate_password_hash # <--- Importante para segurança

class UsuarioService:

    @staticmethod
    def criar_usuario(data):
        usuario_texto = data.get("nome") 
        senha_texto = data.get("senha")

        if UsuarioRepository.buscar_por_username(usuario_texto):
            return None
        
        senha_hash = generate_password_hash(senha_texto, method='pbkdf2:sha256')
        novo_usuario = Usuario(nome=usuario_texto, senha=senha_hash)
        
        return UsuarioRepository.criar(novo_usuario)

    @staticmethod
    def listar_usuarios():
        return UsuarioRepository.listar()
    
    @staticmethod
    def buscar_por_id(id):
        return UsuarioRepository.buscar_por_id(id)
    
    @staticmethod
    def atualizar_usuario(id, dados):
        return UsuarioRepository.atualizar(id, dados)
    
    @staticmethod
    def excluir_usuario(id):
        return UsuarioRepository.excluir(id)