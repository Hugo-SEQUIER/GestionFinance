import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@chakra-ui/react'
import Utilisateur from './Utilisateur'
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
  useDisclosure
} from '@chakra-ui/react'
import { login } from '../../services/AuthApi';
import Auth from '../../contexts/Auth';
export default function MenuNav() {

    const navigate = useNavigate();
	const user = new Utilisateur();
	const userRef = useRef(null);
	const [isConnect, setIsConnect] = useState(false);

	const { isOpen, onOpen, onClose } = useDisclosure()
	const {isAuth, setAuth} = useContext(Auth);

    class Icone extends React.Component {
        constructor(props) {
			super(props);
		}

		render() {
			return (
                <Tooltip label={this.props.text} fontSize='md' bg="#3d4752">
				    <a
			            onClick={() => {
							navigate('' + this.props.navig , {
								state: {
									user : user,
								},
							})
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
            const response = await login(mail, pwd);
            console.log(response);
            setAuth(true);
            axios.get("http://localhost:8070/api/auth/id", {params : {id : response.userId}})
                 .then((res) =>{
                            user.setState({idUtilisateur : res.data._id});
                        });
        }catch (response) {
            console.log(response);
        }
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
					<Tooltip label={"Mon Compte"} fontSize='md' bg="#3d4752">
						<a
							onClick={onOpen}
						>
							<img
								src={"../../images/user.png"}
								alt={"Mon Compte"} />
						</a>
					</Tooltip>
				</div>
			</header>
			{!isConnect && (
				<div>
					<Modal
						isOpen={isOpen}
						onClose={onClose}
					>
						<ModalOverlay />
						<ModalContent>
						<ModalHeader>Se Connecter</ModalHeader>
						<ModalCloseButton />
						<ModalBody pb={6}>
							<FormControl>
							<FormLabel>E-mail</FormLabel>
							<Input ref={userRef} placeholder='xxxx@xxx.xx' onChange={(event) => user.setState({mailUtilisateur: event.target.value})} />
							</FormControl>

							<FormControl mt={4}>
							<FormLabel>Mot de passe</FormLabel>
							<Input ref={userRef} placeholder='azerty123' onChange={(event) => user.setState({passwordUtilisateur: event.target.value})}/>
							<a>Mot de passe oublié ?</a>
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button onClick={handleSubmit} colorScheme='#3d4752' mr={3}>
							Se Connecter
							</Button>
							<Button colorScheme='#3d4752' onClick={onClose}>Retour</Button>
						</ModalFooter>
						</ModalContent>
					</Modal>
				</div> 
			)}
		</>
	);
}