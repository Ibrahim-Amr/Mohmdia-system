import { useContext, useState } from 'react';
import { ClientContext } from '../context/ClientContext';
import Table from '../components/clients/Table';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../Firebase';
import { useEffect } from 'react';

const Hajj = () => {
	const [clients, setClients] = useState([]);
	let { setClientModal, deleteClient } = useContext(ClientContext);

	useEffect(() => {
		const q = query(
			collection(db, 'clients'),
			where('type', '==', 'حج'),
			orderBy('timestamp', 'desc')
		);
		const unsubscribe = onSnapshot(q, (snapshot) => {
			setClients(snapshot.docs);
		});

		return unsubscribe;
	}, []);

	return (
		<>
			<section>
				<h1 className='text-3xl font-semibold text-center py-5'>عملاء الحج</h1>
				{/* Table */}
				<Table
					setClientModal={setClientModal}
					clients={clients}
					deleteClient={deleteClient}
					filename='بيانات عملاء الحج'
				/>
			</section>
		</>
	);
};

export default Hajj;
