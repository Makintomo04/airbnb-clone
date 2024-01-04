import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/db";

interface IParams {
  listingId: string;
}
export async function POST(
  req:Request,
  {params}: {params: IParams}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if(!listingId || typeof listingId !== 'string') {
    return NextResponse.error();
  }

  let favouriteIds = [...(currentUser.favouriteIds || [])];
  favouriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favouriteIds
    }
  });

  return NextResponse.json(user);
  }

  export async function DELETE(
    req:Request,
    {params}: {params: IParams}) {

    const currentUser = await getCurrentUser();
    
  if (!currentUser) {
    return NextResponse.error();
  }
  const { listingId } = params;
  if(!listingId || typeof listingId !== 'string') {
    return NextResponse.error();
  }
  let favouriteIds = [...(currentUser.favouriteIds || [])];
  favouriteIds = favouriteIds.filter((id) => id !== listingId);
  const user = await prisma.user.update({
    where:{
      id: currentUser.id
    },
    data:{
      favouriteIds
    }
    })
  return NextResponse.json(user);
  }  