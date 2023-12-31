import {NextResponse} from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function DELETE(request: Request, {params}: {params: IParams}) {
  const currenUser = await getCurrentUser();

  if (!currenUser) {
    return NextResponse.error();
  }

  const {listingId} = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Id");
  }

  const listing = await prisma.listing.deleteMany({
    where: {
      id: listingId,
      userId: currenUser.id,
    },
  });
  return NextResponse.json(listing);
}
