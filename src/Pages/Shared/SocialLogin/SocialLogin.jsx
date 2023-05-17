import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = ({ setError, setSuccess }) => {
    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from.pathname || '/';

    const googleLogin = () => {
        googleSignIn()
            .then(() => {
                setSuccess("Google Login Successfully");
                navigate(from, { replace: true });
            })
            .catch(error => {
                setError(error.message);
            })
    }
    return (
        <div>
            <div className="divider">OR</div>
            <div className="text-center">
                <button onClick={googleLogin} className="btn btn-circle btn-outline text-2xl">
                    G
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;