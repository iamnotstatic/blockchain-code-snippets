const Web3 = require('web3');
const erc20Abi = require('./abis/erc20.json');

const web3 = new Web3(
  new Web3.providers.WebsocketProvider('RPC Websocket URL')
);

const contract = new web3.eth.Contract(erc20Abi, 'contract address');

contract.events.Transfer(
  {
    fromBlock: 0,
    toBlock: 'latest',
  },
  (error, event) => {
    if (error) {
      console.error(error);
    } else {
      console.log(event);
    }
  }
);

// {
//   address: '0x8076C74C5e3F5852037F31Ff0093Eeb8c8ADd8D3',
//   blockNumber: 12945703,
//   transactionHash: '0x380e8187703cc026429bf1277924292c5c6f5442083529f76ea771901f5e23df',
//   transactionIndex: 431,
//   blockHash: '0x2612f5ac641687bf101ab911680224d5bb33f154149a356ba58963a56f2af5f9',
//   logIndex: 1187,
//   removed: false,
//   id: 'log_1ab54894',
//   returnValues: Result {
//     '0': '0xF255F11ebbb13159F9fc45C52d458E75f4E8A1a9',
//     '1': '0x3668Ca2009aF4c0a4a9e258EF69eAD1FabbfB7da',
//     '2': '27031253891835915',
//     from: '0xF255F11ebbb13159F9fc45C52d458E75f4E8A1a9',
//     to: '0x3668Ca2009aF4c0a4a9e258EF69eAD1FabbfB7da',
//     value: '27031253891835915'
//   },
//   event: 'Transfer',
//   signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//   raw: {
//     data: '0x000000000000000000000000000000000000000000000000006008c83e0e680b',
//     topics: [
//       '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//       '0x000000000000000000000000f255f11ebbb13159f9fc45c52d458e75f4e8a1a9',
//       '0x0000000000000000000000003668ca2009af4c0a4a9e258ef69ead1fabbfb7da'
//     ]
//   }
// }

const scream = () => {
  console.log('scream');

  web3.eth
    .subscribe('logs')
    .on('connected', (subscriptionId) => {
      console.log('subscriptionId:' + subscriptionId);
    })
    .on('data', (log) => {
      console.log(log);
    })
    .on('error', (error) => {
      console.log(error);
    });
};

scream();

// Result:
// {
//   address: '0x8076C74C5e3F5852037F31Ff0093Eeb8c8ADd8D3',
//   topics: [
//     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//     '0x000000000000000000000000ff3dd404afba451328de089424c74685bf0a43c9',
//     '0x00000000000000000000000004edfbe39dbb8688e5947568f59dff5a01e497e5'
//   ],
//   data: '0x000000000000000000000000000000000000000000000000002cf71daa5ace6f',
//   blockNumber: 12885257,
//   transactionHash: '0xa57988371da8fbc44198191f488081c63271b8258da32e5f600fb24d13948313',
//   transactionIndex: 528,
//   blockHash: '0x126f4deb85795097fb2302fcadd81ded3c4250a564a8b0ad571bdb7f6de8ca5d',
//   logIndex: 1803,
//   removed: false,
//   id: 'log_ea1a426c'
// }

const contractScream = () => {
  console.log('scream');

  web3.eth
    .subscribe('logs', {
      address: 'smart contract address',
    })
    .on('connected', (subscriptionId) => {
      console.log('subscriptionId:' + subscriptionId);
    })
    .on('data', (log) => {
      console.log(log);
    })
    .on('error', (error) => {
      console.log(error);
    });
};

contractScream();

// Result:
// {
//   address: '0x8076C74C5e3F5852037F31Ff0093Eeb8c8ADd8D3',
//   topics: [
//     '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
//     '0x000000000000000000000000ff3dd404afba451328de089424c74685bf0a43c9',
//     '0x00000000000000000000000004edfbe39dbb8688e5947568f59dff5a01e497e5'
//   ],
//   data: '0x000000000000000000000000000000000000000000000000002cf71daa5ace6f',
//   blockNumber: 12885257,
//   transactionHash: '0xa57988371da8fbc44198191f488081c63271b8258da32e5f600fb24d13948313',
//   transactionIndex: 528,
//   blockHash: '0x126f4deb85795097fb2302fcadd81ded3c4250a564a8b0ad571bdb7f6de8ca5d',
//   logIndex: 1803,
//   removed: false,
//   id: 'log_ea1a426c'
// }

// Made by @iamnotstatic ❤️
