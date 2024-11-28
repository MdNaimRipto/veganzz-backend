import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51O6s4VLCDszH51fdVtHC181Q5YQPJgJbWqi2mIeMlR5Gc6txEyFLEngdFhRVS1106PQBENHadrYYZe17fZ1AbHHv00L6aRhoVx",
  {
    appInfo: {
      name: "Veganezz-Backend",
    },
  },
);

const stripeCheckout = async (payload: any) => {
  const { userId, productName, productPrice, quantity } = payload;
  console.log("🚀 ~ userId:", userId);

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: productName,
              images: [
                "https://cdn.kobo.com/book-images/f0b484d6-a550-496f-beb6-813b1a650fe7/353/569/90/False/all-the-colors-of-the-dark-a-read-with-jenna-pick.jpg",
              ],
            },
            unit_amount: productPrice * 100, // Assuming productPrice is in dollars, convert to cents
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

    return { url: checkoutSession.url };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error; // Optionally rethrow or handle the error
  }
};

export const StripeService = {
  stripeCheckout,
};
