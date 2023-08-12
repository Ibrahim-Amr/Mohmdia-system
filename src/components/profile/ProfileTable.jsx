import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { arrayRemove, doc, onSnapshot, orderBy, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import { ClientContext } from '../../context/ClientContext';
import UpdateTripModal from './UpdateTripModal';

const ProfileTable = () => {
	const [clientData, setClientData] = useState([]);
	const [editTrip, setEditTrip] = useState(false);
	const [tripObject, setTripObject] = useState({});
	let { id } = useParams();
	let { setTripModal } = useContext(ClientContext);

	// Getting Client data
	useEffect(() => {
		const docRef = doc(db, 'clients', id);
		const userUnsub = onSnapshot(docRef, orderBy('timestamp', 'desc'), (snapshot) => {
			setClientData(snapshot.data().trips);
		});
		return userUnsub;
	}, [id]);

	async function deleteTrip(trip) {
		const ref = doc(db, 'clients', id);
		try {
			if (window.confirm('Are you sure you want to delete this trip?')) {
				await updateDoc(ref, {
					trips: arrayRemove(trip),
				});
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			<div>
				{/* <!-- Card --> */}
				<div className='flex flex-col'>
					<div className='-m-1.5 overflow-x-auto'>
						<div className='p-1.5 min-w-[1300px] w-full inline-block align-middle mx-auto'>
							<div className='bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden dark:bg-slate-900 dark:border-gray-700 '>
								{/* <!-- Header --> */}
								<div className='px-6 py-4  gap-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700'>
									<div>
										<h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 uppercase'>
											رحلات العميل
										</h2>
									</div>
									{!clientData && (
										<div>
											<div className='inline-flex gap-x-2'>
												<button
													onClick={() => setTripModal((prevState) => !prevState)}
													className='py-2 px-3 inline-flex justify-between items-center gap-2 rounded-md  font-semibold bg-green-500 text-white hover:bg-green-600  transition-all text-sm  active:scale-95 duration-150 ease-in-out'>
													إضافة رحلة
													<svg
														className='w-3 h-3'
														xmlns='http://www.w3.org/2000/svg'
														width='16'
														height='16'
														viewBox='0 0 16 16'
														fill='none'>
														<path
															d='M2.63452 7.50001L13.6345 7.5M8.13452 13V2'
															stroke='currentColor'
															strokeWidth='2'
															strokeLinecap='round'
														/>
													</svg>
												</button>
											</div>
										</div>
									)}
								</div>
								{/* <!-- Table --> */}
								<table className='min-w-[1000px] w-full'>
									<thead className='bg-gray-100'>
										<tr>
											<th className='text-center border py-3 w-[10%]'>
												<span className='text-lg font-semibold uppercase tracking-wide text-gray-800'>
													الخيارات
												</span>
											</th>
											<th className='text-center border py-3 w-[10%]'>
												<span className='text-lg font-semibold uppercase tracking-wide text-gray-800'>
													الشركة المنفذ لها
												</span>
											</th>
											<th className='text-center border py-3 w-[10%]'>
												<span className='text-lg font-semibold uppercase tracking-wide text-gray-800'>
													الشركة المنفذة
												</span>
											</th>
											<th className='text-center border py-3 w-[10%]'>
												<span className='text-lg font-semibold uppercase tracking-wide text-gray-800'>
													المنفذ
												</span>
											</th>
											<th className='text-center border py-3 w-[10%]'>
												<span className='text-lg font-semibold uppercase tracking-wide text-gray-800'>
													تاريخ التنفيذ
												</span>
											</th>
											<th className='text-center border py-3 w-[10%]'>
												<span className='text-lg font-semibold uppercase tracking-wide text-gray-800'>
													تاريخ العودة
												</span>
											</th>
											<th className='text-center border py-3 w-[10%]'>
												<span className='text-lg font-semibold uppercase tracking-wide text-gray-800'>
													تاريخ السفر
												</span>
											</th>
											<th className='text-center border py-3 w-[10%]'>
												<span className='text-lg font-semibold uppercase tracking-wide text-gray-800'>
													الخطوط
												</span>
											</th>

											<th className='text-center border py-3 w-[10%] px-5'>
												<span className='text-lg font-semibold uppercase tracking-wide text-gray-800'>
													مسار الرحلة
												</span>
											</th>
											<th className=' text-center border py-3 w-[10%] '>
												<span className='text-lg font-semibold uppercase tracking-wide text-gray-800'>
													رقم الحجز
												</span>
											</th>
										</tr>
									</thead>

									<tbody className='divide-y divide-gray-200 dark:divide-gray-700'>
										{clientData?.map((client, index) => (
											<tr
												key={client.id}
												className='text-center hover:bg-gray-50 duration-150 ease-in-out'>
												{/* Actions */}
												<td className='text-base font-semibold text-gray-600 whitespace-nowrap border text-center py-2 flex flex-row justify-center items-center gap-x-2'>
													<button
														onClick={() => deleteTrip(client)}
														className='px-2 py-1 border rounded-md border-red-500 text-red-500 hover:text-white hover:bg-red-500 duration-150 ease-in-out'>
														حذف
													</button>
													<button
														onClick={() => {
															setEditTrip(true);
															setTripObject(client);
														}}
														className='px-2 py-1 border rounded-md border-yellow-500 text-yellow-500 hover:text-white hover:bg-yellow-500 duration-150 ease-in-out'>
														تعديل
													</button>
												</td>
												{/* provider company */}
												<td className='text-base font-semibold text-gray-600 whitespace-nowrap border text-center py-2 '>
													{client?.companyProvidedTo}
												</td>
												{/* provider company */}
												<td className='text-base font-semibold text-gray-600 whitespace-nowrap border text-center py-2 '>
													{client?.providerCompany}
												</td>
												{/* provider */}
												<td className='text-base font-semibold text-gray-600 whitespace-nowrap border text-center py-2 '>
													{client?.provider}
												</td>
												{/* Creation time */}
												<td className='text-base font-semibold text-gray-600 whitespace-nowrap border text-center py-2 '>
													{client?.created}
												</td>
												{/* return Date */}
												<td className='text-base font-semibold text-gray-600 whitespace-nowrap border text-center py-2 '>
													{client?.returnDate ? client?.returnDate : '-'}
												</td>
												{/* Flight Date */}
												<td className='text-base font-semibold text-gray-600 whitespace-nowrap border text-center py-2 '>
													{client?.flightDate}
												</td>
												{/* To */}
												<td className='text-base font-semibold text-gray-600 whitespace-nowrap border text-center py-2 '>
													{client?.flightCompany}
												</td>
												{/* From */}
												<td className='text-base font-semibold text-gray-600 whitespace-nowrap border text-center py-2 '>
													{client?.path}
													{!client?.path && (
														<span>
															k{client?.from} - {client?.to}
														</span>
													)}
												</td>
												{/* Flight Number */}
												<td className='text-base font-semibold text-gray-600 whitespace-nowrap border text-center py-2 uppercase'>
													{client?.rNumber}
												</td>
											</tr>
										))}
									</tbody>
								</table>
								{/* <!-- End Table --> */}

								{/* <!-- Footer --> */}
								<div className='px-6 py-4'>
									<div className='flex items-center justify-center gap-4'>
										<p className='text-xl font-semibold'>
											<span>إجمالي الرحلات</span>
											<span className='text-black mr-2'>{clientData?.length}</span>
										</p>
									</div>
								</div>
								{/* <!-- End Footer --> */}
							</div>
						</div>
					</div>
				</div>
				{/* <!-- End Card --> */}
			</div>

			<UpdateTripModal editTrip={editTrip} setEditTrip={setEditTrip} tripObject={tripObject} />
		</>
	);
};

export default ProfileTable;
