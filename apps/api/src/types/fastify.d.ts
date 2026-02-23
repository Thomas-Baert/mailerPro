import { JWT } from '@fastify/jwt';

declare module 'fastify' {
    interface FastifyInstance {
        jwt: JWT;
        authenticate: any;
        requireAdmin: any;
        requireBeingMe: any;
    }
}
