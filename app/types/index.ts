import {Listing, User} from "@prisma/client";

export type safeListings = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

//ignore this file. used for type conversation
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
