import * as Yup from "yup";

const userSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "اسم العميل يجب ان لا يقل عن 5 احرف")
    .max(30, "اسم العميل لا يزيد عن 30 حرف")
    .required("اسم العميل لا يمكن ان يكون فارغ")
    .label("Name"),
  phone: Yup.string()
    .min(11, "رقم الهاتف يجب ان يكون 11 رقم")
    .max(11, "رقم الهاتف يجب ان لا يزيد عن 11 رقم")
    .required("رقم الهاتف لا يمكن ان يكون فارغ")
    .label("phone"),
  address: Yup.string()
    .min(1, "العنوان يجب ان لا يقل عن حرف")
    .max(20, "العنوان يجب ان لا يزيد عن 20 حرف")
    .label("address"),
  provider: Yup.string()
    .min(5, "اسم المنفذ يجب ان لا يقل عن 5 حروف")
    .max(15, "اسم المنفذ لا يزيد عن 15 رقم")
    .required("اسم المنفذ لا يمكن ان يكون فارغ")
    .label("provider"),
  type: Yup.string()
    .required("نوع العميل لا يمكن ان يكون فارغ")
    .label("نوع العميل"),
  clientId: Yup.string().when("type", {
    is: "عمرة",
    then: () =>
      Yup.string()
        .min(14, "الرقم القومي يجيب ان لا يقل عن 14 رقم")
        .max(14, "الرقم القومي لا يجب ان يزيد عن 14 رقم")
        .required(" الرقم القومي لا يمكن ان يكون فارغ")
        .label("الرقم"),
  }),

  flightName: Yup.string().when("type", {
    is: "عمرة",
    then: () =>
      Yup.string()
        .required("اسم الرحلة لا يمكن ان يكون فارغ")
        .label("اسم الرحلة"),
  }),
  secondPhone: Yup.string().label("رقم الثاني"),
  hajjType: Yup.string().when("type", {
    is: (type) => type == "حج",
    then: () => Yup.string().required("نوع الحج لا يمكن ان يكون فارغ"),
  }),
  hajjStatus: Yup.string().when("type", {
    is: "حج",
    then: () =>
      Yup.string()
        .required("حالة الحج لا يمكن ان يكون فارغ")
        .label("حالة الحج"),
  }),
  hajjDate: Yup.string().when("type", {
    is: "حج",
    then: () =>
      Yup.string()
        .required("موسم الحج لا يمكن ان يكون فارغ")
        .label("موسم الحج"),
  }),

  visa: Yup.string().when("type", {
    is: "تأشيرة",
    then: () =>
      Yup.string()
        .required("نوع التأشيرة لا يمكن ان يكون فارغ")
        .label("نوع التأشيرة"),
  }),
  visaDuration: Yup.string().when("type", {
    is: "تأشيرة",
    then: () =>
      Yup.string()
        .required("مدة التأشيرة لا يمكن ان يكون فارغ")
        .label("مدة التأشيرة"),
  }),
  visaStatus: Yup.string().when("type", {
    is: "تأشيرة",
    then: () =>
      Yup.string()
        .required("حالة التأشيرة لا يمكن ان يكون فارغ")
        .label("حالة التأشيرة"),
  }),
});

export { userSchema };
