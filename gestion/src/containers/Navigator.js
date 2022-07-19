import { Routes, Route } from 'react-router-dom';
import Accueil from './Accueil';

const Navigator = () => (
	<Routes>
		<Route path={`/`} element={<Accueil/>}/>
	</Routes>
);

export default Navigator;
