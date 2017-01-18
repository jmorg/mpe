
/*
    Function: storeInLocalStorage
    -----------------------------
    Takes the current message and appends it onto what's currently
    in localStorage. Separates all messages with a newline.
    Currently no way to save username and who typed what.
    KEY TIP: Check what's in Chrome localStorage by going to
    Application --> Local Storage --> [http://localhost:3000]
*/
function storeInLocalStorage(m) {
    bodyHTML = document.body.innerHTML;
    
    // If localStorage is full, takes the 
    try {
        localStorage.setItem('messages', bodyHTML);   
    } catch(e) {
        
    }
}

var socket = io();
$('form').submit(function() {
    socket.emit('chat message', $('#m').val());
    storeInLocalStorage($('#m').val());
    $('#m').val('');
    return false;
});
socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
});
