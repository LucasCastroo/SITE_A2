let nome = $("#nome");
let email = $("#email");
let telephone = $("#telefone");
let state = $("#estado");
let city = $("#cidade");
let citySelect = $("#cidade-select");
let age = $("#idade");
let reason = $("#motivo");
let message = $("#mensagem");
let masc = $("#masc");
let fem = $("#fem");

$(".form").addEventListener("change", validar);
$(".form").addEventListener("submit", validar);

function validar(e) {
    e = e.target;
    if(e.required){
        e.style.removeProperty("border");
        $("#" + e.id +  "-required")?.remove();
        if(!e.checkValidity()){
            e.style.border = "2px solid red";
            let p = document.createElement("p");
            p.id = e.id + "-required";
            p.style.display = "inline";
            p.style.color = "red";
            p.style.fontSize = "small";
            p.innerText = " Inválido";
            e.after(p);
        }
    }
}


//mascara no input de telefone
function mascaraTelefone(input){
    setTimeout(function(){
        input.value = input.value.replace(/\D/g,"");
        input.value = input.value.replace(/^(\d\d)(\d)/g,"($1) $2");
        if(input.value.length < 14) input.value = input.value.replace(/(\d{4})(\d)/,"$1-$2")
        else input.value = input.value.replace(/(\d{5})(\d)/,"$1-$2");
    }, 1);
}



//listar cidades para o estado selecionado

//baixa o arquivo json

let req = new XMLHttpRequest();
req.open("GET", "./assets/cidades.json", false);
req.send();

let citiesJson = JSON.parse(req.responseText).estados; //carrega a estrutura do json nessa variavel

//adiciona um gatilho pra que quando selecionado o estado a função carregarCidades seja chamada
state.addEventListener("change", carregarCidades);


function carregarCidades(e){
    city.innerHTML = ""; //limpa o select de cidade

    //cria um option fantasma com um texto orientando o usuario
    let defaultOpt = document.createElement("option");
    defaultOpt.hidden = true;
    defaultOpt.disabled = true
    defaultOpt.selected = true;
    defaultOpt.innerText = " -- selecione uma cidade -- ";
    city.append(defaultOpt);


    let stateCode = e.target.value; //obtem o valor da option selecionada no select de estado
    //procura no json as cidades que tem o estado igual ao que selecionado
    let cities = citiesJson.find(s => s.sigla == stateCode).cidades

    //pra cada cidade cria um option o coloca ele no select de cidade
    cities.forEach(c => {
        let opt = document.createElement("option");
        opt.value = c.toLowerCase();
        opt.innerText = c;
        city.append(opt);
    });

    //desesconde o select de cidade
    citySelect.hidden = false;
}



//so pra facilitar a vida
function $(query){
    return document.querySelector(query)
}
