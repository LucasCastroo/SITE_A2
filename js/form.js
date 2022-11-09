$(".form").addEventListener("change", validar);

let name = $("#nome");
let email = $("#email");
let input = $("#telefone");
let state = $("#estado");
let city = $("#cidade");
let citySelect = $("#cidade-select")
let age = $("#idade");
let reason = $("motivo")
let message = $("message")

function validar(e) {
    
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
state.addEventListener("change", carregarCidades);
let req = new XMLHttpRequest();
req.open("GET", "./assets/cidades.json", false);
req.send();
let citiesJson = JSON.parse(req.responseText).estados;
function carregarCidades(e){
    city.innerHTML = "";
    let defaultOpt = document.createElement("option");
    defaultOpt.hidden = true;
    defaultOpt.disabled = true
    defaultOpt.selected = true;
    defaultOpt.innerText = " -- selecione uma cidade -- ";
    city.append(defaultOpt);
    let stateCode = e.target.value;
    let cities = citiesJson.find(s => s.sigla == stateCode).cidades
    cities.forEach(c => {
        let opt = document.createElement("option");
        opt.value = c.toLowerCase();
        opt.innerText = c;
        city.append(opt);
    });
    citySelect.hidden = false;
}



//so pra facilitar a vida
function $(query){
    return document.querySelector(query)
}