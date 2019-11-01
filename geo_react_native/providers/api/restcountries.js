
import React from 'react';

const restcountries_host  = "restcountries.eu";
const restcountries_api_version ="/rest/v2";



// export default class RestCountries extends React.Component {

    export function lookup_restcountries_lang(lang){
        // https://restcountries.eu/rest/v2/lang/
        let lang_full_uri  = `https://${restcountries_host}${restcountries_api_version}/lang/${lang}`
        // return new Promise(function(resolve, reject) {
            return fetch(lang_full_uri)
            .then(function (response) {
                let lang_list = response.data.map(function (lang) {
                    return lang['name'];
                });
                resolve(    
                    lang_list
                );

            })
            .catch(function (error) {
                reject(error)
                console.log(error);
            });
        // });
    }

    export function lookup_restcountries_country(country) {
        let full_uri  = `https://${restcountries_host}${restcountries_api_version}/name/${country}`

        return new Promise(function(resolve, reject) {
    
        fetch(full_uri)
        .then(function (response) {
            let country_return = response.data.map(function (country) {
                return  {
                    alpha3code: country['alpha3Code'],
                    country_capital:country['capital'],
                    currencies: country['currencies'],
                    languages: country['languages'],
                    flag:country['flag']
            
                };
            });
                resolve(country_return);
            
        })
        .catch(function (error) {
            console.log("False");

            console.log(error);
            reject(error)
        });
        });

    }
// }