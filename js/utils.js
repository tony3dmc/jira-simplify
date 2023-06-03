function isJiraUrl(url) {
    const urlPattern = /https:\/\/.*\.atlassian\.net\/.*/;
    return urlPattern.test(url);
}

function setError(error) {
    document.getElementById('error-message').textContent = error;
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('main-content').style.display = 'none';
}

function clearError() {
    document.getElementById('error-message').textContent = '';
    document.getElementById('error-message').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
}

export { isJiraUrl, setError, clearError };
