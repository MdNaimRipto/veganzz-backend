import { z } from "zod";
import { EBookTypeEnums } from "./eBook.constant";

const uploadEBookZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is Required",
    }),
    image: z.string({
      required_error: "Image is Required",
    }),
    mainDescription: z.string({
      required_error: "Main Description is Required",
    }),
    subDescription: z.string({
      required_error: "Sub Description is Required",
    }),
    productType: z.enum([...EBookTypeEnums] as [string, ...string[]], {
      required_error: "Type is required",
    }),
  }),
});

export const EBookValidation = {
  uploadEBookZodSchema,
};
