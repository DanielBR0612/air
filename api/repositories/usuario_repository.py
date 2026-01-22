from models.usuario import db, Usuario

class UsuarioRepository:

    @staticmethod
    def criar(usuario):
        db.session.add(usuario)
        db.session.commit()
        return usuario

    @staticmethod
    def buscar_por_username(username):
        return Usuario.query.filter_by(nome=username).first()

    @staticmethod
    def listar():
        return Usuario.query.all()
    
    @staticmethod
    def buscar_por_id(id):
        return Usuario.query.get(id)

    @staticmethod
    def atualizar(id, novos_dados):
        usuario_banco = Usuario.query.get(id)
        
        if usuario_banco:
            usuario_banco.usuario = novos_dados.get('usuario', usuario_banco.usuario)
            db.session.commit()
            return usuario_banco
        return None

    @staticmethod
    def excluir(id):
        usuario = Usuario.query.get(id)
        
        if usuario: 
            db.session.delete(usuario)
            db.session.commit()
            return True
        return False