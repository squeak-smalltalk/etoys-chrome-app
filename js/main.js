window.onload = function() {
    document.getElementById('sqFrame').contentWindow.postMessage({
        rootURL: chrome.runtime.getURL('/'),
    }, '*');

    window.addEventListener('message', function(event) {
        window.close();
    });
};
