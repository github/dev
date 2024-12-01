from flask import Flask, request, jsonify
from models import init_db, add_user, add_book, get_books, update_book_status, get_user_info
from flask_cors import CORS

# Após criar o app Flask
CORS(app)


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
    serie = data.get("serie") # aqui tem que ticar as duas séries, série que o filho está e série que o filho vai e em ambas apareccem aqui 
    livros = data.get("livros")  # Lista de livros que o usuário possui, a partir da serie que ele adiciona acima, série em 2024, abre aqui em baixo os livros da serie correspondete que vao estao no banco de dados, em cada livro terá como ticar, simalizando se o usuario o possui ou nao e se possui tem uma caixinha para elee escrever observaççoes sobre o livro, se ele ticar o livro vai aprecer se ele está disponivel, se estiver abre a opção de falar com o usuario que é a opção do botão pro whatsapp

    if not nome or not serie:
        return jsonify({"error": "Nome e série são obrigatórios"}), 400
    
    add_user(nome, celular, serie, livros)
    return jsonify({"message": "Usuário cadastrado com sucesso!"}), 201

# Rota para listar livros disponíveis de todos  os  usuarios cadastrados 
@app.route("/livros/<serie>", methods=["GET"])
def listar_livros(serie):
    livros = get_books(serie)
    conn = sqlite3.connect("livros.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM livros WHERE serie = ? AND status = 'disponível'", (serie,))
    livros = cursor.fetchall()
    conn.close()
    return [{"id": livro[0], "titulo": livro[1], "status": livro[3]} for livro in livros], 200


# Rota para atualizar status de livro (Repassado/Disponível) isso tem que ser automatizado, o usuario dono do livro aceitou repassar após receber a mensagem do solicitante, ele deve voltar na aplicação pelo seu cadastro e em sua página ticar livro repassado
@app.route("/livros/atualizar", methods=["POST"])
def atualizar_livro():
    data = request.json
    livro_id = data.get("livro_id")
    status = data.get("status")  # "repassado" ou "disponível"

    update_book_status(livro_id, status)
    return jsonify({"message": "Status do livro atualizado!"}), 200

    def update_book_status(livro_id, status):
    if status not in ["finalizado", "disponível"]:
        raise ValueError("Status inválido")

    conn = sqlite3.connect("livros.db")
    cursor = conn.cursor()
    cursor.execute("UPDATE livros SET status = ? WHERE id = ?", (status, livro_id))
    conn.commit()
    conn.close()


# Rota para buscar informações de um usuário, além do nome, deve aparecer os livros que essa pessoa tem disponíveis
@app.route("/usuario/<nome>", methods=["GET"])
def buscar_usuario(nome):
    user_info = get_user_info(nome)
    if user_info:
        return jsonify(user_info), 200
    return jsonify({"error": "Usuário não encontrado"}), 404
 

if __name__ == "__main__":
    init_db()  # Inicializa o banco de dados
    app.run(debug=True)


