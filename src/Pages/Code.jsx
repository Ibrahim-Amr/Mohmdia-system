import { useEffect, useState } from "react";
import { airports } from "../../data/Airports.js";

const Code = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [firstValue, setFirstValue] = useState(0);
  const [initialValue, setInitialValue] = useState(10);
  const [viewAll, setViewAll] = useState(false);

  function nextPage() {
    if (setInitialValue == airports.length) {
      ("//");
    } else {
      setFirstValue((prevStata) => prevStata + 10);
      setInitialValue((prevStata) => prevStata + 10);
    }
  }
  function prevState() {
    if (!firstValue == 0) {
      setFirstValue((prevStata) => prevStata - 10);
      setInitialValue((prevStata) => prevStata - 10);
    }
  }

  useEffect(() => {
    if (viewAll) {
      setFirstValue(0);
      setInitialValue(airports.length + 1);
      setSearchTerm("");
    } else {
      setFirstValue(0);
      setInitialValue(10);
    }
  }, [viewAll]);
  return (
    <>
      <section className="h-screen max-h-[calc(100vh-60px)] pt-8">
        <div className="pb-3 px-4 md:w-[80%] lg:w-[70%] xl:w-1/2 mx-auto ">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              name="hs-table-search"
              id="hs-table-search"
              value={searchTerm}
              onChange={(e) => {
                setFirstValue(0);
                setInitialValue(airports.length + 1);
                setSearchTerm(e.target.value);
              }}
              className="p-3 pl-10 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              placeholder="Search for a city"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
              <svg
                className="h-3.5 w-3.5 text-gray-400"
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
        </div>
        {/* <!-- Table Section --> */}
        <div className="max-w-[85rem] px-4 mx-auto ">
          {/* <!-- Card --> */}
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden dark:bg-slate-900 dark:border-gray-700 ">
                  {/* <!-- Header --> */}
                  <div className="px-6 py-4  gap-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 uppercase">
                        Airports IATA Codes
                      </h2>
                    </div>

                    <div>
                      <div className="inline-flex gap-x-2">
                        {viewAll ? (
                          <button
                            onClick={() =>
                              setViewAll((prevState) => !prevState)
                            }
                            className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-blue-400 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800 active:scale-95 duration-150 ease-in-out"
                          >
                            Back
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              setViewAll((prevState) => !prevState)
                            }
                            className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-blue-400 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800 active:scale-95 duration-150 ease-in-out"
                          >
                            View all
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <!-- Table --> */}
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-200 divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700 text-center ">
                      <tr>
                        <th className="w-1/3 py-3  border border-gray-200 dark:border-gray-700">
                          <span className="text-base sm:text-xl font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            City
                          </span>
                        </th>

                        <th className="w-1/3 py-3 border">
                          <span className="text-base sm:text-xl font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            Country
                          </span>
                        </th>

                        <th className="w-1/3 py-3 border">
                          <span className="text-base sm:text-xl font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                            IATA Code
                          </span>
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {airports
                        .filter((item) => {
                          return searchTerm === ""
                            ? item
                            : item.city.includes(searchTerm.trim());
                        })
                        .slice(firstValue, initialValue)
                        .map((airport, index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-50 duration-100 ease-in-out"
                          >
                            <td className="h-px w-auto whitespace-nowrap border-x">
                              <div className="py-2 text-center">
                                <span className="text-base sm:text-lg font-semibold  text-gray-800 dark:text-gray-200">
                                  {airport.city}
                                </span>
                              </div>
                            </td>
                            <td className="h-px w-auto whitespace-nowrap border-x">
                              <div className="py-2 text-center">
                                <span className="text-base sm:text-lg font-semibold  text-gray-800 dark:text-gray-200">
                                  {airport.country}
                                </span>
                              </div>
                            </td>
                            <td className="h-px w-auto whitespace-nowrap border-x">
                              <div className="py-2 text-center">
                                <span className="text-base sm:text-lg font-semibold  text-gray-800 dark:text-gray-200">
                                  {airport.code}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {/* <!-- End Table --> */}

                  {/* <!-- Footer --> */}
                  <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-center gap-4">
                      <p className="text-lg text-gray-400 dark:text-gray-400 font-semibold tracking-wider">
                        Page
                      </p>
                      <p className="flex gap-x-2">
                        <span>{Math.ceil(initialValue / 10)}</span>
                        <span>Of</span>
                        <span>{Math.ceil(airports.length / 10)} </span>
                      </p>
                    </div>

                    <div>
                      <div className="flex md:inline-flex justify-center items-center gap-x-2">
                        <button
                          onClick={prevState}
                          type="button"
                          disabled={firstValue === 0 && true}
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
                              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                            />
                          </svg>
                          Prev
                        </button>

                        <button
                          onClick={nextPage}
                          type="button"
                          disabled={initialValue >= airports.length && true}
                          className="py-2 px-3 inline-flex justify-center items-center gap-2 rounded-md font-medium border bg-white text-blue-400 shadow-sm hover:bg-gray-100 transition-all text-sm disabled:bg-gray-300 disabled:text-white active:scale-95 active:bg-gray-200 duration-150 ease-in-out"
                        >
                          Next
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
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Footer --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Table Section --> */}
      </section>
    </>
  );
};

export default Code;
