const socket = io()
let textarea = document.querySelector("#textarea")
let mssg_area = document.querySelector(".mssg-area")
let userNum = document.getElementById('userNum');

// for taking name input

let names;
 do{
    names = prompt("Please enter your name to join  :")
   document.getElementById("onlineUser").innerHTML="Hi , "+names;
}while(!names)



textarea.addEventListener('keyup',(e)=>{
  
    if(e.key==='Enter'){
        sendMessage(e.target.value);
    }

})


function sendMessage(mssg){
    let mssgArr = {
        user : names,
        message : mssg  
    }

    // append the mssg
     if(mssgArr.message==0){}
     else{
    appendMssg(mssgArr,'outgoing')
    textarea.value=''
    scrollTobottom()
     }
   // send mssg to socket server
   socket.emit('message',mssgArr);
}

function appendMssg(mssg,type){

    let mianDiv = document.createElement('div')
    let className=type
    // add classes  maindiv
    mianDiv.classList.add(className,'mssg')

    // craete markup
    let markup = `
    <h4>${mssg.user}</h4>
    <p>${mssg.message}</p>
    `
    // insert markup in to maindiv
    mianDiv.innerHTML=markup

    mssg_area.appendChild(mianDiv)
}

//recive the mssg

socket.on('message',(mssgArr)=>{
    if(mssgArr.message==0){}
     else{
    appendMssg(mssgArr,'incoming')
    scrollTobottom()
     }
})

//  user count 
socket.on('usercnt',(count)=>{
    userNum.innerHTML=count;
})


//  scroll bar ke liye function

function scrollTobottom(){
    mssg_area.scrollTop =mssg_area.scrollHeight;
}
