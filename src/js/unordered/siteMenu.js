$(document).ready(function(){
    $(document).on("click", "#menu-settings", function(){
        $("#site-info").slideUp(200, function(){
            $("#site-settings").slideToggle(200);
        });
    });
    
    $(document).on("click", "#menu-info", function(){
        $("#site-settings").slideUp(200, function(){
            $("#site-info").slideToggle(200);
        });
    });
});