import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { useState } from 'react';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	// Checking if the user logged
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			}
		});
	}, [auth?.currentUser]);

	function signOut() {
		auth.signOut();
		setUser(null);
		navigate('/login');
	}

	return (
		<>
			{/*  */}
			<header className='sticky top-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-3 sm:py-0  sm:max-h-[60px] shadow-md '>
				<nav
					className='relative max-w-7xl w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 '
					aria-label='Global'>
					<div className='flex items-center justify-between'>
						<Link
							className='flex-none text-xl font-semibold dark:text-black'
							to={'/'}
							aria-label='Brand'>
							<img
								src='https://d2pi0n2fm836iz.cloudfront.net/407371/1118202210162663775b7a3d680.png'
								alt='logo'
								className='h-12 sm:h-16'
							/>
						</Link>
						<div className='sm:hidden'>
							<button
								type='button'
								className='hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-black dark:focus:ring-offset-gray-800'
								data-hs-collapse='#navbar-collapse-with-animation'
								aria-controls='navbar-collapse-with-animation'
								aria-label='Toggle navigation'>
								<svg
									className='hs-collapse-open:hidden w-4 h-4'
									width='16'
									height='16'
									fill='currentColor'
									viewBox='0 0 16 16'>
									<path
										fillRule='evenodd'
										d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
									/>
								</svg>
								<svg
									className='hs-collapse-open:block hidden w-4 h-4'
									width='16'
									height='16'
									fill='currentColor'
									viewBox='0 0 16 16'>
									<path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z' />
								</svg>
							</button>
						</div>
					</div>
					{/* Pc nav */}
					<div className='hs-collapse hidden  transition-all duration-300 basis-full grow absolute sm:static sm:block bg-transparent w-full left-0 px-4 sm:px-0 0 '>
						<div className='flex sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:pl-7'>
							<NavLink to={'/visas'} className='nav-hover-effect font-medium text-lg text-black'>
								التأشيرات
							</NavLink>
							<NavLink to={'/hajj'} className='nav-hover-effect font-medium text-lg text-black'>
								الحج
							</NavLink>
							<NavLink to={'/umrah'} className='nav-hover-effect font-medium text-lg text-black'>
								العمرة
							</NavLink>
							<NavLink to={'/land'} className='nav-hover-effect font-medium text-lg text-black'>
								بري
							</NavLink>
							<NavLink to={'/flight'} className='nav-hover-effect font-medium text-lg text-black'>
								طيران عادي
							</NavLink>
							<NavLink to={'/'} className='nav-hover-effect font-medium text-lg text-black'>
								الرئيسية
							</NavLink>
							{user ? (
								<div className='group flex items-center gap-x-2 font-medium text-lg text-black hover:text-indigo-500 sm:border-l sm:border-gray-300 sm:my-6 sm:pl-6 dark:border-gray-700 relative duration-200 ease-in-out h-full'>
									<svg
										className='w-5 h-5'
										xmlns='http://www.w3.org/2000/svg'
										width='16'
										height='16'
										fill='currentColor'
										viewBox='0 0 16 16'>
										<path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z' />
									</svg>
									{/* Drop down */}
									<div className='absolute bottom-0 translate-y-full right-0'>
										<div className='group-hover:block hidden z-50 w-56  mt-2 bg-white rounded-md shadow-xl dark:bg-gray-800 duration-200 ease-in-out overflow-hidden'>
											<div className='flex justify-start items-center p-2 text-sm text-gray-600 transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white border-b border-gray-200 dark:border-gray-700 '>
												<img
													className='flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9'
													src={
														user.photoURL == null
															? 'https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png'
															: user.photoURL
													}
													alt='jane avatar'
												/>
												<div className='mx-1'>
													<h1 className='text-sm font-semibold text-gray-700 dark:text-gray-200'>
														{user.displayName}
													</h1>
													<p className='text-sm text-gray-500 dark:text-gray-400'>{user.email}</p>
												</div>
											</div>
											<div className='border-b border-gray-200 dark:border-gray-700 py-1'>
												<Link
													to={'/code'}
													className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>
													Code
												</Link>
												<Link
													to={'/sign-up'}
													className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>
													sign up
												</Link>
											</div>
											<div className='py-1'>
												<button
													onClick={signOut}
													className='block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white w-full text-start'>
													Sign Out
												</button>
											</div>
										</div>
									</div>
								</div>
							) : (
								<Link
									to={'/login'}
									className='flex items-center gap-x-2 font-medium text-lg text-black hover:text-indigo-500 sm:border-l sm:border-gray-300 sm:my-6 sm:pl-6 dark:border-gray-700'>
									<svg
										className='w-4 h-4'
										xmlns='http://www.w3.org/2000/svg'
										width='16'
										height='16'
										fill='currentColor'
										viewBox='0 0 16 16'>
										<path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z' />
									</svg>
									Log in
								</Link>
							)}
						</div>
					</div>
					{/* Mobile Nav */}
					<div
						id='navbar-collapse-with-animation'
						className='hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow absolute sm:static sm:hidden bg-white w-full left-0 px-4 sm:px-0 shadow-md'>
						<div className='flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:pl-7 mb-2'>
							<NavLink
								to={'/'}
								data-hs-collapse='#navbar-collapse-with-animation'
								aria-controls='navbar-collapse-with-animation'
								aria-label='Toggle navigation'
								className='nav-hover-effect w-fit font-medium text-lg text-black  sm:py-6'
								aria-current='page'>
								الرئيسية
							</NavLink>
							<NavLink
								to={'/flight'}
								data-hs-collapse='#navbar-collapse-with-animation'
								aria-controls='navbar-collapse-with-animation'
								aria-label='Toggle navigation'
								className='nav-hover-effect w-fit font-medium text-lg text-black  sm:py-6'
								aria-current='page'>
								طيران عادي
							</NavLink>
							<NavLink
								to={'/land'}
								data-hs-collapse='#navbar-collapse-with-animation'
								aria-controls='navbar-collapse-with-animation'
								aria-label='Toggle navigation'
								className='nav-hover-effect w-fit font-medium text-lg text-black  sm:py-6'
								aria-current='page'>
								بري
							</NavLink>
							<NavLink
								to={'/umrah'}
								data-hs-collapse='#navbar-collapse-with-animation'
								aria-controls='navbar-collapse-with-animation'
								aria-label='Toggle navigation'
								className='nav-hover-effect w-fit font-medium text-lg text-black  sm:py-6'>
								العمرة
							</NavLink>
							<NavLink
								to={'/hajj'}
								data-hs-collapse='#navbar-collapse-with-animation'
								aria-controls='navbar-collapse-with-animation'
								aria-label='Toggle navigation'
								className='nav-hover-effect w-fit font-medium text-lg text-black  sm:py-6'>
								الحج
							</NavLink>
							<NavLink
								to={'/visas'}
								data-hs-collapse='#navbar-collapse-with-animation'
								aria-controls='navbar-collapse-with-animation'
								aria-label='Toggle navigation'
								className='nav-hover-effect w-fit font-medium text-lg text-black  sm:py-6'>
								التأشيرات
							</NavLink>
						</div>
					</div>
				</nav>
			</header>
		</>
	);
};

export default Navbar;
