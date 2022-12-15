import { hashPassword } from "../../../lib/auth";
import connectToDatabase from "../../../lib/db";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password } = data;
    if (
      !email ||
      !email.includes("@" && ".") ||
      email.trim() === "" ||
      !password ||
      password.trim().length < 6
    ) {
      return res
        .status(422)
        .json({ message: "Invalid email or password input!" });
    }
    const client = await connectToDatabase();
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection("users");

    const existingUser = await collection.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }
    const hashedPassword = await hashPassword(password);
    await collection.insertOne({
      email: email,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "Created user successfully." });
  }
}

export default handler;
