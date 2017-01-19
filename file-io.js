   $(document).ready(function(){

        var socket = io();

        socket.on('get img', function(path) {
            var caption = document.getElementById('img-caption').value;
            var imgCode = '<img style="width:40%; height: 40%" src="' + path +'"></img>';
            var captionCode = '<p>Comment:' + caption + '</p>';
            var timeStamp = "<p class='time'><i>Delivered: " +  new Date().toLocaleString() + "</i></p>"
            var totalCode = '<li>' + imgCode + captionCode + timeStamp + '<br/></li>';
             storeInLocalStorage();
            $("#messages").append(totalCode);
            $(".close-button").click();
        });

        socket.on('get vid', function(path) {
            var caption = document.getElementById('img-caption').value;
            var vidCode = '<video width="400" controls> <source src="'+ path + '" type="video/mp4"></video>';
            var captionCode = '<p>Comment:' + caption + '</p>';
            var timeStamp = "<p class='time'><i>Delivered: " +  new Date().toLocaleString() + "</i></p>"
            var totalCode = '<li>' + vidCode + captionCode + timeStamp + '<br/></li>';
             storeInLocalStorage();
            $("#messages").append(totalCode);
            $(".close-button").click();
        });

        socket.on('get voice', function(path) {
            var caption = document.getElementById('img-caption').value;
            var voiceCode = '<audio controls><source src="' + path + '" type="audio/mp3"></audio>';
            var captionCode = '<p>Comment:' + caption + '</p>';
            var timeStamp = "<p class='time'><i>Delivered: " +  new Date().toLocaleString() + "</i></p>"
            var totalCode = '<li>' + voiceCode + captionCode + timeStamp + '<br/></li>';
             storeInLocalStorage();
            $("#messages").append(totalCode);
            $(".close-button").click();
        });

        socket.on('get link', function(togo) {
            var linkToGo = document.getElementById('hyperlink').value;
            var frame = '<iframe frameborder="3" width="750px" height="750px" src="' + linkToGo + '"></iframe>';
            var timeStamp = "<p class='time'><i>Delivered: " +  new Date().toLocaleString() + "</i></p>"

            var totalCode ='<li>' + frame + timeStamp + "</li>"
            storeInLocalStorage();
            $("#messages").append(totalCode);
            $(".close-button").click();
        });


        $('#text-message').submit(function(){
            socket.emit('chat message', $('#m').val());
            $('#m').val('');
            return false;
         });

        $(".close-button").click(function(){
            $(".pop-up").hide();
        });

        $('#share-image').click(function(){
            $("#share-image-pop").show();
        });

        $('#share-link').click(function(){
            $("#share-link-pop").show();
        });


        $('#share-video').click(function(){
            $("#share-video-pop").show();
        });

        $('#share-voice').click(function(){
            $("#share-voice-pop").show();
        });

        $('#share-image').hover(
            function(){
                $("#share-image-help").show();
            }, function() {
                $("#share-image-help").hide();
        }
        );

         $('#share-link').hover(
            function(){
                $("#share-link-help").show();
            }, function() {
                $("#share-link-help").hide();
        }
        );


        $('#share-video').hover(
            function(){
                $("#share-video-help").show();
            }, function() {
                $("#share-video-help").hide();
        }
        );

        $('#share-voice').hover(
            function(){
                $("#share-voice-help").show();
            }, function() {
                $("#share-voice-help").hide();
        }
        );
    });