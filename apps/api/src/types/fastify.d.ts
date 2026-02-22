import '@fastify/jwt';

declare module 'fastify' {
    export interface FastifyInstance {
        authenticate: any;
        requireAdmin: any;
        requireBeingMe: any;
    }
}

declare module '@fastify/jwt' {
    interface FastifyJWT {
        payload: { id: string; role: string };
        user: {
            id: string;
            role: string;
        };
    }
}
