import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { FastifyInstance } from 'fastify';

async function authPlugin(fastify: FastifyInstance) {
    fastify.register(fastifyJwt, {
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
            if (!user || user.role !== 'ADMIN') {
                return reply.code(403).send({ error: 'Accès interdit. Réservé aux administrateurs.' });
            }
        } catch (err) {
            reply.send(err);
        }
    });

    fastify.decorate('requireBeingMe', async function (request: any, reply: any) {
        try {
            const user = request.user;
            if (!user || (request.params.id !== user.id && user.role !== 'ADMIN')) {
                return reply.code(403).send({ error: 'Accès interdit.'});
            }
        } catch (err) {
            reply.send(err);
        }
    });
}

export default fp(authPlugin);