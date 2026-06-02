import Razorpay from "razorpay";

function lazyProxy<T extends object>(factory: () => T): T {
  let instance: T | null = null;
  return new Proxy({} as T, {
    get(_, prop) {
      if (!instance) {
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
          throw new Error("RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set");
        }
        instance = factory();
      }
      return (instance as any)[prop];
    },
  });
}

export const razorpay = lazyProxy(() => new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
}));
