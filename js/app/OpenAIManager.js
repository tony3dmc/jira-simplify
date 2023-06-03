class OpenAIManager {
  constructor(ticketManager, apiKeyManager) {
    this.ticketManager = ticketManager;
    this.apiKeyManager = apiKeyManager;

    this.openaiButton = document.getElementById('analyse');
    this.openaiContent = document.getElementById('openai-content');
    this.openaiParent = document.getElementById('analysis-output');

    this.openaiButton.addEventListener('click', () => this.handleOpenAIAnalysis());
  }

  async handleOpenAIAnalysis() {
    this.reveal();

    const issue = this.ticketManager.getCurrentIssue();
    const system_prompt = [
      'Take on the role of an AI Issue Analyser robot.',
      'You operate within a browser extension.',
      'You will be given the text version of a Jira issue.',
      'Reply with a brief summary of the issue, followed by instructions for the developer and tester where relevant.',
      'Do not mention how long anything should take.',
    ].join(' ');
    
    const payload = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: system_prompt,
        },
        {
          role: 'user',
          content: issue,
        },
      ],
      temperature: 1.0,
      max_tokens: 250,
      top_p: 1,
      n: 1,
      stream: false,
      frequency_penalty: 0,
      presence_penalty: 0,
    };
    
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        payload,
        { headers: { 'Authorization': `Bearer ${this.apiKeyManager.getApiKey()}` } }
      );
  
      if (response.data && response.data.choices && response.data.choices.length > 0) {
        this.openaiContent.innerHTML = response.data.choices[0].message.content.replace(/\n/g, '<br/>');
      } else {
        this.openaiContent.textContent = 'No results from OpenAI';
      }
    } catch (error) {
      // Handle different error types based on status code
      if (error.response) {
        switch (error.response.status) {
          case 400:
            this.openaiContent.textContent = 'Request failed, please try again later.';
            break;
          case 401:
            this.openaiContent.textContent = 'Invalid API key, please check your settings.';
            break;
          default:
            this.openaiContent.textContent = 'There was an unknown HTTP error';
        }
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
    }
  }

  reveal() {
    this.openaiParent.style.display = 'block';
    this.openaiButton.style.display = 'none';
  }

}

export default OpenAIManager;
