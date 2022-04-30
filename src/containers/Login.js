import { useState } from 'react'
import { Axios } from '../services/Axios'
import { useNavigate } from 'react-router-dom'
import { setLoading } from '../store/loaderSlice'
import { useDispatch } from 'react-redux'
export default function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userData, setUserData] = useState({ username: '', password: '' })

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {
            dispatch(setLoading(true))
            const { data } = await Axios.post('auth/login', userData)
            dispatch(setLoading(false))
            data && localStorage.setItem('_token', data.access_token)
            navigate('/dashboard')

        } catch (error) {
            console.log('error', error)
        }
    }
    return (
        <div className="maincontainer">
            <div class="container-fluid">
                <div class="row no-gutter">
                    <div class="col-md-6 d-none d-md-flex bg-image"></div>
                    <div class=" col-md-6 bg-light">
                        <div class="login d-flex align-items-center py-5">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-10 col-xl-7 mx-auto">
                                        <h3 class="display-4">Hi Turing Tech!</h3>
                                        <form>
                                            <div class="mb-3 mt-3">
                                                <input id="inputUsername" type="text" placeholder="Enter username" onChange={(e) => setUserData({ ...userData, username: e.target.value })} required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" />
                                            </div>
                                            <div class="mb-3 mt-3">
                                                <input id="inputPassword" type="password" placeholder="Password" onChange={(e) => setUserData({ ...userData, password: e.target.value })} required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                                            </div>
                                            <div class="form-check">
                                                <input id="customCheck1" type="checkbox" checked class="form-check-input" />
                                                <label for="customCheck1" class="form-check-label">Remember password</label>
                                            </div>
                                            <div class="d-grid gap-2 mt-2">
                                                <button type="submit" onClick={handleSubmit} class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Sign in</button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
