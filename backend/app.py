from flask import Flask, request, jsonify
from models import init_db, add_user, add_book, get_books, update_book_status, get_user_info

app = Flask(__name__)

# Rota inicial de teste
@app.route("/")
def home():
    return "Bem-vindo ao Repasse de Livros Sidarta 2025!"

# Rota para cadastro de usuários
@app.route("/cadastro", methods=["POST"])
def cadastro():
    data = request.json
    nome = data.get("nome")
    celular = data.get("celular")
    serie = data.get("serie")
    livros = data.get("livros")  # Lista de livros que o usuário possui

    if not nome or not serie:
        return jsonify({"error": "Nome e série são obrigatórios"}), 400
    
    add_user(nome, celular, serie, livros)
    return jsonify({"message": "Usuário cadastrado com sucesso!"}), 201

# Rota para listar livros disponíveis
@app.route("/livros/<serie>", methods=["GET"])
def listar_livros(serie):
    livros = get_books(serie)
    return jsonify(livros), 200

# Rota para atualizar status de livro (Finalizado/Disponível)
@app.route("/livros/atualizar", methods=["POST"])
def atualizar_livro():
    data = request.json
    livro_id = data.get("livro_id")
    status = data.get("status")  # "finalizado" ou "disponível"

    update_book_status(livro_id, status)
    return jsonify({"message": "Status do livro atualizado!"}), 200

# Rota para buscar informações de um usuário
@app.route("/usuario/<nome>", methods=["GET"])
def buscar_usuario(nome):
    user_info = get_user_info(nome)
    if user_info:
        return jsonify(user_info), 200
    return jsonify({"error": "Usuário não encontrado"}), 404

if __name__ == "__main__":
    init_db()  # Inicializa o banco de dados
    app.run(debug=True)
