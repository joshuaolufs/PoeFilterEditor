$(document).ready(function(){
    // check if localStorage is supported
    if (typeof(Storage) !== "undefined") { // if it does exist
        function getLocalStorageSize() {
            var all = '';
            for (key in window.localStorage) {
                all += localStorage[key];
            }
            return all ? 3 + ((all.length*16)/(8*1024)) + ' KB' : 'Empty (0 KB)';
        }
        
        function saveLoop() {
            localStorage.setItem('treeview', $("#treeview").html());

            var size = Math.round($("#treeview").html().length / 1024);
            var percent = Math.round((size / 5120) * 100);
            $("#space-remaining").text(size + "/5120 KB");
        }
        
        // check localStorage for a saved treeview
        if (localStorage.treeview) {
            $("#restore-session").css('display', 'flex');
            $("#restore-session").slideDown(200);
            
            $(document).on("click", "#accept-restore", function(){
                $(this).parent().slideUp(200);
                
                // load the saved contents (clearing any previous content)
                $("#treeview").html(localStorage.getItem('treeview'));
                
                // update menu
                if ($(".tv-selected").hasClass("tv-filter")) {
                    $(".tv-menu-item").removeClass("tv-disabled");
                }
                else if ($(".tv-selected").hasClass("tv-group")) {
                    $(".tv-menu-item").removeClass("tv-disabled");
                }
                else if ($(".tv-selected").hasClass("tv-rule")) {
                    $(".tv-menu-item").removeClass("tv-disabled");
                    $("#tv-menu-new-group").addClass("tv-disabled");
                }
                
                // update sortability
                $(".sortableTarget").sortable({
                    connectWith: ".sortableTarget",
                    handle: ".tv-handle>.tv-label",
                    axis: "y",
                    items: ">.tv-group, >.tv-rule",
                    helper: "clone"
                });
                
                // update treeview menu
                var current = $('#treeview .selected');
                if ($(current).hasClass('tv-filter') || $(current).hasClass('tv-group')) {
                    $("#tv-menu .menu-item").removeClass("disabled");
                }
                else if ($(current).hasClass('tv-rule')) {
                    $("#tv-menu .menu-item").removeClass("disabled");
                    $("#tv-menu-new-group").addClass("disabled");
                }
                
                // start autosave function
                setInterval(saveLoop, 20000);
            });
        }
        else {
            localStorage.setItem('treeview', $("#treeview").html());
        }
        
        $(document).on("click", "#cancel-restore", function(){
            $(this).parent().slideUp(200);
            // start autosave function
            setInterval(saveLoop, 20000);
        });
    }
});