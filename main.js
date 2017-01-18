
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
                currMessages = "";
                if(localStorage.getItem('messages')) {
                    currMessages = localStorage.getItem('messages');
                }
                currMessages = currMessages + '\n' + m
                
                // If localStorage is full, splits the currently-stored
                // conversation in half and stores that instead
                try {
                    localStorage.setItem('messages', currMessages);   
                } catch(e) {
                    lines = currMessages.split(/\r?\n/);
                    lines.splice(0, lines.length/2);
                    currMessages = lines.join("\n");
                    localStorage.setItem('messages', currMessages);
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
