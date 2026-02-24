import client from '../api/client.ts'

export const login = (credentials: any) => {
    return client.post('/mailerpro-api/api/auth/login', credentials);
}

export const register = (data: any) => {
    return client.post('/mailerpro-api/api/auth/register', data);
}