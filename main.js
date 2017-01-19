
/*
    Function: storeInLocalStorage
    -----------------------------
    Takes the current message and appends it onto what's currently
    in localStorage. Separates all messages with a newline.
    Currently no way to save username and who typed what.
    KEY TIP: Check what's in Chrome localStorage by going to
    Application --> Local Storage --> [http://localhost:3000]
*/
function storeInLocalStorage() {
    var convo = document.getElementById('conversation');
    var convoHTML = convo.innerHTML;
    
    // If localStorage is full, takes the convo and deletes
    // what's stored.
    try {
        localStorage.setItem('convo', convoHTML);   
    } catch(e) {
        console.log("Storage full, clearing.");
        window.localStorage.clear();
    }
}

function loadAllLocalStorage() {
    if(localStorage.getItem('convo')) {
        var savedConvo = localStorage.getItem('convo');
        var convo = document.getElementById('conversation');
        convo.innerHTML = savedConvo;
    }
}

function clearChatHistory() {
    window.localStorage.clear();
    var convo = document.getElementById('conversation');
    convo.innerHTML = "<ul id='messages'></ul>";
}

var socket = io();


// socket.on('chat message', function(msg) {
//     $('#messages').append($('<li>').text(msg));
//     storeInLocalStorage();
// });

socket.on('load local storage', function() {
    loadAllLocalStorage();
});

  $('#text-message').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(msg){
     var timeStamp = "<span class='time'><i>Delivered: " +  new Date().toLocaleString() + "</i></span>"
    $('#messages').append($("<li><p>" + msg + timeStamp + "</p><br/></li>"));
    storeInLocalStorage();
  });


function login(form) {
    var video_out = document.getElementById("vid-box");

    var phone = window.phone = PHONE({
        number: form.username.value || "Anonymous",
        publish_key: 'pub-c-791ba55a-2fb0-4b91-b7ea-209bde6a78a7',
        subscribe_key: 'sub-c-ac391a7e-dde8-11e6-b2ae-0619f8945a4f',
    });
    phone.ready(function(){ form.username.style.background="#55ff5b"; });
    phone.receive(function(session){
        session.connected(function(session) {
            video_out.appendChild(session.video);
        });
        session.ended(function(session) { 
            video_out.innerHTML=''; 
        });
    });
    return false;
 }

function makeCall(form){
    if (!window.phone) {
        alert("Login please!");
    } else {
        phone.dial(form.number.value);
    }
    return false;
 }
