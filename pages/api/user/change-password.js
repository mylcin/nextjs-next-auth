import { getSession } from "next-auth/react";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import connectToDatabase from "../../../lib/db";

async function handler(req, res) {
  if (req.method === "PATCH") {
    const session = await getSession({ req: req });
    if (!session) {
      return res.status(401).json({ message: "Not authenticated!" });
    }
    const userEmail = session.user.email;
    const { oldPassword, newPassword } = req.body;

    const client = await connectToDatabase();
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("users");
    const user = await collection.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const currentPassword = user.password;
    const isValid = await verifyPassword(oldPassword, currentPassword);
    if (!isValid) {
      return res
        .status(403)
        .json({ message: "Old password is incorrect! Try again." });
    }
    if (newPassword.trim().length < 6 || !newPassword) {
      return res
        .status(403)
        .json({ message: "New password is too short. Try again." });
    }
    if (newPassword === oldPassword) {
      return res.status(403).json({
        message:
          "The new password must be different from the old one! Try again.",
      });
    }
    const hashedPassword = await hashPassword(newPassword);
    await collection.updateOne(
      { email: userEmail },
      { $set: { password: hashedPassword } }
    );
    return res.status(200).json({ message: "New password updated." });
  }
}
export default handler;
