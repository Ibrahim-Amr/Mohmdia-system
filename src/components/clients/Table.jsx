import { useContext, useEffect, useRef, useState } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";
import { Link, useLocation } from "react-router-dom";
import { ClientContext } from "../../context/ClientContext";
import { HiOutlineFolderDownload } from "react-icons/hi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";

const Table = ({ setClientModal, clients, deleteClient, filename }) => {
  const [viewAll, setViewAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = useState({ initial: 0, max: 10 });
  const { initial, max } = value;
  const tableRef = useRef(null);
  const { pathname } = useLocation();
  const { setFilterDate, filterDate } = useContext(ClientContext);

  function nextPage() {
    setValue((prevState) => ({
      ...prevState,
      initial: initial + 10,
      max: max + 10,
    }));
  }

  function prevPage() {
    setValue((prevState) => ({
      ...prevState,
      initial: initial - 10,
      max: max - 10,
    }));
  }

  // Convert Timestamp to Date
  function getDate(seconds) {
    const date = new Date(0);
    date.setSeconds(seconds);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
  }

  function handleInputChange(event) {
    const currentDate = new Date().toISOString().slice(0, 10);
    if (!event.target.value) {
      setFilterDate("2023-04-25");
    } else if (currentDate >= event.target.value) {
      setFilterDate(event.target.value);
    } else {
      alert("ادخل تاريخ لا يتعدي تاريخ اليوم.");
    }
  }

  useEffect(() => {
    if (viewAll) {
      setValue((prevState) => ({
        ...prevState,
        initial: 0,
        max: clients.length + 1,
      }));
      // setSearchTerm('');
    } else {
      setValue((prevState) => ({
        ...prevState,
        initial: 0,
        max: 10,
      }));
    }
  }, [viewAll]);

  // Download As Excel
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: filename,
    sheet: filename,
  });

  if (!clients) {
    return <Spinner />;
  }

  return (
    <>
      <div className="w-full px-4 mx-auto ">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
                {/* <!-- Header --> */}
                <div className="px-6 py-4  gap-3 flex justify-between items-center border-b border-gray-200">
                  {/* Search */}
                  <div className="relative w-3/6 xl:w-3/5">
                    <input
                      type="text"
                      name="hs-table-search"
                      id="hs-table-search"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                      }}
                      className="
											w-full
											text-sm 
											text-blue-400
											placeholder:text-blue-400
											text-end
											font-semibold
											pr-10 
											border-gray-200 
											rounded-md 
											shadow-sm 
											focus:border-blue-400
											focus:ring-0 
											focus:shadow-md 
											"
                      placeholder="ابحث عن عميل"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-4">
                      <svg
                        className="h-3.5 w-3.5 text-blue-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </div>
                  </div>
                  {/* Add client Button */}
                  <div className="">
                    <div className="inline-flex gap-x-2 transition-[width] duration-500 ease-in-out">
                      <button
                        onClick={() =>
                          setClientModal((prevState) => !prevState)
                        }
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-semibold bg-white text-green-400 shadow-sm align-middle hover:bg-gray-50 hover:shadow-md active:scale-95 duration-150 ease-in-out"
                      >
                        إضافة عميل
                        <IoMdAdd className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          window.confirm("هل تريد تحميل بيانات العملاء؟") &&
                            onDownload();
                        }}
                        title="تحميل قائمة العملاء"
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-semibold bg-white text-yellow-400 shadow-sm align-middle hover:bg-gray-50 hover:shadow-md active:scale-95 duration-150 ease-in-out"
                      >
                        <HiOutlineFolderDownload className="w-6 h-6" />
                      </button>
                      {clients.length > 10 && (
                        <div>
                          {viewAll ? (
                            <button
                              onClick={() =>
                                setViewAll((prevState) => !prevState)
                              }
                              className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-semibold bg-white text-blue-400 shadow-sm align-middle hover:bg-gray-50 hover:shadow-md active:scale-95 duration-150 ease-in-out"
                            >
                              <AiOutlineEyeInvisible className="w-6 h-6" />
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                setViewAll((prevState) => !prevState)
                              }
                              className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-semibold bg-white text-blue-400 shadow-sm align-middle hover:bg-gray-50 hover:shadow-md active:scale-95 duration-150 ease-in-out"
                            >
                              <AiOutlineEye className="w-6 h-6" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Filter Date */}
                {/* <div
                  className="
										flex
										justify-end
										items-center
										px-6
									"
                >
                  <div className="flex flex-row-reverse justify-between items-center gap-x-3 group relative w-[300px]">
                    <input
                      type="date"
                      id="flightDate"
                      placeholder="تاريخ السفر"
                      value={filterDate !== "2023-04-25" && filterDate}
                      onChange={handleInputChange}
                      min={"2023-04-26"}
                      max={new Date().toISOString().slice(0, 10)}
                      className="
											text-end
											text-green-900
											placeholder:text-gray-300
											font-semibold
											bg-transparent 
											mb-2
											w-full 
											border-b-2
											border-x-0
											border-t-0
											border-gray-300 
											focus:outline-none
											focus:ring-0
											focus:border-green-500
											focus:placeholder:text-green-900
											"
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
											top-[50%]
											-translate-y-2/3
											px-2
											left-16
											"
                    >
                      بحث بالتاريخ
                    </label>
                    <button
                      onClick={() => setFilterDate("2023-04-25")}
                      disabled={filterDate === "2023-04-25" ? true : false}
                      className="
											h-fit
											font-semibold
											text-red-400
											bg-white
											p-3
											py-2
											rounded-md
											border
											shadow-sm
											hover:bg-red-500
											hover:text-white
											hover:border-transparent
											active:scale-95
											disabled:bg-gray-200
											disabled:text-white
											disabled:scale-100
											duration-150
											ease-in-out"
                    >
                      reset
                    </button>
                  </div>
                </div> */}
                {/* <!-- Table --> */}
                <table
                  ref={tableRef}
                  className="min-w-[1000px] w-full divide-y divide-gray-50 p-2 "
                >
                  <thead className="bg-gray-700/20 text-black">
                    <tr>
                      <th className="border">
                        <span>الخيارات</span>
                      </th>
                      {/* Visa opetions */}
                      {pathname === "/visas" && (
                        <>
                          <th className="border">
                            <span>حالة التأشير</span>
                          </th>
                          <th className="border">
                            <span>مدة التأشيرة</span>
                          </th>
                          <th className="border">
                            <span>نوع التأشيرة</span>
                          </th>
                        </>
                      )}
                      {/* Hajj options */}
                      {pathname === "/hajj" && (
                        <>
                          <th className="border">
                            <span>حالة الحاج</span>
                          </th>
                          <th className="border">
                            <span>موسم الحج</span>
                          </th>
                          <th className="border">
                            <span>نوع الحج</span>
                          </th>
                        </>
                      )}
                      <th className="border">
                        <span>نوع العميل</span>
                      </th>
                      <th className="border">
                        <span>تاريخ الإضافة</span>
                      </th>
                      {/* umrah and hajj options */}
                      {pathname === "/umrah" || pathname === "/hajj" ? (
                        <>
                          <th className="border">
                            <span>رقم القومي</span>
                          </th>
                          <th className="border">
                            <span>رقم اخر</span>
                          </th>
                        </>
                      ) : null}
                      <th className="border">
                        <span>رقم الهاتف</span>
                      </th>
                      <th className="border">
                        <span>العنوان</span>
                      </th>
                      <th className="border">
                        <span>اسم العميل</span>
                      </th>
                      {/* umrap option */}
                      {pathname === "/umrah" && (
                        <th className="border">
                          <span>اسم الرحلة</span>
                        </th>
                      )}
                      <th className="border py-3">
                        <span>المنفذ</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="">
                    {clients
                      .filter((item) => {
                        return searchTerm === ""
                          ? item
                          : item.data().name.includes(searchTerm.trim());
                      })
                      .slice(initial, max)
                      .map((client) => (
                        <tr
                          key={client.id}
                          className="text-center text-sm hover:bg-gray-100 duration-0 ease-in-out py-3 px-1"
                        >
                          {/* Actions */}
                          <td className="border py-1.5 px-1">
                            <div className="flex justify-center items-center px-3 gap-x-2">
                              <Link
                                to={`/profile/${client.id}`}
                                className={`
																			text-green-400 
																			text-center
																			hover:text-white 
																			hover:bg-green-400 
																			border 
																			border-green-400  
																			py-1.5
																			px-1
																			sm:px-0
																			rounded-md 
																			duration-150 
																			ease-in-out 
																			active:scale-95
																			w-1/2
																			${client?.data()?.type !== "حج" ? "w-1/2" : "w-full px-2 xl:px-0"}
																	`}
                              >
                                <button
                                  onClick={() => {
                                    setTimeout(() => {
                                      setFilterDate("2023-04-25");
                                    }, 500);
                                  }}
                                  title="View Profile"
                                >
                                  مشاهدة
                                </button>
                              </Link>
                              <button
                                title="Delete Client"
                                onClick={() => deleteClient(client)}
                                className={`
																text-red-400 
																text-center
																hover:text-white 
																hover:bg-red-400 
																border 
																border-red-400  
																py-1.5 
																rounded-md 
																duration-150 
																ease-in-out 
																active:scale-95
																${client?.data()?.type !== "حج" ? "w-1/2" : "w-full px-2 xl:px-0"}
																`}
                              >
                                حذف
                              </button>
                            </div>
                          </td>
                          {pathname === "/visas" && (
                            <>
                              <td className="whitespace-nowrap border text-center px-1 sm:p-0 w-fit">
                                <span
                                  className={`
																	px-3 
																	py-1 
																	rounded-md 
																	text-white
																	${client?.data()?.visaStatus === "صدرت" && "bg-green-400"}
																	${client?.data()?.visaStatus === "لم تصدر" && "bg-red-400"}
																	${client?.data()?.visaStatus === "تحت التنفيذ" && "bg-yellow-400"}
																	`}
                                >
                                  {client?.data()?.visaStatus}
                                </span>
                              </td>
                              <td className="whitespace-nowrap border text-center px-1 sm:p-0 w-fit">
                                {client?.data()?.visaDuration}
                              </td>
                              <td className="whitespace-nowrap border text-center px-1 sm:p-0 w-fit">
                                {client?.data()?.visa}
                              </td>
                            </>
                          )}
                          {pathname === "/hajj" && (
                            <>
                              <td className="whitespace-nowrap border text-center px-1 sm:p-0 w-fit">
                                <span
                                  className={`
																	px-3 
																	py-1 
																	rounded-md 
																	text-white
																	${client?.data()?.hajjStatus === "فاز بالقرعة" && "bg-green-400"}
																	${client?.data()?.hajjStatus === "لم يصبه الدور" && "bg-red-400"}
																	${client?.data()?.hajjStatus === "تحت الاجراء" && "bg-yellow-400"}
																	`}
                                >
                                  {client?.data()?.hajjStatus}
                                </span>
                              </td>
                              <td className="whitespace-nowrap border text-center px-1 sm:p-0 w-fit">
                                {client?.data()?.hajjDate}
                              </td>
                              <td className="whitespace-nowrap border text-center px-1 sm:p-0 w-fit">
                                {client?.data()?.hajjType}
                              </td>
                            </>
                          )}
                          {/*type */}
                          <td className="whitespace-nowrap border text-center px-1 sm:p-0 w-fit">
                            {client?.data()?.type}
                          </td>
                          {/* Date */}
                          <td className="whitespace-nowrap border text-center px-1 sm:p-0 w-fit">
                            {getDate(client?.data()?.timestamp?.seconds)}
                          </td>
                          {pathname === "/umrah" || pathname === "/hajj" ? (
                            <>
                              <td className="whitespace-nowrap border text-center px-1 sm:p-0 w-fit">
                                {client?.data()?.clientId
                                  ? client?.data()?.clientId
                                  : "-"}
                              </td>
                              <td className="whitespace-nowrap border text-center px-1 sm:p-0 w-fit">
                                {client?.data()?.secondPhone
                                  ? client?.data()?.secondPhone
                                  : "-"}
                              </td>
                            </>
                          ) : null}
                          {/* Phone */}
                          <td className="whitespace-nowrap border text-center px-1 sm:p-0 w-fit">
                            {client?.data()?.phone}
                          </td>
                          {/* Address */}
                          <td className="whitespace-nowrap border text-center px-1 sm:p-0 w-fit">
                            {client?.data()?.address
                              ? client?.data()?.address
                              : "-"}
                          </td>
                          {/* client name */}
                          <td className="whitespace-nowrap border text-center px-1 sm:p-0 w-fit">
                            {client?.data()?.name}
                          </td>
                          {/* Flight name */}
                          {pathname === "/umrah" && (
                            <td className="whitespace-nowrap border text-center px-1 sm:p-0 w-fit">
                              {client?.data()?.flightName}
                            </td>
                          )}
                          {/* provider */}
                          <td className="whitespace-nowrap border text-center px-1 sm:p-0 w-fit">
                            {client?.data()?.provider}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {/* <!-- End Table --> */}

                {/* <!-- Footer --> */}
                <div className="px-6 py-2 flex justify-between items-center border-t border-gray-200">
                  <div className="flex items-center justify-center gap-4">
                    <p className="text-lg text-gray-400 font-semibold tracking-wider">
                      <span>إجمالي العملاء</span>
                      <span className="text-black mr-2">{clients.length}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-4 text-lg font-semibold">
                    <p className="flex gap-x-2">
                      <span>{Math.ceil(clients.length / 10)} </span>
                      <span className="text-gray-400">من</span>
                      <span>{Math.ceil(max / 10)}</span>
                    </p>
                    <p className="text-gray-400 tracking-wider">صفحة</p>
                  </div>

                  <div>
                    <div className="flex md:inline-flex justify-center items-center gap-x-2">
                      <button
                        onClick={nextPage}
                        type="button"
                        disabled={max >= clients.length && true}
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md font-medium border bg-white text-blue-400 shadow-sm hover:bg-gray-100 transition-all text-sm disabled:bg-gray-300 disabled:text-white active:scale-95 active:bg-gray-200 duration-150 ease-in-out"
                      >
                        التالية
                        <svg
                          className="w-3 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={prevPage}
                        type="button"
                        disabled={initial === 0 && true}
                        className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md font-medium border bg-white text-blue-400 shadow-sm hover:bg-gray-100 transition-all text-sm disabled:bg-gray-300 disabled:text-white active:scale-95 active:bg-gray-200 duration-150 ease-in-out"
                      >
                        <svg
                          className="w-3 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                        السابقة
                      </button>
                    </div>
                  </div>
                </div>
                {/* <!-- End Footer --> */}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Card --> */}
      </div>
      {/* <!-- End Table Section --> */}
    </>
  );
};

export default Table;
