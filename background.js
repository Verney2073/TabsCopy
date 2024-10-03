chrome.commands.onCommand.addListener(function(command) {
    if (command === "copy_tab_urls") {
        // needs to be asynchronous
        const divider = chrome.storage.local.get('divider', function(data) { return data.divider} )
        console.log("backgroundjs divider", divider ?? 'helloworld')
        chrome.tabs.query({currentWindow: true}, function(tabs) {
            let tabUrls = [];

            tabs.forEach(function(tab){
                if (tab.highlighted){
                tabUrls.push(tab.url)}
            }
            )
            console.log("alltaburls", tabUrls)
            const text = tabUrls.join(divider ? "it'sclose!" : ', ');
            console.log("text", text)

            chrome.tabs.sendMessage(tabs.find(tab => tab.active).id, {action: "copyUrls", text: text})
        });
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
  

  