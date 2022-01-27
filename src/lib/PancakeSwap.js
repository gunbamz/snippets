import * as ethers from 'ethers';

const factoryAddress = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73';
const routerAddress = '0x10ED43C718714eb63d5aA57B78B54704E256024E';
const privateKey = '6342ce27b5821a7537ee05a926b9e59d7a5d62b4505e543e478766613ff5bfc6';
const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
const wallet = new ethers.Wallet(privateKey);
const account = wallet.connect(provider);
// eslint-disable-next-line
const router = new ethers.Contract(
  routerAddress,
  [
    'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
    'function getAmountsIn(uint amountOut, address[] memory path) public view virtual override returns (uint[] memory amounts)',
    'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
  ],
  account
);
//SELL AUTO-BUSD 100.0   0x4d4d9b17499a8b169bc155eb575e6ca6f0b7009d

const PancakeSwap = async (b) => {
  const pSplit = a.split(" ");
  let inToken = pSplit[2];
  let outToken = pSplit[3];
  let amount = pSplit[0];
  let recipient = pSplit[4];
  // if (pSplit[0] == 'SELL') {
  //   inToken = temp[0];
  //   outToken = temp[1];
  // } else if (pSplit[0] == 'BUY') {
  //   inToken = temp[1];
  //   outToken = temp[0];
  // }
  const inTokenContract = new ethers.Contract(
    address[inToken],
    [
      'function approve(address spender, uint amount) public returns(bool)',
    ],
    account
  );
  const outTokenContract = new ethers.Contract(
    address[outToken],
    [
      'function approve(address spender, uint amount) public returns(bool)',
    ],
    account
  );
  const amountIn = ethers.utils.parseUnits(amount, 18);
  const amounts = await router.getAmountsOut(amountIn, [address[inToken], address[outToken]]);
  const amountOutMin = amounts[1].sub(amounts[1].div(15));
  const format = ethers.utils.formatEther(amounts[1]);
  
  const tx = await router.swapExactTokensForTokens(
    amountIn,
    amountOutMin,
    [address[inToken], address[outToken]],
    recipient,
    Date.now() + 1000 * 60 * 2 //2 minutes
  );
  const init = async () => {
    let transac = await outTokenContract.approve(
      router.address, 
      1800000000000000000
    );
    // if (pSplit[0] == 'SELL') {
    //    transac = await inTokenContract.approve(
    //     router.address, 
    //     1800000000000000000
    //   );
    // } else if (pSplit[0] == 'BUY') {
    //   transac = await outTokenContract.approve(
    //     router.address, 
    //     1800000000000000000
    //   );
    // }
    const approvalReceipt = await transac.wait(); 
    console.log('Approval receipt');
    console.log(approvalReceipt);
  }
  const transactionReceipt = await tx.wait(); 
  init();
  console.log('Transaction receipt');
  console.log(transactionReceipt);
  return transactionReceipt;
  
}
export default PancakeSwap;
