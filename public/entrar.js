// Capturar o elementos
let inputNome = document.getElementById("regNome");
let inputEmail = document.getElementById("regEmail");
let inputSenha = document.getElementById("regSenha");
let inputConf = document.getElementById("regConf");
let formRegistrar = document.getElementById("form-registrar");

// const urlBase = 'https://todolist-0622.herokuapp.com';
const urlBase = '/api';

const tratarResposta = async response => {

    switch(response.status){
        case 201:
            //capturar o token
            let conteudo = await response.json();

            //salvar o token
            sessionStorage.setItem('token', conteudo.token);
            sessionStorage.setItem('usuario',JSON.stringify(conteudo.usuario));

            // carregar a index.html
            location = "index.html"

            break;
        
        case 409:
            alert("Email já cadastrado.");
            break;
        
        case 422:
            alert("Senha preenchida incorretamente.");
            break;
            
        default:
            alert(`Erro inesperado: ${response.status}`);
            break;
    }

}


const registrarUsuario = async (dados) => {
    // 1 - Definir a url para onde vai ser enviada
    let url = `${urlBase}/auth/registrar`

    // 2 preparar opções de envio
    let opcoes = {
        method:"POST",
        body:JSON.stringify(dados),
        headers:{
            "Content-type": "application/json"
        }
    }

    // 3 enviar os dados para endereço de registro

    let response = await fetch(url,opcoes);
    //console.log(response);
    tratarResposta(response);
}

// Listeners
const onFormRegistrarSubmit = (evt) => {
    evt.preventDefault();
    let dados = {
        nome: inputNome.value,
        email: inputEmail.value,
        senha: inputSenha.value,
        confirmacao: inputConf.value,
    }

    registrarUsuario(dados)
}

// Associando listeners
formRegistrar.addEventListener('submit', onFormRegistrarSubmit)