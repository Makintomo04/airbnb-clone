import prisma from "@/app/libs/db";

import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favourites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favouriteIds || [])]
        }
      }
    });

    const safeFavorites = favourites.map((favourite) => ({
      ...favourite,
      createdAt: favourite.createdAt.toString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}