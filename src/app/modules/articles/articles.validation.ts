import { z } from "zod";

const uploadArticleZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is Required",
    }),
    image: z.string({
      required_error: "image is Required",
    }),
    description: z.array(z.string({ required_error: "Description Required" }), {
      required_error: "Description Required",
    }),
  }),
});

export const ArticlesValidation = {
  uploadArticleZodSchema,
};
