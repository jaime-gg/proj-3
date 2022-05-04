var logoText=['Textos Antiguos'];
var textPositon=0;
var speed=100;

typewriter=()=>{
    document.querySelector('#logo');
    innerHTML=logoText[0].substring(0, textPositon)+"<span>\u25ae</span>";

    if(textPositon++ != logoText[0].length)
        setTimeout(typewriter, speed);
    
}

window.addEventListener("load", typewriter);