import * as univRepo from '../../repositories/universities.repository';
import { FastifyInstance } from 'fastify';

export default async function universityRoutes(fastify: FastifyInstance) {
    fastify.get('/', async () => {
        return univRepo.findAllUniversities();
    });
}