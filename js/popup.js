import ApiKeyManager from './app/ApiKeyManager.js';
import TicketManager from './app/TicketManager.js';
import OpenAIManager from './app/OpenAIManager.js';

const apiKeyManager = new ApiKeyManager();
apiKeyManager.fetchApiKey();

const ticketManager = new TicketManager();

const openAIManager = new OpenAIManager(ticketManager, apiKeyManager);

// Display ticket content on load
document.addEventListener('DOMContentLoaded', () => ticketManager.initiateTicketDisplay());

// Add event listeners
apiKeyManager.apiKeyParent.addEventListener('submit', (e) => apiKeyManager.handleFormSubmission(e));
document.getElementById('settings-icon').addEventListener('click', () => apiKeyManager.resetApiKey());
