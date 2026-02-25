import client from '../api/client.ts'

export const getUniversities = () => client.get('/universities');

export const createUniversity = (data: { name: string, logo?: string }) => {
    return client.post('/universities', data);
}