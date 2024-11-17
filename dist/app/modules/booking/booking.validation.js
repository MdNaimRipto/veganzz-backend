"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsValidation = void 0;
const zod_1 = require("zod");
const uploadBookingsZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: "userId is Required",
        }),
        productId: zod_1.z.string({
            required_error: "productId is Required",
        }),
        transactionId: zod_1.z.string({
            required_error: "transactionId is Required",
        }),
        cost: zod_1.z.string({
            required_error: "cost is Required",
        }),
        orderId: zod_1.z.string({
            required_error: "orderId is Required",
        }),
        paymentType: zod_1.z.string({
            required_error: "paymentType is Required",
        }),
        quantity: zod_1.z
            .number({
            required_error: "quantity is Required",
        })
            .min(1),
    }),
});
exports.BookingsValidation = {
    uploadBookingsZodSchema,
};
