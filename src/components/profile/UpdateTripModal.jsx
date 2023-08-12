import React, { useContext, useEffect } from 'react';
import { ClientContext } from '../../context/ClientContext';
import Modal from 'react-modal';
import { useState } from 'react';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import toast from "react-hot-toast";
import Spinner from '../Spinner';
import { useParams } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

const UpdateTripModal = ({ editTrip, setEditTrip, tripObject }) => {
	const [loading, setLoading] = useState(false);
	const [trip, setTrip] = useState({});
	const { id } = useParams();

	const { generateUniqueId } = useContext(ClientContext);
	const uuid = generateUniqueId();

	function onChange(e) {
		setTrip((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
	}

	useEffect(() => {
		setTrip(tripObject);
	}, [editTrip]);

	async function handleSubmet(e) {
		e.preventDefault();
		if (window.confirm('هل انت متاكد من تعديل الرحلة؟')) {
			try {
				setLoading(true);
				// Adding trip to client trips
				const ref = doc(db, 'clients', id);
				// Adding the new Trip
				await updateDoc(ref, {
					trips: arrayUnion({
						id: uuid,
						...trip,
					}),
				});

				// Deleting the old trip
				await updateDoc(ref, {
					trips: arrayRemove(tripObject),
				});
				setEditTrip(false);
				setLoading(false);
				toast.success('تم تحديث الرحلة بنجاح.');
			} catch (err) {
				console.log(err);
				toast.error('لم يتم تحديث الرحلة.');
			}
		}
	}

	if (loading) {
		return <Spinner />;
	}

	return (
		<>
			<section className='text-black dark:text-white'>
				{editTrip && (
					<Modal
						isOpen={editTrip}
						contentLabel='trips'
						ariaHideApp={false}
						onRequestClose={() => setEditTrip(false)}
						className='
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
						'>
						<div>
							<div
								className='
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
									'>
								<div
									role='button'
									className='
									flex
									justify-center
									items-center
									hover:bg-gray-100
									p-2
									rounded-full
									active:scale-95
									duration-150
									ease-in-out'>
									<AiOutlineClose onClick={() => setEditTrip((prevState) => !prevState)} />
								</div>
								<h2>تعديل بيانات رحلة </h2>
							</div>
							<form
								onSubmit={handleSubmet}
								className='
								w-full
								p-10
								flex
								flex-col
								justify-center
								items-center
								'>
								{/* Number */}
								<div className='group relative mb-3 w-full'>
									<input
										type='text'
										id='rNumber'
										required
										autoFocus
										value={trip?.rNumber}
										onChange={onChange}
										min={3}
										className='
											text-end
											uppercase
											text-green-900
											placeholder:text-gray-300
											font-semibold
											bg-transparent 
											p-2.5 
											w-full 
											border-b-2
											border-x-0
											border-t-0
											border-gray-300 
											focus:outline-none
											focus:ring-0
											focus:border-green-500
											focus:placeholder:text-green-900
											'
									/>
									<label
										htmlFor='rNumber'
										className='
											absolute
											text-sm
											font-bold
											text-gray-300
											group-focus-within:text-green-500
											duration-150
											top-[50%]
											-translate-y-1/2
											px-2
											left-0
											'>
										رقم الحجز
									</label>
								</div>
								{/* path */}
								<div className='group relative mb-3 w-full'>
									<input
										type='text'
										id='path'
										required
										value={trip?.path}
										pattern='[\u0600-\u06FF\s\-/]+'
										onChange={onChange}
										min={3}
										className='
											text-end
											uppercase
											text-green-900
											placeholder:text-gray-300
											font-semibold
											bg-transparent 
											p-2.5 
											w-full 
											border-b-2
											border-x-0
											border-t-0
											border-gray-300 
											focus:outline-none
											focus:ring-0
											focus:border-green-500
											focus:placeholder:text-green-900
											'
									/>
									<label
										htmlFor='path'
										className='
											absolute
											text-sm
											font-bold
											text-gray-300
											group-focus-within:text-green-500
											duration-150
											top-[50%]
											-translate-y-1/2
											px-2
											left-0
											'>
										مسار الرحلة
									</label>
								</div>
								{/* flightCompany */}
								<div className='group relative mb-3 w-full'>
									<input
										type='text'
										id='flightCompany'
										required
										value={trip?.flightCompany}
										onChange={onChange}
										min={3}
										className='
											text-end
											uppercase
											text-green-900
											placeholder:text-gray-300
											font-semibold
											bg-transparent 
											p-2.5 
											w-full 
											border-b-2
											border-x-0
											border-t-0
											border-gray-300 
											focus:outline-none
											focus:ring-0
											focus:border-green-500
											focus:placeholder:text-green-900
											'
									/>
									<label
										htmlFor='flightCompany'
										className='
											absolute
											text-sm
											font-bold
											text-gray-300
											group-focus-within:text-green-500
											duration-150
											top-[50%]
											-translate-y-1/2
											px-2
											left-0
											'>
										الخطوط
									</label>
								</div>
								<div className='w-full flex flex-row-reverse gap-x-5'>
									{/* flightDate */}
									<div className='group relative mb-3 w-1/2'>
										<input
											type='date'
											id='flightDate'
											required
											value={trip?.flightDate}
											placeholder='تاريخ السفر'
											onChange={onChange}
											min={3}
											className='
											text-end
											uppercase
											text-green-900
											placeholder:text-gray-300
											font-semibold
											bg-transparent 
											p-2.5 
											w-full 
											border-b-2
											border-x-0
											border-t-0
											border-gray-300 
											focus:outline-none
											focus:ring-0
											focus:border-green-500
											focus:placeholder:text-green-900
											'
										/>
										<label
											htmlFor='flightDate'
											className='
											absolute
											text-sm
											font-bold
											text-gray-300
											group-focus-within:text-green-500
											duration-150
											top-[50%]
											-translate-y-1/2
											px-2
											left-0
											'>
											تاريخ السفر
										</label>
									</div>
									{/* returnDate */}
									<div className='group relative mb-3 w-1/2'>
										<input
											type='date'
											id='returnDate'
											value={trip?.returnDate}
											placeholder='تاريخ العودة'
											onChange={onChange}
											min={3}
											className='
											text-end
											uppercase
											text-green-900
											placeholder:text-gray-300
											font-semibold
											bg-transparent 
											p-2.5 
											w-full 
											border-b-2
											border-x-0
											border-t-0
											border-gray-300 
											focus:outline-none
											focus:ring-0
											focus:border-green-500
											focus:placeholder:text-green-900
											'
										/>
										<label
											htmlFor='returnDate'
											className='
											absolute
											text-sm
											font-bold
											text-gray-300
											group-focus-within:text-green-500
											duration-150
											top-[50%]
											-translate-y-1/2
											px-2
											left-0
											'>
											تاريخ العودة
										</label>
									</div>
								</div>
								{/* created */}
								<div className='group relative mb-3 w-full'>
									<input
										type='date'
										id='created'
										required
										value={trip?.created}
										onChange={onChange}
										min={3}
										className='
											text-end
											uppercase
											text-green-900
											placeholder:text-gray-300
											font-semibold
											bg-transparent 
											p-2.5 
											w-full 
											border-b-2
											border-x-0
											border-t-0
											border-gray-300 
											focus:outline-none
											focus:ring-0
											focus:border-green-500
											focus:placeholder:text-green-900
											'
									/>
									<label
										htmlFor='created'
										className='
											absolute
											text-sm
											font-bold
											text-gray-300
											group-focus-within:text-green-500
											duration-150
											top-[50%]
											-translate-y-1/2
											px-2
											left-0
											'>
										تاريخ التنفيذ
									</label>
								</div>
								<div className='w-full flex flex-row-reverse gap-x-5'>
									{/* providerCompany */}
									<div className='group relative mb-3 w-1/2'>
										<input
											type='text'
											id='providerCompany'
											required
											value={trip?.providerCompany}
											placeholder='الشركة المنفذة'
											onChange={onChange}
											min={3}
											className='
											text-end
											uppercase
											text-green-900
											placeholder:text-gray-300
											font-semibold
											bg-transparent 
											p-2.5 
											w-full
											border-b-2
											border-x-0
											border-t-0
											border-gray-300 
											focus:outline-none
											focus:ring-0
											focus:border-green-500
											focus:placeholder:text-green-900
											'
										/>
										<label
											htmlFor='providerCompany'
											className='
											absolute
											text-sm
											font-bold
											text-gray-300
											group-focus-within:text-green-500
											duration-150
											top-[50%]
											-translate-y-1/2
											px-2
											left-0
											'>
											شركة منفذة
										</label>
									</div>
									{/* companyProvidedTo */}
									<div className='group relative mb-3 w-1/2'>
										<input
											type='text'
											id='companyProvidedTo'
											required
											value={trip?.companyProvidedTo}
											placeholder='الشركة المنفذ لها'
											onChange={onChange}
											min={3}
											className='
											text-end
											uppercase
											text-green-900
											placeholder:text-gray-300
											font-semibold
											bg-transparent 
											p-2.5 
											w-full 
											border-b-2
											border-x-0
											border-t-0
											border-gray-300 
											focus:outline-none
											focus:ring-0
											focus:border-green-500
											focus:placeholder:text-green-900
											'
										/>
										<label
											htmlFor='companyProvidedTo'
											className='
											absolute
											text-sm
											font-bold
											text-gray-300
											group-focus-within:text-green-500
											duration-150
											top-[50%]
											-translate-y-1/2
											px-2
											left-0
											'>
											منفذ له
										</label>
									</div>
								</div>
								{/* provider */}
								<div className='group relative mb-3 w-full'>
									<input
										type='text'
										id='provider'
										required
										value={trip?.provider}
										onChange={onChange}
										min={3}
										className='
											text-end
											uppercase
											text-green-900
											placeholder:text-gray-300
											font-semibold
											bg-transparent 
											p-2.5 
											w-full 
											border-b-2
											border-x-0
											border-t-0
											border-gray-300 
											focus:outline-none
											focus:ring-0
											focus:border-green-500
											focus:placeholder:text-green-900
											'
									/>
									<label
										htmlFor='provider'
										className='
											absolute
											text-sm
											font-bold
											text-gray-300
											group-focus-within:text-green-500
											duration-150
											top-[50%]
											-translate-y-1/2
											px-2
											left-0
											'>
										المنفذ
									</label>
								</div>
								{/* Buttons */}
								<div className='flex justify-evenly items-center gap-x-5'>
									<button
										className='
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
									'>
										تعديل
									</button>
								</div>
							</form>
						</div>
					</Modal>
				)}
			</section>
		</>
	);
};

export default UpdateTripModal;
