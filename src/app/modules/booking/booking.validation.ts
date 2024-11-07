import { z } from "zod";

const uploadEBookZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is Required",
    }),
    mainImg: z.string({
      required_error: "Image is Required",
    }),
    otherImages: z.array(
      z.string({ required_error: "Other Images are Required" }),
      {
        required_error: "Other Images Are Required",
      },
    ),
    mainDescription: z.string({
      required_error: "Main Description is Required",
    }),
    subDescription: z.string({
      required_error: "Sub Description is Required",
    }),
  }),
});

export const EBookValidation = {
  uploadEBookZodSchema,
};
