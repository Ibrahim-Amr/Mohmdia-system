import { useState } from 'react';
import ProfileForm from '../components/profile/ProfileForm';
import ProfileTable from '../components/profile/ProfileTable';
import NotFound404 from '../components/NotFound404';

const Profile = () => {
	const [user, setUser] = useState(true);

	if (!user) {
		return <NotFound404 />;
	}

	if (user) {
		return (
			<>
				<section className='px-3 overflow-x-hidden-hidden'>
					<ProfileForm setUser={setUser} />
					<ProfileTable />
				</section>
			</>
		);
	}
};

export default Profile;
