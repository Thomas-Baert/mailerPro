import client from '../api/client.ts'

export const getClients = () => {
    return client.get('/mailerpro-api/api/clients');
}

export const getClientById = (id: string) => {
    return client.get(`/mailerpro-api/api/clients/getById/${id}`);
}

export const getClientByUsername = (username: string) => {
    return client.get(`/mailerpro-api/api/clients/getByUsername/${username}`);
}

export const createClient = (data: any) => {
    return client.post('/mailerpro-api/api/clients/create', data);
}