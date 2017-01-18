   $(document).ready(function(){

        var socket = io();

        socket.on('get file', function(path) {
            var caption = document.getElementById('img-caption').value;
            var imgCode = '<img style="width:40%; height: 40%" src="' + path +'"></img>';
            var captionCode = '<p>Comment:' + caption + '</p>';
            var timeStamp = "<p class='time'>" +  new Date().toLocaleString() + "</p>"
            var totalCode = '<li>' + imgCode + captionCode + '</li>';
            storeInLocalStorage(totalCode);
            $("#messages").append(totalCode);
            $(".close-button").click();
        });
        $(".close-button").click(function(){
            $(".pop-up").hide();
        });

        $('#share-image').click(function(){
            $("#share-image-pop").show();
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