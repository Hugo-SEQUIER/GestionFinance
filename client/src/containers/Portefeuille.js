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
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
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
	const [fondsUser, setFondsUser] = useState(new Map());
	const [depenseUser, setDepenseUser] = useState();

    const [loyer, setLoyer] = useState(new Map());
    const [besoins, setBesoins] = useState(new Map());
    const [investissements, setInvestissements] = useState(new Map());
    const [mensualites, setMensualités] = useState(new Map());
    const [epargne, setEpargne] = useState(new Map());
    const [loisirs, setLoisirs] = useState(new Map());
    const [abonnements, setAbonnements] = useState(new Map());
    const [autres, setAutres] = useState(new Map());
    const [totalDepense, setTotalDepense] = useState(new Map());
 
    const [moyDepense, setMoyDepense] = useState(new Map());
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
            setTotalDepense(user.depense.totalDepense);
            setMoyDepense("valeur", moyenneDepense());
        }
    },[user])

    function strUcFirst(a){
        return (a+'').charAt(0).toUpperCase()+a.substr(1);
    }

    function buildData(chart){
        if (depenseUser != undefined){
            if (fondsUser.size > 0){
                console.log("--1--")
                if (depenseUser.loyer.size > 0){
                    console.log("--2--", depenseUser);
                    let arrayDataStats;
                    let result;
                    if (chart == "donut"){
                        let total = 0;
                        for (let idx = 0 ; idx < Object.entries(depenseUser).length; idx++){
                            result = 0;
                            if (Object.entries(depenseUser)[idx][0] != "totalDepense"){
                                let ite = Object.entries(depenseUser)[idx][1].entries();
                                let iteValue = ite.next();
                                while (!iteValue.done){     
                                    console.log(iteValue.value[1])           
                                    result = iteValue.value[1];
                                    iteValue = ite.next();
                                }
                                total += Number(result);    
                            }
                            console.log("total", total);
                            
                        }
                        console.log("total", total);
                        totalDepense.set(`${new Date().getMonth() +1}/${new Date().getFullYear()}`,total);
                        moyenneDepense();
                        arrayDataStats = new Array();
                        for (let idx = 0 ; idx < Object.entries(depenseUser).length; idx++){
                            if (Object.entries(depenseUser)[idx][0] != "totalDepense"){
                                let ite = Object.entries(depenseUser)[idx][1].entries();
                                let iteValue = ite.next();
                                result = new Map();
                                while (!iteValue.done){         
                                    result.set('type', strUcFirst(Object.entries(depenseUser)[idx][0]));
                                    result.set('valeur', Number(Math.round(((Number(iteValue.value[1]) / total) *100) *100) /100));
                                    iteValue = ite.next();
                                }
                                arrayDataStats.push(result);    
                            }
                        }
                        console.log(result);
                        for (let idxLine = 0; idxLine < arrayDataStats.length; idxLine++) {
                            arrayDataStats[idxLine] = Object.fromEntries(arrayDataStats[idxLine]);
                        }
                        console.log(arrayDataStats);
                        let date = new Date(depenseUser.loyer.keys().next().value);
                        return donutChart(arrayDataStats,`${date.getMonth() +1}/${date.getFullYear()}`,total, findLastValeur(fondsUser));
                    }
                    else {
                        arrayDataStats = new Array();
                        let ite = Object.entries(depenseUser)[Object.entries(depenseUser).length -1][1].entries();
                        console.log("totalDepense : ",Object.entries(depenseUser)[Object.entries(depenseUser).length -1]);
                        let iteValue = ite.next();
                        while (!iteValue.done){     
                            result = new Map();        
                            result.set('scale', iteValue.value[0]);
                            result.set('valeur', Number(iteValue.value[1]));
                            result.set('name', "Dépenses");
                            iteValue = ite.next();
                            arrayDataStats.push(result);
                        }  
                        console.log("Fonds : ",fondsUser)
                        ite = fondsUser.entries();
                        console.log("Fonds : ",fondsUser.entries());
                        iteValue = ite.next();
                        while (!iteValue.done){     
                            result = new Map();        
                            result.set('scale', iteValue.value[0]);
                            result.set('valeur', Number(iteValue.value[1]));
                            result.set('name', "Fonds");
                            iteValue = ite.next();
                            arrayDataStats.push(result);
                        }  
                        console.log("areaStats :", arrayDataStats);
                        for (let idx = 0; arrayDataStats.length + idx < 6;idx++){
                            result = new Map();
                            let date = new Date();
                            date.setMonth(date.getMonth() - idx);
                            result.set('scale', `${date.getMonth()}/${date.getFullYear()}`);
                            result.set('valeur', 0);
                            result.set('name', "Dépenses");
                            let ok = new Map();
                            ok.set('scale', `${date.getMonth()}/${date.getFullYear()}`);
                            ok.set('valeur', 0);
                            ok.set('name', "Fonds");
                            arrayDataStats.unshift(result);
                            arrayDataStats.unshift(ok);
                        }
                        
                        for (let idxLine = 0; idxLine < arrayDataStats.length; idxLine++) {
                            arrayDataStats[idxLine] = Object.fromEntries(arrayDataStats[idxLine]);
                        }
                        return areaChart(arrayDataStats);
                    }
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

    function moyenneDepense(){
         if (totalDepense.size > 0){
            let cpt = 0;
            let val = 0;
            let ite = totalDepense.entries();
            let iteValue = ite.next();
            while(!iteValue.done){
                val += iteValue.value[1];
                cpt++;
                iteValue = ite.next();
            }
            console.log("moyenne :", Math.round((val / cpt) *100)/100);
            moyDepense.set("valeur", Math.round((val / cpt) *100)/100); 
        }
    }

    function supinf(x,y){
        return x >= y;
    }

    return (
        <>
        <div>
            <div className='Bannière' style={{minHeight : "150px"}}>
                <h1>Portefeuille {user != undefined && `de ${user.prenom} ${user.nom}`}</h1>
                <Button ref={btnRef} colorScheme='#3d4752' onClick={onOpen}>
                    Saisissez vos dépenses
                </Button>
                {findLastValeur(fondsUser) != 0 && (<h1>Vos fonds : {findLastValeur(fondsUser)}</h1>)}
            </div>

        </div>

            <div className='wallet'>
                <Center height='800px'>
                    <div>
                        <h1>Répartition de vos dépenses</h1>
                        <div className='Box' style={{width : "94%"}}>
                            <div>
                                {buildData("donut")}
                            </div>                       
                        </div>
                    </div>
                    <Divider orientation='vertical' />
                    <div>
                        <h1>Vos dépenses chaques mois</h1>
                        <div className='Box' style={{width : "94%", marginLeft: "5%"}}>
                            <div>
                            <div className='stats'>
                                <StatGroup>
                                    <Stat>
                                        <StatLabel>Moyenne de vos dépenses</StatLabel>
                                        <StatNumber>{moyDepense.size > 0 ? moyDepense.get("valeur"): 11400} €</StatNumber>
                                    </Stat>
                                    <Stat>
                                        <StatLabel>Vos dépenses du mois</StatLabel>
                                        <StatNumber>{totalDepense.size > 0 ? totalDepense.get(`${new Date().getMonth() +1}/${new Date().getFullYear()}`): 12600} €</StatNumber>
                                        <StatHelpText>
                                            {moyDepense.size > 0 && 
                                            totalDepense.size > 0 && 
                                            supinf(moyDepense.get("valeur"),totalDepense.get(`${new Date().getMonth() +1}/${new Date().getFullYear()}`)) && (
                                                <StatArrow type='increase' />
                                            )}
                                            {moyDepense.size > 0 && 
                                            totalDepense.size > 0 && 
                                            !supinf(moyDepense.get("valeur"),totalDepense.get(`${new Date().getMonth() +1}/${new Date().getFullYear()}`)) && (
                                                <StatArrow type='decrease' />
                                            )}
                                            {moyDepense.size <= 0 && <StatArrow type='increase' />}
                                            {moyDepense.size > 0 && 
                                            totalDepense.size > 0 && ((Number(totalDepense.get(`${new Date().getMonth() +1}/${new Date().getFullYear()}`) - moyDepense.get("valeur"))/moyDepense.get("valeur") *100).toFixed(2))}
                                            {moyDepense.size <= 0 && 
                                            ((Number(12600 - 11400)/11400 *100)).toFixed(2)} %
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
            <Divider orientation='horizontal' />
            <div className='tableWallet'>
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Récapitulatif de vos dépenses</TableCaption>
                    <Thead>
                    <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    <Tr>
                        <Td>inches</Td>
                        <Td>millimetres (mm)</Td>
                        <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                        <Td>feet</Td>
                        <Td>centimetres (cm)</Td>
                        <Td isNumeric>30.48</Td>
                    </Tr>
                    <Tr>
                        <Td>yards</Td>
                        <Td>metres (m)</Td>
                        <Td isNumeric>0.91444</Td>
                    </Tr>
                    </Tbody>
                    <Tfoot>
                    <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                    </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
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
                        <Input ref={userRef} type="number" min={0} defaultValue={findLastValeur(fondsUser)} onChange={(event) => fondsUser.set(`${new Date().getMonth()+1}/${new Date().getFullYear()}`, event.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel mt={4}>Loyer</FormLabel>
                        <Input ref={userRef} type="number" min={0} defaultValue={findLastValeur(loyer)} onChange={(event) => {
                            loyer.set(`${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()}`, event.target.value);
                        }} />
                    </FormControl>
                    <FormControl>
                        <FormLabel mt={4}>Besoins</FormLabel>
                        <Input type="number" min={0} defaultValue={findLastValeur(besoins)} onChange={(event) => {
                            besoins.set(`${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()}`, event.target.value);
                        }} />
                    </FormControl>
                    <FormControl>
                        <FormLabel mt={4}>Investissement</FormLabel>
                            <Input type="number" min={0} defaultValue={findLastValeur(investissements)} onChange={(event) => {
                            investissements.set(`${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()}`, event.target.value);
                        }} />                    
                        </FormControl>
                    <FormControl>
                        <FormLabel mt={4}>Crédits</FormLabel>
                            <Input type="number" min={0} defaultValue={findLastValeur(mensualites)} onChange={(event) => {
                            mensualites.set(`${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()}`, event.target.value);
                        }} />                    
                        </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Epargne</FormLabel>
                            <Input type="number" min={0} defaultValue={findLastValeur(epargne)} onChange={(event) => {
                            epargne.set(`${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()}`, event.target.value);
                        }} />                    
                        </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Loisirs</FormLabel>
                            <Input type="number" min={0} defaultValue={findLastValeur(loisirs)} onChange={(event) => {
                            loisirs.set(`${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()}`, event.target.value);
                        }} />
                        </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Abonnements</FormLabel>
                            <Input type="number" min={0} defaultValue={findLastValeur(abonnements)} onChange={(event) => {
                            abonnements.set(`${new Date().getMonth()+1}/${new Date().getDate()}/${new Date().getFullYear()}`, event.target.value);
                        }} />
                        </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Autres dépenses</FormLabel>
                            <Input type="number" min={0} defaultValue={findLastValeur(autres)} onChange={(event) => {
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
                                totalDepense : totalDepense,
                            }
                            setDepenseUser(dep);
                        }}>Sauvegarder</Button>
                    </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </>

    )
}