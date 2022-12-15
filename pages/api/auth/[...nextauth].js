import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import connectToDatabase from "../../../lib/db";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        const client = await connectToDatabase();
        const db = client.db(process.env.MONGODB_DB);
        const collection = db.collection("users");

        const user = await collection.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found!");
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Invalid email or password!");
        }
        return { email: user.email };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
