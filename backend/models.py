import sqlite3

# Função para inicializar o banco de dados
def init_db():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    
    # Cria tabela de usuários
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        celular TEXT,
        serie TEXT NOT NULL
    )
    """)
    
    # Cria tabela de livros
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS livros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        serie TEXT NOT NULL,
        status TEXT DEFAULT "disponível",
        usuario_id INTEGER,
        FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
    )
    """)
    conn.commit()
    conn.close()

# Função para adicionar usuário
def add_user(nome, celular, serie, livros):
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    
    cursor.execute("INSERT INTO usuarios (nome, celular, serie) VALUES (?, ?, ?)", (nome, celular, serie))
    user_id = cursor.lastrowid  # ID do usuário recém-criado
    
    # Adiciona livros do usuário
    for livro in livros:
        cursor.execute("INSERT INTO livros (nome, serie, usuario_id) VALUES (?, ?, ?)", (livro, serie, user_id))
    
    conn.commit()
    conn.close()

# Função para buscar livros por série
def get_books(serie):
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM livros WHERE serie = ? AND status = 'disponível'", (serie,))
    livros = cursor.fetchall()
    conn.close()
    return livros

# Função para atualizar status de livro
def update_book_status(livro_id, status):
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    
    cursor.execute("UPDATE livros SET status = ? WHERE id = ?", (status, livro_id))
    conn.commit()
    conn.close()

# Função para buscar informações de um usuário
def get_user_info(nome):
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()
    
    cursor.execute("""
    SELECT usuarios.nome, usuarios.celular, livros.nome AS livro, livros.status
    FROM usuarios
    JOIN livros ON usuarios.id = livros.usuario_id
    WHERE usuarios.nome = ?
    """, (nome,))
    
    user_info = cursor.fetchall()
    conn.close()
    return user_info
