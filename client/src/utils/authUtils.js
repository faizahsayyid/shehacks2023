export const getAuthHeader = () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const idToken = localStorage.getItem('idToken');

    return { Authorization: `Bearer ${idToken} ${refreshToken}` }
}

export const cacheTokens = (idToken, refreshToken) => {
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('refreshToken', refreshToken);
}

export const clearTokensCache = () => {
    localStorage.setItem('idToken', '')
    localStorage.setItem('refreshToken', '')
}