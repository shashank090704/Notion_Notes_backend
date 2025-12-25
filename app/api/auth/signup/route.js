// // import { NextResponse } from "next/server";
// // import bcrypt from "bcryptjs";
// // import { connectDB } from "@/lib/db";
// // import { signToken } from "@/lib/auth";
// // import User from "@/models/User";

// // export async function POST(req) {
// //   await connectDB();
// //   const { name, email, password } = await req.json();

// //   const exists = await User.findOne({ email });
// //   if (exists) {
// //     return NextResponse.json(
// //       { message: "User already exists" },
// //       { status: 400 }
// //     );
// //   }

// //   const hashedPassword = await bcrypt.hash(password, 10);

// //   const user = await User.create({
// //     name,
// //     email,
// //     password: hashedPassword
// //   });

// //   const token = signToken(user._id);

// //   return NextResponse.json({
// //     token,
// //     user: {
// //       _id: user._id,
// //       name: user.name,
// //       email: user.email
// //     }
// //   });
// // }

// export const runtime = "nodejs";

// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import { connectDB } from "@/lib/db";
// import { signToken } from "@/lib/auth";
// import User from "@/models/User";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const { name, email, password } = await req.json();

//     if (!name || !email || !password) {
//       return NextResponse.json(
//         { message: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     const exists = await User.findOne({ email });
//     if (exists) {
//       return NextResponse.json(
//         { message: "User already exists" },
//         { status: 400 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword
//     });

//     const token = signToken(user._id.toString());

//     return NextResponse.json(
//       {
//         token,
//         user: {
//           _id: user._id,
//           name: user.name,
//           email: user.email
//         }
//       },
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error("REGISTER ERROR:", err);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "@/models/User";

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const body = await req.json();
    console.log("BODY RECEIVED:", body);

    const { name, email, password } = body;

    if (!name || !email || !password) {
      console.log("❌ Missing fields");
      return NextResponse.json(
        { message: "Missing fields" },
        { status: 400 }
      );
    }

    const exists = await User.findOne({ email });
    console.log("USER EXISTS:", !!exists);

    if (exists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    console.log("✅ USER CREATED:", user.email);

    return NextResponse.json(
      {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}

