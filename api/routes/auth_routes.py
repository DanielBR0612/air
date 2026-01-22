from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from services.auth_service import AuthService
from services.usuario_service import UsuarioService

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
@cross_origin()
def login():
    """
    Realiza o login do usuário
    ---
    tags:
      - Autenticação
    parameters:
      - in: body
        name: body
        description: Credenciais do usuário (nome e senha)
        required: true
        schema:
          type: object
          required:
            - nome
            - senha
          properties:
            nome:
              type: string
              example: "daniel"
            senha:
              type: string
              example: "123456"
    responses:
      200:
        description: Login realizado com sucesso
        schema:
          type: object
          properties:
            token:
              type: string
              description: Token JWT para autenticação
      400:
        description: Campos obrigatórios ausentes
      401:
        description: Credenciais inválidas (usuário ou senha incorretos)
    """
    data = request.json
    usuario = data.get('nome')
    senha = data.get('senha')

    if not usuario or not senha:
        return jsonify({"error": "Campos obrigatórios"}), 400

    token = AuthService.login(usuario, senha)

    if token:
        return jsonify({"token": token}), 200
    
    return jsonify({"error": "Credenciais inválidas"}), 401


@auth_bp.route('/criar-admin', methods=['POST'])
def criar_usuario():
    """
    Cria um novo usuário (Admin)
    ---
    tags:
      - Autenticação
    parameters:
      - in: body
        name: body
        description: Dados do novo usuário
        required: true
        schema:
          type: object
          required:
            - usuario
            - senha
          properties:
            usuario:
              type: string
              example: "novo_admin"
            senha:
              type: string
              example: "senha_forte"
    responses:
      201:
        description: Usuário criado com sucesso
        schema:
          type: object
          properties:
            message:
              type: string
            id:
              type: integer
      400:
        description: Erro ao criar usuário (usuário já existe ou dados inválidos)
    """
    data = request.json
    
    novo_usuario = UsuarioService.criar_usuario(data)
    
    if novo_usuario:
        return jsonify({"message": "Usuário criado com sucesso", "id": novo_usuario.id}), 201
    
    return jsonify({"error": "Erro ao criar usuário (talvez já exista)"}), 400