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

import { Carousel } from 'react-responsive-carousel';

export default function Accueil() {
    class Module extends React.Component {
        constructor(props) {
			super(props);
			this.chart = this.props.chart;
		}

        data(props){
            if (props.chart == "donut")
                return donutChart(donut,`${new Date().getMonth() +1}/${new Date().getFullYear()}`,2000, 2000);
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
         <Carousel infiniteLoop={true} showStatus={false} useKeyboardArrows={true} emulateTouch={true} swipeable={true}>
        <div className="section">
            <div className='Bannière'>
                <img src='../../images/iconeGestionTransparant.png' alt='Logo GestionFacile' />
                <div className='Box firstBox'>
                    <div>
                        <h1><strong>Simplifiez votre gestion de patrimoines</strong></h1>
                        <p>
                            En indiquant votre salaire, ainsi que vos investissements (immobilier, bourse, cryptomonnaie, etc.), suivez tout votre patrimoine et son évolution au fil du temps.
                            <br /> <br />
                            Gagnez du temps et générez des bénéfices !
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className="section">
                <div className='flexSection'>
                    <div className='Box'>
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
                            <Module chart="area" />
                        </div>
                    </div>
                    <div className='Box firstBox'>
                        <div>
                            <div>
                                <h1><strong>Suivez le montant de vos investissements et leurs évolutions !</strong></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div><div className="section">
                <div className='flexSection'>
                    <div className='Box'>
                        <div>
                            <Module chart="donut" />
                        </div>
                    </div>
                    <div className='Box firstBox'>
                        <div>
                            <div>
                                <h1><strong>Organisez vos dépenses chaque mois afin de mieux prévoir vos investissements !</strong></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div><div className="section">
                <div className='flexSection'>
                    <div className='Box'>
                        <div>
                            <div className='stats'>
                                <Stat>
                                    <StatLabel>Plus value de vos investissements</StatLabel>
                                    <StatNumber style={{ color: "green" }}>600.00€</StatNumber>
                                    <StatHelpText>Janvier 2021 - Juillet 2022</StatHelpText>
                                </Stat>
                            </div>
                            <Module chart="line" />
                        </div>
                    </div>
                    <div className='Box firstBox'>
                        <div>
                            <div>
                                <h1><strong>Etudiez la plus value que vous générez et accéder aux détails de vos bénéfices !</strong></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div><div className="section">
                <div className='flexSection'>
                    <div className='Box'>
                        <div>
                            <div className='stats'>
                                <Stat>
                                    <StatLabel>Cryptomonnaie</StatLabel>
                                    <StatNumber>6300.00€</StatNumber>
                                    <StatHelpText>Janvier 2021 - Juillet 2022</StatHelpText>
                                </Stat>
                            </div>
                            <Module chart="pie" />
                        </div>
                    </div>
                    <div className='Box firstBox'>
                        <div>
                            <div>
                                <h1><strong>Analysez la répartition de votre patrimoine ainsi que vos cryptomonnaies !</strong></h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </Carousel>
            </>
              
           
      
    )  
}