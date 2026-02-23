import { PrismaClient } from '@mailerpro/database';
import { Prisma } from "@mailerpro/database";
const prisma = new PrismaClient();

export const findAllClients = async () => {
    return prisma.client.findMany();
}

export const findClientById = async (id: string) => {
    return prisma.client.findUnique({ where: { id: id } });
}

export const findClientByEmail = async (email: string) => {
    return prisma.client.findUnique({ where: { email: email } });
}

export const findClientByUsername = async (username: string) => {
    return prisma.client.findUnique({ where: { username: username } });
}

export const createClient = async (data: Prisma.ClientCreateInput) => {
    return prisma.client.create({ data });
}

export const deleteClient = async (id: string) => {
    return prisma.client.delete({ where: { id: id } });
}

export const updateClient = async (id: string, data: Prisma.ClientUpdateInput) => {
    return prisma.client.update({ where: { id: id }, data });
}