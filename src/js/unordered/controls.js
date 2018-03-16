$(document).ready(function(){
    // radio group item selection
    $(".radio-item").on("click", function() {
        $(this).siblings(".radio-item").removeClass("selected");
        $(this).addClass("selected");
        onControlChange(editor);
    });
    
    // Trigger change propagation when input changes
    $(".input-group>input, .input-group>select").on("input change", function() {
        onControlChange(editor);
    });
    
    // text input tabout
    $(document).on("keydown", "input[type='text']:not(.multiple-entry)", function(e) {
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