export const extractSenderFromEvents = async (events: any[]) => {
  try {
    const signerEvent = events.find((e) => e.type === 'signer');
    if (!signerEvent) return null;
    const addr = signerEvent.attributes.find(
      (a) => a.key === 'ZXZtX2FkZHI=' || a.key === 'c2VpX2FkZHI=',
    )?.value;
    return addr ? Buffer.from(addr, 'base64').toString('utf8') : null;
  } catch {
    return null;
  }
};
