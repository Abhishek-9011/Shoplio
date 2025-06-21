import { useContext, useRef, useState } from "react";
import { Input } from "../../component/ui/Input";
import { Button } from "../../component/ui/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../../context/UserContext";

const SignUp = () => {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState(false);
  const { setUser } = useContext(UserContext);

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  async function signUp() {
    try {
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
      setUser({
        username,
        email,
        address,
        isChecked,
      });
      navigate("/signin");
      toast.success("Account created successfully!");
    } catch (e) {
      toast.error("Error during sign up. Please try again.");
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Join our community today</p>
        </div>

        <div className="space-y-5">
          <Input
            reference={usernameRef}
            placeholder="Username"
            //@ts-ignore
            className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
          />
          <Input
            reference={emailRef}
            placeholder="Email"
            type="email"
            //@ts-ignore
            className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
          />
          <Input
            reference={addressRef}
            placeholder="Address"
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
              Register as admin
            </label>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={signUp}
              variant="primary"
              text="Sign Up"
              size="lg"
              //@ts-ignore
              className="w-full mt-2 py-3 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
