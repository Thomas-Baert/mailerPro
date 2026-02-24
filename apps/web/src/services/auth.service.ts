import client from '../api/client.ts'

export const login = (credentials: any) => {
    return client.post('/auth/login', credentials);
}

export const register = (data: any) => {
    return client.post('/auth/register', data);
}

export const getMe = () => client.get('/auth/me').then(res => res.data);