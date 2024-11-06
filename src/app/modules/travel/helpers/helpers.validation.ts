import { z } from "zod";
import { TravelHelperCategoryEnumsTypesEnums } from "./helpers.contstant";

const uploadTravelHelperZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is Required",
    }),
    image: z.string({
      required_error: "Image is Required",
    }),
    description: z.string({
      required_error: "Description is Required",
    }),
    category: z.enum(
      [...TravelHelperCategoryEnumsTypesEnums] as [string, ...string[]],
      {
        required_error: "Category is Required",
      },
    ),
    helperFor: z.string({
      required_error: "Helper For Mongo ID is Required",
    }),
  }),
});

export const travelHelpersValidation = {
  uploadTravelHelperZodSchema,
};
