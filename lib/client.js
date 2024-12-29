// import { PrismaClient } from "@prisma/client";

// let prisma = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

// export default prisma;
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default prisma;
