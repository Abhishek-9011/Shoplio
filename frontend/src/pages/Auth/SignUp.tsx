import { useRef, useState } from "react";
import { Input } from "../../component/ui/Input";
import { Button } from "../../component/ui/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  async function signUp() {
    try{
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const address = addressRef.current?.value;
    const password = passwordRef.current?.value;
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      email,
      address,
      isAdmin: isChecked,
    });

    navigate("/signin");
    alert("You have signed Up");}
    catch (e){
        alert("Some error occured during sign up")
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex justify-center items-center">
      <div className="w-[400px] p-10 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-white/70">Join us today</p>
        </div>

        <div className="space-y-6">
          <Input reference={usernameRef} placeholder="UserName" />
          <Input reference={emailRef} placeholder="Email" />
          <Input reference={addressRef} placeholder="Address" />
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
              onClick={signUp}
              variant="primary"
              text="Sign Up"
              size="sm"
            />
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-white hover:text-blue-300 underline transition-colors"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
