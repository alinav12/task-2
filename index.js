function createOtpComponent(symbolsNum, isShown = true, allowedSymbols){
    let otpBlock = document.createElement('div');
    otpBlock.className = 'otp-block';
    otpBlock.style.width = '200px';
    otpBlock.style.height = '50px';
    document.getElementsByClassName('content')[0].appendChild(otpBlock);

    let otpInput = document.createElement('input');
    otpInput.maxLength = symbolsNum;
    otpInput.type = allowedSymbols == 'number' ? 'number' : 'text';
    otpBlock.appendChild(otpInput);

    otpInput.addEventListener('input', (e) => {handleInput(e, isShown)});
    

    let otpTextWidth = parseInt(otpBlock.style.width)*0.8 / symbolsNum;

    for(i = 0; i < symbolsNum; i++){
        let otpSingle = document.createElement('div');
        otpSingle.className = 'otp-text';
        otpSingle.style.width = `${otpTextWidth}px`
        otpBlock.appendChild(otpSingle);
    }

    otpInput.addEventListener('click', () => {document.getElementsByClassName('otp-text')[0].classList.add('active')}, {once : true});

}


function handleInput(e, isShown){
    let otpTexts = document.getElementsByClassName('otp-text');

    if(e.data){
        otpTexts[e.target.value.length-1].innerHTML = isShown ? e.data : '*';
        otpTexts[e.target.value.length-1].classList.remove('active');
        if(e.target.value.length !== e.target.maxLength) otpTexts[e.target.value.length].classList.add('active');
    }else{
        otpTexts[e.target.value.length].innerHTML = '';
        otpTexts[e.target.value.length+1].classList.remove('active');
        otpTexts[e.target.value.length].classList.add('active');
    }
    
    
    if(e.target.value.length === e.target.maxLength) alert(`Your password is ${e.target.value}`);
 

    // Array.from(otpTexts).forEach((element) => {
    //     element.classList.remove('active');
    //     element.innerHTML='';
    // });

    // for(i = 0; i < e.target.value.length; i++){
    //     otpTexts[i].innerHTML = isShown ? e.target.value[i] : '*';
    // }

    // if(e.target.value.length !== e.target.maxLength){ 
    //     otpTexts[e.target.value.length].classList.add('active');
    // }else{
    //     alert(`Your password is ${e.target.value}`);
    // }

    }

createOtpComponent(5, false, 'number');