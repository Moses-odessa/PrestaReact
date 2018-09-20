import {decode as atob, encode as btoa} from 'base-64'

const BASE_URL = 'https://koreashop.com.ua/api/'//'http://homey.in.ua/api/'
const AUTH_KEY = 'PYIXFN6JSMX7JC892BT8ZAFWPIFRU7W8'//'CM67C92UKYFPE2U7837YH4HGDBV78FBH'
const AUTHORIZATION = 'Basic ' + btoa(AUTH_KEY + ':')

function getHeaders(contentType) {
  return ({
    'Authorization': AUTHORIZATION, 
    'Content-Type': contentType
  })
}

function getImageURL (productId, imageId, imageType) {  
  return (BASE_URL + "images/products/" + productId + "/" + imageId + "/" + imageType)
}

export function getCategories (callback) {
    let url = BASE_URL +
     'categories/?output_format=JSON&display=[id,name,id_parent]&sort=[id_parent_ASC,id_ASC]';
     return fetch(url,
      { 
        method: 'get', 
        headers: getHeaders('application/x-www-form-urlencoded'), 
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
      headers: getHeaders('application/x-www-form-urlencoded'), 
      body: ''
    })
    .then( response => {
      return response.json()
    })
    .then( jsonData => { 
      if(jsonData.length!=0){
        let products = jsonData.products
        for(let i = 0; i < products.length;i++) {
          products[i].image_source = 
            { 
              uri: getImageURL(products[i].id, products[i].id_default_image, 'cart_default'),
              headers: getHeaders('data:image/jpg'),
              method: 'get'
            }     
        }  
        callback(products)
      }else{
        callback([])
      }
    })
    .catch( error => console.log('Fetch error ' + error) );
}

export function getProductDescription (productId, callback) {
  const url = BASE_URL +
   'products?output_format=JSON&display=[id,name,price,description]&filter[id]=[' + productId + ']';
   return fetch(url,
    { 
      method: 'get', 
      headers: getHeaders('application/x-www-form-urlencoded'), 
      body: ''
    })
    .then( response => {
      return response.json()
    })
    .then( jsonData => { 
      if(jsonData.length!=0){     
        callback(jsonData.products[0])
      }else{
        callback([])
      }
    })
    .catch( error => console.log('Fetch error ' + error) );
}

export function getProductImages (productId, callback) {
  const url = BASE_URL +
   'products?output_format=JSON&display=[images[id]]&filter[id]=[' + productId + ']';
   return fetch(url,
    { 
      method: 'get', 
      headers: getHeaders('application/x-www-form-urlencoded'), 
      body: ''
    })
    .then( response => {
      return response.json()
    })
    .then( jsonData => { 
      if(jsonData.length!=0){   
        let imagesURL = []
        let imagesId = jsonData.products[0].associations.images
        for(let i = 0; i < imagesId.length; i++){
          let item = {}
          item.id = imagesId[i].id
          item.large_source = {}
          item.large_source.uri = getImageURL(productId, imagesId[i].id, 'large_default')
          item.large_source.headers = getHeaders('data:image/jpg')
          item.large_source.method = 'get'
          item.preview_source = {}
          item.preview_source.uri = getImageURL(productId, imagesId[i].id, 'medium_default')
          item.preview_source.headers = getHeaders('data:image/jpg')
          item.preview_source.method = 'get'
          imagesURL.push (item)
        }  
        callback(imagesURL)
      }else{
        callback([])
      }
    })
    .catch( error => console.log('Fetch error ' + error) );
}

export function getProductFeatures (productId, callback) {
  const url = BASE_URL +
   'products?output_format=JSON&display=[product_features[id,id_feature_value]]&filter[id]=[' + productId + ']';
   return fetch(url,
    { 
      method: 'get', 
      headers: getHeaders('application/x-www-form-urlencoded'), 
      body: ''
    })
    .then( response => {
      return response.json()
    })
    .then( async jsonData => { 
      if(jsonData.length!=0){ 
        let features = jsonData.products[0].associations.product_features
        let result = {}
        for(let i = 0; i < features.length; i++){
          //console.log(features[i])
          const name = await getFeatureName(features[i].id)
          const value = await getFeatureValues(features[i].id_feature_value)
          !result[name] && (result[name] = [])
          result[name].push(value)
        }  
        callback(result)
      }else{
        callback([])
      }
    })
    .catch( error => console.log('Fetch error ' + error) );
}

function getFeatureName (featureId) {
  let url = BASE_URL +
  'product_features/' + featureId + '?output_format=JSON';
  return fetch(url,
   { 
     method: 'get', 
     headers: getHeaders('application/x-www-form-urlencoded'), 
     body: ''
   })
   .then( response => {
     return response.json()
   })
   .then( jsonData => {     
       return jsonData.product_feature.name    
   })
.catch( error => {
  console.log('Fetch error ' + error) 
  return ''
});
}

function getFeatureValues (valuesId) {
  let url = BASE_URL +
  'product_feature_values/' + valuesId + '?output_format=JSON';
  return fetch(url,
   { 
     method: 'get', 
     headers: getHeaders('application/x-www-form-urlencoded'), 
     body: ''
   })
   .then( response => {
     return response.json()
   })
   .then( jsonData => {     
       return jsonData.product_feature_value.value 
   })
.catch( error => {
  console.log('Fetch error ' + error) 
  return ''
});
}