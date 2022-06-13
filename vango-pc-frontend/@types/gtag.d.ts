export {};

declare global {
  interface Window {
    gtag(type: string, eventName: string, eventParam: any): any;
  }
}
