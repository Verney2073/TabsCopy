chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "copyUrls") {
        console.log("request text", request.text);
        navigator.clipboard.writeText(request.text);
    } else if (request.action === "dividerSelected") {
        console.log("Selected divider:", request.divider);
        chrome.storage.local.set({ divider: request.divider }, function() {
            console.log('Divider option saved:', request.divider);
        });
    }
});

