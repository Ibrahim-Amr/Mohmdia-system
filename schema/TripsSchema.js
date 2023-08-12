import * as yup from "yup";

const tripSchema = yup.object({
  rNumber: yup
    .string()
    .min(3, "رقم الرحلة لا يمكن ان يقل عن 3 احرف")
    .required("رقم الرحلة مطلوب")
    .label("رقم الرحلة"),

  flightCompany: yup
    .string()
    .min(3, "لا يمكن ان يقل عن 3 احرف")
    .required("اسم الشركة الطيرام مطلوب")
    .label("الخطوط"),
  path: yup
    .string()
    .min(5, "مسار الرحلة يجب ان لا يقل عن 5 حروف")
    .required("مسار الرحلة مطلوب")
    .label("مسار الرحلة"),
  flightDate: yup.string().required("تاريخ السفر مطلوب").label("تاريخ السفر"),
  returnDate: yup.string().required("تاريخ العودة مطلوب").label("تاريخ العودة"),
  created: yup.string().required("تاريخ التنفيذ مطلوب").label("تاريخ التنفيذ"),
  provider: yup.string().required("اسم المنفذ مطلوب").label("اسم المنفذ"),
  providerCompany: yup
    .string()
    .required("اسم الشركة النفذة مطلوب")
    .label("الشركة المنفذة"),
  companyProvidedTo: yup
    .string()
    .required("اسم الشركة المنفذ لها مطلوب")
    .label("الشركة المنفذ لها"),
});

export default tripSchema;
