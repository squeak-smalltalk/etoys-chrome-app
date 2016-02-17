window.onload = function() {
    window.sandboxedFrame = document.getElementById('sqFrame');
    window.sandboxedWindow = sandboxedFrame.contentWindow;
    window.addEventListener('message', function(event) {
        window.close();
    });
    var keyboardEventTypes = ['keydown', 'keyup', 'keypress'];
    for (var i = 0; i < keyboardEventTypes.length; i++) {
        document.addEventListener(keyboardEventTypes[i], keyboardHandler);
    }
    window.sandboxedWindow.postMessage({}, '*');
};

function selectionHandler(e) {
    var files = this.getAttribute('data-files');
    sqWelcome.style.display = "none";
    window.sandboxedFrame.style.display = "block";
    window.sandboxedWindow.postMessage({files: files}, '*');
}

function keyboardHandler(e) {
    window.sandboxedWindow.postMessage({event: copyKeyboardEvent(e)}, '*');
}

function copyKeyboardEvent(event) {
    return {
        altKey: event.altKey,
        bubbles: event.bubbles,
        cancelable: event.cancelable,
        charCode: event.charCode,
        code: event.code,
        ctrlKey: event.ctrlKey,
        keyCode: event.keyCode,
        keyIdentifier: event.keyIdentifier,
        location: event.location,
        metaKey: event.metaKey,
        shiftKey: event.shiftKey,
        type: event.type,
        which: event.which,
    };
}
