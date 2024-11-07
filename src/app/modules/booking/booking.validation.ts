import { z } from "zod";

const uploadBookingsZodSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: "userId is Required",
    }),
    productId: z.string({
      required_error: "productId is Required",
    }),
    transactionId: z.string({
      required_error: "transactionId is Required",
    }),
    cost: z.string({
      required_error: "cost is Required",
    }),
    quantity: z
      .number({
        required_error: "quantity is Required",
      })
      .min(1),
  }),
});

export const BookingsValidation = {
  uploadBookingsZodSchema,
};
