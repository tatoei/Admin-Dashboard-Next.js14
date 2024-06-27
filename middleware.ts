import NextAuth from "next-auth";
import { authConfig } from "./app/authconfig"; // ตั้งค่าเส้นทางให้ตรงกับโครงสร้างโปรเจกต์ของคุณ

export default NextAuth(authConfig).auth;

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next).*)'],
}
