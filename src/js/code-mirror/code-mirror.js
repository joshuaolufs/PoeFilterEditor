$(document).ready(function() {
    // initialize code input
    editor = CodeMirror.fromTextArea(document.getElementById('cm-editor'), {
        lineNumbers: true,
        mode: 'poe',
        indentUnit: 4,
        lineWrapping: true,
        theme: 'metamilo',
        viewportMargin: Infinity
    });
    // Trigger onCodeChange chain when the editor code changes
    editor.on("change", function(cm, change) {
        if (!changeInProgress) {
            onCodeChange(cm);
        }
    });
});