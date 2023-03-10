console.log('xs: inpageScript')
const abi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "UserPayment",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "adr",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Withdraw",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "shoutId",
        "type": "string"
      }
    ],
    "name": "pay",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "setPrice",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
const address = "0xD4f16816d2AC4832Ab814c8843DC75C63D4f0592"

async function contractPay({shoutId,money}) {
  console.log(`xs: contractPay,${shoutId}, ${money}`)
  // ??????provider
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const accounts = await provider.send("eth_requestAccounts", []);
  const account = accounts[0]
  console.log(`????????????: ${account}`)
  const signer = provider.getSigner()
  const contract = new ethers.Contract(address,abi,signer)
  try {
    const tx = await contract.pay(shoutId.toString(),{
      value: ethers.utils.parseEther(money.toString()),
    })
    await tx.wait()
    console.log('xs: ????????????')
    console.log(tx)
  } catch (err) {
    console.log('xs: error'+err)
  }
}

async function loginTwitter() {
  Twitter.isLoggedIn(function(items) {
    if (!items.oauth_token || !items.oauth_token_secret) {
        Twitter.authenticate();
    }
  });
}

document.addEventListener('xingshi_extension_pay', async function(e) {
  if (e.detail.type === "popup") {
    console.log('xs: detail',e.detail)
  }
  if (e.detail.type === 'pay') {
    await contractPay(e.detail.content)
  }
  if (e.detail.type === "twitter") {
    await loginTwitter()
  }
});
