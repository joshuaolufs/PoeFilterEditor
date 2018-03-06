$(document).ready(function(){
    $(".pane-wrapper").sortable({
        connectWith: ".pane-wrapper",
        handle: ".pane-handle",
        items: ">.pane",
        helper: "clone",
        start: function(e, ui){
            ui.placeholder.height(ui.helper.outerHeight());
        }
    });
});