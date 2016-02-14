delete window.localStorage;
window.localStorage = {};
delete window.indexedDB;

window.onload = function() {
    window.addEventListener('message', function(event) {
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
    });
};