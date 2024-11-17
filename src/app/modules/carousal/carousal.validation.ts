import { z } from "zod";

const uploadCarousalZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is Required",
    }),
    image: z.string({
      required_error: "image is Required",
    }),
  }),
});

export const CarousalsValidation = {
  uploadCarousalZodSchema,
};
