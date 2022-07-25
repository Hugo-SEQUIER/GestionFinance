import React, { useState, useEffect } from 'react';
import {
	donutChart,
	line,
	columnChart,
	area,
	pieChart,
	gaugeChart,
	histogramChart,
} from '../components/data';
import Auth from '../../contexts/Auth';
export default function Portefeuille(){
	const {isAuth, setAuth} = useContext(Auth);
	
	const [fondsUser, setFondsUser] = useState();
	const depense = {
		loyer : new Map(),
        besoins : new Map(),
        investissementsUtilisateur: {
            bourse : new Map(),
            crypto : new Map(),
            immobilier : new Map(),
            autres : new Map(),
        },
        mensualitesUtilisateur: new Map(),
        epargne : new Map(),
        loisirs : new Map(),
        abonnements : new Map(),
        autres : new Map(),
    };
	
	const [depenseUser, setDepenseUser] = useState(depense);


    return (
        <>
        </>
    )
}