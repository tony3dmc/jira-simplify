import { clearError } from '../utils.js';

class ApiKeyManager {
    constructor() {
        this.apiKeyParent = document.getElementById('settings');
        this.apiKeyInput = document.getElementById('api-key-input');
        this.apiKey = null;
    }

    updateFormDisplay(isKeyStored) {
        let formDisplayStyle = isKeyStored ? 'none' : 'block';
        this.apiKeyParent.style.display = formDisplayStyle;
    }
    
    getApiKey() {
        return this.apiKey;
    }

    async fetchApiKey() {
        clearError();
        try {
            const data = await new Promise((resolve, reject) =>
                chrome.storage.sync.get('openai_api_key', data => 
                    chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve(data))
            );

            ({ openai_api_key: this.apiKey } = data);
            this.updateFormDisplay(Boolean(this.apiKey));
        } catch (error) {
            console.error(error);
        }
    }

    async handleFormSubmission(event) {
        event.preventDefault();

        let apiKey = this.apiKeyInput.value;
        this.apiKey = apiKey;

        try {
            await new Promise((resolve, reject) =>
                chrome.storage.sync.set({ openai_api_key: apiKey }, () => 
                    chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve())
            );

            this.updateFormDisplay(true);
        } catch (error) {
            console.error(error);
        }
    }

    async resetApiKey() {
        try {
            await new Promise((resolve, reject) =>
                chrome.storage.sync.remove('openai_api_key', () => 
                    chrome.runtime.lastError ? reject(chrome.runtime.lastError) : resolve())
            );

            this.apiKey = null;
            this.updateFormDisplay(false);
        } catch (error) {
            console.error(error);
        }
    }
}

export default ApiKeyManager;
