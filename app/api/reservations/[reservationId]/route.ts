import { NextResponse } from "next/server";
import prisma from "@/app/libs/db";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  reservationId: string;
}
export async function DELETE (req:Request,{params}: {params: IParams}){
  try {
  const currentUser = await getCurrentUser();
  if(!currentUser){
    return NextResponse.error();
  }
  const { reservationId } = params;
  if(!reservationId || typeof reservationId !== 'string') {
    return NextResponse.error();
  }
  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser.id },
        { listing: { userId: currentUser.id } }
      ]
    }
  });


return NextResponse.json(reservation);
}
catch (error:any) {
    throw new Error(error);
}
}