const fbq = (args: string) => {
  window.fbq('track', args);
};
export { fbq };
