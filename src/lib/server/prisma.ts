import { PrismaClient } from "@prisma/client";
import { Redis } from "ioredis"

const prisma = global.prisma || new PrismaClient();
const redis = global.redis || new Redis();

if (process.env.NODE_ENV === "development"){
    global.prisma = prisma;
    global.redis = redis;
}
    
export { prisma, redis }