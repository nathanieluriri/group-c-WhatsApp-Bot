# WhatsApp Group Chat Moderation Bot

## Overview

This repository contains a WhatsApp Group Chat Moderation Bot that monitors group messages for inappropriate content, specifically focusing on potential cyberbullying instances. The bot uses the Baileys library to connect to the WhatsApp Web client and OpenAI's GPT-3.5 Turbo model to analyze and detect potential bullying words or phrases.

## Features

1. **Message Analysis**: Checks each message in the group for inappropriate content.
2. **Warning System**: Sends a warning message to the group if inappropriate content is detected.
3. **Message Deletion**: Deletes the offending message from the group.
4. **Dynamic Analysis**: Utilizes OpenAI's GPT-3.5 Turbo model to identify potential bullying content.
5. **Connection Monitoring**: Automatically reconnects if the bot gets disconnected from WhatsApp.

## Prerequisites

- Node.js installed on your system.
- A valid API key for the OpenAI GPT-3.5 Turbo model.
- WhatsApp Web account.

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/whatsapp-group-moderation-bot.git
   ```

2. Navigate to the project directory:

   ```bash
   cd whatsapp-group-moderation-bot
   ```

3. Install the necessary dependencies:

   ```bash
   npm install
   ```

4. Create an `auth` folder and place your WhatsApp authentication files in it.

## Configuration

- Ensure you have an `auth` folder with the necessary authentication files.
- Replace the OpenAI API key in the `getBullyWord` function with your valid API key.

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
