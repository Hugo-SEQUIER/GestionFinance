import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@chakra-ui/react'

export default function MenuNav() {
    
    const navigate = useNavigate();

    class Icone extends React.Component {
        constructor(props) {
			super(props);
		}

		render() {
			return (
                <Tooltip label={this.props.text} fontSize='md' bg="#3d4752">
				    <a
			            onClick={() => navigate('' + this.props.navig)}
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

	return (
		<header>
            <div>
                <Icone text="Gestion Facile" image="../../images/iconeGestionTransparant.png" navig={"/"} />
                <Icone text="Portefeuille" image="../../images/dashboard0.png" navig={"/portefeuille"} />
                <Icone text="Cryptomonnaie" image="../../images/cryptocurrencies.png" navig={"/cryptomonnaie"} />
                <Icone text="Immobilier" image="../../images/asset-management.png" navig={"/immobilier"} />
                <Icone text="Bourse" image="../../images/bourse.png" navig={"/bourse"} />
                <Icone text="Mon Compte" image="../../images/user.png" navig={"/compte"} />
            </div>
		</header>
	);
}