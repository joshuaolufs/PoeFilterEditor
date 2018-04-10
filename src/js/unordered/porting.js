$(document).ready(function(){
    // import filter
    $('#confirm-import').on('click', function(){
        // abort if the button is disabled
        if ($(this).hasClass('disabled')){
            return;
        }
        
        // abort if the browser doesn't support the needed file functions
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            alert('The File APIs are not fully supported in this browser.');
            return;
        }  
        
        var fileInput = document.getElementById('import-file-input');
        var fileList;
        if ('files' in fileInput) {
            if (fileInput.files.length > 0) {
                fileList = fileInput.files;
            }
            else {
                alert("no file selected.");
            }
        }
        else {
            alert("files property not supported.");
        }
        
        
        var reader = new FileReader();
        var fileIn = fileList[0];

        reader.onload = parseFilter;

        reader.readAsText(fileIn);
        
        function parseFilter() {
            console.log("debug - start parsing filter");
            var filterText = reader.result;
            var lines = filterText.split("\n");
            var openRule = false;
            var result =    "<div class='tv-filter sortableTarget'>\
                                <div class='tv-handle'>\
                                    <div class='tv-expandable tv-expanded'><i class='fa fa-fw fa-minus-square'></i></div>\
                                    <div class='tv-label'>New Filter</div>\
                                </div>";
            
            var filterName = "Unknown";
            var authors = "Unknown";
            var version = "Unknown";
            var description = "";
            var groupName = "Unnamed Group";
            var ruleName = "Unnamed Rule";
            console.log("debug - " + lines.length + " lines found");
            
            for (var i=0; i<lines.length; i++) {
                var lineTokens = tokenizeLine(lines[i].trim());
                
                if (lineTokens[0] === "#!") {
                    switch (lineTokens[1]) {
                        case "Name:":
                            console.log("debug - " + "processing filter name");
                            filterName = lineTokens.slice(2).join(" ");
                            result = result.replace("New Filter", filterName);
                            break;
                        case "Authors:":
                            console.log("debug - " + "processing authors");
                            authors = lineTokens.slice(2).join(" ");
                            break;
                        case "Version:":
                            version = lineTokens.slice(2).join(" ");
                            break;
                        case "Description:":
                            description = lineTokens.slice(2).join(" ");
                            break;
                        case "Group:":
                            if (openRule) {
                                console.log("debug - " + "closing rule");
                                result += "</pre></div>";
                                openRule = false;
                            }
                            console.log("debug - " + "opening group");
                            groupName = lineTokens.slice(2).join(" ");
                            // insert group html here
                            result +=   "<div class='tv-group sortableTarget'>\
                                            <div class='tv-handle'>\
                                                <div class='tv-expandable tv-expanded'><i class='fa fa-fw fa-minus-square'></i></div>\
                                                <div class='tv-label'>" + groupName + "</div>\
                                            </div>";
                            break;
                        case "Rule:":
                            if (openRule) {
                                console.log("debug - " + "closing rule");
                                result += "</pre></div>";
                                openRule = false;
                            }
                            console.log("debug - " + "opening rule");
                            ruleName = lineTokens.slice(2).join(" ");
                            // insert rule html here
                            result +=   "<div class='tv-rule'>\
                                            <div class='tv-handle'>\
                                                <div class='tv-label'>" + ruleName + "</div>\
                                            </div>\
                                            <pre class='tv-code'>#! Rule: New Rule\n";
                            openRule = true;
                            break;
                        case "End:":
                            if (openRule) {
                                console.log("debug - " + "closing rule");
                                result += "</pre></div>";
                                openRule = false;
                            }
                            console.log("debug - " + "closing group");
                            filterName = lineTokens.slice(2).join(" ");
                            // insert end group html here
                            result += "</div>";
                            break;
                        default:
                            // add this to comments list
                            break;
                    }
                }
                else {
                    // add these lines to the html since this must be rule code
                    // in the future I may syntax check this
                }
            }
            // insert the generated html into the treeview
            if (openRule) {
                console.log("debug - " + "closing rule");
                result += "</pre></div>";
                openRule = false;
            }
            result += "</div>";
            console.log(result);
            
            // inject the filter tree into the treeview
            $('#treeview').append(result);
            
            // Refresh sorting
            $(".sortableTarget").sortable({
                connectWith: ".sortableTarget",
                handle: ".tv-handle>.tv-label",
                axis: "y",
                items: ">.tv-group, >.tv-rule",
                helper: "clone"
            });
            
            // exit the modal
            $('#modal-overlay').hide();
            $('#modal-import').hide();
        }
    });
});