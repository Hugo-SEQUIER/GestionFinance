import { Routes, Route } from 'react-router-dom';
import Accueil from './Accueil';
import Portefeuille from './Portefeuille'

const Navigator = () => (
	<Routes>
		<Route path={`/`} element={<Accueil/>}/>
		<Route path={`/depense`} element={<Portefeuille/>}/>
	</Routes>
);

export default Navigator;
