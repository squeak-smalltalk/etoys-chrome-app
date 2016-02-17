delete window.localStorage;
window.localStorage = {};
delete window.indexedDB;

window.onload = function() {
    window.addEventListener('message', function(event) {
        if (event.data.event !== undefined) {
            dispatchClonedKeyboardEvent(event.data.event);
        } else {
            var url = "http://freudenbergs.de/bert/squeakjs/etoys.image";
            SqueakJS.runSqueak(url, sqCanvas, {
                appName: "Etoys",
                fixedWidth: 1200,
                fixedHeight: 900,
                fullscreen: true,
                spinner: sqSpinner,
                root: "/Etoys",
                templates: {
                    "ExampleEtoys": "http://freudenbergs.de/bert/squeakjs/Etoys/ExampleEtoys",
                    "fonts":        "http://freudenbergs.de/bert/squeakjs/Etoys/fonts",
                    "locale":       "http://freudenbergs.de/bert/squeakjs/Etoys/locale",
                },
                onQuit: function(vm, display, options) {
                    display.vm = null;
                    display.showBanner("Exiting...");
                    setTimeout(function() {
                        event.source.postMessage('exit', event.origin);
                        if (display.cursorCanvas.parentNode != null) {
                          display.cursorCanvas.parentNode.removeChild(display.cursorCanvas);
                        }
                    }, 500);
                }
            });
        }
    });
};

function dispatchClonedKeyboardEvent(event) {
    var keyboardEvent = document.createEvent("KeyboardEvent");
    keyboardEvent.initKeyboardEvent(
        event.type,
        event.bubbles,
        event.cancelable,
        window,
        event.keyIdentifier,
        event.location,
        event.ctrlKey,
        event.altKey,
        event.shiftKey,
        event.metaKey,
        false //event.altGraphKey
    );
    var override_props = ["charCode", "code", "keyCode", "which"];
    for (var i = 0; i < override_props.length; i++) {
        var prop_name = override_props[i];
        delete keyboardEvent[prop_name];
        Object.defineProperty(keyboardEvent, prop_name, {
            writable: true,
            value: event[prop_name],
        });
    }
    document.dispatchEvent(keyboardEvent);
}