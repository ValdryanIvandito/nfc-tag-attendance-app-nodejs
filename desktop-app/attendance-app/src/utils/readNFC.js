/* src/utils/nfcReader.js */

const { NFC } = require("nfc-pcsc");

function startNFC(onRead) {
  const nfc = new NFC();

  nfc.on("reader", (reader) => {
    console.log(`\nReader detected: ${reader.reader.name}`);
    reader.on("card", (card) => {
      console.log(`\nCard detected:`, card);
      onRead(card.uid);
    });

    reader.on("error", (err) => console.error("\nReader Error:", err));
    reader.on("end", () => console.log("\nReader removed"));
  });

  nfc.on("error", (err) => console.error("\nNFC Error:", err));
}

module.exports = { startNFC };
