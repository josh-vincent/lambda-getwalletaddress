# Lambda get wallet addresses

Lambda function for generating wallet addresses

### Prerequisites

bip39 and ethereumjs-wallet packages requried

`npm install bip39 ethereumjs-wallet`

### Get Public address from Seed phrase 
```javascript 
let path = "m/44'/60'/0'"; // Ledger ETH; this may change based off the Hierarchical Deterministic path
// "m/44'/60'/0'/0" //Trezor 

const getPublicAddress = async (mnemonic, path) => {
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
```
