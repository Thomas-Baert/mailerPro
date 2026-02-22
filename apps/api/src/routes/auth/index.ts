import { FastifyInstance } from 'fastify';
import * as clientRepo from '../../repositories/client.repository';
import * as bcrypt from 'bcrypt';

const loginSchema = {
    body: {
        type: 'object',
        required: ['password'],
        properties: {
            email: { type: 'string', format: 'email' },
            id: { type: 'string' },
            password: { type: 'string' }
        },
        anyOf: [
            { required: ['email'] },
            { required: ['id'] }
        ]
    }
}

async function auth(user: any, password: string, fastify: FastifyInstance, reply: any): Promise<{token: string}> {
    if (!user) {
        return reply.code(401).send({ error: 'Email ou mot de passe incorrect.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return reply.code(401).send({ error: 'Email ou mot de passe incorrect.' });
    }

    const token = fastify.jwt.sign({ id: user.id, role: user.role });

    return { token };
}

export default async function authRoutes(fastify: FastifyInstance) {
    fastify.post('/login', { schema: loginSchema }, async (request: any, reply: any) => {
        const { email, id, password } = request.body;

        let user: any;
        if (email) user = await clientRepo.findClientByEmail(email);
        else if (id) user = await clientRepo.findClientById(id);

        return auth(user, password, fastify, reply);
    });
}
