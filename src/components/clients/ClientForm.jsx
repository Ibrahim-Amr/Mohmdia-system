import { useContext } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../Firebase";
import toast from "react-hot-toast";
import Input from "../Input";
import { ClientContext } from "../../context/ClientContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../../../schema/ClientSchema";
import Select from "../Select";
import {
  clientTypes,
  hajjDate,
  hajjStatus,
  hajjType,
} from "../../../data/ClientData";

const ClientForm = () => {
  const { setClientModal, generateUniqueId } = useContext(ClientContext);
  const id = generateUniqueId();
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    reset,
    watch,
  } = useForm({ resolver: yupResolver(userSchema) });
  const type = watch("type");

  const submitForm = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "clients"), {
        id,
        timestamp: serverTimestamp(),
        ...data,
      });
      toast.success("تم اضافة العميل بنجاح.");
      reset();
      setClientModal(false);
      document.body.classList.remove("overflow-hidden");
    } catch (err) {
      toast.error("خطااضافة العميل حاول مرة اخري");
      console.log(err);
    }
  };

  if (!setClientModal) {
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="w-full h-full py-10 px-5 space-y-5"
    >
      {/* Name Container */}
      <div className="flex flex-row-reverse justify-center items-center gap-x-5">
        <Input
          type="text"
          id="name"
          placeholder={"اسم العميل"}
          register={register}
          errors={errors}
          autoFocus
        />
        <Input
          type="text"
          id="address"
          register={register}
          errors={errors}
          placeholder="عنوان العميل"
        />
      </div>
      <div className="flex flex-row-reverse justify-center items-center gap-x-5">
        <Input
          type="text"
          id="phone"
          register={register}
          errors={errors}
          placeholder="رقم هاتف العميل"
        />
        {type == "حج" || type == "عمرة" ? (
          <Input
            type="text"
            id="clientId"
            register={register}
            errors={errors}
            placeholder="رقم القومي"
          />
        ) : null}
      </div>
      {/* Type Container */}
      <div className="w-full flex flex-row-reverse justify-center items-center gap-x-5">
        <Select
          id="type"
          register={register}
          errors={errors}
          label="اخر نوع العميل"
          options={clientTypes}
        />
        {/* Hajj Type */}
        {type == "حج" && (
          <>
            <Select
              id="hajjType"
              register={register}
              errors={errors}
              label="نوع الحج"
              options={hajjType}
            />
            <Select
              id="hajjStatus"
              register={register}
              errors={errors}
              label="حالة الحج"
              options={hajjStatus}
            />
            <Select
              id="hajjDate"
              register={register}
              errors={errors}
              label="موسم الحج"
              options={hajjDate}
            />
          </>
        )}
        {/* flight Name */}
        {type == "عمرة" && (
          <Input
            type="text"
            id="flightName"
            register={register}
            errors={errors}
            placeholder="اسم الرحلة"
          />
        )}
      </div>
      {/* Visa */}
      {type === "تأشيرة" && (
        <div className="flex flex-row justify-center items-center gap-x-3">
          <Input
            type="text"
            id="visa"
            register={register}
            errors={errors}
            placeholder="نوع التأشيرة"
          />
          <Input
            type="text"
            id="visaDuration"
            register={register}
            errors={errors}
            placeholder="مدة التأشيرة"
          />
          <Select
            id="visaStatus"
            register={register}
            errors={errors}
            label="حالة التأشيرة"
            options={["صدرت", "لم تصدر", "تحت التنفيذ"]}
          />
        </div>
      )}
      {/* provider */}
      <Input
        type="text"
        id="provider"
        register={register}
        errors={errors}
        placeholder="المنفذ"
      />
      {/* Buttons */}
      <div className="flex justify-evenly items-center">
        <button
          disabled={isLoading || isSubmitting}
          className="rounded-md bg-green-400 hover:bg-green-500 text-white py-2 px-14 font-semibold active:scale-95 disabled:opacity-50 translate-x-0 duration-200 ease-in-out"
        >
          إضافة
        </button>
        <button
          onClick={() => reset()}
          type="button"
          className="rounded-md bg-red-400 hover:bg-red-500 text-white py-2 px-14 font-semibold active:scale-95"
        >
          إفراغ
        </button>
      </div>
    </form>
  );
};

export default ClientForm;
