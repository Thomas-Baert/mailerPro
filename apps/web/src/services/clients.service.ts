import client from '../api/client.ts'

export const getClients = () => {
    return client.get('/clients');
}

export const getClientById = (id: string) => {
    return client.get(`/clients/getById/${id}`);
}

export const getClientByUsername = (username: string) => {
    return client.get(`/clients/getByUsername/${username}`);
}

export const createClient = (data: any) => {
    return client.post('/clients/create', data);
}

export const getMe = () => client.get('/auth/me');