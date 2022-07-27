import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { login } from '../../services/AuthApi';
import Auth from '../../contexts/Auth';
import axios from 'axios';
export default function MenuNav() {

    const navigate = useNavigate();
	const userRef = useRef(null);
	
	const [createAccount, setCreateAccount] = useState(false);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {isAuth, setAuth} = useContext(Auth);

	// State de l'utilisateurs
	const [prenomUser, setPrenomUser] = useState("");
	const [nomUser, setNomUser] = useState("");
	const [idUser, setIdUser] = useState();
	const [telUser, setTelUser] = useState("");
	const [birthdayUser, setBirthdayUser] = useState("");
	const [mailUser, setMailUser] = useState("");
	const [mail2User, setMail2User] = useState("");
	const [passwordUser, setPasswordUser] = useState("");
	const [password2User, setPassword2User] = useState("");
	
    const [messageErreur, setMessageErreur] = useState("");
    class Icone extends React.Component {
        constructor(props) {
			super(props);
		}

		render() {
			return (
                <Tooltip label={this.props.text} fontSize='md' bg="#3d4752">
				    <a
			            onClick={() => {
							navigate('' + this.props.navig )
						}
						} 
				    >
					    <img
						    src={this.props.image}
						    alt={this.props.text}
					    />
				    </a>
                </Tooltip>
			);
		}
    }

	const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await login(mailUser, passwordUser);
            console.log(response);
            setAuth([true, response.userId]);
            axios.get("http://localhost:8070/api/auth/id", {params : {id : response.userId}})
                .then((res) =>{
                    setIdUser(res.data._id);
                });
        }catch (response) {
            console.log(response);
        }
    }


	const handleForm = (e) => {
        e.preventDefault();
        if (passwordUser !== password2User){
            setMessageErreur("Les mots de passe ne correspondent pas");
        }
        else if (passwordUser.length <6 ){
            setMessageErreur("Le mot de passe doit contenir au minimum 6 caractères");
        }
        else if (mailUser != mail2User){
            setMessageErreur("Les emails ne correspondent pas");
        }
		else if (!mailUser.includes("@")){
			setMessageErreur("L'email n'est pas valide");
		}
        else{  
            axios.post("http://localhost:8070/api/auth/signup", {
                nomUser : nomUser,
                prenomUser :prenomUser,
                telUser : telUser,
				birthdayUser : birthdayUser,
                mailUser: mailUser,
                passwordUser : passwordUser,
				fondsUser : 0,
				depense :{
					loyer : new Map("", 0),
					besoins : new Map("", 0),
					investissements : 0,
					mensualites : new Map("", 0),
					epargne : new Map("", 0),
					loisirs : new Map("", 0),
					abonnements : new Map("", 0),
					autres : new Map("", 0),
				},
				    investissements : {
						bourse : new Map("", 0),
						crypto : new Map("", 0),
						immobilier : new Map("", 0),
						autres : new Map("", 0),
						totalInvestie : 0,
					},
            }).then(() =>  {
				setMessageErreur("Vous êtes bien inscrit !");
				onClose;
			})
              .catch((err) => setMessageErreur("L'adresse mail est utilisée"));
        }
   
    }

	function form(bool){
		return (
				<Modal
						isOpen={isOpen}
						onClose={onClose}
					>
						<ModalOverlay />
						<ModalContent>
						{!bool &&( <>
							<ModalHeader>Se Connecter</ModalHeader><ModalCloseButton /><ModalBody pb={6}>
							<FormControl>
								<FormLabel mt={4}>E-mail</FormLabel>
								<Input type={"email"} ref={userRef} placeholder='xxxx@xxx.xx' onChange={(event) => setMailUser(event.target.value)} />
							</FormControl>
							<FormControl mt={4}>
								<FormLabel >Mot de passe</FormLabel>
								<Input type={"password"} ref={userRef} placeholder='azerty123' onChange={(event) => setPasswordUser(event.target.value)} />
								<a>Mot de passe oublié ?</a>
							</FormControl>
							<p>{messageErreur}</p>
						</ModalBody>
						<ModalFooter>
							
								<Button colorScheme='#3d4752' mr={3} onClick={() => setCreateAccount(true)}>
									Créer un compte
								</Button>
								<Button onClick={handleSubmit} colorScheme='#3d4752' mr={3}>
									Se Connecter
								</Button>
							</ModalFooter>
						</> )
						}
						{bool && (
						<><ModalHeader>Créer un compte</ModalHeader><ModalCloseButton /><ModalBody pb={6}>
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
								<Input type={"date"}ref={userRef} placeholder='xx/xx/xxxx' onChange={(event) => setBirthdayUser(event.target.value)} />
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
							<p>{messageErreur}</p>
						</ModalBody>
						<ModalFooter>
								
								<Button colorScheme='#3d4752' mr={3} onClick={handleForm}>
									Créer un compte
								</Button>
								<Button colorScheme='#3d4752' onClick={() => {
									onClose;
									setCreateAccount(false);
									setMessageErreur("");
								}}>Retour</Button>
							</ModalFooter></>
						)}
						</ModalContent>
					</Modal>
		)

	}

	function deconnect(){
		window.localStorage.clear(); //clear all localstorage
		window.location.reload();
	}
	return (
		<>
			<header>
				<div>
					<Icone text="Gestion Facile" image="../../images/iconeGestionTransparant.png" navig={"/"} />
					<Icone text="Portefeuille" image="../../images/dashboard0.png" navig={"/portefeuille"} />
					<Icone text="Cryptomonnaie" image="../../images/cryptocurrencies.png" navig={"/cryptomonnaie"} />
					<Icone text="Immobilier" image="../../images/asset-management.png" navig={"/immobilier"} />
					<Icone text="Bourse" image="../../images/bourse.png" navig={"/bourse"} />
					<Menu isLazy>
					<MenuButton>
						<Tooltip label={"Mon Compte"} fontSize='md' bg="#3d4752"> 
						<a
							onClick={onOpen}
						>
							<img
								src={"../../images/user.png"}
								alt={"Mon Compte"} />
						</a>
					</Tooltip></MenuButton>
					{isAuth[0] && (
					<MenuList>
						<MenuItem>Paramètres</MenuItem>
						<MenuItem onClick={deconnect}>Déconnexion</MenuItem>
					</MenuList>
					)}
					</Menu>
					
				</div>
			</header>
			{!isAuth[0] && (
				<div>
					{form(createAccount)}
				</div> 
			)}
		</>
	);
}