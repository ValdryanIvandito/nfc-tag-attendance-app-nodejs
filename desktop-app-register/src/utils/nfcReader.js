// src/utils/nfcReader.js
const { NFC } = require("nfc-pcsc");

function startNFC(onRead) {
  const nfc = new NFC();

  nfc.on("reader", (reader) => {
    console.log(`Reader detected: ${reader.reader.name}`);

    reader.autoProcessing = false;

    reader.on("card", (card) => {
      const uid = card.uid || card.atr?.slice(-7).toString("hex");
      console.log("UID:", uid);

      if (onRead) onRead(uid);
    });

    reader.on("error", (err) => console.error("Reader Error:", err));
    reader.on("end", () => console.log("Reader removed"));
  });

  nfc.on("error", (err) => console.error("NFC Error:", err));
}

module.exports = { startNFC };
