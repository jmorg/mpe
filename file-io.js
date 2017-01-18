   $(document).ready(function(){

        var socket = io();
        socket.on('get file', function(path) {
            $("#messages").append('<li><img style="width: 25%; height: 25%" src="' + path +'"></img></li>');
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