import React, { useContext, useEffect } from "react";
import { ClientContext } from "../../context/ClientContext";
import Modal from "react-modal";
import { useState } from "react";

import Spinner from "../Spinner";
import { AiOutlineClose } from "react-icons/ai";
import ClientForm from "./ClientForm";

const ClientModal = () => {
  const [loading, setLoading] = useState(false);
  const { cliendModal, setClientModal } = useContext(ClientContext);

  if (loading) {
    return <Spinner />;
  }

  useEffect(() => {
    if (cliendModal) {
      document.body.classList.add("overflow-hidden");
    }
  }, [cliendModal]);
  return (
    <>
      <section className="text-black  bg-red-600">
        {cliendModal && (
          <Modal
            isOpen={cliendModal}
            contentLabel="Comments"
            ariaHideApp={false}
            onRequestClose={() => {
              setClientModal(false);
              document.body.classList.remove("overflow-hidden");
            }}
            className="
						max-w-[900px]
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
											ease-in-out
											"
                  >
                    <AiOutlineClose
                      onClick={() => {
                        setClientModal((prevState) => !prevState);
                        document.body.classList.remove("overflow-hidden");
                      }}
                    />
                  </div>
                  <h2>إضافة عميل</h2>
                </div>
                <ClientForm setLoadin={setLoading} />
              </div>
            </div>
          </Modal>
        )}
      </section>
    </>
  );
};

export default ClientModal;
