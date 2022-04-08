let form1 = document.getElementById('form1');
let quantity1= document.getElementById('quantity1');
let btnAdd1= document.getElementById('btnAdd');
let btnLess1= document.getElementById('btnLess');

let form2 = document.getElementById('form2');
let quantity2= document.getElementById('quantity2');
let btnAdd2= document.getElementById('btnAdd2');
let btnLess2= document.getElementById('btnLess2');

let btnReset1 = document.getElementById('reset1');
let btnReset2 = document.getElementById('reset2');

let commander1 = document.getElementById('commander1');
let commander2 = document.getElementById('commander2');

countQuantity(form1,quantity1,btnAdd1,btnLess1,5, btnReset1,commander1);
countQuantity(form2,quantity2,btnAdd2,btnLess2,5,btnReset2,commander2);

function countQuantity(form,input, btnMore,btnMinus, max, reset, commander){
    // set the max attribute to the number input depending on the max parameter
    input.max= max;

    btnMore.addEventListener('click', (event)=>{
        event.preventDefault();
        let qT = input.value;
        if(qT < max){
            qT++;
            input.value = qT;
        }
    })
    btnMinus.addEventListener('click', (event)=>{
        event.preventDefault();
        let qT = input.value;
        if(qT > 0){
            qT--;
            input.value = qT;
        }
    })
    // control input
    input.addEventListener("input", ()=>{
        avertissementMessage(input,form, max);
    })
    // control letters + specific characters
    input.addEventListener("keydown", function(event) {
        let invalidChars = [
            "-",
            "+",
            "e",
            "0",
        ];
        if(invalidChars.includes(event.key)) {
            event.preventDefault();
        }
            // Left arrow 

        if(event.key === "ArrowLeft"){
            let qT = input.value;
            if(qT < max){
                qT++;
                input.value = qT;
            }
        }
            // Right arrow 
        if(event.key === "ArrowRight"){
            let qT = input.value;
            if(qT > 0){
                qT--;
                input.value = qT;
            }
        }
        if(event.key ==="Enter"){
            event.preventDefault();
            let qT = input.value;
            addCart(qT, input, form, max);
        }
    });
    // Reset function
    reset.addEventListener('click', (event)=>{
        event.preventDefault();
        input.value = 0;
    })
    // Buy function
    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        let qT = input.value;
        if(qT != 0){
            addCart(qT, input, form, max);
        }else{
            avertissementMessage(input, form, max);
        }
        
    })
}

function avertissementMessage(input, form, max){
    let qT = input.value;
    // check if DOM has an element defined by the id "avertissement", to avoid having multiple spans
    if(!document.body.contains(document.getElementById('avertissement'))){
        let avertissement = document.createElement("span");
        avertissement.id="avertissement";
        form.appendChild(avertissement);
    }
    if(isNaN(qT) || qT == ""){
        avertissement.innerHTML = "Veuillez saisir un nombre";
        setTimeout(()=>{
            avertissement.innerHTML="";
        }, 2000)
    }
    else if(qT < 0){
        avertissement.innerHTML = "Veuillez saisir un nombre supérieur à 0";
        setTimeout(()=>{
            avertissement.innerHTML="";
        }, 2000)
    }
    else if(qT > max){
        avertissement.innerHTML = "Veuillez saisir un nombre inférieur à "+max;
        setTimeout(()=>{
            avertissement.innerHTML="";
        }, 2000)
    }
}
function addCart(qT, input, form, max){
    if(qT > 0 && qT < max && qT !=""){
        if(!document.body.contains(document.getElementById('buyMessage'))){
            let buyMessage = document.createElement("span");
            buyMessage.id="buyMessage";
            buyMessage.innerHTML = "Votre panier a été mis à jour";
            form.appendChild(buyMessage);
            setTimeout(()=>{
                buyMessage.innerHTML="";
            }, 2000)
        }
        else{
            buyMessage.innerHTML = "Votre panier a été mis à jour";
            setTimeout(()=>{
                buyMessage.innerHTML="";
            }, 2000)
        }
    }
    else{
        avertissementMessage(input, form, max);
    }
}