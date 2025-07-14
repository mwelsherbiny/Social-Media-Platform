import { Form, Link } from "react-router-dom";
import Header from "@/components/Header";
import FormFooter from "@/components/FormFooter";
import AUTH_TYPE from "@/constants/authTypes";
import { useAuth } from "../contexts/AuthContext";
import { UseNotification } from "../contexts/NotificationContext";
import notificationTypes from "../constants/notificationTypes";
import newUserSchema from "../schemas/newUserSchema";
import { useState } from "react";

const notificationTime = 5000;

export default function SignUp({ setAuthType }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const switchAuthType = () => {
    setAuthType(AUTH_TYPE.LOGIN);
  };

  const { register } = useAuth();
  const { setTimedNotification } = UseNotification();

  const handleSubmission = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        name: name.trim(),
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      };
      await newUserSchema.validate(userData);
      await register(userData);
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          name="name"
          placeholder="Full Name"
          className="mb-4 p-2 w-full rounded text-black border border-gray-300 focus:outline-none"
        />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          name="username"
          placeholder="Username"
          className="mb-4 p-2 w-full rounded text-black border border-gray-300 focus:outline-none"
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
          Sign Up
        </button>
        <FormFooter>
          <p className="text-gray-500 text-xs mb-2">
            Already have an account?{" "}
            <button onClick={switchAuthType} className="text-blue-500">
              Log In
            </button>
          </p>
        </FormFooter>
      </form>
    </>
  );
}
