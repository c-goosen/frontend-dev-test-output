/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


// import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';

// export default class FetchExample extends React.Component {}

import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faGlobeAfrica } from '@fortawesome/free-solid-svg-icons'
import { restcountries_host, restcountries_api_version, geocode_auth, geocode_url} from './components/settings';
import { render_countries_list } from './components/country_list';

// import Constants from 'expo-constants';

// import './App.css';

class App extends Component{
  state = {
    user_input: '',
    rest_countries_lang: [],
    rest_countries_country: [],
    countries:[]
  };

  constructor(props) {
    super(props);
    
    this.state['value'] = ''
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  restcountries_api_lang(lang){
    let lang_full_uri  = `https://${restcountries_host}${restcountries_api_version}/lang/${lang}`;

    axios.get(lang_full_uri)
              .then(response => {

                  this.setState({rest_countries_lang: response.data});
              })
              .catch(function (error) {
                  console.log(error);
              });
              console.log(this.state.rest_countries_lang)

  }

  restcountries_api_countries(country){
    let country_return = [];
    let full_uri  = `https://${restcountries_host}${restcountries_api_version}/name/${country}`;
    console.log(`API call made to: ${full_uri}`);
    axios.get(full_uri)
              .then(response => {
                country_return = response.data.map(function (country) {
                  return  {
                    name: country['name'],
                    alpha3Code: country['alpha3Code'],
                    capital:country['capital'],
                    currencies: country['currencies'],
                    languages: country['languages'],
                    flag:country['flag'],
                    geocode:[]
              
                  };
              });
                  // this.setState({rest_countries_country: country_return});
                  this.geocode_api_coordinates(country_return);
              })
              .catch(function (error) {
                  console.log(error);
              });
              // console.log(`this.state.rest_countries_country --> ${this.state.rest_countries_country}`)
              return country_return;

  }

  geocode_api_coordinates(countries){
    // let city = country[0].capital
    let results = [];
    countries.map(country => {
      let full_uri = `${geocode_url}/${country.capital}${geocode_auth}`;
      console.log(`API call made to: ${full_uri}`);
      axios.get(full_uri)
                  .then(function (response) {
                    console.log("Res")
                    console.log(response)
                    country['geocode'] = [{
                              longt: response.data['longt'],
                              latt: response.data['latt'],
                              confidence: response.data['standard']['confidence']
                          }];
                  })
                  .catch(function (error) {
                      console.log(error);
          });
      });
      console.log(`countries ${countries}`)
      console.log(countries)
      // return results
  
      this.setState({countries: countries});
    
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    let countries = [];
    countries = this.restcountries_api_countries(this.state.value);
    console.log('this.state.value');
 
    event.preventDefault();
  }


render(){
  return (
    <div className='button__container'>
    <Card bg="light" style={{ width: 550, height: 'auto', overflow: 'auto'}}>

      <Card.Body>
        <FontAwesomeIcon icon={faGlobeAfrica} size="10x" style={{ left: '50%', top: '50%',
        // transform: 'translate(-50%, -50%)'
        }}/>

          <Card.Title>Country Search</Card.Title>
          <Card.Text>

            <form onSubmit={this.handleSubmit}>
              <label>
                Country name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <Button variant="primary" value="Submit" type="submit">Search</Button>
          </form>
          </Card.Text>
          {render_countries_list(this.state.countries)}
        </Card.Body>
      </Card>
    
    </div>
  )
}

}

export default App;


  
