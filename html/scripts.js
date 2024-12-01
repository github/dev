document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.querySelector("input[placeholder='Nome']").value;
    const senha = document.querySelector("input[placeholder='Senha']").value;

    // Aqui, faça a validação no backend (ainda vamos implementar)
    console.log(`Login: ${nome}, Senha: ${senha}`);
});


function cadastrarUsuario(dados) {
    fetch("http://127.0.0.1:5000/cadastro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Erro:", error));
}

// Exemplo de uso:
cadastrarUsuario({
    nome: "Maria Silva",
    celular: "11988887777",
    serie: "3° ano",
    livros: ["Livro A", "Livro B"]
});
