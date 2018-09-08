const BASE_URL = 'http://homey.in.ua/api/'
const AUTH_KEY = 'CM67C92UKYFPE2U7837YH4HGDBV78FBH'

export const getCategoriesByParentId = (id_parent) => {
    var url = BASE_URL + 'categories/?output_format=JSON&display=[id,name,id_parent]&filter[id_parent]=[' + id_parent + ']';
    fetch(url,
      { 
        method: 'get', 
        headers: new Headers({
          'Authorization': 'Basic ' + btoa(AUTH_KEY + ':'), 
          'Content-Type': 'application/x-www-form-urlencoded'
        }), 
        body: ''
      })
      .then( response => response.json() )
      .then( jsonData => {
        console.log(jsonData);
        this.setState({isLoading: false});
      })
	.catch( error => console.log('Fetch error ' + error) );
  }