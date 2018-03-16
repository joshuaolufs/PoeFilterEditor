$(document).ready(function(){
    // Text color picker
	$("#styles-text-color>input[type='color']").spectrum({
        color: '#7f7f7f',
		showInput: true,
		showInitial: true,
		allowEmpty: true,
		showAlpha: true,
		showPalette: true,
		showSelectionPalette: true,
		//clickoutFiresChange: false,
		showButtons: false,
		maxSelectionSize: 64,
		hideAfterPaletteSelect: true,
		chooseText: "Select",
		localStorageKey: "spectrum.palette",
		preferredFormat: "rgb",
		palette: [
			["rgba(200, 200, 200, 255);", "rgba(136, 136, 255, 255);", "rgba(255, 255, 119, 255);", "rgba(175, 96, 37, 255);"],
			["rgba(27, 162, 155, 255);", "rgba(170, 158, 130, 255);", "rgba(74, 230, 58, 255);", "rgba(14, 186, 255, 255);"]
		],
		change: function(color) {
			onControlChange(editor);
		}
	});
	
	// Background color picker
	$("#styles-background-color>input[type='color']").spectrum({
        color: 'rgba(0, 0, 0, .5)',
		showInput: true,
		showInitial: true,
		allowEmpty: true,
		showAlpha: true,
		showPalette: true,
		showSelectionPalette: true,
		//clickoutFiresChange: false,
		showButtons: false,
		maxSelectionSize: 64,
		hideAfterPaletteSelect: true,
		chooseText: "Select",
		localStorageKey: "spectrum.bkg-palette",
		preferredFormat: "rgb",
		palette: [
			["rgba(200, 200, 200, 255);", "rgba(136, 136, 255, 255);", "rgba(255, 255, 119, 255);", "rgba(175, 96, 37, 255);"],
			["rgba(27, 162, 155, 255);", "rgba(170, 158, 130, 255);", "rgba(74, 230, 58, 255);", "rgba(14, 186, 255, 255);"]
		],
		change: function(color) {
            onControlChange(editor);
		}
	});
	
	// Border color picker
	$("#styles-border-color>input[type='color']").spectrum({
        color: 'rgba(127, 127, 127, 0)',
		showInput: true,
		showInitial: true,
		allowEmpty: true,
		showAlpha: true,
		showPalette: true,
		showSelectionPalette: true,
		//clickoutFiresChange: false,
		showButtons: false,
		maxSelectionSize: 64,
		hideAfterPaletteSelect: true,
		chooseText: "Select",
		localStorageKey: "spectrum.palette",
		preferredFormat: "rgb",
		palette: [
			["rgba(200, 200, 200, 255);", "rgba(136, 136, 255, 255);", "rgba(255, 255, 119, 255);", "rgba(175, 96, 37, 255);"],
			["rgba(27, 162, 155, 255);", "rgba(170, 158, 130, 255);", "rgba(74, 230, 58, 255);", "rgba(14, 186, 255, 255);"]
		],
		change: function(color) {
            onControlChange(editor);
        }
    });
    
    // checkbox functionality
    $(document).on("click", ".checkbox", function(){
        $(this).toggleClass('checked');
        onControlChange(editor);
    });
    
    // sounds
    $(".sound").on("click", function() {
		$(this).siblings(".sound").removeClass("selected");
		$(this).addClass("selected");
		$(this).children("audio")[0].currentTime = 0;
        $(this).children("audio")[0].volume = clamp($("#styles-sound-volume>input[type='range']").val() / 300, 0, 1); // must be in the range 0-1
		$(this).children("audio")[0].play();
        onControlChange(editor);
	});
    
    // text size slider
    $("#styles-text-size").on("change input", function() {
        onControlChange(editor);
    });
    
    // volume slider
    $("#styles-sound-volume>input[type='range']").on("change input", function() {
        if ($(this).val() === '0') { // if the volume is 0
            // deselect all audio buttons
            $(".sound.selected").removeClass("selected");
        }
        else if (!$(".sound.selected").exists()) {
            // make sure something is selected
            $(".sound:first-child").addClass("selected");
        }
        onControlChange(editor);
    });
});