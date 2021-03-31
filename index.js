const bip39 = require("bip39");
const { hdkey } = require("ethereumjs-wallet");
/*
  {mnemonic:  "ill clump only blind unit burden thing track silver cloth review awake useful craft whale all satisfy else trophy sunset walk vanish hope valve}
*/

exports.handler = async (event, callback) => {
  const { mnemonic, currency } = event;
  console.log(currency);
  let path = "m/44'/60'/0'"; // Ethereum path

  console.log("path", path);
  if (!bip39.validateMnemonic(mnemonic)) {
    throw Error("Phrase invalid");
  }

  const seed = await bip39.mnemonicToSeed(mnemonic);
  const hdWallet = hdkey.fromMasterSeed(seed);
  const masterNode = hdWallet.derivePath(path);
  const masterExtendedPublicKey = masterNode.publicExtendedKey();
  const myWallet = hdkey.fromExtendedKey(masterExtendedPublicKey);

  let public_address;
  for (let i = 0; i < 1; i++) {
    const node = myWallet.derivePath("m/" + i);
    const nodeWallet = node.getWallet();
    public_address = nodeWallet.getAddressString();
    console.log("public_address:", public_address);
  }
  return public_address;
};
