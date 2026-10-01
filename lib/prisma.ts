import { PrismaClient } from "@prisma/client";

// Re-instantiate if schema updated
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Clear stale cached client if schema updated
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = undefined;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

