chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "copyUrls") {
        console.log("request text", request.text);
        navigator.clipboard.writeText(request.text);
    } 
});

