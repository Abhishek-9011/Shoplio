import { useContext, useRef, useState } from "react";
import { Input } from "../../component/ui/Input";
import { Button } from "../../component/ui/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../../context/UserContext";

const SignIn = () => {
  const navigate = useNavigate();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      toast.success("Successfully signed in!");
      navigate("/");
    } catch (e) {
      toast.error("Error signing in. Please check your credentials.");
      console.error("Sign in error:", e);
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <div className="space-y-5">
          <Input
            reference={emailRef}
            placeholder="Email"
            type="email"
            //@ts-ignore

            className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
          />
          <Input
            reference={passwordRef}
            placeholder="Password"
            type="password"
            //@ts-ignore

            className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              Sign in as admin
            </label>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={signIn}
              variant="primary"
              text="Sign In"
              size="lg"
              //@ts-ignore
              className="w-full mt-2 py-3 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
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
