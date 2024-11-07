import { z } from "zod";

const uploadBeautyZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is Required",
    }),
    image: z.string({
      required_error: "Image is Required",
    }),
    type: z.string({
      required_error: "Product Type is Required",
    }),
    description: z.string({
      required_error: "Description is Required",
    }),
    link: z.string({
      required_error: "Product Link is Required",
    }),
  }),
});

export const beautyValidation = {
  uploadBeautyZodSchema,
};
