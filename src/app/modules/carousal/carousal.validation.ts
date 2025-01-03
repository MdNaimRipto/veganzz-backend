import { z } from "zod";

const uploadCarousalZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is Required",
    }),
    image: z.string({
      required_error: "image is Required",
    }),
    textSize: z.string({
      required_error: "textSize is Required",
    }),
    textWeight: z.string({
      required_error: "textWeight is Required",
    }),
    textColor: z.string({
      required_error: "textColor is Required",
    }),
  }),
});

export const CarousalsValidation = {
  uploadCarousalZodSchema,
};
