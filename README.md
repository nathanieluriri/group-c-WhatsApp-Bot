# WhatsApp Group Chat Moderation Bot

## Background

This repository signifies the culmination of our dedicated research endeavors within Group C, undertaken as part of our research seminar course. It involves the development of a robust bot designed to seamlessly integrate with WhatsApp, utilizing a fine-tuned model from OpenAI. The primary focus of this bot is to predict instances of cyberbullying and inappropriate messages, thereby facilitating the monitoring of group chat interactions on WhatsApp.

The success of this research initiative owes much to the invaluable contribution of [@whiskeysockets/baileys](https://whiskeysockets.github.io/docs/intro). Their API played a pivotal role in establishing a direct connection to WhatsApp Web for research purposes. It is imperative to note that they bear no responsibility for any potential breach of WhatsApp's terms and conditions, as our utilization of their API was strictly confined to the realm of research. We extend our sincere gratitude to [@whiskeysockets/baileys] for their pivotal support, significantly propelling our research endeavors forward.

## Overview

This repository contains a WhatsApp Group Chat Moderation Bot that diligently monitors group messages for inappropriate content, with a specific focus on potential cyberbullying instances. The bot employs the Baileys library to connect to the WhatsApp Web client and a fine-tuned model based on OpenAI's GPT-3.5 Turbo model. This model analyzes and detects/predicts potential bullying words or phrases, hate phrases, offensive words, either general or specific to a demographic.

## Features

1. **Message Analysis**: Examines each message in the group to predict its nature.
2. **Warning System**: Issues a warning message to the group upon detection of inappropriate content. (Inappropriate content)>{`refers to offensive/bullying/hate words or phrases`}.
3. **Message Deletion**: Removes offensive messages from the group under specific conditions. (Deleting condition)>{`To delete: 1. The model predicts extreme offensiveness or inappropriateness in a group message.`,
   `2. The model predicts that a message is offensive to a particular demographic and warns the sender to avoid such messages in the future.`,
   `3. The algorithm checks for previous warnings and deletes messages judged particularly offensive if they are sent again.`}
5. **Dynamic Analysis**: Utilizes OpenAI's GPT-3.5 Turbo model to predict bullying content.
6. **Connection Monitoring**: Automatically reconnects if the bot gets disconnected from WhatsApp.

## Prerequisites to Run the WhatsApp Bot

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

4. Create a folder named `auth` folder.

## Configuration

- Ensure you have an `auth` folder.
- Replace the OpenAI API key in the `getBullyWord` function with your valid API key. The original API key uses a fine-tuned model; to use this without fine-tuning your model would be impossible. Firstly, fine-tune your model, then replace it in the model ="ft-yourownfinetunemodel".

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
