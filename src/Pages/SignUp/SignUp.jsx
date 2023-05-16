import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { useContext, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { updateProfile } from 'firebase/auth';


const SignUp = () => {
    const { createUser } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSignUp = event => {
        event.preventDefault();
        const form = event.target;
        const password = form.password.value;
        const email = form.email.value;
        const name = form.name.value;
        setError('');
        setSuccess('');
        if (password.length < 6) {
            setError("password must be 6 character")
        }
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                updateUserInfo(user, name);
                setSuccess("User Created Successfully");
                form.reset()
            })
            .catch(error => setError(error.message))

    }
    const updateUserInfo = (user, displayName) => {
        updateProfile(user, {
            displayName
        })
            .then(() => console.log('profileUpdate'))
            .catch(error => console.log(error.message))
    }
    return (
        <div className="hero min-h-screen bg-gray-50">
            <div className="hero-content w-full">
                <div className="text-center lg:text-left w-1/2">
                    <img src={img} alt="" />
                </div>
                <div className="card w-1/2 shadow-2xl bg-base-100">
                    <div className="card-body w-full py-10">
                        <h1 className="text-5xl font-bold text-center">SignUp</h1>

                        <form onSubmit={handleSignUp} className='space-y-5'>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name" className="input input-bordered" name='name' required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email" className="input input-bordered" name='email' required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" name='password' required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="SignUp" />
                            </div>
                        </form>
                        <div className='mt-5'>
                            <p className='text-center'>Already have an account? <Link
                                className='text-orange-600 hover:underline font-bold' to={'/login'}>Login</Link></p>

                            <p className='text-red-600'>{error}</p>
                            <p className='text-green-600'>{success}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;