$(document).ready(function(){
    
    function updateTreeviewMenu() {
        var current = $('#treeview .selected');
        if ($(current).hasClass('tv-filter') || $(current).hasClass('tv-group')) {
            $("#tv-menu .menu-item").removeClass("disabled");
        }
        else if ($(current).hasClass('tv-rule')) {
            $("#tv-menu .menu-item").removeClass("disabled");
            $("#tv-menu-new-group").addClass("disabled");
        }
    }

    $("#tv-delete-confirmation, #tv-label-input").hide();
    var icons = {
        expand:'fa-plus-square',
        collapse:'fa-minus-square',
        menu:'fa-bars',
        sort:'fa-sort',
        sortUp:'fa-sort-up',
        sortDown:'fa-sort-down',
        copy:'fa-clone',
        newFilter:'fa-file',
        newGroup:'fa-folder-open',
        newRule:'fa-plus',
        delete:'fa-trash',
        rename:'fa-edit',
        import:'fa-download',
        export:'fa-upload',
        save:'fa-save',
        exit:'fa-times-circle'
    }
	
    // Sorting
    $(".sortableTarget").sortable({
        connectWith: ".sortableTarget",
        handle: ".tv-handle>.tv-label",
        axis: "y",
        items: ">.tv-group, >.tv-rule",
        helper: "clone"
    });
    
    // Collapse/Expand tree
	$(document).on("click", ".tv-expandable", function(){
		if ($(this).hasClass("tv-expanded")) {
            $(this).removeClass("tv-expanded");
			$(this).parent().siblings().slideUp(200);
			$(this).children("." + icons.collapse).addClass(icons.expand).removeClass(icons.collapse);
		} else {
            $(this).addClass("tv-expanded");
			$(this).parent().siblings().slideDown(200);
			$(this).children("." + icons.expand).addClass(icons.collapse).removeClass(icons.expand);
		}
	});
    
    // Selecting items
    $(document).on("click", ".tv-label", function(){
        $("#treeview .selected").removeClass('selected');
        $(this).parent().parent().addClass('selected');
        updateTreeviewMenu();
        onTreeSelect(editor);
    });
    
    //=============================
    // Menu
    //=============================
    
    // delete
    $(document).on("click", "#tv-menu-delete", function(){
        if (!$(this).hasClass("disabled")){ // if this function is not disabled
            $("#tv-delete-confirmation").slideDown(200);
        }
    });
    
    $(document).on("click", "#tv-confirm-delete", function() {
        $("#treeview .selected").remove();
        $("#tv-delete-confirmation").slideUp(200);
        // reset menu
        updateTreeviewMenu();
        onTreeSelect(editor);
    });
    
    $(document).on("click", "#tv-cancel-delete", function() {
        $("#tv-delete-confirmation").slideUp(200);
    });
    
    // add filter
    $(document).on("click", "#tv-menu-new-filter", function(){
        // deselect the current item
        $("#treeview .selected").removeClass('selected');
        
        // insert the new filter
        var newE = "<div class='tv-filter sortableTarget selected'>\
                        <div class='tv-handle'>\
                            <div class='tv-expandable tv-expanded'><i class='fa fa-fw fa-minus-square'></i></div>\
                            <div class='tv-label'>New Filter</div>\
                        </div>\
                    </div>";
        $("#treeview").prepend(newE);
        
        // Refresh sorting
        $(".sortableTarget").sortable({
            connectWith: ".sortableTarget",
            handle: ".tv-handle>.tv-label",
            axis: "y",
            items: ">.tv-group, >.tv-rule",
            helper: "clone"
        });
        
        // activate rename field
        $("#tv-label-input").val($("#treeview .selected>.tv-handle>.tv-label").text());
        $("#tv-label-input").slideDown(200);
        $("#tv-label-input").focus();
        
        // update menu
        updateTreeviewMenu();
    });
    
    // add group
    $(document).on("click", "#tv-menu-new-group", function(){
        if (!$(this).hasClass("disabled")){ // if this function is not disabled
            // get selected element
            var current = $("#treeview .selected");
            // deselect the current item
            $(current).removeClass('selected');
            
            // insert the new group
            var newE = "<div class='tv-group sortableTarget selected'>\
                            <div class='tv-handle'>\
                                <div class='tv-expandable tv-expanded'><i class='fa fa-fw fa-minus-square'></i></div>\
                                <div class='tv-label'>New Group</div>\
                            </div>\
                        </div>";
            $(current).append(newE);

            // Refresh sorting
            $(".sortableTarget").sortable({
                connectWith: ".sortableTarget",
                handle: ".tv-handle>.tv-label",
                axis: "y",
                items: ">.tv-group, >.tv-rule",
                helper: "clone"
            });
            
            // activate rename field
            $("#tv-label-input").val($("#treeview .selected>.tv-handle>.tv-label").text());
            $("#tv-label-input").slideDown(200);
            $("#tv-label-input").focus();
            
            // update menu
            updateTreeviewMenu();
        }
        
    });
    
    // add rule
    $(document).on("click", "#tv-menu-new-rule", function(){
        if (!$(this).hasClass("disabled")){ // if this function is not disabled
            // get selected element
            var current = $("#treeview .selected");
            // deselect the current item
            $(current).removeClass('selected');
            
            // insert the new rule
            var newE = "<div class='tv-rule selected'>\
                            <div class='tv-handle'>\
                                <div class='tv-label'>New Rule</div>\
                            </div>\
                            <pre class='tv-code'>#!rule New Rule\n# Descriptive Comment</pre>\
                        </div>";
            var e;
            if ($(current).hasClass("tv-rule")){
                e = $(current).after(newE);
            }
            else {
                e = $(current).append(newE);
            }
            
            // activate rename field
            /*$("#tv-label-input").val($("#treeview .selected>.tv-handle>.tv-label").text());
            $("#tv-label-input").slideDown(200);
            $("#tv-label-input").focus();*/
            
            // update menu
            updateTreeviewMenu();
            onTreeSelect(editor);
        }
        
    });
    
    // duplicate
    $(document).on("click", "#tv-menu-duplicate", function(){
        if (!$(this).hasClass("disabled")){ // if this function is not disabled
            // duplicate
            $("#treeview .selected").after($("#treeview .selected").clone());
            // deselect it and it's clone
            $("#treeview .selected").removeClass("selected");
            // reset menu
            updateTreeviewMenu();
            // Refresh sorting
            $(".sortableTarget").sortable({
                connectWith: ".sortableTarget",
                handle: ".tv-handle>.tv-label",
                axis: "y",
                items: ">.tv-group, >.tv-rule",
                helper: "clone"
            });
        }
    });
    
    // rename
    $(document).on("click", "#tv-menu-rename", function(){
        if (!$(this).hasClass("disabled")){ // if this function is not disabled
            // update the input text
            $("#tv-label-input").val($("#treeview .selected>.tv-handle>.tv-label").text());
            // show the input field
            $("#tv-label-input").slideDown(200);
            // auto-focus the field
            $("#tv-label-input").focus();
        }
    });
    // update selected and hide when input loses focus
    $(document).on("blur", "#tv-label-input", function(){
        // update the handle label
        $("#treeview .selected>.tv-handle>.tv-label").text($(this).val());
        // update the code text
        var temp = $("#treeview .selected.tv-rule>.tv-code").text();
        $("#treeview .selected.tv-rule>.tv-code").text(temp.replace(/^(#!rule )([^\n]*)(.*)/, "$1" + $(this).val() + "$3"));
        // propagate the changes to the editor
        onTreeSelect(editor);
        // hide when finished
        $(this).slideUp(200);
    });
});