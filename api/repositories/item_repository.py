from models.item import db, Item

class ItemRepository:

    @staticmethod
    def criar(item):
        db.session.add(item)
        db.session.commit()
        return item

    @staticmethod
    def listar():
        return Item.query.all()
    
    @staticmethod
    def atualizar(id, novos_dados):
        item_banco = Item.query.get(id)
        
        if item_banco:
            item_banco.titulo = novos_dados.get('titulo')
            item_banco.descricao = novos_dados.get('descricao')
            
            db.session.commit()
            return item_banco
        return None

    @staticmethod
    def excluir(id):
        item = Item.query.get(id)
        
        if item:
            db.session.delete(item)
            db.session.commit()
            return True
        return False