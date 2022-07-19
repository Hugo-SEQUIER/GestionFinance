import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	donutChart,
	lineChart,
	columnChart,
	areaChart,
	pieChart,
} from '../components/data';

import {
	donut,
    area,
    pie,
    line,
} from '../components/accueilData';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react'

export default function Accueil() {

    class Module extends React.Component {
        constructor(props) {
			super(props);
			this.chart = this.props.chart;
		}

        data(props){
            if (props.chart == "donut")
                return donutChart(donut, "Répartition des dépenses");
            if (props.chart == "area")
                return areaChart(area);
            if (props.chart == "pie")
                return pieChart(pie);    
            if (props.chart == "line")
                return lineChart(line);  
        }
        render(){
            return (
                <>
                    <this.data chart={this.chart} />
                </>
            )

        }
        

    }

    return (
        <>
        <section className='Accueil'>
            <div className='Bannière'>
                <img src='../../images/iconeGestionTransparant.png' alt='Logo GestionFacile' />
                <div className='Box firstBox'>
                    <div>
                        <h1><strong>Simplifier votre gestion de patrimoines</strong></h1>
                        <p>
                           En indiquant votre salaire, ainsi que vos investissements (immobilier, bourse, cryptomonnaie), vous pouvez suivre tout votre patrimoine et son évolution. 
                        </p>
                    </div>
                </div>
            </div>
            <div className='SousBannière'>
                <div className='Box'>
                    <div>
                        <h1><span style={{color : "transparent"}}>d</span></h1>
                        <Module chart="donut" />
                    </div>
                </div>
                <div className='Box'>
                    <div>
                        <div className='stats'>
                            <StatGroup>
                            <Stat>
                                <StatLabel>Montant investi</StatLabel>
                                <StatNumber>5700.00€</StatNumber>
                                <StatHelpText>300.00€/mois</StatHelpText>
                            </Stat>

                            <Stat>
                                <StatLabel>Montant Final</StatLabel>
                                <StatNumber>2700.00€</StatNumber>
                                <StatHelpText>
                                <StatArrow type='decrease' />
                                47.37%
                                </StatHelpText>
                            </Stat>
                            </StatGroup>
                        </div>
                        <Module chart="area" />
                    </div>
                </div>
                <div className='Box'>
                    <div>
                        <div className='stats' style={{marginBottom: "2%"}}>
                            <Stat>
                                <StatLabel>Cryptomonnaie</StatLabel>
                                <StatNumber>2700.00€</StatNumber>
                                <StatHelpText>Janvier 2021 - Juillet 2022</StatHelpText>
                            </Stat>
                        </div>
                        <Module chart="pie" />
                    </div>
                </div>
                <div className='Box'>
                    <div>
                        <div className='stats'>
                            <Stat>
                                <StatLabel>Plus value wallet cryptomonnaie</StatLabel>
                                <StatNumber style={{color: "red"}}>-3000.00€</StatNumber>
                                <StatHelpText>Janvier 2021 - Juillet 2022</StatHelpText>
                            </Stat>
                        </div>
                        <Module chart="line" />
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}