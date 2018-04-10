//========== helper functions ==========
// split a line into tokens split at spaces not contained by double quotes
function tokenizeLine(lineIn) {
    var result = []
    var temp = lineIn.split('"');
    for (var i=0; i<temp.length; i++) {
        if (i%2 === 0) {
            if (temp[i].length > 0 && temp[i] !== " ") {
                result = result.concat(temp[i].trim().split(" "));
            }
        }
        else {
            result.push(temp[i].trim());
        }
    }
    return result;
}

// extend jQuery by adding this function that returns if the selector set is empty
$.fn.exists = function () {
    return this.length !== 0;
}

// decode html entities
function htmlDecode(input) {
    var temp = document.createElement('textarea');
    temp.innerHTML = input;
    return temp.value;
}

//========== update functions ==========
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
                    rule.sound.positional = false;
                    rule.sound.setId(tokens[1]);
                    rule.sound.setVolume(tokens[2]);
                }
                break;
            case 'PlayAlertSoundPositional':
                if (tokens.length > 2) {
                    rule.sound.positional = true;
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
            case '#!':
                if (tokens[1] === "Rule:") {
                    rule.name = tokens.slice(2).join(" ");
                }
                else {
                    rule.comments.push(lines[i].substring(2).trim());
                }
                break;
            default:
                break;
        }
    }
    console.log("   end updateModelFromCode");
}

function updateControlsFromModel() {
    console.log("   start updateControlsFromModel");
    
    // Theme stuff
    $("#styles-text-size>input[type='range']").val(rule.text.size);
    $("#styles-text-color>input[type='color']").spectrum('set', rule.text.getColor());
    $("#styles-background-color>input[type='color']").spectrum('set', rule.background.getColor());
    $("#styles-border-color>input[type='color']").spectrum('set', rule.border.getColor());
    $("#styles-sound-volume>input[type='range']").val(rule.sound.volume);
    
    $("#styles-sound-positional>.checkbox").removeClass('checked');
    if (rule.sound.positional) {
        $("#styles-sound-positional>.checkbox").addClass('checked');
    }
    
    $(".sound").removeClass('selected');
    if (rule.sound.volume > 0) {
        $(".sound:nth-child(" + rule.sound.id + ")").addClass('selected');
    }
    
    // Constraints stuff
    $('#constraints .radio-item.selected').removeClass('selected');
    // itemlevel
    $('#constraint-itemlevel .radio-item').each(function(num, e) {
        if($(e).text() === rule.itemlevel.operator) {
            $(e).addClass('selected');
        }
    });
    $('#constraint-droplevel>input').val(rule.droplevel.value == rule.droplevel.default.value ? "" : rule.droplevel.value);
    // droplevel
    $('#constraint-droplevel .radio-item').each(function(num, e) {
        if($(e).text() === rule.droplevel.operator) {
            $(e).addClass('selected');
        }
    });
    $('#constraint-droplevel>input').val(rule.droplevel.value == rule.droplevel.default.value ? "" : rule.droplevel.value);
    // rarity
    $('#constraint-rarity .radio-item').each(function(num, e) {
        if($(e).text() === rule.rarity.operator) {
            $(e).addClass('selected');
        }
    });
    $('#constraint-rarity>input').val(rule.rarity.value == rule.rarity.default.value ? "" : rule.rarity.value);
    // quality
    $('#constraint-quality .radio-item').each(function(num, e) {
        if($(e).text() === rule.quality.operator) {
            $(e).addClass('selected');
        }
    });
    $('#constraint-quality>input').val(rule.quality.value == rule.quality.default.value ? "" : rule.quality.value);
    // sockets
    $('#constraint-sockets .radio-item').each(function(num, e) {
        if($(e).text() === rule.sockets.operator) {
            $(e).addClass('selected');
        }
    });
    $('#constraint-sockets>input').val(rule.sockets.value == rule.sockets.default.value ? "" : rule.sockets.value);
    // linkedsockets
    $('#constraint-linkedsockets .radio-item').each(function(num, e) {
        if($(e).text() === rule.linkedsockets.operator) {
            $(e).addClass('selected');
        }
    });
    $('#constraint-linkedsockets>input').val(rule.linkedsockets.value == rule.linkedsockets.default.value ? "" : rule.linkedsockets.value);
    // socketgroup
    $('#constraint-socketgroup>input').val(rule.socketgroup.value == rule.socketgroup.default.value ? "" : rule.socketgroup.value);
    // width
    $('#constraint-width .radio-item').each(function(num, e) {
        if($(e).text() === rule.width.operator) {
            $(e).addClass('selected');
        }
    });
    $('#constraint-width>input').val(rule.width.value == rule.width.default.value ? "" : rule.width.value);
    // height
    $('#constraint-height .radio-item').each(function(num, e) {
        if($(e).text() === rule.height.operator) {
            $(e).addClass('selected');
        }
    });
    $('#constraint-height>input').val(rule.height.value == rule.height.default.value ? "" : rule.height.value);
    // shaperitem
    $('#constraint-shaperitem .radio-item').each(function(num, e) {
        if($(e).text() === rule.shaperitem.value) {
            $(e).addClass('selected');
        }
    });
    // elderitem
    $('#constraint-elderitem .radio-item').each(function(num, e) {
        if($(e).text() === rule.elderitem.value) {
            $(e).addClass('selected');
        }
    });
    // identified
    $('#constraint-identified .radio-item').each(function(num, e) {
        if($(e).text() === rule.identified.value) {
            $(e).addClass('selected');
        }
    });
    // corrupted
    $('#constraint-corrupted .radio-item').each(function(num, e) {
        if($(e).text() === rule.corrupted.value) {
            $(e).addClass('selected');
        }
    });
    
    // Keyword stuff
    $('#keyword-display').empty();
    for (var i=0; i<rule.classes.list.length; i++) {
        $('#keyword-display').prepend("<span class='class-item keyword-item'>" + rule.classes.list[i] + "<i class='fa fa-fw fa-times-circle'></i></span>")
    }
    for (var i=0; i<rule.basetypes.list.length; i++) {
        $('#keyword-display').append("<span class='basetype-item keyword-item'>" + rule.basetypes.list[i] + "<i class='fa fa-fw fa-times-circle'></i></span>")
    }
    
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
    rule.itemlevel.operator = htmlDecode($("#constraint-itemlevel .radio-item.selected").text());
    rule.itemlevel.setValue($("#constraint-itemlevel input").val());
    rule.droplevel.operator = htmlDecode($("#constraint-droplevel .radio-item.selected").text());
    rule.droplevel.setValue($("#constraint-droplevel input").val());
    rule.quality.operator = htmlDecode($("#constraint-quality .radio-item.selected").text());
    rule.quality.setValue($("#constraint-quality input").val());
    rule.sockets.operator = htmlDecode($("#constraint-sockets .radio-item.selected").text());
    rule.sockets.setValue($("#constraint-sockets select").val());
    rule.linkedsockets.operator = htmlDecode($("#constraint-linkedsockets .radio-item.selected").text());
    rule.linkedsockets.setValue($("#constraint-linkedsockets select").val());
    rule.height.operator = htmlDecode($("#constraint-height .radio-item.selected").text());
    rule.height.setValue($("#constraint-height select").val());
    rule.width.operator = htmlDecode($("#constraint-width .radio-item.selected").text());
    rule.width.setValue($("#constraint-width select").val());
    rule.rarity.operator = htmlDecode($("#constraint-rarity .radio-item.selected").text());
    rule.rarity.value = $("#constraint-rarity select").val() || "";
    rule.shaperitem.value = $("#constraint-shaperitem .radio-item.selected").text();
    rule.elderitem.value = $("#constraint-elderitem .radio-item.selected").text();
    rule.identified.value = $("#constraint-identified .radio-item.selected").text();
    rule.corrupted.value = $("#constraint-corrupted .radio-item.selected").text();
    rule.socketgroup.value = $("#constraint-socketgroup input").val();
    // Keyword stuff
    var classes = [];
    var basetypes = [];
    $(".keyword-item").each(function(){
        var self = $(this);
        if (self.hasClass('basetype-item')) {
            basetypes.push(self.text());
        }
        else if (self.hasClass('class-item')) {
            classes.push(self.text());
        }
    });
    rule.classes.list = classes;
    rule.basetypes.list = basetypes;
    
    console.log("   end updateModelFromControls");
}

function updateCodeFromModel(cm) {
    console.log("   start updateCodeFromModel");
    var code = rule.getFilterString();
    cm.setValue(code);
    console.log("   end updateCodeFromModel");
}



//========== onEvent functions for external use ==========

// we need a lock to prevent infinite loops when propagating changes
var changeInProgress = false; 

function onTreeSelect(cm) {
    if (!changeInProgress) {
        console.log("start onTreeSelect");
        changeInProgress = true; // lock

        updateCodeFromTree(cm);
        updateModelFromCode(cm);
        updateControlsFromModel();
        updateDisplayFromModel();

        changeInProgress = false; // unlock
        console.log("end onTreeSelect");
    }
}

function onCodeChange(cm) {
    if (!changeInProgress) {
        console.log("start onCodeChange");
        changeInProgress = true; // lock
        
        updateTreeFromCode(cm);
        updateModelFromCode(cm);
        updateControlsFromModel();
        updateDisplayFromModel();
        
        changeInProgress = false; // unlock
        console.log("end onCodeChange");
    }
}

function onControlChange(cm) {
    if (!changeInProgress) {
        console.log("start onControlChange");
        changeInProgress = true; // lock

        updateModelFromControls();
        updateCodeFromModel(cm);
        updateTreeFromCode(cm);
        updateDisplayFromModel();

        changeInProgress = false; // unlock
        console.log("end onControlChange");
    }
}


