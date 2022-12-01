import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const signToken = ({email}: {email: string}, time: string | number) => {
    return jwt.sign({ email }, process.env.JWT_SECRET_KEY!, {
        expiresIn: time
    });
}

export const encodeToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY!);
}