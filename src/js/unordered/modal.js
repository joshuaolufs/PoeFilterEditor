$(document).ready(function(){
    // import
    $('#import').on('click', function() {
        $('#modal-overlay').show();
        $('#modal-import').show();
    });
    // hide modals when clicking on overlay
    $('#modal-overlay').on('click', function(e) {
        $('.modal').hide();
        $(this).hide();
    });
    
    $('.modal input[type="file"]').on('input change', function(e){
        var self = $(this);
        // Get the filename to display
        var fileName = self.val().split('\\').pop().split('/').pop();
        self.siblings('.current-file').text(fileName);
        // Activate the Import button
        if (fileName !== "") {
            $('#confirm-import').removeClass('disabled');
        }
        else {
            $('#confirm-import').addClass('disabled');
        }
    });
    
    $('#cancel-import').on('click', function(){
        $('.modal').hide();
        $('#modal-overlay').hide();
    });
});