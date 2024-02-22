const boton = document.getElementById("circle");
const span = document.getElementById('shell');
const container = document.getElementById('change');
const dom = document.querySelector(".calculator");
const input = document.querySelector(".result");
const sing = document.querySelectorAll(".sign");
const containerButtons = document.querySelector(".container");
const nums = document.querySelectorAll(".num")
const dot = document.getElementById("dot");

const Change = () => {
    boton.classList.toggle('derecha');
    span.classList.toggle('pintado');
    dom.classList.toggle('calc-dark');
    input.classList.toggle('input-dark');

    sing.forEach(elemento => {
        elemento.classList.toggle('input-dark');
    });
    containerButtons.classList.toggle('container-dark');
    nums.forEach(element => {
        element.classList.toggle('num-dark');
    })
    dot.classList.toggle('dot-dark');
}

container.addEventListener('click',() => Change());