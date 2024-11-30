import Stripe from "stripe";
import { stripe } from "../../../app";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import config from "../../../config/config";
import { IMetaData, IOrder } from "../order/order.interface";
import { Orders } from "../order/order.schema";
import { EBook } from "../eBook/eBook.schema";

// const stripe = new Stripe(config.stripe_key, {
//   appInfo: {
//     name: "Veganezz-Backend",
//   },
// });

const stripeCheckout = async (payload: any) => {
  const {
    userId,
    quantity,
    orderDate,
    orderType,
    productId,
    location,
    price,
    orderStatus,
    pdf,
  } = payload;

  const isProductExists = await EBook.findOne({ _id: productId });
  if (!isProductExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product Not Found");
  }

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: isProductExists.name,
              images: [isProductExists.image],
            },
            unit_amount: isProductExists.price * 100, // Assuming productPrice is in dollars, convert to cents
          },
          quantity: quantity,
        },
      ],
      success_url: `http://localhost:3000/myprofile`,
      cancel_url: `http://localhost:3000`,
      metadata: {
        userId,
        productId,
        quantity,
        orderDate,
        orderType,
        location,
        price,
        orderStatus,
        pdf,
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
