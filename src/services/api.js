import { Axios } from './Axios';

export async function LoginApi(props) {

    return Axios.post('/login', props);

}

export const logout = async () => {
    return Axios.post('logout',{})
}

export function inviteUser(props) {

    return Axios.post('invite', props)
}

export const confrirmPin =(props) => {

    return Axios.post('confirm-pin',props);
}

export const fetchUser = () => {

    return Axios.get('get-user');
}

// headers={'Content-Type':'application/json','X-Requested-with':'XMLHttpRequest'},
export async function sendRequest(url,method = 'GET', data = {}, isAuthenticated = true) {
    const config = {
        url,
        method,
        // headers,
        data
    }
    return Axios(config);
}