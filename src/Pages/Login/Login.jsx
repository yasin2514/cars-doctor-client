import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const password = form.password.value;
        const email = form.email.value;
        setError('');
        setSuccess('');

        signIn(email, password)
            .then(() => {
                setSuccess("login Successfully");
                navigate(from, { replace: true });
                form.reset();
            })
            .catch(error => setError(error.message))

    }
    return (
        <div className="hero min-h-screen bg-gray-50">
            <div className="hero-content w-full">
                <div className="text-center lg:text-left w-1/2">
                    <img src={img} alt="" />
                </div>
                <div className="card w-1/2 shadow-2xl bg-base-100">
                    <div className="card-body w-full py-10">
                        <h1 className="text-5xl font-bold text-center">Login</h1>

                        <form onSubmit={handleLogin} className='space-y-5'>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email" className="input input-bordered" name='email' required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" name='password' required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <div className='mt-5'>
                            <p className='text-center'>New to Car Doctor? <Link className='text-orange-600 hover:underline font-bold' to={'/signUp'}>Sign Up</Link></p>
                            <p className='text-red-600'>{error}</p>
                            <p className='text-green-600'>{success}</p>
                        </div>
                        <SocialLogin
                            setError={setError}
                            setSuccess={setSuccess}
                        ></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;