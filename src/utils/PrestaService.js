import {decode as atob, encode as btoa} from 'base-64'

const BASE_URL = 'http://homey.in.ua/api/'
export const AUTH_KEY = 'CM67C92UKYFPE2U7837YH4HGDBV78FBH'
export const AUTHORIZATION = 'Basic ' + btoa(AUTH_KEY + ':')
export function getCategories (callback) {
    let url = BASE_URL +
     'categories/?output_format=JSON&display=[id,name,id_parent]&sort=[id_parent_ASC,id_ASC]';
     return fetch(url,
      { 
        method: 'get', 
        headers: new Headers({
          'Authorization': AUTHORIZATION, 
          'Content-Type': 'application/x-www-form-urlencoded'
        }), 
        body: ''
      })
      .then( response => {
        return response.json()
      })
      .then( jsonData => { 
        if(jsonData.length!=0){     
          callback(jsonData.categories)
        }else{
          callback([])
        }
      })
  .catch( error => console.log('Fetch error ' + error) );  
}

export function getProductsByCategoryId (categoryId, callback) {
  let url = BASE_URL +
   'products/?output_format=JSON&display=[id,name,price,id_default_image, description_short]&filter[id_category_default]=[' + categoryId + ']';
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
      if(jsonData.length!=0){     
        callback(jsonData.products)
      }else{
        callback([])
      }
    })
    .catch( error => console.log('Fetch error ' + error) );
}

export function getProductById (productId, callback) {
  const url = BASE_URL +
   'products/' + productId + '/?output_format=JSON';
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
      if(jsonData.length!=0){     
        callback(jsonData.product)
      }else{
        callback([])
      }
    })
    .catch( error => console.log('Fetch error ' + error) );
}

export function getImageURL (productId, imageId, imageType) {  
  return (BASE_URL + "images/products/" + productId + "/" + imageId + "/" + imageType)
}