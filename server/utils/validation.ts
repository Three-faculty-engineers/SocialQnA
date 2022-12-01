import { z } from "zod";

export const registerSchema = z.object({
    username: z.string({
        required_error: "Username is required!",
    }).min(3, {
        message: "Username must be greater then 3 characters"
    }),

    password: z.string({
        required_error: "Password is required!"
    }).min(6, {
        message: "Password must be 6 or more characters long!"
    }),

    confirmPassword: z.string({
        required_error: "Confirm password is required"
    }).min(6, {
        message: "Confirm password must be 6 or more characters long!"
    }),

    email: z.string({
        required_error: "Email is required!"
    }).email({
        message: "Email is in wrong format!"
    })

})
.refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirm"]
})

export const loginSchema = z.object({
    email: z.string({
        required_error: "Email is required!"
    }).email({
        message: "Email is in wrong format!"
    }),
    
    password: z.string({
        required_error: "Password is required!"
    }).min(6, {
        message: "Password must be 6 or more characters long!"
    }),
})

export const updateUserSchema = z.object({
    email: z.string({
        required_error: "Email is required!"
    }).email({
        message: "Email is in wrong format!"
    }),

    password: z.string({
        required_error: "Password is required!"
    }).min(6, {
        message: "Password must be 6 or more characters long!"
    }).optional(),

    username: z.string({
        required_error: "Username is required!",
    }).min(3, {
        message: "Username must be greater then 3 characters"
    }).optional(),
})