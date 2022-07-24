import Navigator from './containers/Navigator';
import MenuNav from './components/Menu';
import { isAuthentifacted, logout} from '../services/AuthApi';
import React, { useState, useContext} from 'react';
import Auth from '../contexts/Auth';
export default function App(){

	const [isAuth, setAuth] = useState(isAuthentifacted());
	return (
		<>
			<Auth.Provider value={{isAuth, setAuth}}>
				<MenuNav />
				<Navigator />
			</Auth.Provider>
		</>
	);
}