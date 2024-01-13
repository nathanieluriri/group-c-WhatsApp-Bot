const makeWASocket = require("@whiskeysockets/baileys").default;
const {
  DisconnectReason,
  useMultiFileAuthState,
} = require("@whiskeysockets/baileys");
const P = require("pino");
const getBullyWord = require("./getBullyWord");

const AUTH_FOLDER = "auth";
let messageStore = {};

const generateRandomZeroOrOne = () => Math.round(Math.random());

const getLastMessageInChat = async (remoteJid) => {
  const messages = messageStore[remoteJid] || [];
  return messages.length > 0 ? messages[messages.length - 1] : null;
};

const sendWarningMessage = async (sock, remoteJid, senderId, text) => {
  const senderName = messageStore[senderId]?.senderName || "Unknown";
  const warningText = `Warning: group participant ${senderName} has sent "${text}" which is an inappropriate message. Inappropriate messages are not allowed on this group 😡.`;
  try {
    await sock.sendMessage(remoteJid, { text: warningText });
  } catch (error) {
    console.error(`Error sending warning message to ${remoteJid}:`, error);
  }
};

const processMessage = async (key, message, sock) => {
  if (!message) return;

  const text = message.conversation || message.extendedTextMessage?.text;
  if (!text) return;

  const senderId = key.participant;
  const senderName = senderId.split("@")[0];
  messageStore[senderId] = { senderName };

  const bullyword = await getBullyWord(text);
  const num = generateRandomZeroOrOne();
  switch (bullyword) {
    case "*&1@^":
      await deleteAndWarn(sock, key.id, key.remoteJid, senderId, text);
      break;
    case "*&0@^":
      console.log("Not a bully word");
      break;
    case "&1@^":
      if (num === 1) {
        await deleteAndWarn(sock, key.id, key.remoteJid, senderId, text);
      } else {
        const participantId = senderId.split("@")[0];
        await sock.sendMessage(key.remoteJid, {
          text: `@${participantId} be careful, this message "${text}" is not accepted on the group. It would be deleted next time`,
          mentions: [senderId],
        });
      }
      break;
    case "&0@^":
      console.log("Totally Clean!");
      break;
  }
};

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

const deleteAndWarn = async (sock, messageId, remoteJid, senderId, text) => {
  console.log("Attempting to delete message with ID:", messageId);
  await sendWarningMessage(sock, remoteJid, senderId, text);
  await sock.sendMessage(remoteJid, {
    delete: { id: messageId, fromMe: false, remoteJid, participant: senderId },
  });
};

const run = async (sock, events) => {
  if (events["messages.upsert"]) {
    for (const message of events["messages.upsert"].messages) {
      await processMessage(message.key, message.message, sock);
    }
  }
  if (events["message-receipt.update"]) {
    for (const receiptUpdate of events["message-receipt.update"]) {
      await processReceiptUpdate(receiptUpdate, sock);
    }
  }
};

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

const restart = async (sock) => {
  await connect(sock);
};

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

const main = async () => {
  try {
    await connect();
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

main();
