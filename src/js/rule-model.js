function clamp(val, min, max) {
    return Math.min(Math.max(min, val), max);
}
var rule = {
    name: "",
    comment: "",
    type: "Show",
    text: {
        default: {
            size: 32,
            color: "127 127 127"
        },
        size: 32,
        color: {
            r: 127,
            g: 127,
            b: 127,
            a: 255,
            toString: function() {
                if (this.a === 255) {
                    return this.r + " " + this.g + " " + this.b;
                }
                else {
                    return this.r + " " + this.g + " " + this.b + " " + this.a;
                }
            }
        },
        getFilterString: function() {
            var colorString = "";
            var sizeString = "";
            if (this.default.color != this.color.toString()) {
                colorString = "SetTextColor " + this.color.toString() + "\n";
            } 
            if (this.default.size != this.size) {
                sizeString = "SetFontSize " + this.size + "\n";
            }
            return sizeString + colorString;
        },
        getColor: function() {
            if (this.color.a == 255) {
                return "rgb(" + this.color.r + "," + this.color.g + "," + this.color.b + ")";
            }
            else {
                return "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + (this.color.a / 255) + ")";
            }
        },
        setSize: function(sizeIn) {
            if (typeof sizeIn === 'number') {
                this.size = clamp(sizeIn, 18, 45);
                return true;
            }
            else if (typeof sizeIn === 'string') {
                var temp = Number(sizeIn);
                if (temp) {
                    this.size = clamp(temp, 18, 45);
                    return true;
                }
            }
            // else
            return false;
        },
        setColor: function(colorIn) {
            if (typeof colorIn === 'string') {
                var temp = colorIn.replace(/,/g, "").trim().split(" ");
                if (temp.length >= 3 && temp.length <= 4) {
                    if (typeof Number(temp[0]) === 'number' && typeof Number(temp[1]) === 'number' && typeof Number(temp[2]) === 'number') {
                        this.color.r = clamp(Number(temp[0]), 0, 255);
                        this.color.g = clamp(Number(temp[1]), 0, 255);
                        this.color.b = clamp(Number(temp[2]), 0, 255);

                        if (temp.length === 4) {
                            var alpha = Number(temp[3]);
                            if (typeof alpha === 'number') {
                                if (alpha > 1) {
                                    this.color.a = clamp(Math.round(alpha), 0, 255);
                                }
                                else {
                                    this.color.a = clamp(Math.round(alpha * 255), 0, 255);
                                }
                            }
                            else {
                                return false;
                            }
                        }
                        else {
                            this.color.a = 255;
                        }
                        return true;
                    }
                }
            }
            // else
            return false;
        },
        reset: function() {
            this.setColor(this.default.color);
            this.setSize(this.default.size);
        }
    },
    border: {
        default: {
            color: "127 127 127 0"
        },
        color: {
            r: 127,
            g: 127,
            b: 127,
            a: 0,
            toString: function() {
                if (this.a === 255) {
                    return this.r + " " + this.g + " " + this.b;
                }
                else {
                    return this.r + " " + this.g + " " + this.b + " " + this.a;
                }
            }
        },
        getFilterString: function() {
            if (this.default.color != this.color.toString()) {
                return "SetBorderColor " + this.color.toString() + "\n";
            } 
            // else
            return "";
        },
        getColor: function() {
            if (this.color.a == 255) {
                return "rgb(" + this.color.r + "," + this.color.g + "," + this.color.b + ")";
            }
            else {
                return "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + (this.color.a / 255) + ")";
            }
        },
        setColor: function(colorIn) {
            if (typeof colorIn === 'string') {
                var temp = colorIn.replace(/,/g, "").trim().split(" ");
                if (temp.length >= 3 && temp.length <= 4) {
                    if (typeof Number(temp[0]) === 'number' && typeof Number(temp[1]) === 'number' && typeof Number(temp[2]) === 'number') {
                        this.color.r = clamp(Number(temp[0]), 0, 255);
                        this.color.g = clamp(Number(temp[1]), 0, 255);
                        this.color.b = clamp(Number(temp[2]), 0, 255);

                        if (temp.length === 4) {
                            var alpha = Number(temp[3]);
                            if (typeof alpha === 'number') {
                                if (alpha > 1) {
                                    this.color.a = clamp(Math.round(alpha), 0, 255);
                                }
                                else {
                                    this.color.a = clamp(Math.round(alpha * 255), 0, 255);
                                }
                            }
                            else {
                                return false;
                            }
                        }
                        else {
                            this.color.a = 255;
                        }
                        return true;
                    }
                }
            }
            // else
            return false;
        },
        reset: function() {
            this.setColor(this.default.color);
        }
    },
    background: {
        default: {
            color: "0 0 0 128"
        },
        color: {
            r: 0,
            g: 0,
            b: 0,
            a: 128,
            toString: function() {
                if (this.a === 255) {
                    return this.r + " " + this.g + " " + this.b;
                }
                else {
                    return this.r + " " + this.g + " " + this.b + " " + this.a;
                }
            }
        },
        getFilterString: function() {
            if (this.default.color != this.color.toString()) {
                return "SetBackgroundColor " + this.color.toString() + "\n";
            } 
            // else
            return "";
        },
        getColor: function() {
            if (this.color.a == 255) {
                return "rgb(" + this.color.r + "," + this.color.g + "," + this.color.b + ")";
            }
            else {
                return "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + (this.color.a / 255) + ")";
            }
        },
        setColor: function(colorIn) {
            if (typeof colorIn === 'string') {
                var temp = colorIn.replace(/,/g, "").trim().split(" ");
                if (temp.length >= 3 && temp.length <= 4) {
                    if (typeof Number(temp[0]) === 'number' && typeof Number(temp[1]) === 'number' && typeof Number(temp[2]) === 'number') {
                        this.color.r = clamp(Number(temp[0]), 0, 255);
                        this.color.g = clamp(Number(temp[1]), 0, 255);
                        this.color.b = clamp(Number(temp[2]), 0, 255);

                        if (temp.length === 4) {
                            var alpha = Number(temp[3]);
                            if (typeof alpha === 'number') {
                                if (alpha > 1) {
                                    this.color.a = clamp(Math.round(alpha), 0, 255);
                                }
                                else {
                                    this.color.a = clamp(Math.round(alpha * 255), 0, 255);
                                }
                            }
                            else {
                                return false;
                            }
                        }
                        else {
                            this.color.a = 255;
                        }
                        return true;
                    }
                }
            }
            // else
            return false;
        },
        reset: function() {
            this.setColor(this.default.color);
        }
    },
    sound: {
        default: {
            positional: false,
            volume: 0,
            id: 1
        },
        positional: false,
        volume: 0,
        id: 1,
        setId: function(idIn) {
            if (typeof idIn === 'number') {
                this.id = clamp(idIn, 1, 16);
                return true;
            }
            else if (typeof idIn === 'string') {
                if (typeof Number(idIn) === 'number') {
                    this.id = clamp(Number(idIn), 1, 16);
                    return true;
                }
            }
            return false;
        },
        setVolume: function(volumeIn) {
            if (typeof volumeIn === 'number') {
                this.volume = clamp(volumeIn, 0, 300);
                return true;
            }
            else if (typeof volumeIn === 'string') {
                if (typeof Number(volumeIn) === 'number') {
                    this.volume = clamp(Number(volumeIn), 0, 300);
                    return true;
                }
            }
            return false;
        },
        getFilterString: function() {
            if (this.volume > 0) {
                if (this.positional) {
                    return "PlayAlertSoundPositional " + this.id + " " + this.volume + "\n";
                }
                else {
                    return "PlayAlertSound " + this.id + " " + this.volume + "\n";
                }
            }
            return "";
        },
        reset: function() {
            this.positional = this.default.positional;
            this.volume = this.default.volume;
            this.id = this.default.id;
        }
    },
    classes: {
        list: [],
        getFilterString: function() {
            if (this.list.length > 0) {
                var temp = ""
                for (var i=0; i<this.list.length; i++) {
                    if (i > 0) {
                        temp = temp + " ";
                    }
                    temp = temp + '"' + this.list[i] + '"';
                }
                return "Class " + temp + "\n";
            }
            else {
                return "";
            }
        },
        reset: function() {
            this.list = [];
        }
    },
    basetypes: {
        list: [],
        getFilterString: function() {
            if (this.list.length > 0) {
                var temp = ""
                for (var i=0; i<this.list.length; i++) {
                    if (i > 0) {
                        temp = temp + " ";
                    }
                    temp = temp + '"' + this.list[i] + '"';
                }
                return "BaseType " + temp + "\n";
            }
            else {
                return "";
            }
        },
        reset: function() {
            this.list = [];
        }
    },
    itemlevel: {
        default: {
            value: 0,
            operator: "="
        },
        value: 0,
        operator: "=",
        getFilterString: function() {
            if (this.value !== this.default.value) {
                return "ItemLevel " + this.operator + " " + this.value + "\n";
            }
            else {
                return "";
            }
        },
        setValue: function(valueIn) {
            if (typeof valueIn === 'number') {
                this.value = clamp(valueIn, 0, 100);
                return true;
            }
            else if (typeof valueIn === 'string') {
                if (typeof Number(valueIn) === 'number') {
                    this.value = clamp(Number(valueIn), 0, 100);
                    return true;
                }
            }
            return false;
        },
        reset: function() {
            this.value = this.default.value;
            this.operator = this.default.operator;
        }
    },
    droplevel: {
        default: {
            value: 0,
            operator: "="
        },
        value: 0,
        operator: "=",
        getFilterString: function() {
            if (this.value !== this.default.value) {
                return "DropLevel " + this.operator + " " + this.value + "\n";
            }
            else {
                return "";
            }
        },
        setValue: function(valueIn) {
            if (typeof valueIn === 'number') {
                this.value = clamp(valueIn, 0, 100);
                return true;
            }
            else if (typeof valueIn === 'string') {
                if (typeof Number(valueIn) === 'number') {
                    this.value = clamp(Number(valueIn), 0, 100);
                    return true;
                }
            }
            return false;
        },
        reset: function() {
            this.value = this.default.value;
            this.operator = this.default.operator;
        }
    },
    quality: {
        default: {
            value: 0,
            operator: "="
        },
        value: 0,
        operator: "=",
        getFilterString: function() {
            if (this.value != this.default.value) {
                return "Quality " + this.operator + " " + this.value + "\n";
            }
            else {
                return "";
            }
        },
        setValue: function(valueIn) {
            if (typeof valueIn === 'number') {
                this.value = clamp(valueIn, 0, 20);
                return true;
            }
            else if (typeof valueIn === 'string') {
                if (typeof Number(valueIn) === 'number') {
                    this.value = clamp(Number(valueIn), 0, 20);
                    return true;
                }
            }
            return false;
        },
        reset: function() {
            this.value = this.default.value;
            this.operator = this.default.operator;
        }
    },
    sockets: {
        default: {
            value: 0,
            operator: "="
        },
        value: 0,
        operator: "=",
        getFilterString: function() {
            if (this.value != this.default.value) {
                return "Sockets " + this.operator + " " + this.value + "\n";
            }
            else {
                return "";
            }
        },
        setValue: function(valueIn) {
            if (typeof valueIn === 'number') {
                this.value = clamp(valueIn, 1, 6);
                return true;
            }
            else if (typeof valueIn === 'string') {
                if (typeof Number(valueIn) === 'number') {
                    this.value = clamp(Number(valueIn), 1, 6);
                    return true;
                }
            }
            return false;
        },
        reset: function() {
            this.value = this.default.value;
            this.operator = this.default.operator;
        }
    },
    linkedsockets: {
        default: {
            value: 0,
            operator: "="
        },
        value: 0,
        operator: "=",
        getFilterString: function() {
            if (this.value != this.default.value) {
                return "LinkedSockets " + this.operator + " " + this.value + "\n";
            }
            else {
                return "";
            }
        },
        setValue: function(valueIn) {
            if (typeof valueIn === 'number') {
                this.value = clamp(valueIn, 1, 6);
                return true;
            }
            else if (typeof valueIn === 'string') {
                if (typeof Number(valueIn) === 'number') {
                    this.value = clamp(Number(valueIn), 1, 6);
                    return true;
                }
            }
            return false;
        },
        reset: function() {
            this.value = this.default.value;
            this.operator = this.default.operator;
        }
    },
    height: {
        default: {
            value: 0,
            operator: "="
        },
        value: 0,
        operator: "=",
        getFilterString: function() {
            if (this.value != this.default.value) {
                return "Height " + this.operator + " " + this.value + "\n";
            }
            else {
                return "";
            }
        },
        setValue: function(valueIn) {
            if (typeof valueIn === 'number') {
                this.value = clamp(valueIn, 1, 4);
                return true;
            }
            else if (typeof valueIn === 'string') {
                if (typeof Number(valueIn) === 'number') {
                    this.value = clamp(Number(valueIn), 1, 4);
                    return true;
                }
            }
            return false;
        },
        reset: function() {
            this.value = this.default.value;
            this.operator = this.default.operator;
        }
    },
    width: {
        default: {
            value: 0,
            operator: "="
        },
        value: 0,
        operator: "=",
        getFilterString: function() {
            if (this.value != this.default.value) {
                return "Width " + this.operator + " " + this.value + "\n";
            }
            else {
                return "";
            }
        },
        setValue: function(valueIn) {
            if (typeof valueIn === 'number') {
                this.value = clamp(valueIn, 1, 2);
                return true;
            }
            else if (typeof valueIn === 'string') {
                if (typeof Number(valueIn) === 'number') {
                    this.value = clamp(Number(valueIn), 1, 2);
                    return true;
                }
            }
            return false;
        },
        reset: function() {
            this.value = this.default.value;
            this.operator = this.default.operator;
        }
    },
    socketgroup: {
        default: {
            value: ""
        },
        value: "",
        getFilterString: function() {
            if (this.value != this.default.value) {
                return "SocketGroup " + this.value + "\n";
            }
            else {
                return "";
            }
        },
        reset: function() {
            this.value = this.default.value;
        }
    },
    rarity: {
        default: {
            value: "",
            operator: "="
        },
        value: "",
        operator: "=",
        getFilterString: function() {
            if (this.value != this.default.value) {
                return "Rarity " + this.operator + " " + this.value + "\n";
            }
            else {
                return "";
            }
        },
        reset: function() {
            this.value = this.default.value;
            this.operator = this.default.operator;
        }
    },
    identified: {
        default: {
            value: null
        },
        value: null,
        getFilterString: function() {
            if (this.value !== this.default.value) {
                return "Identified " + this.value + "\n";
            }
            else {
                return "";
            }
        },
        reset: function() {
            this.value = null;
        }
    },
    corrupted: {
        default: {
            value: null
        },
        value: null,
        getFilterString: function() {
            if (this.value !== this.default.value) {
                return "Corrupted " + this.value + "\n";
            }
            else {
                return "";
            }
        },
        reset: function() {
            this.value = null;
        }
    },
    shaperitem: {
        default: {
            value: null
        },
        value: null,
        getFilterString: function() {
            if (this.value !== this.default.value) {
                return "ShaperItem " + this.value + "\n";
            }
            else {
                return "";
            }
        },
        reset: function() {
            this.value = null;
        }
    },
    elderitem: {
        default: {
            value: null
        },
        value: null,
        getFilterString: function() {
            if (this.value !== this.default.value) {
                return "ElderItem " + this.value + "\n";
            }
            else {
                return "";
            }
        },
        reset: function() {
            this.value = null;
        }
    },
    reset: function()  {
        // reset defaults
        this.name = "";
        this.comment = "";
        this.type = "Show";
        this.text.reset();
        this.border.reset();
        this.background.reset();
        this.sound.reset();
        this.classes.reset();
        this.basetypes.reset();
        this.itemlevel.reset();
        this.droplevel.reset();
        this.quality.reset();
        this.sockets.reset();
        this.linkedsockets.reset();
        this.height.reset();
        this.width.reset();
        this.socketgroup.reset();
        this.rarity.reset();
        this.identified.reset();
        this.corrupted.reset();
        this.shaperitem.reset();
        this.elderitem.reset();
    },
    getFilterString: function() {
        var output = "";
        
        output += "#!rule " + this.name + "\n";
        if (this.comment.length > 0) {
            output += "# " + this.comment + "\n";
        }
        output += this.type + "\n";
        output += this.classes.getFilterString();
        output += this.basetypes.getFilterString();
        output += this.itemlevel.getFilterString();
        output += this.droplevel.getFilterString();
        output += this.quality.getFilterString();
        output += this.rarity.getFilterString();
        output += this.sockets.getFilterString();
        output += this.linkedsockets.getFilterString();
        output += this.socketgroup.getFilterString();
        output += this.width.getFilterString();
        output += this.height.getFilterString();
        output += this.identified.getFilterString();
        output += this.corrupted.getFilterString();
        output += this.shaperitem.getFilterString();
        output += this.elderitem.getFilterString();
        output += this.text.getFilterString();
        output += this.background.getFilterString();
        output += this.border.getFilterString();
        output += this.sound.getFilterString();
        
        return output.trim();
    }
}