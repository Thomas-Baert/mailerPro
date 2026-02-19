import Fastify from 'fastify';
import { PrismaClient } from '@mailerpro/database';

const fastify = Fastify({
    logger: true
});

const prisma = new PrismaClient();

fastify.get('/', async (_request, _reply) => {
    return { hello: 'world', users: await prisma.user.findMany() };
});

const start = async () => {
    try {
        await fastify.listen({ port: 3001 });
    } catch (err) {
        (fastify.log as any).error(err);
        process.exit(1);
    }
};

start();
