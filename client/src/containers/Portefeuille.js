import React, { useState, useEffect, useContext, useRef} from 'react';
import {
	donutChart,
	line,
	columnChart,
	area,
	pieChart,
	gaugeChart,
	histogramChart,
} from '../components/data';
import { 
    Divider,
    Center,
    FormControl,
    FormLabel,
    Input,
    Button,
} from '@chakra-ui/react'
import { getOneUser } from '../../services/AuthApi';
import Auth from '../../contexts/Auth';
import axios from 'axios';
export default function Portefeuille(){
	const {isAuth, setAuth} = useContext(Auth);
    const [user, setUser] = useState();
	const [fondsUser, setFondsUser] = useState(0);
	const [depenseUser, setDepenseUser] = useState();
 	const userRef = useRef(null);
    const getUser = async () => {
        if (isAuth[0]){
            console.log(isAuth);
            axios.get("http://localhost:8070/api/auth/id", {params : {id : isAuth[1]}})
                .then((res) =>{
                    setUser(res.data);
                });
        }
    };

    useEffect(() => {
        getUser();
        console.log(depenseUser)
    },[])

    useEffect(() => {
        if (user != undefined){
            setFondsUser(user.fonds);
            setDepenseUser(user.depense);
        }
    },[user])


    function buildData(chart){
        if (depenseUser != undefined){
            if (depenseUser.loyer.size > 0){
                let arrayDataStats;
                let result;
                if (chart == "donut"){
                    arrayDataStats = Object.entries(depenseUser);
                    let total = fondsUser;
                    result = new Map();
                    for (let idx = 0 ; idx < arrayDataStats.length; idx++){
                        if (arrayDataStats[idx][0] == "investissementsUtilisateur"){
                            let listInvest = Object.entries(arrayDataStats[idx][1]);
                            let resultInvest = new Map();
                            for (let idxInvest = 0; idxInvest < listInvest.length; idxInvest++){
                                resultInvest.set(listInvest[idxInvest][0], listInvest[idxInvest][1].entries()[listInvest[idxInvest][1].entries().length -1]);
                            }
                            let totalInvest = 0;
                            resultInvest = resultInvest.entries();
                            for (let idxInvest = 0; idxInvest < resultInvest.length; idxInvest++){
                                totalInvest += resultInvest[idxInvest][1];
                            }
                            result.set("Investissement", total / totalInvest);
                        }
                        else result.set(arrayDataStats[idx][0], total / arrayDataStats[idx][1].entries()[arrayDataStats[idx][1].entries().length -1]);
                    }
                    return donutChart(Object.fromEntries(result));
                }
            }
            
        }
    }

    return (
        <>
        <div>
            <div className='Bannière' style={{minHeight : "150px"}}>
                <h1>Portefeuille {user != undefined && `de ${user.prenom} ${user.nom}`}</h1>
            </div>
        </div>
        {depenseUser != undefined && depenseUser.loyer.size > 0 && (<>
            <div className='wallet'>
                <Center height='300px'>
                    <div>
                        <h1>Répartition des dépenses</h1>
                        <div>
                            {buildData("donut")}
                        </div>
                    </div>
                    <Divider orientation='vertical' />
                    <div>
                        <h1>Valeurs de votre portefeuille</h1>
                    </div>
                </Center>
            </div>
            <div className='tableWallet'>

            </div>
            </>)}
        {depenseUser == undefined  && (
            <>
            <div className=''>
                <FormControl>
                    <FormLabel mt={4}>Prénom</FormLabel>
                    <Input ref={userRef} placeholder='Prénom' onChange={(event) => setPrenomUser(event.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel mt={4}>Nom</FormLabel>
                    <Input ref={userRef} placeholder='Nom' onChange={(event) => setNomUser(event.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel mt={4}>E-Mail</FormLabel>
                    <Input type={"email"} ref={userRef} placeholder='xxxx@xxx.xx' onChange={(event) => setMailUser(event.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel mt={4}>Confirmez votre e-mail</FormLabel>
                    <Input type={"email"} ref={userRef} placeholder='xxxx@xxx.xx' onChange={(event) => setMail2User(event.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel mt={4}>Date de Naissance</FormLabel>
                    <Input type={"date"} ref={userRef} placeholder='xx/xx/xxxx' onChange={(event) => setBirthdayUser(event.target.value)} />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Téléphone</FormLabel>
                    <Input type={'tel'} pattern={"[0-9]{2}.[0-9]{2}.[0-9]{2}.[0-9]{2}.[0-9]{2}"} ref={userRef} placeholder='xx.xx.xx.xx.xx' onChange={(event) => setTelUser(event.target.value)} />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Mot de passe</FormLabel>
                    <Input type={"password"} ref={userRef} placeholder='azerty123' onChange={(event) => setPasswordUser(event.target.value)} />
                </FormControl>
                <FormControl mt={4}>
                    <FormLabel>Confirmez votre Mot de passe</FormLabel>
                    <Input type={"password"} ref={userRef} placeholder='azerty123' onChange={(event) => setPassword2User(event.target.value)} />
                </FormControl>
            </div>
            </>
        )}
        </>
    )
}