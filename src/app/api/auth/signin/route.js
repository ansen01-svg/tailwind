import { NextResponse } from "next/server";
import { headers } from "next/headers";
import connectDb from "@/mongo_config/mongo_config";
import User from "@/models/user/user";
import bcryptjs from "bcryptjs";
import generateJwtToken from "@/app/_lib/backend/generate_jwt_token";

connectDb();

export async function POST(request) {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;

    //check if all the credentials are provided
    if (!email || !password) {
      return NextResponse.json(
        { error: "Please provide all the credentials" },
        { status: 400 }
      );
    }

    //check if user exists
    const user = await User.findOne({ email });

    // if user does not exist
    if (!user) {
      return NextResponse.json(
        { error: "Account does not exist. Please sign up" },
        { status: 400 }
      );
    }

    //check if password is correct
    const passwordMatches = await bcryptjs.compare(password, user.password);

    if (!passwordMatches) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 400 }
      );
    }

    //create token
    const token = generateJwtToken(user._id, user.username, user.email);

    const response = NextResponse.json(
      {
        message: "You are now signed in",
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
