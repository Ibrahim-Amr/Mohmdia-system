import {
	Timestamp,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	orderBy,
	query,
	where,
} from 'firebase/firestore';
import { useEffect } from 'react';
import { createContext, useState } from 'react';
import { db, storage } from '../Firebase';
import { deleteObject, ref } from 'firebase/storage';

export const ClientContext = createContext(null);

const ClientContextProvider = ({ children }) => {
	const [cliendModal, setClientModal] = useState(false);
	const [tripModal, setTripModal] = useState(false);
	const [updateTripModal, setUpdateTripModal] = useState(false);
	const [editTripObject, setEditTripObject] = useState({});
	const [clients, setClients] = useState([]);
	const [filterDate, setFilterDate] = useState('2023-04-25');

	console.log();
	// Unique id
	function generateUniqueId() {
		const timestamp = new Date().getTime();
		const random = Math.floor(Math.random() * 1000000);
		const uniqueId = `${timestamp}-${random}`;
		return uniqueId;
	}

	// Fetching Client data
	useEffect(() => {
		// converting date to  ISO 8601 format => Firebase Format
		const timestamp = Timestamp.fromDate(new Date(filterDate + 'T00:00:00.000'));
		const timestampEnd = Timestamp.fromDate(new Date(filterDate + 'T23:59:59.999'));
		//
		if (filterDate === '2023-04-25') {
			const q = query(
				collection(db, 'clients'),
				where('timestamp', '>', timestamp),
				orderBy('timestamp', filterDate === '2023-04-25' ? 'desc' : 'asc')
			);
			const unsubscribe = onSnapshot(q, (snapshot) => {
				setClients(snapshot.docs);
			});

			return unsubscribe;
		} else {
			const q = query(
				collection(db, 'clients'),
				where('timestamp', '>', timestamp),
				where('timestamp', '<', timestampEnd),
				orderBy('timestamp', filterDate === '2023-04-25' ? 'desc' : 'asc')
			);
			const unsubscribe = onSnapshot(q, (snapshot) => {
				setClients(snapshot.docs);
			});

			return unsubscribe;
		}
	}, [filterDate]);

	// Delete post Function
	async function deleteClient(client) {
		if (window.confirm('Are you sure you want to delete this post?')) {
			try {
				let docRef = doc(db, 'clients', client.id);
				await deleteDoc(docRef);
				if (client.data().avatar) {
					await deleteObject(ref(storage, `clients/${client.id}`));
				}
			} catch (err) {
				console.log(err);
			}
		}
	}
	return (
		<ClientContext.Provider
			value={{
				setClientModal,
				cliendModal,
				tripModal,
				setTripModal,
				updateTripModal,
				setUpdateTripModal,
				editTripObject,
				setEditTripObject,
				clients,
				setClients,
				generateUniqueId,
				deleteClient,
				setFilterDate,
				filterDate,
			}}>
			{children}
		</ClientContext.Provider>
	);
};

export default ClientContextProvider;
