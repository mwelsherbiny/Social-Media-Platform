import { object, string } from "yup";

const nameMin = 2;
const nameMax = 20;
const emailMax = 255;
const passwordMin = 8;
const passwordMax = 72;

export default object({
  username: string()
    .required("Username required")
    .min(nameMin, "Username length must be more than or equal to " + nameMin)
    .max(nameMax, "Username length must not exceed " + nameMax)
    .matches(/^\S+$/, "Username must be one word"),
  name: string()
    .required("Full name required")
    .min(nameMin, "Full name length must be more than or equal to " + nameMin)
    .max(nameMax, "Full name length must not exceed " + nameMax),
  email: string()
    .required("Email address required")
    .max(emailMax)
    .matches(/^\S+$/, "Email must be one word"),
  password: string()
    .required("Password required")
    .min(
      passwordMin,
      "Password length must be more than or equal to " + passwordMin
    )
    .max(passwordMax, "Password length must not exceed " + passwordMax)
    .matches(/^\S+$/, "Password must be one word"),
});
