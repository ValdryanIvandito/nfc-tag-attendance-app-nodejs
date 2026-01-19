// src/utils/nfcReader.js

const { NFC } = require("nfc-pcsc");

let nfc = null;
let activeReaders = [];

function startReadNFC(onRead) {
  nfc = new NFC();

  nfc.once("reader", (reader) => {
    activeReaders.push(reader);
    console.log(`\nReader detected: ${reader.reader.name}`);
    reader.once("card", (card) => {
      console.log(`Card detected:`, card);
      onRead(card.uid);
    });

    reader.once("error", (err) => console.error("\nReader Error:", err));
    reader.once("end", () => {
      console.log("Reader removed.");
      activeReaders = activeReaders.filter((r) => r !== reader);
    });
  });

  nfc.once("error", (err) => {
    if (err.message.includes("SCardCancel")) {
      console.log("NFC session closed.");
      return;
    }

    console.error("\nNFC error:", err);
  });
}

function stopReadNFC() {
  if (activeReaders.length > 0) {
    activeReaders.forEach((reader) => {
      try {
        reader.close();
      } catch (err) {
        console.error(err);
      }
    });
    activeReaders = [];
  }

  if (nfc) {
    try {
      nfc.close();
    } catch (err) {
      console.error(err);
    }
    nfc = null;
  }
  console.log("\nNFC scanning stopped.");
}

module.exports = { startReadNFC, stopReadNFC };
