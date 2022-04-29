export default function authHeader() {

    // const _token = localStorage.getItem('_token');
    
    //  const _token = store.getState().user.token;
    const _token = localStorage.getItem('_token');

    if (_token) {
        return { Authorization: `Bearer ${_token}` }
    }

    return {}
}
