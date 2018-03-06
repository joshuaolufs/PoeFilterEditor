$(document).ready(function(){
    // radio group item selection
    $(".radio-item").on("click", function() {
        $(this).siblings(".radio-item").removeClass("selected");
        $(this).addClass("selected");
    });
    
    // text input tabout
    $(document).on("keydown", "input[type='text']", function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode == 13) {
            e.preventDefault();
            $(this).blur();
        }
    });
    // text input select all on focus
    $(document).on("focus", "input[type='text']", function(e) {
        $(this).select();
    });
});