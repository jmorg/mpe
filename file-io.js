 $(document).ready(function(){
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