$(document).ready(function(){
    $("#keyword-class").on("keydown", function(event) {
        if (event.keyCode === 9 || event.keyCode === 13) {
            event.preventDefault();
            var self = $(this);
            if (self.val().length > 0) {
                // append a new tag to the keyword area
                $("#keyword-display").prepend("<span class='class-item keyword-item'>" + self.val().trim() + "<i class='fa fa-fw fa-times-circle'></i></span>")
                // clear the contents
                self.val("");
            }
        }
    });
    $("#keyword-basetype").on("keydown", function(event) {
        if (event.keyCode === 9 || event.keyCode === 13) {
            event.preventDefault();
            var self = $(this);
            if (self.val().length > 0) {
                // append a new tag to the keyword area
                $("#keyword-display").append("<span class='basetype-item keyword-item'>" + $(this).val().trim() + "<i class='fa fa-fw fa-times-circle'></i></span>")
                // clear the contents
                $(this).val("");
            }
        }
    });
    $(document).on("click", ".keyword-item>.fa", function() {
        $(this).parent().remove();
    });
});