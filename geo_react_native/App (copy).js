/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


// import { lookup_geocode_city,lookup_geocode_city_two } from './providers/api/geocode.js'
// import { RestCountries } from './providers/api/restcountries.js'
import { lookup_restcountries_country, lookup_restcountries_lang } from './providers/api/restcountries.js'





import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';

export default class FetchExample extends React.Component {

  

  constructor(props){
    const restcountries_host  = "restcountries.eu";
  const restcountries_api_version ="/rest/v2";
const geocode_url  = "https://geocode.xyz/";
const geocode_auth = "?json=1&auth=109682095839654e15744092x3811"
    super(props);
    this.state ={ 
      isLoading: true,
      geo: []
    }
  }

 
  getMoviesFromApiAsync(country: string) {
    let full_uri  = `https://${this.restcountries_host}${this.restcountries_api_version}/name/${country}`
    return fetch(full_uri)
      .then((response) => response.json())
      .then((responseJson) => {
        let country_return = responseJson.map(function (country) {
          return  {
              alpha3code: country['alpha3Code'],
              country_capital:country['capital'],
              currencies: country['currencies'],
              languages: country['languages'],
              flag:country['flag']
      
          };
      });
        // console.log(responseJson)
        this.setState({
          // isLoading: false,
          geo: [responseJson],
          isLoading: false
        }, function(){
  
        });
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  componentDidMount(){
    this.getMoviesFromApiAsync("South Africa");
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          // isLoading: false,
          dataSource: responseJson.movies,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }
    console.log(this.state.geo)
      console.log("Just below This.stat.geo")

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}</Text>}
          keyExtractor={({id}, index) => id}
        />
          <FlatList
          data={this.state.geo}
          renderItem={({item}) => <Text>{item}, {item}</Text>}
          keyExtractor={({id}, index) => id}
        />
      </View> 

      
    );
  }
}
