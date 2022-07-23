import React, { useState, useEffect } from 'react';

export default class Utilisateur extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
            prenomUtilisateur: "",
            nomUtilisateur: "",
            idUtilisateur: "",
            dateNaissanceUtilisateur: "",
            mailUtilisateur: "",
            passwordUtilisateur: "",
            depenseUtilisateur: {
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
            },
            fondsUtilisateurs : new Map(),
        }
	}

    render(){
        return (
            <>
            </>
        )
    }

}