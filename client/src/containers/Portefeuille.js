import React, { useState, useEffect, useContext, useRef} from 'react';
import {
	donutChart,
	lineChart,
	columnChart,
	areaChart,
	pieChart,
} from '../components/data';
import { 
    Divider,
    Center,
    FormControl,
    FormLabel,
    Input,
    Button,  
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
} from '@chakra-ui/react'
import {
	donut,
    area,
    pie,
    line,
} from '../components/accueilData';
import { getOneUser } from '../../services/AuthApi';
import Auth from '../../contexts/Auth';
import axios from 'axios';
export default function Portefeuille(){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

	const {isAuth, setAuth} = useContext(Auth);
    const [user, setUser] = useState();
	const [fondsUser, setFondsUser] = useState(0);
	const [depenseUser, setDepenseUser] = useState();

    const [loyer, setLoyer] = useState(new Map());
    const [besoins, setBesoins] = useState(new Map());
    const [investissements, setInvestissements] = useState(new Map());
    const [mensualites, setMensualités] = useState(new Map());
    const [epargne, setEpargne] = useState(new Map());
    const [loisirs, setLoisirs] = useState(new Map());
    const [abonnements, setAbonnements] = useState(new Map());
    const [autres, setAutres] = useState(new Map());
 
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
            setLoyer(user.depenser.loyer);
            setBesoins(user.depense.besoins);
            setInvestissements(user.depense.investissements);
            setMensualités(user.depense.mensualites);
            setEpargne(user.depense.epargne);
            setLoisirs(user.depense.loisirs);
            setAbonnements(user.depense.abonnements);
            setAutres(user.depense.autres);
        }
    },[user])


    function buildData(chart){
        if (depenseUser != undefined){
            console.log("--1--")
            if (depenseUser.loyer.size > 0){
                console.log("--2--")
                let arrayDataStats;
                let result;
                if (chart == "donut"){
                    console.log("depenseUser", depenseUser);
                    arrayDataStats = new Array();
                    console.log("arrayDataStats", arrayDataStats);
                    let total = 0;
                    for (let idx = 0 ; idx < Object.entries(depenseUser).length; idx++){
                        let ite = Object.entries(depenseUser)[idx][1].entries();
                        let iteValue = ite.next();
                        while (!iteValue.done){     
                            console.log(iteValue.value[1])           
                            result = iteValue.value[1];
                            iteValue = ite.next();
                        }
                        console.log(result) ;
                        total += Number(result);    
                    }
                    console.log("total :", total)
                    for (let idx = 0 ; idx < Object.entries(depenseUser).length; idx++){
                        let ite = Object.entries(depenseUser)[idx][1].entries();
                        let iteValue = ite.next();
                        result = new Map();
                        while (!iteValue.done){         
                            result.set('type', Object.entries(depenseUser)[idx][0]);
                            result.set('valeur', Number(Math.round(((Number(iteValue.value[1]) / total) *100) *100) /100));
                            iteValue = ite.next();
                        }
                        arrayDataStats.push(result);    
                    }
                    console.log(result);
                    for (let idxLine = 0; idxLine < arrayDataStats.length; idxLine++) {
					    arrayDataStats[idxLine] = Object.fromEntries(arrayDataStats[idxLine]);
				    }
                    console.log(arrayDataStats);
                    let date = new Date(depenseUser.loyer.keys().next().value);
                    return donutChart(arrayDataStats,`${date.getMonth() +1}/${date.getFullYear()}`,total, fondsUser);
                }
                else {
                    return areaChart(area);
                }
            }
        }
        else if (chart == 'donut'){
            return donutChart(donut, `${new Date().getMonth() +1}/${new Date().getFullYear()}`,2000, 2000);
        }
        else return areaChart(area);
    }

    function findLastValeur(from){
        let val = 0;
        if (from.size > 0) {
            let ite = from.entries();
            let iteValue = ite.next();
            while (!iteValue.done){         
                val = iteValue.value[1];
                iteValue = ite.next();
            }
        }
        return val;         
    }

    return (
        <>
        <div>
            <div className='Bannière' style={{minHeight : "150px"}}>
                <h1>Portefeuille {user != undefined && `de ${user.prenom} ${user.nom}`}</h1>
                <Button ref={btnRef} colorScheme='#3d4752' onClick={onOpen}>
                    Saisissez vos dépenses
                </Button>
                {fondsUser != 0 && (<h1>Vos fonds : {fondsUser}</h1>)}
            </div>

        </div>

            <div className='wallet'>
                <Center height='800px'>
                    <div>
                        <h1>Répartition des dépenses</h1>
                        <div className='Box' style={{width : "94%"}}>
                            <div>
                                {buildData("donut")}
                            </div>                       
                        </div>
                    </div>
                    <Divider orientation='vertical' />
                    <div>
                        <h1>Valeurs de votre portefeuille</h1>
                        <div className='Box' style={{width : "94%", marginLeft: "5%"}}>
                            <div>
                            <div className='stats'>
                                <StatGroup>
                                    <Stat>
                                        <StatLabel>Montant investi</StatLabel>
                                        <StatNumber>11400.00€</StatNumber>
                                        <StatHelpText>600.00€/mois</StatHelpText>
                                    </Stat>
                                    <Stat>
                                        <StatLabel>Montant Final</StatLabel>
                                        <StatNumber>12600.00€</StatNumber>
                                        <StatHelpText>
                                            <StatArrow type='increase' />
                                            10.53%
                                        </StatHelpText>
                                    </Stat>
                                </StatGroup>
                            </div>
                           
                                {buildData("line")}
                            </div>                       
                        </div>
                    </div>
                </Center>
            </div>
            <div className='tableWallet'>

            </div>
                  <Drawer
                    isOpen={isOpen}
                    placement='right'
                    onClose={onClose}
                    size={"xl"}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Saisissez vos dépenses</DrawerHeader>

                    <DrawerBody>
                        <FormControl>
                        <FormLabel mt={4}>Montant de vos fonds</FormLabel>
                        <Input ref={userRef} type="number" min="0" defaultValue={fondsUser != 0 ? fondsUser : 0} onChange={(event) => setFondsUser(event.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel mt={4}>Loyer</FormLabel>
                        <Input ref={userRef} type="number" min="0" max={fondsUser} defaultValue={findLastValeur(loyer)} onChange={(event) => {
                            loyer.set(`${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()}`, event.target.value);
                        }} />
                    </FormControl>
                    <FormControl>
                        <FormLabel mt={4}>Besoins</FormLabel>
                        <Input type="number" min="0" max={fondsUser} defaultValue={findLastValeur(besoins)} onChange={(event) => {
                            besoins.set(`${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()}`, event.target.value);
                        }} />
                    </FormControl>
                    <FormControl>
                        <FormLabel mt={4}>Investissement</FormLabel>
                            <Input type="number" min="0" max={fondsUser} defaultValue={findLastValeur(investissements)} onChange={(event) => {
                            investissements.set(`${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()}`, event.target.value);
                        }} />                    
                        </FormControl>
                    <FormControl>
                        <FormLabel mt={4}>Crédits</FormLabel>
                            <Input type="number" min="0" max={fondsUser} defaultValue={findLastValeur(mensualites)} onChange={(event) => {
                            mensualites.set(`${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()}`, event.target.value);
                        }} />                    
                        </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Epargne</FormLabel>
                            <Input type="number" min="0" max={fondsUser} defaultValue={findLastValeur(epargne)} onChange={(event) => {
                            epargne.set(`${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()}`, event.target.value);
                        }} />                    
                        </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Loisirs</FormLabel>
                            <Input type="number" min="0" max={fondsUser} defaultValue={findLastValeur(loisirs)} onChange={(event) => {
                            loisirs.set(`${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()}`, event.target.value);
                        }} />
                        </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Abonnements</FormLabel>
                            <Input type="number" min="0" max={fondsUser} defaultValue={findLastValeur(abonnements)} onChange={(event) => {
                            abonnements.set(`${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()}`, event.target.value);
                        }} />
                        </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Autres dépenses</FormLabel>
                            <Input type="number" min="0" max={fondsUser} defaultValue={findLastValeur(autres)} onChange={(event) => {
                            autres.set(`${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()}`, event.target.value);
                        }} />
                        </FormControl>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' colorScheme='#3d4752' mr={3} onClick={onClose}>
                        Retour
                        </Button>
                        <Button colorScheme='#3d4752' onClick={()=> {
                            let dep = {
                                loyer : loyer,
                                besoins : besoins,
                                investissements : investissements,
                                mensualites : mensualites,
                                epargne : epargne,
                                loisirs : loisirs,
                                abonnements : abonnements,
                                autres : autres,
                            }
                            setDepenseUser(dep);
                        }}>Sauvegarder</Button>
                    </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </>

    )
}