import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../Firebase';
import Spinner from '../Spinner';

const ProfileForm = ({ setUser }) => {
	const [loading, setLoading] = useState(false);
	const [clientData, setClientData] = useState({});
	const [edit, setEdit] = useState(false);
	let { id } = useParams();

	// Getting Client data
	useEffect(() => {
		const docRef = doc(db, 'clients', id);
		const userUnsub = onSnapshot(docRef, (snapshot) => {
			if (snapshot.data()) {
				setClientData(snapshot.data());
			} else {
				setUser(false);
			}
		});
		return userUnsub;
	}, [id]);

	function onChange(e) {
		setClientData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
	}
	// Update CLient Data
	async function handleSubmet(e) {
		e.preventDefault();
		setLoading(true);
		try {
			await setDoc(doc(db, 'clients', id), clientData);
			setEdit((prevState) => !prevState);
		} catch (err) {
			console.log(err);
		}
		setLoading(false);
	}

	if (loading) {
		return <Spinner />;
	}

	return (
		<>
			<form
				onSubmit={handleSubmet}
				className='
				p-3
				max-w-[900px]
				mx-auto
				pt-10
				'>
				<div className='flex flex-row-reverse justify-center items-center gap-x-5'>
					{/* Name */}
					<div
						className='
					relative
					mb-5
					w-1/2
					'>
						<input
							type='text'
							id='name'
							required
							disabled={!edit}
							value={clientData?.name}
							onChange={onChange}
							min={1}
							maxLength={30}
							pattern='^(?!\s)(?=[\u0600-\u06FF\s-]{1,33}$)(?![\u0600-\u06FF]*\s[\u0600-\u06FF]*و[\u0600-\u06FF]*\s[\u0600-\u06FF]*)[\u0600-\u06FF]+(?:\s[\u0600-\u06FF]+){0,2}(?<!\s)$'
							className='
							px-2.5
							pb-2.5
							pt-4
							w-full
							text-base
							text-gray-900 
							text-end
							bg-transparent 
							rounded-lg 
							border-1 
							border-gray-300 
							focus:outline-none 
							focus:ring-0 
							focus:border-blue-600 
							disabled:bg-gray-100'
						/>
						<label
							htmlFor='name'
							className='
							absolute 
							text-lg
							text-gray-500
							transform
							-translate-y-4
							scale-75
							top-1
							z-10
							bg-white
							px-2
							right-0'>
							الأسم
						</label>
					</div>
					{/* Address */}
					<div
						className='relative 
					mb-5
					w-1/2'>
						<input
							type='text'
							id='address'
							disabled={!edit}
							value={clientData?.address}
							onChange={onChange}
							maxLength={50}
							className='
							px-2.5 
							pb-2.5 
							pt-4 
							w-full 
							text-base 
							text-end
							text-gray-900 
							bg-transparent 
							rounded-lg 
							border-1 
							border-gray-300 
							focus:outline-none 
							focus:ring-0 
							focus:border-blue-600 
							disabled:bg-gray-100
							'
						/>
						<label
							htmlFor='address'
							className='
							absolute 
							text-lg
							text-gray-500
							transform
							-translate-y-4
							scale-75 
							top-1
							z-10
							bg-white
							px-2
							right-0
							'>
							العنوان
						</label>
					</div>
				</div>
				<div className='flex flex-row-reverse justify-center items-center gap-x-5'>
					{/* Phone */}
					<div
						className={`
					relative 
					mb-5
					${clientData?.type === 'حج' || clientData?.type === 'عمرة' ? 'w-1/2' : 'w-full'}`}>
						<input
							type='text'
							id='phone'
							disabled={!edit}
							value={clientData?.phone}
							onChange={onChange}
							minLength={11}
							maxLength={11}
							required
							className='
							px-2.5 
							pb-2.5 
							pt-4 
							w-full 
							text-base 
							text-gray-900 
							text-end
							bg-transparent 
							rounded-lg 
							border-1 
							border-gray-300 
							focus:outline-none 
							focus:ring-0 
							focus:border-blue-600 
							disabled:bg-gray-100
							'
						/>
						<label
							htmlFor='phone'
							className='
								absolute 
							text-lg
							text-gray-500
							transform
							-translate-y-4
							scale-75 
							top-1
							z-10
							bg-white
							px-2
							right-0
							'>
							رقم الهاتف
						</label>
					</div>
					{/* secondPhone */}
					{clientData?.type === 'حج' || clientData?.type === 'عمرة' ? (
						<div
							className='
					relative 
					mb-5
					w-1/2'>
							<input
								type='text'
								id='secondPhone'
								disabled={!edit}
								value={clientData?.secondPhone}
								onChange={onChange}
								minLength={11}
								maxLength={11}
								className='
							px-2.5 
							pb-2.5 
							pt-4 
							w-full 
							text-base 
							text-gray-900 
							text-end
							bg-transparent 
							rounded-lg 
							border-1 
							border-gray-300 
							focus:outline-none 
							focus:ring-0 
							focus:border-blue-600 
							disabled:bg-gray-100
							'
							/>
							<label
								htmlFor='secondPhone'
								className='
								absolute 
							text-lg
							text-gray-500
							transform
							-translate-y-4
							scale-75 
							top-1
							z-10
							bg-white
							px-2
							right-0
							'>
								رقم اخر
							</label>
						</div>
					) : null}
				</div>
				<div className='flex flex-row-reverse justify-center items-center gap-x-5'>
					{/* ClientID */}

					{clientData?.type === 'حج' && (
						<div
							className='
					relative 
					mb-5
					w-1/2'>
							<input
								type='text'
								id='clientId'
								disabled={!edit}
								value={clientData?.clientId}
								onChange={onChange}
								minLength={14}
								maxLength={14}
								className='
							px-2.5 
							pb-2.5 
							pt-4 
							w-full 
							text-base 
							text-gray-900 
							text-end
							bg-transparent 
							rounded-lg 
							border-1 
							border-gray-300 
							focus:outline-none 
							focus:ring-0 
							focus:border-blue-600 
							disabled:bg-gray-100
							'
							/>
							<label
								htmlFor='clientId'
								className='
								absolute 
							text-lg
							text-gray-500
							transform
							-translate-y-4
							scale-75 
							top-1
							z-10
							bg-white
							px-2
							right-0
							'>
								الرقم القومي للعميل
							</label>
						</div>
					)}
					{/* Type */}
					{!edit ? (
						<div
							className={`
					relative
					mb-5
					${clientData?.type === 'حج' ? 'w-1/2' : 'w-full'}`}>
							<input
								type='text'
								id='provider'
								disabled={!edit}
								value={clientData?.type}
								onChange={onChange}
								minLength={3}
								required
								className='
							px-2.5 
							pb-2.5 
							pt-4 
							w-full 
							text-base 
							text-gray-900 
							text-end
							bg-transparent 
							rounded-lg 
							border-1 
							border-gray-300 
							focus:outline-none 
							focus:ring-0 
							focus:border-blue-600 
							disabled:bg-gray-100
							'
							/>
							<label
								htmlFor='provider'
								className='
								absolute 
							text-lg
							text-gray-500
							transform
							-translate-y-4
							scale-75 
							top-1
							z-10
							bg-white
							px-2
							right-0
							'>
								نوع العميل
							</label>
						</div>
					) : (
						<div
							className={`relative mb-5 w-1/2 ${clientData?.type === 'حج' ? 'w-1/2' : 'w-full'}`}>
							<select
								onChange={onChange}
								id='type'
								className='py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-base font-medium focus:border-blue-500 focus:ring-blue-500 text-end'>
								<option
									value='طيران عادي'
									className='text-end'
									selected={clientData?.type == 'طيران عادي' && true}>
									طيران عادي
								</option>
								<option
									value='بري'
									className='text-end'
									selected={clientData?.type == 'بري' && true}>
									بري
								</option>
								<option
									value='عمرة'
									className='text-end'
									selected={clientData?.type == 'عمرة' && true}>
									عمرة
								</option>
								<option value='حج' className='text-end' selected={clientData?.type == 'حج' && true}>
									حج
								</option>
							</select>
						</div>
					)}
				</div>
				{/* Visa Type  */}
				{clientData?.type === 'تأشيرة' && (
					<>
						{/* Visas */}
						<div className='flex flex-row-reverse justify-center items-center gap-x-3'>
							<div className='relative mb-5 w-1/2'>
								<input
									type='text'
									id='visa'
									required
									autoFocus
									value={clientData.visa ? clientData.visa : ''}
									disabled={!edit}
									placeholder='نوع التأشيرة'
									onChange={onChange}
									min={3}
									maxLength={50}
									className='
										px-2.5 
										pb-2.5 
										pt-4 
										w-full 
										text-base 
										text-gray-900 
										text-end
										bg-transparent 
										rounded-lg 
										border-1 
										border-gray-300 
										focus:outline-none 
										focus:ring-0 
										focus:border-blue-600 
										disabled:bg-gray-100
										'
								/>
							</div>
							<div className='relative mb-5 w-1/2'>
								<input
									type='text'
									id='visaDuration'
									required
									value={clientData?.visaDuration ? clientData?.visaDuration : ''}
									disabled={!edit}
									placeholder='مدة التأشيرة'
									onChange={onChange}
									min={3}
									maxLength={50}
									className='
										px-2.5 
										pb-2.5 
										pt-4 
										w-full 
										text-base 
										text-gray-900 
										text-end
										bg-transparent 
										rounded-lg 
										border-1 
										border-gray-300 
										focus:outline-none 
										focus:ring-0 
										focus:border-blue-600 
										disabled:bg-gray-100
										'
								/>
							</div>
						</div>
						<div className='relative mb-5 w-full'>
							<select
								id='visaStatus'
								required
								disabled={!edit}
								value={clientData?.visaStatus}
								onChange={onChange}
								className='
									p-2.5
									pr-9 
									w-full 
									text-base 
									text-gray-900 
									bg-white
									text-end
									bg-transparent 
									rounded-lg 
									border-1 
									border-gray-300 
									focus:outline-none 
									focus:ring-0 
									focus:border-blue-600 
									disabled:bg-gray-100
									'>
								<option value='' className='hidden'>
									حالة التأشيرة
								</option>
								<option value='صدرت' className='text-end'>
									صدرت
								</option>
								<option value='لم تصدر' className='text-end'>
									لم تصدر
								</option>
								<option value='تحت التنفيذ' className='text-end'>
									تحت التنفيذ
								</option>
							</select>
						</div>
					</>
				)}

				{clientData.type === 'حج' && (
					<div
						className='
							flex
							justify-between
							items-center
							gap-x-5
						'>
						{/* hajj status */}
						<div className='relative mb-5 w-1/3'>
							<select
								onChange={onChange}
								className='py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-base font-medium focus:border-blue-500 focus:ring-blue-500 text-end disabled:bg-gray-100'
								id='hajjStatus'
								required
								disabled={!edit}>
								<option value='' className='hidden'>
									حالة الحج
								</option>
								<option
									value='فاز بالقرعة'
									className='text-end'
									selected={clientData?.hajjStatus == 'فاز بالقرعة' && true}>
									فاز بالقرعة
								</option>
								<option
									value='لم يصبه الدور'
									className='text-end'
									selected={clientData?.hajjStatus == 'لم يصبه الدور' && true}>
									لم يصبه الدور
								</option>
								<option
									value='تحت الاجراء'
									className='text-end'
									selected={clientData?.hajjStatus == 'تحت الاجراء' && true}>
									تحت الاجراء
								</option>
							</select>
						</div>
						{/* hajj date */}
						<div className='relative mb-5 w-1/3'>
							<select
								onChange={onChange}
								className='py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-base font-medium focus:border-blue-500 focus:ring-blue-500 text-end disabled:bg-gray-100'
								id='hajjDate'
								required
								disabled={!edit}>
								<option value='' className='hidden'>
									موسم الحج
								</option>
								<option
									value='1444'
									className='text-end'
									selected={clientData?.hajjDate == '1444' && true}>
									1444
								</option>
								<option
									value='1445'
									className='text-end'
									selected={clientData?.hajjDate == '1445' && true}>
									1445
								</option>
								<option
									value='1446'
									className='text-end'
									selected={clientData?.hajjDate == '1446' && true}>
									1446
								</option>
							</select>
						</div>
						{/* hajj type */}
						<div className={`relative mb-5 w-1/3 ${clientData?.type !== 'حج' && 'hidden'}`}>
							<select
								onChange={onChange}
								id='hajjType'
								className='py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-base font-medium focus:border-blue-500 focus:ring-blue-500 text-end disabled:bg-gray-100'
								disabled={!edit}>
								<option
									value='حج 5 نجوم'
									className='text-end'
									selected={clientData?.hajjType == 'حج 5 نجوم' && true}>
									حج 5 نجوم
								</option>
								<option
									value='حج اقتصادي'
									className='text-end'
									selected={clientData?.hajjType == 'حج اقتصادي' && true}>
									حج اقتصادي
								</option>
								<option
									value='حج مباشر'
									className='text-end'
									selected={clientData?.hajjType == 'حج مباشر' && true}>
									حج مباشر
								</option>
								<option
									value='حج بري'
									className='text-end'
									selected={clientData?.hajjType == 'حج بري' && true}>
									حج بري
								</option>
							</select>
						</div>
					</div>
				)}
				{/* provider */}
				<div
					className='
					relative
					mb-5'>
					<input
						type='text'
						id='provider'
						disabled={!edit}
						value={clientData?.provider}
						onChange={onChange}
						minLength={3}
						required
						className='
							px-2.5 
							pb-2.5 
							pt-4 
							w-full 
							text-base 
							text-gray-900 
							text-end
							bg-transparent 
							rounded-lg 
							border-1 
							border-gray-300 
							focus:outline-none 
							focus:ring-0 
							focus:border-blue-600 
							disabled:bg-gray-100
							'
					/>
					<label
						htmlFor='provider'
						className='
								absolute 
							text-lg
							text-gray-500
							transform
							-translate-y-4
							scale-75 
							top-1
							z-10
							bg-white
							px-2
							right-0
							'>
						المنفذ
					</label>
				</div>
				{!edit && (
					<button
						onClick={() => setEdit((prevState) => !prevState)}
						className='
						block
						mx-auto
						bg-yellow-400 
						text-white 
						text-lg
						font-semibold
						px-8 
						py-3 
						rounded-md 
						shadow 
						hover:shadow-md 
						hover:bg-yellow-500
						duration-150
						ease-in-out
						'>
						تعديل بيانات العميل
					</button>
				)}
				{edit && (
					<div className='flex flex-row-reverse justify-center items-center gap-5'>
						<button
							className='
						bg-green-400 
						text-white 
						text-lg
						font-semibold
						px-8 
						py-3 
						rounded-md 
						shadow 
						hover:shadow-md 
						hover:bg-green-500
						duration-150
						ease-in-out
						'>
							حفظ
						</button>
						<button
							type='button'
							onClick={() => setEdit(false)}
							className='
						bg-red-400 
						text-white 
						text-lg
						font-semibold
						px-8 
						py-3 
						rounded-md 
						shadow 
						hover:shadow-md 
						hover:bg-red-500
						duration-150
						ease-in-out
						'>
							الغاء
						</button>
					</div>
				)}
			</form>
		</>
	);
};

export default ProfileForm;
