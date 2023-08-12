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

const ClientForm = ({ setLoading }) => {
  const { setClientModal, generateUniqueId } = useContext(ClientContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    reset,
    watch,
  } = useForm({ resolver: yupResolver(userSchema) });

  const id = generateUniqueId();
  const type = watch("type");

  async function submitForm(data) {
    try {
      // Adding post to firestore
      const docRef = await addDoc(collection(db, "clients"), {
        id,
        timestamp: serverTimestamp(),
        ...data,
      });
      reset();
      setClientModal(false);
      document.body.classList.remove("overflow-hidden");
      toast.success("تم اضافة العميل بنجاح.");
    } catch (err) {
      toast.error("something went wrong, please try again later.");
      console.log(err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="
				w-full
				py-10
				px-5
        space-y-5
			"
    >
      {/* Name Container */}
      <div className="flex flex-row-reverse justify-center items-center gap-x-5">
        {/* Name */}
        <div className="relative  w-1/2">
          <Input
            type="text"
            id="name"
            placeholder={"اسم العميل"}
            register={register}
            errors={errors}
            autoFocus
          />
        </div>
        {/* Address */}
        <div className="relative  w-1/2">
          <Input
            type="text"
            id="address"
            register={register}
            errors={errors}
            placeholder="عنوان العميل"
          />
        </div>
      </div>
      <div
        className="
					flex
          flex-row-reverse
          justify-center
          items-center
          gap-x-5
			"
      >
        {/* Phone */}
        <div
          className={`
            relative 
            ${type == "حج" || type == "عمرة" ? "w-1/3" : "w-full"}`}
        >
          <Input
            type="text"
            id="phone"
            register={register}
            errors={errors}
            placeholder="رقم هاتف العميل"
          />
        </div>
        {/* Second Phone */}
        {type == "حج" || type == "عمرة" ? (
          <>
            <div className="relative  w-1/3">
              <Input
                type="text"
                id="secondPhone"
                register={register}
                errors={errors}
                placeholder="رقم هاتف اخر"
              />
            </div>
            {/* clientId */}
            <div className="relative  w-1/3">
              <Input
                type="text"
                id="clientId"
                register={register}
                errors={errors}
                placeholder="رقم القومي"
              />
            </div>
          </>
        ) : null}
      </div>
      {/* Type Container */}
      <div
        className={`${type === "حج" && "flex flex-row-reverse gap-x-5 w-full"}`}
      >
        {/* نوع العميل */}
        <div
          className={`
            relative 
            ${type === "حج" ? "w-1/2" : "w-full"}`}
        >
          <Select
            id="type"
            register={register}
            errors={errors}
            label="اخر نوع العميل"
            options={clientTypes}
          />
        </div>
        {/* Hajj Type */}
        {type == "حج" && (
          <>
            <div className="relative  w-1/2">
              <Select
                id="hajjType"
                register={register}
                errors={errors}
                label="نوع الحج"
                options={hajjType}
              />
            </div>
            {/* hajj status */}
            <div className="relative  w-1/2">
              <Select
                id="hajjStatus"
                register={register}
                errors={errors}
                label="حالة الحج"
                options={hajjStatus}
              />
            </div>
            {/* hajj date */}
            <div className="relative  w-1/2">
              <Select
                id="hajjDate"
                register={register}
                errors={errors}
                label="موسم الحج"
                options={hajjDate}
              />
            </div>
          </>
        )}
        {/* flight Name */}
        {type == "عمرة" && (
          <div className="relative ">
            <Input
              type="text"
              id="flightName"
              register={register}
              errors={errors}
              placeholder="اسم الرحلة"
            />
          </div>
        )}
      </div>
      {/* Visa */}
      {type === "تأشيرة" && (
        <>
          {/* Visas */}
          <div className="flex flex-row-reverse justify-center items-center gap-x-3">
            <div className="relative  w-1/2">
              <Input
                type="text"
                id="visa"
                register={register}
                errors={errors}
                placeholder="نوع التأشيرة"
              />
            </div>
            <div className="relative  w-1/2">
              <Input
                type="text"
                id="visaDuration"
                register={register}
                errors={errors}
                placeholder="مدة التأشيرة"
              />
            </div>
          </div>
          <div className="relative  w-full">
            <Select
              id="visaStatus"
              register={register}
              errors={errors}
              label="حالة التأشيرة"
              options={["صدرت", "لم تصدر", "تحت التنفيذ"]}
            />
          </div>
        </>
      )}
      {/* provider */}
      <div className="relative ">
        <Input
          type="text"
          id="provider"
          register={register}
          errors={errors}
          placeholder="المنفذ"
        />
      </div>
      {/* Buttons */}
      <div className="flex justify-evenly items-center">
        <button
          disabled={isLoading || isSubmitting}
          className="rounded-md bg-green-400 hover:bg-green-500 text-white py-2 px-14 font-semibold active:scale-95 disabled:opacity-50 translate-x-0 duration-200 ease-in-out"
        >
          {isLoading || isSubmitting ? (
            <div
              className="h-5 w-5 animate-spin rounded-full
                    border border-solid border-white border-t-transparent"
            ></div>
          ) : (
            "إضافة"
          )}
        </button>
        <button
          onClick={() => reset()}
          type="button"
          className="rounded-md bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-14 font-semibold active:scale-95"
        >
          إفراغ
        </button>
      </div>
    </form>
  );
};

export default ClientForm;
