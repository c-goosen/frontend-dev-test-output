import React, { Component }  from 'react';
import {Svg} from './svg_inline';
import { makeStyles } from '@material-ui/core/styles';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faGlobeAfrica } from '@fortawesome/free-solid-svg-icons';
import { red } from '@material-ui/core/colors';

const centre_style ={
   left: '50%', top: '50%',
        // transform: 'translate(-50%, -50%)',
}
//   }));

export function render_countries_list(country_array){
console.log("Starting to render countries List");
    return (
        <div>
          {country_array.map(country => (
            <Card bg="light" style={{ width: 500, height: 'auto', overflow: 'auto'}}>
            <Card.Body>
               

                <Card.Title> <FontAwesomeIcon icon={faGlobeAfrica} size="2x" style={centre_style}/> {country.name} </Card.Title>
                <Card.Text></Card.Text>

            <div height="50" width="50">
            <Svg height="50" width="50" url={country.flag} style={{width: 50, height: 50}}/>

            </div>

            <ul>
              <li>alpha3Code: {country.alpha3Code}</li>
              <li>capital: {country.capital}</li>
              {render_capital_geocode(country)}

              {render_language_component(country)}
              
              {render_currency_component(country)}
        </ul>
        </Card.Body>
            </Card>
          ))}
        </div>
      ); 
}

function render_currency_component(country){
    return (
        <li>Currencies: <ul>
              {country.currencies.map(currency => (
              <li key={currency.name}>{currency.name} - {currency.code} {currency.symbol}</li>
              ))}
              </ul>
        </li>
    );
}

function render_language_component(country){
    return(
        <li>Languages: <ul>
              {country.languages.map(language => (
            <li key={language.name}><button >{language.name} - {language.nativeName}</button></li>
              ))}
              </ul>
              </li>
    )
}

function render_capital_geocode(country){
  console.log("country.geocode");
  console.log(country['geocode'])
  console.log('country')
  console.log(country)
  return (
      <li>Geocode Data: <ul>
         {country.geocode.map(geocode => (
            <li key={geocode.latt}><button >{geocode.latt} - {geocode.latt}</button></li>
              ))}
              </ul>
              </li>
    )
}