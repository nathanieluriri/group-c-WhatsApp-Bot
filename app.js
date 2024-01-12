const makeWASocket = require("@whiskeysockets/baileys").default;
const {
  DisconnectReason,
  useMultiFileAuthState,
} = require("@whiskeysockets/baileys");
const P = require("pino");
const getBullyWordFunction = require("./getBullyWord");

// Constants
const AUTH_FOLDER = "auth";
let messageStore = {};

// Utility Functions

/**
 * Retrieve the last message from the message store for a given remoteJid.
 */
const getLastMessageInChat = async (remoteJid) => {
  try {
    const messages = messageStore[remoteJid] || [];
    return messages.length > 0 ? messages[messages.length - 1] : null;
  } catch (error) {
    console.error(`Error getting last message in chat ${remoteJid}:`, error);
    throw error;
  }
};

/**
 * Send a warning message to the specified remoteJid about the inappropriate content from a sender.
 */
const sendWarningMessage = async (sock, remoteJid, senderId) => {
  const senderName = messageStore[senderId]?.senderName || "Unknown";
  const warningText = `Warning: group participant ${senderName} has sent an inappropriate message. Inappropriate messages are not allowed on this group 😡.`;

  try {
    await sock.sendMessage(remoteJid, { text: warningText });
  } catch (error) {
    console.error(`Error sending warning message to ${remoteJid}:`, error);
  }
};

// Message Processing Functions

/**
 * Process a message to check for inappropriate content and other actions.
 */
const processMessage = async (key, message, sock) => {
  if ((message && message.conversation) || message.extendedTextMessage.text) {
    let text = message.conversation || message.extendedTextMessage.text;

    if (key.participant) {
      const senderId = key.participant;
      const senderName = senderId.split("@")[0];
      messageStore[senderId] = { senderName };
      const me = senderId.slice(0, 12);
      text = text.replace(/\@me\b/g, `@${me}`);
    }

    console.log(`New Message: ${text}`);
    const bullyword = await getBullyWordFunction(text);

    if (bullyword === "*&1@^") {
      await deleteAndWarn(sock, key.id, key.remoteJid, key.participant);
    } else if (bullyword === "*&0@^") {
      console.log("Not a bully word");
    } else if (text.toLowerCase() === "who are you") {
      sendBotHiMessage(
        sock,
        "I'm a cyberbully detection Bot Built By Group 3 😌 and Samixx is awesome 😌😌!!",
        key.remoteJid
      );
    }
  } else {
    console.log("Invalid message structure:", message);
  }
};

/**
 * Process receipt updates for message status.
 */
const processReceiptUpdate = async (receiptUpdate, sock) => {
  try {
    const { key, receipt } = receiptUpdate;
    console.log(`Received receipt for message ${key.id}:`, receipt);

    const lastMessage = await getLastMessageInChat(key.remoteJid);
    if (lastMessage && lastMessage.key.id === key.id) {
      lastMessage.status = receipt.type;
      console.log(
        `Updated status for the last message in chat ${key.remoteJid}:`,
        lastMessage
      );
    }
  } catch (error) {
    console.error(`Error processing receipt update:`, error);
  }
};

/**
 * Delete an offensive message and send a warning to the sender.
 */
const deleteAndWarn = async (sock, messageId, remoteJid, senderId) => {
  await sendWarningMessage(sock, remoteJid, senderId);

  // Additional logic to delete the message can be added here as per your requirement.
};

// Event Processing Functions

/**
 * Process the incoming events to handle various actions.
 */
const run = async (sock, events) => {
  if (events["messages.upsert"]) {
    const { messages } = events["messages.upsert"];
    for (const message of messages) {
      await processMessage(message.key, message.message, sock);
    }
  }

  if (events["message-receipt.update"]) {
    for (const receiptUpdate of events["message-receipt.update"]) {
      await processReceiptUpdate(receiptUpdate, sock);
    }
  }
};

/**
 * Handle the connection events and perform actions accordingly.
 */
const processEvents = async (sock, events) => {
  console.log("Received Events:", events);

  if (events["connection.update"]) {
    const { connection, lastDisconnect, qr } = events["connection.update"];
    if (qr) {
      console.log("QR Code Received:", qr);
    }

    if (connection === "close") {
      if (
        lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
      ) {
        await restart(sock);
      } else {
        console.log("You disconnected because you logged out");
      }
    }

    if (connection === "open") {
      console.log("Connection is open. Checking for messages.");
    }
  }

  await run(sock, events);
};

// Connection Functions

/**
 * Restart the connection.
 */
const restart = async (sock) => {
  await connect(sock);
};

/**
 * Establish a connection to WhatsApp.
 */
const connect = async () => {
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_FOLDER);

  const newSock = makeWASocket({
    printQRInTerminal: true,
    auth: state,
    logger: P({ level: "debug" }),
    getMessage: (key) => messageStore[key.id]?.message,
  });

  newSock.ev.process((events) => processEvents(newSock, events));
  newSock.ev.on("creds.update", saveCreds);

  return newSock;
};

// Main Function

/**
 * Initialize the application.
 */
const main = async () => {
  try {
    let sock = await connect();
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// Start the application
main();
