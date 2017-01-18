
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

var socket = io();
$('form').submit(function() {
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
});

socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
    storeInLocalStorage();
});

socket.on('load local storage', function() {
    loadAllLocalStorage();
});
