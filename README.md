# Jira Simplify
### Simplifying Complex Jira Issues

Jira Simplify is a browser extension for Chrome designed to help streamline your understanding of complex Jira issues. As an avid user of Jira, I often found myself confronted with tickets that were long, messy, or confusing. This led me to build Jira Simplify, a tool that uses the OpenAI API to quickly summarise and present the key aspects of any Jira ticket.

## Getting Started

1. Download or clone this repository.
2. Navigate to `chrome://extensions/` in your Chrome browser.
3. Enable "Developer mode" (upper right corner).
4. Click "Load unpacked" (upper left corner) and select the build folder of the downloaded repository.

## Usage

1. Navigate to a Jira issue on your Chrome browser.
2. Click on the extension icon next to your URL bar.
3. Enter your OpenAI API key when prompted.

## Development

Developed with JavaScript, HTML, and CSS. This project also uses the OpenAI API for processing Jira issue details.

The GPT prompt used to generate the summary and instructions can be found in `js/app/OpenAIManager.js`. It is currently configured to output a summary of the ticket followed by instructions for developers and testers. The possibilities are endless - we can update this prompt to rank the quality of the ticket or generate other relevant instructions. Future versions will bring in new features around this code section.

## Contributing

Pull requests are welcome. For major changes or feature ideas for the AI analysis, please open an issue first to discuss what you would like to change.

