import client from '../api/client.ts'

export const getUniversities = () => client.get('/universities');