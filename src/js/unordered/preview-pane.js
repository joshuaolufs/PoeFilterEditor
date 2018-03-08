$(document).ready(function(){
    // Preview item dragability
	$("#preview-text").draggable({
		containment: "parent"
	});
    
    // Cycle background image
	var images = ['./images/bkg_lookout.webp',
                  './images/bkg_graveyard.webp',
                  './images/bkg_dungeon.webp',
                  './images/bkg_desert.webp',
                  './images/bkg_alleyways.webp'],
		index  = 0,
		$top   = $('#preview-window');

	$top.css('background-image', 'url(' + images[index++] + ')');
	setInterval(function() {
		$top.animate({ opacity: 0 }, 500, function() {
			$top.css('background-image', 'url(' + images[index++] + ')');
			$top.animate({ opacity: 1 }, 300, function() {
				index = index % images.length;
			});
		});
	}, 10000);
    
    // Allow resizing of area
    $('#preview-window').resizable({
        handles: "s",
        autoHide: true,
        minHeight: 64,
        maxHeight: 320,
        resize: function(e, ui) {
            ui.size.width = ui.originalSize.width;
            // reposition example item
            var draggable = $('#preview-text');
            if (draggable.offset().top + draggable.outerHeight() > ui.element.offset().top + ui.size.height) {
                draggable.offset({
                    top: ui.element.offset().top + ui.size.height - draggable.outerHeight(),
                    left: draggable.offset().left
                });
            }
        }
    });
    
    // Text updating
    $("#preview-text-input").val($("#preview-text").text());
    $(document).on("click", "#preview-text-input", function(){
        $(this).select()
    });
    $(document).on("blur", "#preview-text-input", function(){
        $("#preview-text").text($(this).val());
    });
    $(document).on("keydown", "#preview-text-input", function(e){
        var keyCode = e.keyCode || e.which;
        if (keyCode == 13) {
            $(this).blur();
        }
    });
});