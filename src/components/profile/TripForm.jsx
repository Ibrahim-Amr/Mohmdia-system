import Input from "../../components/Input";
import tripSchema from "../../../schema/TripsSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ClientContext } from "../../context/ClientContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import toast from "react-hot-toast";

const TripForm = () => {
  const { id } = useParams();
  const { generateUniqueId, setTripModal } = useContext(ClientContext);
  const uuid = generateUniqueId();
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(tripSchema) });

  const submitForm = async (data) => {
    try {
      const ref = doc(db, "clients", id);
      const docRef = await updateDoc(ref, {
        trips: arrayUnion({
          id: uuid,
          ...data,
        }),
      });
      toast.success("تم إضافة الرحلة بنجاح");
      setTripModal(false);
      reset();
    } catch (err) {
      toast.error("هنالك مشكلة رجاء المحاولة لاحقا.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="w-full p-10 flex flex-col justify-center items-center space-y-4"
    >
      <div className="w-full flex flex-row-reverse justify-center items-center gap-x-5">
        <Input
          type="text"
          id="rNumber"
          placeholder="رقم الحجز"
          register={register}
          errors={errors}
          autoFocus
        />
        <Input
          type="text"
          id="flightCompany"
          placeholder="الخطوط"
          register={register}
          errors={errors}
        />
      </div>
      <Input
        type="text"
        id="path"
        placeholder="مسار الرحلة"
        register={register}
        errors={errors}
      />
      {/* Dates Container */}
      <div className="w-full flex flex-row-reverse gap-x-5">
        {/* flightDate */}
        <div className="group relative  w-1/2">
          <Input
            type="date"
            id="flightDate"
            placeholder="تاريخ السفر"
            register={register}
            errors={errors}
          />
          <label
            htmlFor="flightDate"
            className="
											absolute
											text-sm
											font-bold
											text-gray-300
											group-focus-within:text-green-900
											duration-150
											top-[25%]
											-translate-y-1/2
											px-2
											left-0
											"
          >
            تاريخ السفر
          </label>
        </div>
        {/* returnDate */}
        <div className="group relative  w-1/2">
          <Input
            type="date"
            id="returnDate"
            placeholder="تاريخ العودة"
            register={register}
            errors={errors}
          />
          <label
            htmlFor="returnDate"
            className="
											absolute
											text-sm
											font-bold
											text-gray-300
											group-focus-within:text-green-900
											duration-150
											top-[25%]
											-translate-y-1/2
											px-2
											left-0
										"
          >
            تاريخ العودة
          </label>
        </div>
      </div>
      {/* created date*/}
      <div className="group relative  w-full">
        <Input
          type="date"
          id="created"
          placeholder="تاريخ التنفيذ"
          register={register}
          errors={errors}
        />
        <label
          htmlFor="created"
          className="
											absolute
											text-sm
											font-bold
											text-gray-300
											group-focus-within:text-green-900
											duration-150
											top-[25%]
											-translate-y-1/2
											px-2
											left-0
											"
        >
          تاريخ التنفيذ
        </label>
      </div>
      {/* provider */}
      <div className="w-full flex flex-row-reverse gap-x-5 ">
        <Input
          type="text"
          id="provider"
          placeholder="المنفذ"
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          id="providerCompany"
          placeholder="الشركة المنفذة"
          register={register}
          errors={errors}
        />
        <Input
          type="text"
          id="companyProvidedTo"
          placeholder="الشركة المنفذ لها"
          register={register}
          errors={errors}
        />
      </div>
      <button
        disabled={isLoading || isSubmitting}
        className="rounded-md bg-green-400 hover:bg-green-500 text-white py-2 px-14 font-semibold active:scale-95 disabled:opacity-50 translate-x-0 duration-200 ease-in-out"
      >
        إضافة
      </button>
    </form>
  );
};

export default TripForm;
