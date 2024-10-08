chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "dividerSelected") {
        console.log("Selected divider:", request.divider);
        chrome.storage.local.set({ divider: request.divider }, function() {
            console.log('Divider option saved:', request.divider);
        });
    }
});

chrome.commands.onCommand.addListener(async function(command) {
    if (command === "copy_tab_urls") {
        try {
            // Wrap chrome.storage.local.get in a Promise
            const getDivider = () => {
                return new Promise((resolve, reject) => {
                    chrome.storage.local.get('divider', function(data) {
                        if (chrome.runtime.lastError) {
                            reject(chrome.runtime.lastError);
                        } else {
                            console.log("reached here")
                            resolve(data.divider);
                        }
                    });
                });
            };

            // Wait for the divider value
            const divider = await getDivider();
            console.log("backgroundjs divider", divider ?? 'helloworld');

            // Query tabs
            chrome.tabs.query({currentWindow: true}, function(tabs) {
                let tabUrls = [];

                tabs.forEach(function(tab) {
                    if (tab.highlighted) {
                        tabUrls.push(tab.url);
                    }
                });

                console.log("alltaburls", tabUrls);
                const text = tabUrls.join(divider ? divider : ', ');
                console.log("text", text);

                // Send message to the active tab
                const activeTab = tabs.find(tab => tab.active);
                if (activeTab) {
                    chrome.tabs.sendMessage(activeTab.id, {action: "copyUrls", text: text});
                }
            });
        } catch (error) {
            console.error('Error getting divider:', error);
        }
    }
});


// chrome.commands.onCommand.addListener(function(command) {
//     if (command === "copy_tab_urls") {
//         chrome.storage.local.get('divider', function(data) {
//             const divider = data.divider || '\n';

//             chrome.tabs.query({currentWindow: true}, function(tabs) {
//                 let tabUrls = [];

//                 tabs.forEach(function(tab) {
//                     if (tab.highlighted) {
//                         tabUrls.push(tab.url);
//                     }
//                 });

//                 const text = tabUrls.join(divider);

//                 chrome.tabs.sendMessage(tabs.find(tab => tab.active).id, {action: "copyUrls", text: text});
//             });
//         });
//     }
// });
  

  