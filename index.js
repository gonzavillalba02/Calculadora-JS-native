let result = 0;
let buffer = "";
let prevOp = "";
let input_result = document.getElementById('input');

input_result.addEventListener("click", () => {
    buffer = buffer.slice(0,-1);
    input_result.value = buffer;
})

//sonido
const makeSound = (element) => {
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
        const soundId = element.getAttribute('data-sound');
        const sound = document.getElementById(soundId);
        if (sound) {
            sound.currentTime = 0;
            sound.play();
        }
    }
}

// agrego numeros a la calculadora

const add = (num) => {
    if (buffer.length < 10){
        buffer += num;
        input_result.value = buffer;
    } else {
        alert("Limite alcanzado!")
    }
}

const numButtons = document.querySelectorAll('.num');

var nums_array = ["0", "7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."];

numButtons.forEach((element, i)=>{
    element.addEventListener('click', ()=>{
        if (nums_array[i] != ".") {
            add(nums_array[i]);
        } else {
            if (!buffer.includes(".")){
                if (buffer === ""){
                    add("0");
                    add(nums_array[i])
                } else {
                    add(nums_array[i]);
                }
            }
        }

        makeSound(element);

    })
    i++;
})

document.addEventListener("keydown", (e)=>{
    if (nums_array.includes(e.key)){
        if (e.key !== "."){
            add(e.key);
        } else {
            if (!buffer.includes(".")){
                add(e.key);
            }
        }
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (!isMobile) {
            const sound = document.getElementById("sound_click");
            if (sound) {
                sound.currentTime = 0;
                sound.play();
            }
        }
    }
    if (e.key === "Escape"){
        result = 0;
        buffer = "";
        input_result.value = "";
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (!isMobile) {
            const sound = document.getElementById("sound2");
            if (sound) {
                sound.currentTime = 0;
                sound.play();
            }
        }
    }
    if (e.key === "Backspace"){
        buffer = buffer.slice(0,-1);
        if (buffer[buffer.length - 1] === "."){
            buffer = buffer.slice(0,-1);
        }
        input_result.value = buffer;
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (!isMobile) {
            const sound = document.getElementById("sound2");
            if (sound) {
                sound.currentTime = 0;
                sound.play();
            }
        }
    }
    if (e.ctrlKey && e.shiftKey && e.key === "L") {
        Change()
      }
})

// borrar

const delet = document.getElementById('delete');

delet.addEventListener("click",()=>{
    result = 0;
    buffer = "";
    input_result.value = "";
    makeSound(delet);
})


// operaciones

const opButtons = document.querySelectorAll('.op');

let operators = ['+-','%','/','*', '-', '+', '='];

opButtons.forEach((element, i)=>{
    element.addEventListener('click', () =>{
        if (buffer!=""){
            switch (operators[i]) {
                case '+-':
                    buffer = (-parseFloat(buffer)).toString();
                    input_result.value = buffer;
                    break;

                case '%':
                    buffer = (parseFloat(buffer)/100).toString();
                    if (buffer.length > 4){
                        buffer = parseFloat(buffer).toFixed(3);
                    }
                    buffer = buffer.substring(0,10);
                    input_result.value = buffer;
                    break;
                case '=':
                    switch (prevOp) {
                        case "/":
                            buffer = (parseFloat(result) / parseFloat(buffer)).toString();
                            break;
                        case "*":
                            buffer = (parseFloat(result) * parseFloat(buffer)).toString();
                            break;
                        case "-":
                            buffer = (parseFloat(result) - parseFloat(buffer)).toString();
                            break;
                        case "+":
                            buffer = (parseFloat(result) + parseFloat(buffer)).toString();
                            break;
                    }
                    buffer = buffer.substring(0,10);
                    if (buffer.length > 4 && buffer.includes(".")){
                        buffer = parseFloat(buffer).toFixed(3);
                    }
                    input_result.value = buffer;
                    break;
                default:
                    buffer = buffer.substring(0,10);
                    result = parseFloat(buffer);
                    buffer = "";
                    input_result.value = buffer;
                    switch (operators[i]) {
                        case '/':
                            prevOp = "/";
                            break;
                        case '*':
                            prevOp = "*";
                            break;
                        case '-':
                            prevOp = "-";
                            break;
                        case '+':
                            prevOp = "+";
                            break;
                    }
                    break;

            }
        }

        makeSound(element);
    })
})
