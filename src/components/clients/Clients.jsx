import { useContext, useState } from 'react';
import { ClientContext } from '../../context/ClientContext';
import Table from './Table';

const Clients = () => {
	const [searchTerm, setSearchTerm] = useState('');
	let { setClientModal, clients, deleteClient } = useContext(ClientContext);

	return (
		<>
			<section>
				<h1 className='text-3xl font-semibold text-center py-5'>جميع العملاء</h1>
				{/* Table */}
				<Table
					searchTerm={searchTerm}
					setClientModal={setClientModal}
					clients={clients}
					deleteClient={deleteClient}
					filename='بيانات جميع العملاء'
				/>
			</section>
		</>
	);
};

export default Clients;
