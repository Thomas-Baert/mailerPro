import Fastify from 'fastify';
import AutoLoad from '@fastify/autoload';
import { join } from 'path';

const fastify = Fastify({ logger: true });

fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins')
});

fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: { prefix: '/api' }
});

const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: '0.0.0.0' });
    } catch (err) {
        (fastify.log as any).error(err);
        process.exit(1);
    }
};

start();
