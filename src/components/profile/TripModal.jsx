import { useContext } from "react";
import { ClientContext } from "../../context/ClientContext";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import TripForm from "./TripForm";

const TripModal = () => {
  const { tripModal, setTripModal } = useContext(ClientContext);

  return (
    <Modal
      isOpen={tripModal}
      contentLabel="trips"
      ariaHideApp={false}
      onRequestClose={() => {
        setTripModal(false);
        reset();
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
        <TripForm />
      </div>
    </Modal>
  );
};

export default TripModal;
