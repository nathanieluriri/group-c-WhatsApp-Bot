# WhatsApp Group Chat Moderation Bot

## Overview

This repository contains a WhatsApp Group Chat Moderation Bot that monitors group messages for inappropriate content, specifically focusing on potential cyberbullying instances. The bot uses the Baileys library to connect to the WhatsApp Web client and OpenAI's GPT-3.5 Turbo model to analyze and detect potential bullying words or phrases and potential hate phrases or words and potential offensive words to a specific demographic or just offensive in general.

## Features

1. **Message Analysis**: Checks each message in the group and tries to predict what kind of message was sent.
2. **Warning System**: Sends a warning message to the group if inappropriate content is detected.(Inappropriate content)>{`means offensive/bullying/hate words or phrases`}
3. **Message Deletion**: Deletes the offensive messages from the group.(Deleting condition)>{`To delete: 1. The model predicts the from an input text in a group that its extremely offensive or inappropriate  `,
   `2. The model predicts the input text is  offensive to a particular demographic and warns the person that sent the text to make sure he/she/they don't send such a message again`,
   `3. The algorithm checks if the user has been warned before and deletes the message it judged particularly offensive if such message gets sent again`}
5. **Dynamic Analysis**: Utilizes OpenAI's GPT-3.5 Turbo model to predict bullying content.
6. **Connection Monitoring**: Automatically reconnects if the bot gets disconnected from WhatsApp.

## Prerequisites to run the whatsApp bot

- Node.js installed on your system.
- A valid API key for the OpenAI GPT-3.5 Turbo model.


## Installation

1. Clone this repository:

   ```bash
   git clone [https://github.com/nathanieluriri/group-c-WhatsApp-Bot](https://github.com/nathanieluriri/group-c-WhatsApp-Bot/)
   ```

2. Navigate to the project directory:

   ```bash
   cd group-c-WhatsApp-Bot
   ```

3. Install the necessary dependencies:

   ```bash
   npm install
   ```

4. Create a folder named `auth` folder .

## Configuration

- Ensure you have an `auth` folder.
- Replace the OpenAI API key in the `getBullyWord` function with your valid API key.The original api key uses a finetuned model to use this without finetuning your own model would be straight up impossible so firstly finetune your own model then replace it in the model ="ft-yourownfinetunemodel"

## Usage

1. Start the bot by running:

   ```bash
   node index.js
   ```

2. Scan the QR code using your WhatsApp Web to authenticate the bot.

3. The bot will now monitor the group and take actions as described in the features section.

## Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- [Baileys](https://github.com/adiwajshing/Baileys) for providing the WhatsApp Web protocol implementation.
- [OpenAI](https://openai.com/) for providing the GPT-3.5 Turbo model.

---
