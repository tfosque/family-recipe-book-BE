// import admin from '../../firebaseAdmin';
import admin from "firebase-admin";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  try {
    const auth = admin.auth();
    const userRecord = await auth.getUserByEmail(email);

    // Firebase Admin SDK doesn't have a direct signInWithEmailAndPassword method
    // Instead, we create a custom token and return it to the client
    const customToken = await auth.createCustomToken(userRecord.uid);

    res.status(200).json({ token: customToken });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(401).json({ error: "Authentication failed" });
  }
}
