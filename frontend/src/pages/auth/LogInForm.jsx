import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header.jsx";
import FormFooter from ".//FormFooter.jsx";
import AUTH_TYPE from "@/constants/authTypes";
import { UseNotification } from "@/contexts/NotificationContext";
import signedUserSchema from "@/schemas/signedUserSchema";
import notificationTypes from "@/constants/notificationTypes";

const notificationTime = 5000;

export default function LogIn({ setAuthType }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { setTimedNotification } = UseNotification();

  const handleSubmission = async (e) => {
    e.preventDefault();

    const userData = {
      email: email.trim(),
      password: password.trim(),
    };

    try {
      await signedUserSchema.validate(userData);
      await login(userData);
    } catch (error) {
      const errorMessage = error.response?.data?.error
        ? error.response.data.error
        : error.message;
      setTimedNotification(
        { text: errorMessage, type: notificationTypes.error },
        notificationTime
      );
    }
  };

  const switchAuthType = () => {
    setAuthType(AUTH_TYPE.SIGNUP);
  };

  return (
    <>
      <form
        onSubmit={handleSubmission}
        className="flex flex-col items-center bg-white w-4/5 h-4/5 max-w-md p-6 rounded"
      >
        <Header />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          id="email"
          placeholder="Email address"
          className="mb-4 p-2 w-full rounded text-black border-1 border-gray-300 focus:outline-none mt-6"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="mb-4 p-2 w-full rounded text-black border border-gray-300 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
        >
          Log In
        </button>
        <FormFooter>
          <p className="text-gray-500 text-xs mb-2">
            Don't have an account?{" "}
            <button
              onClick={switchAuthType}
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </FormFooter>
      </form>
    </>
  );
}
