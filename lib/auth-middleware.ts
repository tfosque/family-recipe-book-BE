// lib/auth-middleware.js
import { auth } from "./firebase-admin";

export function authMiddleware(handler: any) {
  return async (req: any, res: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split("Bearer ")[1];
    try {
      const decodedToken = await auth.verifyIdToken(token);
      req.user = decodedToken;
      return handler(req, res);
    } catch (error) {
      console.error("Error verifying Firebase ID token:", error);
      return res.status(401).json({ error: "Unauthorized" });
    }
  };
}
