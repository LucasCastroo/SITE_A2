let carrossel = document.getElementById("container-carrossel");
let item = document.querySelector(".item-carrossel")

carrossel.scrollLeft = 0; //reseta carrossel pro primeiro item

function ant(){
    let size = item.clientWidth;
    carrossel.scrollLeft -= size;

}

function prox(){
    let size = item.clientWidth;
    carrossel.scrollLeft += size;
}