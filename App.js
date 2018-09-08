import React from 'react';
import { createStackNavigator } from 'react-navigation'; 
import Categories from './src/component/categories/Categories';
import Products from './src/component/products/Products';
import ProductDetails from './src/component/product_details/ProductDetails';


const RootStack = createStackNavigator(
  {
    Categories: Categories,
    Products: Products,
    ProductDetails: ProductDetails,
  },
  {
    initialRouteName: 'Categories',
    /* The header config from HomeScreen is now here */
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
