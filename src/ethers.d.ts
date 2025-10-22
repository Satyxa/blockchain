import 'ethers';

declare module 'ethers' {
  interface Block {
    size: string;
  }
}
