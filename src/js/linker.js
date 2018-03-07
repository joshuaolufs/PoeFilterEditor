// helper functions
function tokenizeLine(lineIn) {
    var result = []
    var temp = lineIn.split('"');
    for (var i=0; i<temp.length; i++) {
        if (i%2 === 0) {
            if (temp[i].length > 0) {
                result = result.concat(temp[i].trim().split(" "));
            }
        }
        else {
            result.push(temp[i]);
        }
    }
    return result;
}

// extend jQuery by adding this function that returns if the selector set is empty
$.fn.exists = function () {
    return this.length !== 0;
}

// update functions
function updateCodeFromTree(cm){
    console.log("   start updateCodeFromTree");
    if ($('#treeview .selected').hasClass('tv-rule')) {
        var code = $('.tv-rule.selected .tv-code').text();
        cm.setValue(code);
    }
    console.log("   end updateCodeFromTree");
}

function updateModelFromCode(cm) {
    console.log("   start updateModelFromCode");
    // reset defaults
    rule.reset();
    
    // get the settings from code input by parsing one line at a time
    var lines = cm.getValue('\n').split('\n');
    for (var i=0; i<lines.length; i++) {
        // the line is empty, abort processing this line
        if (lines[i].length === 0) {
            continue;
        }
        // parse the line contents
        var tokens = tokenizeLine(lines[i]);
        switch(tokens[0]) {
            case 'Show':
                rule.type = "Show";
                break;
            case 'Hide':
                rule.type = "Hide";
                break;
            case 'ItemLevel':
                if (tokens.length > 2) {
                    rule.itemlevel.operator = tokens[1];
                    rule.itemlevel.setValue(tokens[2]);
                }
                break;
            case 'DropLevel':
                if (tokens.length > 2) {
                    rule.droplevel.operator = tokens[1];
                    rule.droplevel.setValue(tokens[2]);
                }
                break;
            case 'Quality':
                if (tokens.length > 2) {
                    rule.quality.operator = tokens[1];
                    rule.quality.setValue(tokens[2]);
                }
                break;
            case 'Class':
                rule.classes.list = tokens;
                rule.classes.list.shift();
                break;
            case 'BaseType':
                rule.basetypes.list = tokens;
                rule.basetypes.list.shift();
                break;
            case 'SetBorderColor':
                if (tokens.length > 3) {
                    var colorString = "";
                    for (var j=1; j<tokens.length; j++) {
                        colorString = colorString + tokens[j] + " ";
                    }
                    rule.border.setColor(colorString);
                }
                break;
            case 'SetTextColor':
                if (tokens.length > 3) {
                    var colorString = "";
                    for (var j=1; j<tokens.length; j++) {
                        colorString = colorString + tokens[j] + " ";
                    }
                    rule.text.setColor(colorString);
                }
                break;
            case 'SetBackgroundColor':
                if (tokens.length > 3) {
                    var colorString = "";
                    for (var j=1; j<tokens.length; j++) {
                        colorString = colorString + tokens[j] + " ";
                    }
                    rule.background.setColor(colorString);
                }
                break;
            case 'PlayAlertSound':
                if (tokens.length > 2) {
                    rule.positional = false;
                    rule.sound.setId(tokens[1]);
                    rule.sound.setVolume(tokens[2]);
                }
                break;
            case 'PlayAlertSoundPositional':
                if (tokens.length > 2) {
                    rule.positional = true;
                    rule.sound.setId(tokens[1]);
                    rule.sound.setVolume(tokens[2]);
                }
                break;
            case 'SetFontSize':
                if (tokens.length > 1) {
                    rule.text.setSize(tokens[1]);
                }
                break;
            case 'Sockets':
                if (tokens.length > 2) {
                    rule.sockets.operator = tokens[1];
                    rule.sockets.setValue(tokens[2]);
                }
                break;
            case 'LinkedSockets':
                if (tokens.length > 2) {
                    rule.linkedsockets.operator = tokens[1];
                    rule.linkedsockets.setValue(tokens[2]);
                }
                break;
            case 'SocketGroup':
                if (tokens.length > 1) {
                    rule.socketgroup.value = tokens[1];
                }
                break;
            case 'Height':
                if (tokens.length > 2) {
                    rule.height.operator = tokens[1];
                    rule.height.setValue(tokens[2]);
                }
                break;
            case 'Width':
                if (tokens.length > 2) {
                    rule.width.operator = tokens[1];
                    rule.width.setValue(tokens[2]);
                }
                break;
            case 'Identified':
                if (tokens.length > 1) {
                    rule.identified.value = tokens[1];
                }
                break;
            case 'Corrupted':
                if (tokens.length > 1) {
                    rule.corrupted.value = tokens[1];
                }
                break;
            case 'ShaperItem':
                if (tokens.length > 1) {
                    rule.shaperitem.value = tokens[1];
                }
                break;
            case 'ElderItem':
                if (tokens.length > 1) {
                    rule.elderitem.value = tokens[1];
                }
                break;
            case 'Rarity':
                if (tokens.length === 3) {
                    rule.rarity.operator = tokens[1];
                    rule.rarity.value = tokens[2];
                }
                else if (tokens.length === 2) {
                    rule.rarity.operator = "=";
                    rule.rarity.value = tokens[1];
                }
            case '#!rule':
                rule.name = lines[i].substring(6).trim();
                break;
            case '#':
                rule.comment = lines[i].substring(1).trim();
                break;
            default:
                break;
        }
    }
    console.log("   end updateModelFromCode");
}

function updateControlsFromModel() {
    console.log("   start updateControlsFromModel");
    console.log("   end updateControlsFromModel");
}

function updateDisplayFromModel() {
    console.log("   start updateDisplayFromModel");
    $("#preview-text").css({
        'font-size': Math.round(rule.text.size / 2) + "px",
        'color': rule.text.getColor(),
        'background-color': rule.background.getColor(),
        'border-color': rule.border.getColor()
    });
    console.log("   end updateDisplayFromModel");
}

function updateTreeFromCode(cm) {
    console.log("   start updateTreeFromCode");
    if ($('#treeview .selected').hasClass('tv-rule')) {
        // get the raw code
        var lines = cm.getValue('\n').split('\n');
        var foundName = false;
        var code = "";
        for (var i=0; i<lines.length; i++) {
            if (lines[i].includes("#!rule")) {
                $('.tv-rule.selected .tv-label').text(lines[i].substring(7));
            }
            code = code + "\n" + lines[i];
        }
        $('.tv-rule.selected .tv-code').text(code.trim());
    }
    console.log("   end updateTreeFromCode");
}

function updateModelFromControls() {
    console.log("   start updateModelFromControls");
    
    // Theme stuff
    rule.text.setSize($('#styles-text-size>input[type="range"]').val());
    rule.text.setColor($("#styles-text-color>input[type='color']").spectrum('get').toRgbString().replace(/^.+\(|\)/g, ''));
    rule.background.setColor($("#styles-background-color>input[type='color']").spectrum('get').toRgbString().replace(/^.+\(|\)/g, ''));
    rule.border.setColor($("#styles-border-color>input[type='color']").spectrum('get').toRgbString().replace(/^.+\(|\)/g, ''));
    rule.sound.setVolume($('#styles-sound-volume>input[type="range"]').val());
    rule.sound.setId($('.sound.selected').text());
    rule.sound.positional = $("#styles-sound-positional>.checkbox").hasClass("checked") ? true : false;
    console.log("positional: " + rule.sound.positional);
    // Constraints stuff
    
    console.log("   end updateModelFromControls");
}

function updateCodeFromModel(cm) {
    console.log("   start updateCodeFromModel");
    var code = rule.getFilterString();
    cm.setValue(code);
    console.log("   end updateCodeFromModel");
}



// onEvent functions for external use

// we need a lock to prevent infinite loops with onCodeChange
// it is tested in the editor.on("change", ...) event handler
var changeInProgress = false; 

function onTreeSelect(cm) {
    console.log("start onTreeSelect");
    changeInProgress = true; // lock

    updateCodeFromTree(cm);
    updateModelFromCode(cm);
    updateControlsFromModel();
    updateDisplayFromModel();

    changeInProgress = false; // unlock
    console.log("end onTreeSelect");
}

function onCodeChange(cm) {
    console.log("start onCodeChange");
    updateTreeFromCode(cm);
    updateModelFromCode(cm);
    updateControlsFromModel();
    updateDisplayFromModel();
    console.log("end onCodeChange");
}

function onControlChange(cm) {
    console.log("start onControlChange");
    changeInProgress = true; // lock

    updateModelFromControls();
    updateCodeFromModel(cm);
    updateTreeFromCode(cm);
    updateDisplayFromModel();

    changeInProgress = false; // unlock
    console.log("end onControlChange");
}


