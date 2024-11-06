import { z } from "zod";

const uploadTravelsZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "User Name is Required",
    }),
    image: z.string({
      required_error: "Image is Required",
    }),
    location: z.string({
      required_error: "Location is Required",
    }),
    state: z.string({
      required_error: "State is Required",
    }),
    description: z.string({
      required_error: "Description is Required",
    }),
    watchOutFor: z.string({
      required_error: "Watch Out For is Required",
    }),
  }),
});

export const travelsValidation = {
  uploadTravelsZodSchema,
};
