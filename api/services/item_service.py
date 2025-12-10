from models.item import Item
from repositories.item_repository import ItemRepository

class ItemService:

    @staticmethod
    def criar_item(data):
        item = Item(titulo=data["titulo"], descricao=data["descricao"])
        return ItemRepository.criar(item)

    @staticmethod
    def listar_items():
        return ItemRepository.listar()
    
    @staticmethod
    def atualizar_item(id, dados):
        return ItemRepository.atualizar(id, dados)
    
    @staticmethod
    def excluir_item(id):
        return ItemRepository.excluir(id)
        