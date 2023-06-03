function sendIssueDetails() {

    let metadata = {
        title: 'h1',
        status: 'div[data-test-id="ref-spotlight-target-status-spotlight"]',
        body: '#issue-view-layout-templates-tabs-0-tab',
        comments: 'div[data-test-id="issue.activity.comments-list"]'
    };

    let issue = {
        content: ''
    };
    for (let key in metadata) {
        const element = document.querySelector(metadata[key]);
        if (!element) {
            console.error('The specified ' + key + ' element does not exist in the page.');
            return;
        }
        issue[key] = getFormattedTextContent(element);
        issue.content += key + ': ' + issue[key] + '\n';
    }

    console.log(issue);
    
    // Send the issue details
    chrome.runtime.sendMessage(
        { type: 'storeIssue', content: issue }, 
        (response) => {
            if (chrome.runtime.lastError) {
                console.log(chrome.runtime.lastError);
            }
        }
    );
}

function getFormattedTextContent(node) {
    let textContent = '';

    for (let child of node.childNodes) {
        switch (child.nodeType) {
            case Node.TEXT_NODE: // text node
                textContent += child.nodeValue + '\n';
                break;
            case Node.ELEMENT_NODE: // element node
                if (isVisible(child)) {
                    textContent += getFormattedTextContent(child) + '\n';
                }
                break;
        }
    }

    // Remove leading/trailing whitespace and replace multiple spaces (except newlines) with single space
    return textContent.replace(/^[ \t\r\v\f]+|[ \t\r\v\f]+$/g, '').replace(/[ \t\r\v\f]+/g, ' ').replace(/\n+/g, '\n').trim();
}

function isVisible(node) {
    const style = getComputedStyle(node);
    return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
}

window.addEventListener('load', sendIssueDetails);
  