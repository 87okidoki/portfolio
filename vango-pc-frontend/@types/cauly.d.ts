export {};

declare global {
  type CaulyEventName = 'CA_CONVERSION' | 'CA_REGIST' | 'CA_PURCHASE' | string;
  interface Window {
    cauly_send(trackCode: string, eventName: CaulyEventName, eventParam: any, type?: 'kakao' | string): string;
  }
}
