import { useRef, useState } from "react";
import { Input } from "../../component/ui/Input";
import { Button } from "../../component/ui/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignIn = () => {
const navigate = useNavigate();
//@ts-ignore
const emailRef = useRef<HTMLInputElement>();
//@ts-ignore
const passwordRef = useRef<HTMLInputElement>();
const [isChecked, setIsChecked] = useState(false);
const handleCheckboxChange = (event: any) => {
setIsChecked(event.target.checked);
};

async function signIn() {
try {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/signin`,
    {
        email,
        password,
        isAdmin: isChecked,
    }
    );

    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    toast("You are signed In");
    navigate("/");
} catch (e) {
    alert("some error occured signing In");
    console.log("error" + e);
}
}

return (
<div className="w-full min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex justify-center items-center">
    <div className="w-[400px] p-10 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20">
    <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-white/70">Sign in to your account</p>
    </div>

    <div className="space-y-6">
        <Input reference={emailRef} placeholder="Email" />
        <Input reference={passwordRef} placeholder="Password" />
        <div className="flex">
        <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
        />
        <p>Is Admin</p>
        </div>
        <div className="flex justify-center items-center pt-4">
        <Button
            onClick={signIn}
            variant="primary"
            text="Sign In"
            size="sm"
        />
        </div>
    </div>

    <div className="text-center mt-6">
        <p className="text-white/60 text-sm">
        Don't have an account?{" "}
        <button
            onClick={() => navigate("/signup")}
            className="text-white hover:text-pink-300 underline transition-colors"
        >
            Sign up here
        </button>
        </p>
    </div>
    </div>
</div>
);
};

export default SignIn;
