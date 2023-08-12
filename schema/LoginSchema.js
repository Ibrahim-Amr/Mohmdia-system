import * as Yup from "yup";

const LoginSchema = Yup.object({
  email: Yup.string().email().required("الاميل لا يمكن ان يكون فارغ"),
  password: Yup.string()
    .min(5, "لا يقل عن 5 حروف")
    .required("كلمة السر لا يمكن ان تكون فارغة"),
});

export default LoginSchema;
