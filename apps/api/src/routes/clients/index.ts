import * as clientRepo from '../../repositories/client.repository';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { Prisma } from "@mailerpro/database";

const clientResponseSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
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

const getClientSchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'string' }
        }
    }
}

const createClientSchema = {
    body: {
        type: 'object',
        required: ['email', 'password', 'surname', 'firstName', 'birthDate', 'address', 'phoneNumber'],
        properties: {
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

interface ClientParams {
    id: string;
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

    fastify.get('/:id', {
        schema: getClientSchema,
        preValidation: [fastify.authenticate, fastify.requireBeingMe]
    }, async (request: FastifyRequest<{ Params: ClientParams }>) => {
        return clientRepo.findClientById(request.params.id);
    });

    fastify.post('/create', {
        schema: createClientSchema
    }, async (request: FastifyRequest<{ Body: Prisma.ClientCreateInput }>) => {
        return clientRepo.createClient(request.body);
    })
}