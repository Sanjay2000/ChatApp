const socket = io()
let name;
let textarea = document.querySelector('#textarea')
feedback = document.getElementById('feedback')

let messageArea = document.querySelector('.message__area')

do {
    name = prompt('Please enter your name: ')
} while(!name)

document.getElementById("myText").innerHTML = name;

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter' && e.target.value!==null) {
        sendMessage(e.target.value)
    }
})

textarea.addEventListener('keypress',function(){
    socket.emit('typing',name)
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append 
    if (msg.message === ""){
        alertForMessage();
    }
    else{
        appendMessage(msg, 'outgoing')
    }
 
    
    textarea.value = ''
    scrollToBottom()

    // Send to server     
        socket.emit('message', msg)

}

function alertForMessage(){
    alert('Please enter the valid text');
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    feedback.innerHTML =""
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

socket.on('typing',function(data){
    console.log(data);
    
    feedback.innerHTML = '<p><em>'+data + ' is typing a message...</em></p>'
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}




