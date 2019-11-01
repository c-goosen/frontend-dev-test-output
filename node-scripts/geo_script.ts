import axios from 'axios';

const restcountries_host : string = "restcountries.eu";
const restcountries_api_version: string ="/rest/v2";
const geocode_url : string = "https://geocode.xyz/";
const geocode_auth: string = "?json=1&auth=109682095839654e15744092x3811"

function Test_Script(){
    console.log("HEllo");
}

function lookup_geocode_city(city: string) {
    let full_uri: string = `${geocode_url}/${city}${geocode_auth}`;
    return new Promise(function(resolve, reject) {
        axios.get(full_uri)
            .then(function (response) {
                resolve(
                    {
                        longt: response.data['longt'],
                        latt: response.data['latt'],
                        confidence: response.data['standard']['confidence']
                    }
                );
            })
            .catch(function (error) {
                console.log(error);
                reject(error);
            });
    });
}

function lookup_restcountries_lang(lang: string){
    // https://restcountries.eu/rest/v2/lang/
    let lang_full_uri : string = `https://${restcountries_host}${restcountries_api_version}/lang/${lang}`
    return new Promise(function(resolve, reject) {
        axios.get(lang_full_uri)
        .then(function (response) {
            let lang_list = response.data.map(function (lang: object) {
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
    });
}

function lookup_restcountries_country(country: string) {
    let full_uri : string = `https://${restcountries_host}${restcountries_api_version}/name/${country}`

    return new Promise(function(resolve, reject) {
 
    axios.get(full_uri)
    .then(function (response) {
        console.log(response.data.length);
        let country_return = response.data.map(function (country: object) {
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

// Test_Script();
lookup_restcountries_country("South Africa").then(res =>{
    console.log(res)
})

lookup_restcountries_lang("en").then(res =>{
    console.log(res)
})

lookup_geocode_city("Stelelnbosch").then(res =>{
    console.log(res)
})