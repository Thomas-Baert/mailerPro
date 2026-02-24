export function tokenRegister(token: string) {
    localStorage.setItem('token', token);
    return token;
}

export function tokenRemove() {
    localStorage.removeItem('token');
}