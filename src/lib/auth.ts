import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getIdFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  if (!token) return null;

  try {
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET_KEY!);
    if (typeof decoded === "string") return decoded;
    if (typeof decoded === "object" && "id" in decoded) return decoded.id as string;
    return null;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}