const output = document.querySelector('.output');
const messageOut = document.querySelectorAll('.message span');
let score = 0;

output.addEventListener('mouseenter',function () {
   output.style.backgroundColor = '#3A4143';
});
output.addEventListener('mouseleave',function () {
    output.style.backgroundColor = '#3A4A43';
});
output.addEventListener('mousemove',function (e) {
   messageOut[0].innerText = e.x;
   messageOut[1].innerText = e.y;
});
//Document ready
document.addEventListener('DOMContentLoaded',function(){
    //create box
    const div = document.createElement('div');
    div.classList.add('box');
    output.appendChild(div);
    //Ajouter de nouvelle propieté à l'objet
    div.x = div.offsetLeft;
    div.y = div.offsetTop;
    div.tempColor = '#' + Math.random().toString(16).substr(-6);
    //
    div.style.backgroundColor = div.tempColor;
    //
    div.addEventListener('mouseenter',function(e){
        //this.style.backgroundColor = 'red'; OU BIEN
        div.style.backgroundColor = 'red';
        div.innerHTML = '<h1>X</h1>'
    })
    div.addEventListener('mouseleave',function(e){
        div.style.backgroundColor = div.tempColor;
        div.innerHTML = ''
    })
    div.addEventListener('click',function(e){
        div.tempColor = '#' + Math.random().toString(16).substr(-6);
        div.style.backgroundColor = div.tempColor;
        score++;
        messageOut[2].innerText = score;
    })
    //
    div.steps = Math.random() *20;
    div.direction = Math.floor(Math.random()*4);//Valeur entre 0 et 3 pour les 4directions
    window.requestAnimationFrame(move);
});

function move(){
    let speed = Math.random()*10 + 15;
    const box = document.querySelector('.box');
    
    //Recuperer des info sur l'element : lageur,hauteur, top,left...
    let bounds = output.getBoundingClientRect();
    box.steps--;
    if(box.steps < 0){
        box.direction = Math.floor(Math.random()*4);
        box.steps = Math.random() *20;
    }



    if(box.direction == 0 && box.x < bounds.right-100){
        box.x+=speed;
    }

    if(box.direction == 1 && box.x > bounds.left){
        box.x-=speed;
    }

    if(box.direction == 2 && box.y < bounds.bottom-100){
        box.y+=speed;
    }

    if(box.direction == 3 && box.y > bounds.top){
        box.y-=speed;
    }

    box.style.top = box.y + 'px';
    box.style.left = box.x + 'px';
    window.requestAnimationFrame(move);
}