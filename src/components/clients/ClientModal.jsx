import React, { useContext, useEffect } from "react";
import { ClientContext } from "../../context/ClientContext";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import ClientForm from "./ClientForm";
import { motion } from "framer-motion";

const ClientModal = () => {
  const { cliendModal, setClientModal } = useContext(ClientContext);

  useEffect(() => {
    if (cliendModal) {
      document.body.classList.add("overflow-hidden");
    }
  }, [cliendModal]);

  if (!cliendModal) {
    return null;
  }

  return (
    <Modal
      isOpen={cliendModal}
      contentLabel="Add-client-modal"
      ariaHideApp={false}
      onRequestClose={() => {
        setClientModal(false);
        document.body.classList.remove("overflow-hidden");
      }}
      className="
            w-full
            h-fit
            absolute
            top-1/2
            -translate-y-1/2
            lg:left-1/2
            lg:-translate-x-1/2
            lg:max-w-[80vh]
            inset-0
						bg-white
						border-2
						shadow-md
						duration-150
						ease-in-out
						overflow-y-auto
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
        <ClientForm />
      </div>
    </Modal>
  );
};

export default ClientModal;
