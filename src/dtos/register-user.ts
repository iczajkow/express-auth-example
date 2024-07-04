import { z } from "zod";

export const RegisterOrLoginUserDto = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type RegisterOrLoginUserDto = z.infer<typeof RegisterOrLoginUserDto>;
