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
		showButtons: true,
		maxSelectionSize: 64,
		hideAfterPaletteSelect: false,
		chooseText: "Select",
		localStorageKey: "spectrum.palette",
		preferredFormat: "rgb",
		palette: [
			["rgba(200, 200, 200, 255);", "rgba(136, 136, 255, 255);", "rgba(255, 255, 119, 255);", "rgba(175, 96, 37, 255);"],
			["rgba(27, 162, 155, 255);", "rgba(170, 158, 130, 255);", "rgba(74, 230, 58, 255);", "rgba(14, 186, 255, 255);"]
		],
		change: function(color) {
            //var temp = color.toRgbString().replace(/^.+\(|\)/g, '');
			onControlChange(editor);
            // update stuff when a color is picked
//			var temp = color.toRgbString().replace(/^.+\(|\)/g, '').split(", ");
//			if (temp.length > 3) {
//				temp[3] = Math.ceil(temp[3] * 255);
//			}else {
//				temp[temp.length] = 255;
//			}
//			textColor = temp;
//			updateTextValues();
//			updateDisplay();
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
            // update stuff when a color is picked
//			var temp = color.toRgbString().replace(/^.+\(|\)/g, '').split(", ");
//			if (temp.length > 3) {
//				temp[3] = Math.ceil(temp[3] * 255);
//			}else {
//				temp[temp.length] = 255;
//			}
//			backgroundColor = temp;
//			updateTextValues();
//			updateDisplay();
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
            // update stuff when a color is picked
//			var temp = color.toRgbString().replace(/^.+\(|\)/g, '').split(", ");
//			if (temp.length > 3) {
//				temp[3] = Math.ceil(temp[3] * 255);
//			}else {
//				temp[temp.length] = 255;
//			}
//			borderColor = temp;
//			updateTextValues();
//			updateDisplay();
        }
    });
    
    // checkbox functionality
    $(document).on("click", ".checkbox", function(){
        $(this).children('div').toggle();
        if ($(this).hasClass("checked")) {
            $(this).removeClass("checked");
        }
        else {
            $(this).addClass("checked");
        }
    });
    
    // sounds
    $(".sound").on("click", function() {
		$(this).siblings(".sound").removeClass("selected");
		$(this).addClass("selected");
		$(this).children("audio")[0].currentTime = 0;
		//$(this).children("audio")[0].volume = alertSound[1]/100; // must be in the range 0-1
		$(this).children("audio")[0].play();
	});
    
    // text size slider
    $("#styles-text-size").on("change input", function() {
        onControlChange(editor);
    });
    
    // volume slider
    $("#styles-sound-volume").on("change input", function() {
        onControlChange(editor);
    });
});