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
            username: { type: 'string' },
            password: { type: 'string' }
        },
        anyOf: [
            { required: ['email'] },
            { required: ['id'] },
            { required: ['username'] }
        ]
    }
}

const registerSchema = {
    body: {
        type: 'object',
        required: ['username', 'email', 'password', 'surname', 'firstName', 'birthDate', 'address', 'phoneNumber'],
        properties: {
            username: { type: 'string' },
            password: { type: 'string' },
            surname: { type: 'string' },
            firstname: { type: 'string' },
            birthDate: { type: 'string' },
            address: { type: 'string' },
            phoneNumbers: { type: 'string' },
            email: { type: 'string' }
        }
    }
}

async function auth(user: any, password: string, fastify: FastifyInstance, reply: any): Promise<{ token: string }> {
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
        const { email, id, username, password } = request.body;

        let user: any;
        if (email) user = await clientRepo.findClientByEmail(email);
        else if (id) user = await clientRepo.findClientById(id);
        else if (username) user = await clientRepo.findClientByUsername(username);

        return auth(user, password, fastify, reply);
    });

    fastify.post('/register', { schema: registerSchema }, async (request: any, reply: any) => {
        const {
            username,
            email,
            password,
            surname,
            firstName,
            birthDate,
            address,
            phoneNumber
        } = request.body;

        try {
            const hashedPassword: string = await bcrypt.hash(password, 10);
            await clientRepo.createClient({ email, password: hashedPassword, surname, firstName, birthDate, address, phoneNumber, username });
            const user: any = await clientRepo.findClientByUsername(username);
            const token: string = fastify.jwt.sign({ id: user.id, role: user.role });

            return { token };
        } catch (e) {
            return reply.code(500).send();
        }
    });

    fastify.get('/me', { preValidation: [fastify.authenticate] }, async (request: any) => {
        const userId = request.user.id;
        return clientRepo.findClientById(userId);
    });
}
