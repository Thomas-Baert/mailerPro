import { PrismaClient } from '@mailerpro/database';
const prisma = new PrismaClient();

export const findAllUniversities = async () => {
    return prisma.university.findMany();
}