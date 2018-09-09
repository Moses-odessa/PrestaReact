import {decode as atob, encode as btoa} from 'base-64'

const BASE_URL = 'http://homey.in.ua/api/'
const AUTH_KEY = 'CM67C92UKYFPE2U7837YH4HGDBV78FBH'

export function getCategoriesByParentId (id_parent, callback) {
    let url = BASE_URL + 'categories/?output_format=JSON&display=[id,name,id_parent]&filter[id_parent]=[' + id_parent + ']';
     return fetch(url,
      { 
        method: 'get', 
        headers: new Headers({
          'Authorization': 'Basic ' + btoa(AUTH_KEY + ':'), 
          'Content-Type': 'application/x-www-form-urlencoded'
        }), 
        body: ''
      })
      .then( response => {
        return response.json()
      })
      .then( jsonData => { 
        console.log(jsonData)
        console.log(jsonData.length)
        if(jsonData.length!=0){     
          callback(jsonData.categories)
        }else{
          callback([])
        }
      })
  .catch( error => console.log('Fetch error ' + error) );
  
  }