import { createHashRouter, Outlet } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';
import Navbar from '../components/Navbar';
import Code from './Code';
import Login from './Login';
import SignUp from './SignUp';
import Clients from '../components/clients/Clients';
import ClientModal from '../components/clients/ClientModal';
import ProtectedRoute from '../components/ProtectedRoute';
import NotFound404 from '../components/NotFound404';
import Profile from './Profile';
import TripModal from '../components/profile/TripModal';
import Umrah from './Umrah';
import Hajj from './Hajj';
import Land from './Land';
import Flight from './Flight';
import Visa from './Visa';

const LayOut = () => {
	return (
		<>
			<Navbar />
			<Outlet />
			<ClientModal />
			<TripModal />
			<ScrollToTop
				color='white'
				top='200'
				smooth
				className='flex justify-center items-center w'
			/>
		</>
	);
};

export let route = createHashRouter([
	{
		path: '/',
		element: <LayOut />,
		children: [
			{
				index: true,
				element: (
					<ProtectedRoute>
						<Clients />
					</ProtectedRoute>
				),
			},
			{
				path: '/umrah',
				element: (
					<ProtectedRoute>
						<Umrah />
					</ProtectedRoute>
				),
			},
			{
				path: '/hajj',
				element: (
					<ProtectedRoute>
						<Hajj />
					</ProtectedRoute>
				),
			},
			{
				path: '/land',
				element: (
					<ProtectedRoute>
						<Land />
					</ProtectedRoute>
				),
			},
			{
				path: '/flight',
				element: (
					<ProtectedRoute>
						<Flight />
					</ProtectedRoute>
				),
			},
			{
				path: '/visas',
				element: (
					<ProtectedRoute>
						<Visa />
					</ProtectedRoute>
				),
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/sign-up',
				element: (
					<ProtectedRoute>
						<SignUp />
					</ProtectedRoute>
				),
			},
			{
				path: '/code',
				element: (
					<ProtectedRoute>
						<Code />
					</ProtectedRoute>
				),
			},
			{
				path: '/profile/:id',
				element: (
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				),
			},
			{
				path: '*',
				element: <NotFound404 />,
			},
		],
	},
	{
		path: '*',
		element: <NotFound404 />,
	},
]);
