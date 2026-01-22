from flask import Blueprint, request, jsonify
from services.item_service import ItemService

item_bp = Blueprint("item", __name__)

@item_bp.route("/itens", methods=["POST"])
def criar_item():
    """
    Cria um novo item
    ---
    tags:
      - itens
    parameters:
      - in: body
        name: body
        required: true
        schema:
          id: item
          required:
            - titulo
            - descricao
          properties:
            titulo:
              type: string
              example: item
            descricao:
              type: string
              example: descricao
    responses:
      201:
        description: item criado com sucesso
    """
    
    print("1. Rota POST /itens foi chamada!") # <--- Se aparecer isso, o CORS e a Rede estão OK
    
    data = request.json
    print(f"2. Dados recebidos: {data}")

    novo = ItemService.criar_item(data)
    return jsonify(novo.to_dict()), 201


@item_bp.route("/itens", methods=["GET"])
def listar_itens():
    """
    Lista todos os itens
    ---
    tags:
      - itens
    responses:
      200:
        description: Lista de itens
    """
    items = ItemService.listar_items()
    return jsonify([p.to_dict() for p in items]), 200

@item_bp.route("/itens/<int:id>", methods=["PATCH"])
def atualizar_itens(id):
    """
    Atualiza um item existente
    ---
    tags:
      - itens
    parameters:
      - name: id
        in: path
        type: integer
        required: true
        description: ID do item a ser atualizado
      - in: body
        name: body
        required: true
        schema:
          type: object
          properties:
            titulo:
              type: string
              example: Item Editado
            descricao:
              type: string
              example: Nova descrição
    responses:
      200:
        description: Item atualizado com sucesso
      404:
        description: Item não encontrado
    """
    data = request.json
    atualizado = ItemService.atualizar_item(id, data)
    
    if atualizado:
        return jsonify(atualizado.to_dict()), 200
    
    return jsonify({"error": "Item não encontrado"}), 404

@item_bp.route("/itens/<int:id>", methods=["DELETE"])
def excluir_item(id):
    """
    Exclui um item
    ---
    tags:
      - itens
    parameters:
      - name: id
        in: path
        type: integer
        required: true
        description: ID do item a ser excluído
    responses:
      200:
        description: Item excluído com sucesso
      404:
        description: Item não encontrado
    """
    # A função de excluir no repositório (que fizemos antes) retorna True/False
    sucesso = ItemService.excluir_item(id)
    
    if sucesso:
        return jsonify({"message": "Item removido"}), 200
    
    return jsonify({"error": "Item não encontrado"}), 404