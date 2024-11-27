import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51O6s4VLCDszH51fdVtHC181Q5YQPJgJbWqi2mIeMlR5Gc6txEyFLEngdFhRVS1106PQBENHadrYYZe17fZ1AbHHv00L6aRhoVx",
  {
    apiVersion: "2024-11-20.acacia",
    appInfo: {
      name: "Veganezz-Backend",
    },
  },
);

const stripeCheckout = async (payload: any) => {
  const { userId, productName, productPrice, quantity } = payload;

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: productName,
          },
          unit_amount: productPrice,
        },
        quantity: quantity,
      },
    ],
    success_url: `http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:3000`,
    metadata: {
      userId,
    },
  });

  return checkoutSession;
};

export const StripeService = {
  stripeCheckout,
};
