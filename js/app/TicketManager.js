import { setError, clearError, isJiraUrl } from '../utils.js';

class TicketManager {
    constructor() {
        this.title = document.getElementById('issue-title');
        this.content = document.getElementById('issue-content');
        this.body = document.getElementById('issue-preview');
        this.currentIssue = null;
    }

    getCurrentIssue() {
        return this.title.textContent + "\n" + this.body.textContent;
    }

    async displayTicketContent() {
        clearError();

        try {
            const response = await new Promise((resolve, reject) =>
                chrome.runtime.sendMessage({ greeting: "fetchIssue" }, response => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                    } else {
                        resolve(response);
                    }
                })
            );

            if (response.issue) {
                this.title.innerHTML = response.issue.title.replace(/\n/g, '<br>');
                this.content.innerHTML = response.issue.content.replace(/\n/g, '<br>');
                this.body.innerHTML = response.issue.body.replace(/\n/g, '<br>');
            } else {
                this.title.textContent = 'No issue found.';
                this.content.textContent = '';
                this.body.textContent = '';
            }
        } catch (error) {
            console.error(error);
        }
    }

    async initiateTicketDisplay() {
        try {
            const tabs = await new Promise((resolve, reject) =>
                chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                    } else {
                        resolve(tabs);
                    }
                })
            );

            clearError();

            if (tabs[0]) {
                if (isJiraUrl(tabs[0].url)) {
                    await this.displayTicketContent();
                } else {
                    setError("Unsupported URL. Please go to a Jira page.");
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export default TicketManager;
