chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'storeIssue') {
        chrome.storage.local.set({current_issue: message.content}, function() {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
            }
            sendResponse({status: 'success'});
        });

        return true;
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.greeting === "fetchIssue") {
        chrome.storage.local.get('current_issue', function(result) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
            }
            sendResponse({issue: result.current_issue});
        });

        return true;
    }
});
