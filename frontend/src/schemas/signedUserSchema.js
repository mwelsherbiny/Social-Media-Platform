import { object, string } from "yup";

const emailMax = 255;
const passwordMin = 8;
const passwordMax = 72;

export default object({
  email: string()
    .required("Email address required")
    .max(emailMax)
    .matches(/^\S+$/, "Email must be one word"),
  password: string()
    .required("Password required")
    .min(
      passwordMin,
      "Password length must be more than or equal to" + passwordMin
    )
    .max(passwordMax, "Password length must not exceed " + passwordMax)
    .matches(/^\S+$/, "Password must be one word"),
});
