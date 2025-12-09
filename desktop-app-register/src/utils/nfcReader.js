// // src/utils/nfcReader.js

// const { NFC } = require("nfc-pcsc");

// function startNFC(onRead) {
//   const nfc = new NFC();

//   nfc.on("reader", (reader) => {
//     console.log(`Reader detected: ${reader.reader.name}`);

//     reader.autoProcessing = false;

//     reader.on("card", (card) => {
//       const uid = card.uid || card.atr?.slice(-7).toString("hex");

//       if (onRead) onRead(uid);
//     });

//     reader.on("error", (err) => console.error("Reader Error:", err));
//     reader.on("end", () => console.log("Reader removed"));
//   });

//   nfc.on("error", (err) => console.error("NFC Error:", err));
// }

// module.exports = { startNFC };

// src/utils/nfcReader.js
const { NFC } = require("nfc-pcsc");

let nfcInstance = null;
let activeReaders = [];

function startNFC(onRead) {
  nfcInstance = new NFC();

  nfcInstance.on("reader", (reader) => {
    console.log(`Reader detected: ${reader.reader.name}`);
    activeReaders.push(reader);

    reader.autoProcessing = false;

    reader.on("card", (card) => {
      const uid = card.uid || card.atr?.slice(-7).toString("hex");
      if (onRead) onRead(uid);
    });

    reader.on("error", (err) => console.error("Reader Error:", err));
    reader.on("end", () => {
      console.log("Reader removed");
      activeReaders = activeReaders.filter((r) => r !== reader);
    });
  });

  nfcInstance.on("error", (err) => console.error("NFC Error:", err));
}

function stopNFC() {
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

  if (nfcInstance) {
    try {
      nfcInstance.close();
    } catch (err) {
      console.error(err);
    }
    nfcInstance = null;
  }
  console.log("NFC scanning stopped.");
}

module.exports = { startNFC, stopNFC };
