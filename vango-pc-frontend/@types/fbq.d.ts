export {};

declare global {
  interface Window {
    fbq(trackCode: 'track', arg: string): any;
  }
}
