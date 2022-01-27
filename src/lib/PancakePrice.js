import * as ethers from 'ethers';

const address = {
  WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  CAKE: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  XVS: '0xcF6BB5389c92Bdda8a3747Ddb454cB7a64626C63',
  TKO: '0x9f589e3eabe42ebc94a44727b3f3531c0c877809',
  EPS: '0xa7f552078dcc247c2684336020c03648500c6d9f',
  BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  VAI: '0x4bd17003473389a42daf6a0a729f6fdb328bbbd7',
  ETH: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  BUNNY: '0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51',
  AUTO: '0xa184088a740c695e156f91f5cc086a06bb78b827',
  BTCB: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
  BELT: '0xe0e514c71282b6f4e823703a39374cf58dc3ea4f',
  ALPACA: '0x8f0528ce5ef7b51152a59745befdd91d97091d2f'
}
//const factoryAddress = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73';
const routerAddress = '0x10ED43C718714eb63d5aA57B78B54704E256024E';
const privateKey = '6342ce27b5821a7537ee05a926b9e59d7a5d62b4505e543e478766613ff5bfc6';
const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
const wallet = new ethers.Wallet(privateKey);
const account = wallet.connect(provider);

const router = new ethers.Contract(
  routerAddress,
  [
    'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
    'function getAmountsIn(uint amountOut, address[] memory path) public view virtual override returns (uint[] memory amounts)',
    'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
  ],
  account
);
const PancakePrice = async (a) => {
  let sToken = a.split(" ");
  const amount = sToken.shift();
  const quote = sToken.shift();
  let result = [];
  const amountIn = ethers.utils.parseUnits(amount, 18);
  await Promise.all(sToken.map(async (token) => {
    const amounts = await router.getAmountsOut(amountIn, [address[quote], address[token]]);
    const format = amounts.map(e => ethers.utils.formatUnits(e, 18));
    format.push(token + quote);
    result.push(format);
  }))
  return result; 
}
export default PancakePrice;
