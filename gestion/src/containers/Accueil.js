import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Accueil() {

    return (
        <>
        <section className='Accueil'>
            <div className='Bannière'>
                <img src='../../images/iconeGestionTransparant.png' alt='Logo GestionFacile' />
                <div className='Box'>
                    <div>
                        <h1><strong>L'Histoire de l'Horlogerie dans le Monde</strong></h1>
                        <p>
                            Retrouvez l'histoire de l'horlogerie des pays qui y ont le plus contribués, ainsi que des conseils.
                        </p>
                    </div>
                </div>
            </div>
            <div className='SousBannière'>
                <div className='Video'>
                </div>
                <div>
                    <p style={{textAlign: 'center'}}>ADS</p>
                </div>
            </div>
        </section>
        </>
    )
}