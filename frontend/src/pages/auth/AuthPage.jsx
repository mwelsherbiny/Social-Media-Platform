import { useState } from "react";
import LogInForm from "./LogInForm";
import SignUpForm from "./SignUpForm";
import AUTH_TYPE from "@/constants/authTypes";

export default function Auth() {
  const [authType, setAuthType] = useState(AUTH_TYPE.LOGIN);

  return (
    <div className="h-screen flex items-center justify-center min-h-screen [background:linear-gradient(315deg,_#feda75,_#fa7e1e,_#d62976,_#962fbf,_#4f5bd5)] bg-no-repeat bg-fixed bg-cover">
      {authType === AUTH_TYPE.LOGIN ? (
        <LogInForm setAuthType={setAuthType} />
      ) : (
        <SignUpForm setAuthType={setAuthType} />
      )}
    </div>
  );
}
