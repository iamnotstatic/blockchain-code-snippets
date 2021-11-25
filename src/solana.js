const solanaWeb3 = require('@solana/web3.js');

const generateAddress = () => {
  const keyPair = solanaWeb3.Keypair.generate();

  const address = keyPair.publicKey;
  const privateKey = keyPair.secretKey;

  return {
    address,
    privateKey,
  };
};

generateAddress();

// Result:
// Public key -> 5sZQA74iWhDxC7z8rh2QWJZyFqnK6fjEp83cccXcFLJf
// Private key -> 16,181,99,97,34,117,207,54,9,152,197,239,28,93,119,166,21,165,246,26,25,46,232,48,99,54,250,96,152,64,198,195, 196,196,16,194,28,50,71,16,44,18,106,17,34,55,115,152,16,147,20,126,122,201,219,103,63,103,174,206,235,185,78,125

const transfer = async (to, amount, key) => {
  const connection = new solanaWeb3.Connection(
    solanaWeb3.clusterApiUrl('mainnet-beta'),
    'confirmed'
  );

  const recipient = new solanaWeb3.PublicKey(to);
  const privateKey = new Uint8Array(key.split(','));
  const sender = solanaWeb3.Keypair.fromSecretKey(privateKey);

  // Add transfer instruction to transaction
  const transaction = new solanaWeb3.Transaction().add(
    solanaWeb3.SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: recipient,
      lamports: solanaWeb3.LAMPORTS_PER_SOL * amount,
    })
  );

  // Sign transaction, broadcast, and confirm
  const signature = await solanaWeb3.sendAndConfirmTransaction(
    connection,
    transaction,
    [sender]
  );

  return { hash: signature };
};

transfer(
  '5sZQA74iWhDxC7z8rh2QWJZyFqnK6fjEp83cccXcFLJf',
  1,
  '16,181,99,97,34,117,207,54,9,152,197,239,28,93,119,166,21,165,246,26,25,46,232,48,99,54,250,96,152,64,198,195, 196,196,16,194,28,50,71,16,44,18,106,17,34,55,115,152,16,147,20,126,122,201,219,103,63,103,174,206,235,185,78,125'
);

// Result: 
// Hash: tNUkoSwFcGuS3U4Bd17PTthNmC7ypFQnqkeK6DSzJpJmX7kpeRd8ezrurixitMd4QakFwdJMUwzCjgYneZi6vLh;

const faucet = async (address, amount) => {
  const connection = new solanaWeb3.Connection(
    solanaWeb3.clusterApiUrl('testnet'),
    'confirmed'
  );

  const recipient = new solanaWeb3.PublicKey(address);

  let airdropSignature = await connection.requestAirdrop(
    recipient,
    solanaWeb3.LAMPORTS_PER_SOL * amount
  );

  await connection.confirmTransaction(airdropSignature);
  process.exit(0);
};

faucet('5sZQA74iWhDxC7z8rh2QWJZyFqnK6fjEp83cccXcFLJf', 1);

const balanceOf = async (address) => {
  const connection = new solanaWeb3.Connection(
    solanaWeb3.clusterApiUrl('mainnet-beta'),
    'confirmed'
  );

  const publicKey = new solanaWeb3.PublicKey(address);

  const balance =
    (await connection.getBalance(publicKey)) / solanaWeb3.LAMPORTS_PER_SOL;

  console.log(balance);

  return { balance };
};

balanceOf('5sZQA74iWhDxC7z8rh2QWJZyFqnK6fjEp83cccXcFLJf');

// Result:
// Balance: 10

// Made by @iamnotstatic ❤️
