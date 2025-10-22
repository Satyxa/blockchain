export const extractFee = async (tx: any) => {
  try {
    const raw = tx.tx;
    if (!raw) return null;
    const decoded = Buffer.from(raw, 'base64').toString('utf8');
    return decoded.match(/fee"?\s*[:=]\s*"?(\d+)/)?.[1] || null;
  } catch {
    return null;
  }
};
