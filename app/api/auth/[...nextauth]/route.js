import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import Fanuser from "@/models/Fanuser"
import Payment from "@/models/Payment";
import connectDB from "@/db/connectDB";

console.log("GITHUB_ID:", process.env.GITHUB_ID);
console.log("GITHUB_SECRET:", process.env.GITHUB_SECRET);


const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,


    }),


  ],
  secret: process.env.NEXTAUTH_SECRET,


  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "github") {
        try {
          await connectDB();

          const email = user.email;

          if (!email) {
            console.error("Email not found in user object");
            return false;
          }

          let existingUser = await Fanuser.findOne({ email });

          if (!existingUser) {
            const newUser = new Fanuser({
              email,
              username: email.split("@")[0],
              name: user.name || "",
              profilepic: user.image || ""
            });

            await newUser.save(); // 🔑 this was missing

            user.name = newUser.username;
          } else {
            user.name = existingUser.username;
          }

          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }

      return true;
    },

    async session({ session }) {
      try {
        await connectDB();
        const dbUser = await Fanuser.findOne({ email: session.user.email });

        if (dbUser) {
          session.user.name = dbUser.username;
        }

        return session;
      } catch (error) {
        console.error("Session callback error:", error);
        return session;
      }
    }



    // Optional: customize pages, callbacks, etc.
  }
});

export { authoptions as GET, authoptions as POST };
