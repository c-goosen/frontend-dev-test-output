import React from 'react';

const geocode_url  = "https://geocode.xyz/";
const geocode_auth = "?json=1&auth=109682095839654e15744092x3811"

// export default class Geocode extends React.Component {

    export function lookup_geocode_city(city) {
        let full_uri = `${geocode_url}/${city}${geocode_auth}`;
        return new Promise(function(resolve, reject) {
            fetch(full_uri)
                .then(function (response) {
                    resolve(
                        [{
                            longt: response.data['longt'],
                            latt: response.data['latt'],
                            confidence: response.data['standard']['confidence']
                        }]
                    );
                })
                .catch(function (error) {
                    console.log(error);
                    reject(error);
                });
        });
    }

    export async function lookup_geocode_city_two(city) {
    let full_uri = `${geocode_url}/${city}${geocode_auth}`;
    let response = await fetch(full_uri);
    let responseJson = await response.json()
        return {
                            longt: responseJson['longt'],
                            latt: responseJson['latt'],
                            confidence: responseJson['standard']['confidence']
            }

        }


// import React from 'react';

// const geocode_url  = "https://geocode.xyz/";
// const geocode_auth = "?json=1&auth=109682095839654e15744092x3811"

// // export default class Geocode extends React.Component {

//     export async function lookup_geocode_city(city) {
//     // export function lookup_geocode_city(city) = async () =>{
//         let full_uri = `${geocode_url}/${city}${geocode_auth}`;
//         let response_json = {};

//         var response = await fetch(full_uri);
//         var data = await response.json()
//         // console.log(data);
//         // return new Promise(function(resolve, reject) {
//             // fetch(full_uri)
//             //     .then(function (response) {
//             //         // resolve(
//             //         //     [{
//             //         //         longt: response.data['longt'],
//             //         //         latt: response.data['latt'],
//             //         //         confidence: response.data['standard']['confidence']
//             //         //     }]
//             //         // );
//             //         response_json = {
//             //                     longt: response.data['longt'],
//             //                     latt: response.data['latt'],
//             //                     confidence: response.data['standard']['confidence']
//             //                 }
//             //         return {
//             //             longt: response.data['longt'],
//             //             latt: response.data['latt'],
//             //             confidence: response.data['standard']['confidence']
//             //         }
//             //     })
//             //     .catch(function (error) {
//             //         console.log(error);
//             //         // reject(error);
//             //     });
//         // return response_json;
//         // });
//         // response = await fetch(full_uri);
//         // const responseJson = await response.json()
//         // return {
//         //                         longt: responseJson['longt'],
//         //                         latt: responseJson['latt'],
//         //                         confidence: responseJson['standard']['confidence']
//         //         }
//         // }

// // }
//     return data;    
// }