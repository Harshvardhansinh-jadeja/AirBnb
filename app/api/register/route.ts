import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import {NextApiResponse} from "next";
import {NextResponse} from "next/server";

export async function POST(request: Request, res: NextResponse) {
  const body = await request.json();
  const {email, name, password} = body;

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });
  // return NextResponse.json(user);
  // res.status(200).json(user);

  // return new Response(JSON.stringify(user), {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  return user;
}
