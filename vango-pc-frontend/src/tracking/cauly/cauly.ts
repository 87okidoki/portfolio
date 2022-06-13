const caulySend = (eventName: CaulyEventName, eventParam: any) => {
  window.cauly_send('a3472de3-64fd-4b4d-9a97-da6eddf654e2', eventName, eventParam);
};
export { caulySend };
