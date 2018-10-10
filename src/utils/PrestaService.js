import {decode as atob, encode as btoa} from 'base-64'

function getAutorization(authKey){
  return 'Basic ' + btoa(authKey + ':')
}

function getHeaders(shop, contentType) {
  return ({
    'Authorization': getAutorization(shop.authKey), 
    'Content-Type': contentType
  })
}

function getImageURL (shop, productId, imageId, imageType) {  
  return (shop.baseUrl + "images/products/" + productId + "/" + imageId + "/" + imageType)
}

export function getCategories (shop, callback) {
  //console.log(shop)
    let url = shop.baseUrl +
     'categories/?output_format=JSON&display=[id,name,id_parent]&filter[active]=[1]&sort=[id_parent_ASC,id_ASC]';
     return fetch(url,
      { 
        method: 'get', 
        headers: getHeaders(shop,'application/x-www-form-urlencoded'), 
        body: ''
      })
      .then( response => {
        return response.json()
      })
      .then( jsonData => {
        let categories = jsonData.categories        
        for(let i = 0; i < categories.length;i++) {
          categories[i].name = getLangValue(shop.lang, categories[i].name)
        }    
          callback(categories)        
      })
  .catch( error => {
    console.log('Fetch error ' + error) 
    callback([])
  })  
}

export function getProductsByCategoryId (shop, categoryId, callback) {
  let url = shop.baseUrl +
   'products/?output_format=JSON&display=[id,name,price,id_default_image, description_short]&filter[active]=[1]&filter[id_category_default]=[' + categoryId + ']';
   return fetch(url,
    { 
      method: 'get', 
      headers: getHeaders(shop, 'application/x-www-form-urlencoded'), 
      body: ''
    })
    .then( response => {
      return response.json()
    })
    .then( jsonData => { 
        let products = jsonData.products
        for(let i = 0; i < products.length;i++) {
          products[i].name = getLangValue(shop.lang, products[i].name)
          products[i].description_short = getLangValue(shop.lang, products[i].description_short)

          products[i].image_source = 
            { 
              uri: getImageURL(shop, products[i].id, products[i].id_default_image, 'cart_default'),
              headers: getHeaders(shop, 'data:image/jpg'),
              method: 'get'
            }     
        }  
        callback(products)      
    })
    .catch( error => {
      console.log('Fetch error ' + error) 
      callback([])
    })
}

export function getProductDescription (shop, productId, callback) {
  const url = shop.baseUrl +
   'products?output_format=JSON&display=[description]&filter[id]=[' + productId + ']';
   return fetch(url,
    { 
      method: 'get', 
      headers: getHeaders(shop, 'application/x-www-form-urlencoded'), 
      body: ''
    })
    .then( response => {
      return response.json()
    })
    .then( jsonData => {   

      callback(getLangValue(shop.lang, jsonData.products[0].description))      
    })
    .catch( error => {
      console.log('Fetch error ' + error) 
      callback('')
    })
}

export function getProductImages (shop, productId, callback) {
  const url = shop.baseUrl +
   'products?output_format=JSON&display=[images[id]]&filter[id]=[' + productId + ']';
   return fetch(url,
    { 
      method: 'get', 
      headers: getHeaders(shop, 'application/x-www-form-urlencoded'), 
      body: ''
    })
    .then( response => {
      return response.json()
    })
    .then( jsonData => {        
        let imagesURL = []
        let imagesId = jsonData.products[0].associations.images
        for(let i = 0; i < imagesId.length; i++){
          let item = {}
          item.id = imagesId[i].id
          item.large_source = {}
          item.large_source.uri = getImageURL(shop, productId, imagesId[i].id, 'large_default')
          item.large_source.headers = getHeaders(shop, 'data:image/jpg')
          item.large_source.method = 'get'
          item.preview_source = {}
          item.preview_source.uri = getImageURL(shop, productId, imagesId[i].id, 'medium_default')
          item.preview_source.headers = getHeaders(shop, 'data:image/jpg')
          item.preview_source.method = 'get'
          imagesURL.push (item)
        }  
        callback(imagesURL)
      
    })
    .catch( error => {
      console.log('Fetch error ' + error) 
      callback([])
    });
}

export function getProductFeatures (shop, productId, callback) {
  const url = shop.baseUrl +
   'products?output_format=JSON&display=[product_features[id,id_feature_value]]&filter[id]=[' + productId + ']';
   return fetch(url,
    { 
      method: 'get', 
      headers: getHeaders(shop, 'application/x-www-form-urlencoded'), 
      body: ''
    })
    .then( response => {
      return response.json()
    })
    .then( async jsonData => { 
      
        let features = jsonData.products[0].associations.product_features
        let result = {}
        let featuresGroup = {}
        for(let i = 0; i < features.length; i++){
          let groupId = features[i].id
          !featuresGroup[groupId] && (featuresGroup[groupId] = await getFeatureName(shop, groupId))          
          const value = await getFeatureValues(shop, features[i].id_feature_value)
          let groupName = featuresGroup[groupId]
          !result[groupName] && (result[groupName] = [])
          result[groupName].push(value)
        }  
        callback(result)      
    })
    .catch( error => {
      console.log('Fetch error ' + error)
      callback([]) 
    });
}

function getFeatureName (shop, featureId) {
  let url = shop.baseUrl +
  'product_features/' + featureId + '?output_format=JSON';
  return fetch(url,
   { 
     method: 'get', 
     headers: getHeaders(shop, 'application/x-www-form-urlencoded'), 
     body: ''
   })
   .then( response => {
     return response.json()
   })
   .then( jsonData => {     
       return getLangValue(shop.lang, jsonData.product_feature.name)    
   })
.catch( error => {
  console.log('Fetch error ' + error) 
  return ''
});
}

function getFeatureValues (shop, valuesId) {
  let url = shop.baseUrl +
  'product_feature_values/' + valuesId + '?output_format=JSON';
  return fetch(url,
   { 
     method: 'get', 
     headers: getHeaders(shop, 'application/x-www-form-urlencoded'), 
     body: ''
   })
   .then( response => {
     return response.json()
   })
   .then( jsonData => {     
       return getLangValue(shop.lang, jsonData.product_feature_value.value)
   })
  .catch( error => {
    console.log('Fetch error ' + error) 
    return ''
  });
}

function getLangValue(lang, langArr) {
  let result = ''
  if(!Array.isArray(langArr) ) {
      result = langArr
  } else {
      for(let i = 0; i< langArr.length; i++){
          (langArr[i].id == lang.id) && (result = langArr[i].value)
      }
  }
  return result
}

export function getShopLogo(shop){
  source = {}
  source.uri = shop.baseUrl + 'images/general/header'
  source.headers = getHeaders(shop,'data:image/jpg')
  source.method = 'get'
  //console.log(source)
  return source
}
