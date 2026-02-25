import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { FastifyInstance } from 'fastify';

async function authPlugin(fastify: FastifyInstance) {
    await fastify.register(fastifyJwt as any, {
        secret: process.env.JWT_SECRET || 'supersecret_change_me_in_prod!' // fallback used for dev
    });

    fastify.decorate('authenticate', async function (request: any, reply: any) {
        try {
            await request.jwtVerify();
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.decorate('requireAdmin', async function (request: any, reply: any) {
        try {
            const user = request.user;
            if (!user || user.role !== 'GLOBAL_ADMIN') {
                return reply.code(403).send({ error: 'Accès interdit. Réservé aux administrateurs globaux.' });
            }
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.decorate('requireRole', (roles: string[]) => {
        return async (request: any, reply: any) => {
            const user = request.user;
            if (!user || !roles.includes(user.role)) {
                return reply.code(403).send({ error: `Accès interdit. Rôles requis: ${roles.join(', ')}` });
            }
        };
    });

    fastify.decorate('requireBeingMe', async function (request: any, reply: any) {
        try {
            const user = request.user;
            if (!user || (request.params.id !== user.id && user.role !== 'GLOBAL_ADMIN')) {
                return reply.code(403).send({ error: 'Accès interdit.' });
            }
        } catch (err) {
            reply.send(err);
        }
    });
}

export default fp(authPlugin as any);
