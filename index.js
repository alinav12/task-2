let result1 = [];
let result2 = [];
let result3 = [];

function createOtpComponent(symbolsNum, allowedSymbols = 'both', showSymbols = true, result){
    let form = document.createElement("form");
    let otpInputDiv = document.createElement("div");
    otpInputDiv.id = 'otp-input';
    form.appendChild(otpInputDiv);
    
    for(let i = 1; i <= symbolsNum; i++){
        let input = document.createElement('input');
        input.type = showSymbols? "text" : "password";
        input.id = 'symbol-' + i;
        input.className = "singleSymbol";
        input.maxLength = 1;
        input.addEventListener('keyup', (e) => {onKeyUpHandle(e, allowedSymbols, result)});
        otpInputDiv.appendChild(input);
    }

    document.getElementsByClassName('content')[0].appendChild(form);

    let title = document.createElement('span');
    title.innerHTML = "Enter verification code:";
    form.prepend(title);

    let text = document.createElement('span');
    text.innerHTML = `
        Entered otp: <span class="entered-otp"></span>
    `;
    form.append(text);
    
}

function onKeyUpHandle(event, allowedSymbols, result){
    const keyCode = event.which;
    const value = event.target.value;
    

    if(result.length === event.target.parentElement.querySelectorAll('.singleSymbol').length){
        return;
    }

    if(keyCode === 16){
        return;
    }


    if(keyCode !== 8){
        if(allowedSymbols === "letters" && !/^[a-zA-Z]+$/.test(value)) {    //(event.keyCode >= 65 && event.keyCode <= 90)
            alert('You can enter only letters from Latin alphabet');
            event.target.value = '';
            return;
        }

        if(allowedSymbols === "numbers" && !/^[0-9]+$/.test(value)) {   //(event.keyCode >= 48 && event.keyCode <= 57)
            alert('You can enter only numbers');
            event.target.value = '';
            return;
        }

        if(allowedSymbols === "both" && (!/^[a-zA-Z]+$/.test(value) && !/^[0-9]+$/.test(value))) {
            alert('You can enter only letters from Latin alphabet and numbers');
            event.target.value = '';
            return;
        }
    }


    if(keyCode === 8){
        if(event.target.previousSibling){
            event.target.previousSibling.disabled = false;
            event.target.previousSibling.focus();
        } 
        result.pop(value);
        event.target.value = '';
    }else{
        result.push(value);
        event.target.disabled = true;
        if(event.target.nextSibling){
            event.target.nextSibling.focus();   
        }
        event.target.parentElement.nextSibling.querySelector(".entered-otp").innerHTML = result.join('');
    }

    if(result.length === event.target.parentElement.querySelectorAll('.singleSymbol').length){
        alert('Your password is ' + result.join(''));
    }

}

createOtpComponent(6, 'letters', true, result1);
createOtpComponent(4, 'numbers', true, result2);
createOtpComponent(10, 'both', false, result3);


