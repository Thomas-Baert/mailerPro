import * as clientRepo from '../../repositories/client.repository';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { Prisma } from "@mailerpro/database";

const clientResponseSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        username: { type: 'string' },
        surname: { type: 'string' },
        firstname: { type: 'string' },
        birthDate: { type: 'string' },
        address: { type: 'string' },
        phoneNumbers: { type: 'string' },
        email: { type: 'string' }
    }
}

const clientsResponseSchema = {
    type: 'array',
    items: clientResponseSchema
}

const getClientByIdSchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' }
        }
    }
}

const getClientByUsernameSchema = {
    params: {
        type: 'object',
        properties: {
            username: { type: 'string' }
        }
    }
}

const createClientSchema = {
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

interface ClientByIdParams {
    id: string;
}

interface ClientByUsernameParams {
    username: string;
}

export default async function clientRoutes(fastify: FastifyInstance) {
    fastify.get('/', {
        schema: {
            response: { 200: clientsResponseSchema }
        },
        preValidation: [fastify.authenticate, fastify.requireAdmin]
    }, async () => {
        return clientRepo.findAllClients();
    });

    fastify.get('/getById/:id', {
        schema: getClientByIdSchema,
        preValidation: [fastify.authenticate, fastify.requireBeingMe]
    }, async (request: FastifyRequest<{ Params: ClientByIdParams }>) => {
        return clientRepo.findClientById(request.params.id);
    });

    fastify.get('/getByUsername/:username', {
        schema: getClientByUsernameSchema,
        preValidation: [fastify.authenticate, fastify.requireBeingMe]
    }, async (request: FastifyRequest<{ Params: ClientByUsernameParams }>) => {
        return clientRepo.findClientByUsername(request.params.username);
    });

    fastify.post('/create', {
        schema: createClientSchema
    }, async (request: FastifyRequest<{ Body: Prisma.ClientCreateInput }>) => {
        return clientRepo.createClient(request.body);
    })
}