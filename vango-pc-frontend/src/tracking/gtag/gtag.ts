const gtagEvent = (eventName: string, eventParam: any) => {
  window.gtag('event', eventName, eventParam);
};
export { gtagEvent };
