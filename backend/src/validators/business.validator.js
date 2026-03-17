const { z } = require("zod");

const registerSchema = z.object({
  businessName: z.string().min(2),
  ownerName: z.string().min(2),
  email: z.string().email(),
  businessType: z.string().min(2),
  phone: z.string().min(10),
  alternatePhone: z.string().optional(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  address: z.string().min(3),
  city: z.string(),
  state: z.string(),
  pincode: z.string(),
  description: z.string().optional(),
  gstNumber: z.string().optional(),
  panNumber: z.string().optional()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

module.exports = {
  registerSchema,
  loginSchema
};