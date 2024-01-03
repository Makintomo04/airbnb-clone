import prisma from "@/app/libs/db"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";
export async function POST (req:Request, res:Response) {
  const body = await req.json();

  const {email,name,password} = body

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword: await bcrypt.hash(password, 12)
    }
  })

  return NextResponse.json(user)
}