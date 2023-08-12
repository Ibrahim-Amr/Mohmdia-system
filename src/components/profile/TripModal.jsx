import React, { useContext } from "react";
import { ClientContext } from "../../context/ClientContext";
import Modal from "react-modal";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import Input from "../../components/Input";
import tripSchema from "../../../schema/TripsSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

const TripModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(tripSchema) });

  const { generateUniqueId, tripModal, setTripModal } =
    useContext(ClientContext);
  const uuid = generateUniqueId();
  const { id } = useParams();

  async function submitForm(data) {
    try {
      const ref = doc(db, "clients", id);
      const docRef = await updateDoc(ref, {
        trips: arrayUnion({
          id: uuid,
          ...data,
        }),
      });
      setTripModal(false);
      toast.success("تم إضافة الرحلة بنجاح");
      reset();
      document.body.classList.remove("overflow-hidden");
    } catch (err) {
      // console.log(err);
      toast.error("هنالك مشكلة رجاء المحاولة لاحقا.");
    }
  }

  useEffect(() => {
    if (tripModal) {
      document.body.classList.add("overflow-hidden");
    }
  }, [tripModal]);

  return (
    <>
      <section className="text-black">
        {tripModal && (
          <Modal
            isOpen={tripModal}
            contentLabel="trips"
            ariaHideApp={false}
            onRequestClose={() => {
              setTripModal(false);
              document.body.classList.remove("overflow-hidden");
              reset();
            }}
            className="
						max-w-[600px]
						h-fit
						absolute
						md:top-[50%]
						md:-translate-y-1/2
						md:left-[50%]
						md:translate-x-[-50%]
						inset-0
						bg-white
						text-black
						border-2
						border-gray-200
						md:rounded-xl
						shadow-md
						duration-150
						ease-in-out
						overflow-y-auto
						pb-3
						"
          >
            <div>
              <div
                className="
									text-xl
									text-gray-700
									font-bold
									flex
									justify-between
									items-center
									py-3 
									border-b
									border-gray-700
									px-3
									"
              >
                <div
                  onClick={() => setTripModal((prevState) => !prevState)}
                  role="button"
                  className="
									flex
									justify-center
									items-center
									hover:bg-gray-100
									p-2
									rounded-full
									active:scale-95
									duration-150
									ease-in-out"
                >
                  <AiOutlineClose />
                </div>
                <h2>إضافة رحلة</h2>
              </div>
              <form
                onSubmit={handleSubmit(submitForm)}
                className="
								w-full
								p-10
								flex
								flex-col
								justify-center
								items-center
								space-y-4
								"
              >
                <div
                  className="
									w-full
									flex
									flex-row-reverse
									justify-center
									items-center
									gap-x-5
								"
                >
                  {/* Number */}
                  <div className="relative  w-1/2">
                    <Input
                      type="text"
                      id="rNumber"
                      placeholder="رقم الحجز"
                      register={register}
                      errors={errors}
                      autoFocus
                    />
                  </div>
                  {/* flightCompany */}
                  <div className="relative  w-1/2">
                    <Input
                      type="text"
                      id="flightCompany"
                      placeholder="الخطوط"
                      register={register}
                      errors={errors}
                    />
                  </div>
                </div>
                {/* path */}
                <div className="relative  w-full">
                  <Input
                    type="text"
                    id="path"
                    placeholder="مسار الرحلة"
                    register={register}
                    errors={errors}
                  />
                </div>
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
                {/* created */}
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
                  <div className="relative  w-1/3">
                    <Input
                      type="text"
                      id="provider"
                      placeholder="المنفذ"
                      register={register}
                      errors={errors}
                    />
                  </div>
                  {/* providerCompany */}
                  <div className="relative  w-1/3">
                    <Input
                      type="text"
                      id="providerCompany"
                      placeholder="الشركة المنفذة"
                      register={register}
                      errors={errors}
                    />
                  </div>
                  {/* companyProvidedTo */}
                  <div className="relative  w-1/3">
                    <Input
                      type="text"
                      id="companyProvidedTo"
                      placeholder="الشركة المنفذ لها"
                      register={register}
                      errors={errors}
                    />
                  </div>
                </div>
                {/* Buttons */}
                <button
                  disabled={isLoading || isSubmitting}
                  className="
											text-green-500
											hover:text-white
											rounded-full
											border-2
											border-green-500
											bg-transparent
											hover:bg-green-500
											hover:border-green-300
											py-2
											px-14
											font-semibold
											active:scale-95
											focus:bg-green-500
											focus:text-white
											focus:outline-0
											duration-150
											ease-in-out
									"
                >
                  إضافة
                </button>
              </form>
            </div>
          </Modal>
        )}
      </section>
    </>
  );
};

export default TripModal;
