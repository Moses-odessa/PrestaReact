import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Categories from './src/component/categories/Categories'
import Products from './src/component/products/Products'
import ProductDetails from './src/component/product_details/ProductDetails'
import ImagesGallery from './src/component/product_details/ImagesGallery'
import ProductSpec from './src/component/product_details/ProductSpec'
import ShoppingCart from './src/component/cart/ShoppingCart';
import Shops from './src/component/shops/Shops';
import CartButton from './src/component/cart/CartButton';

const DetailsStack = createBottomTabNavigator(
  {
    ProductDetails: ProductDetails,
    ProductSpec: ProductSpec,
    ImagesGallery: ImagesGallery
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'ProductDetails') {
          iconName = `description`;
        } else if (routeName === 'ProductSpec') {
          iconName = `format-list-bulleted`;
        } else if (routeName === 'ImagesGallery') {
          iconName = `photo-library`;
        }
        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }  
);

const RootStack = createStackNavigator(
  {
    Shops: Shops,
    Categories: Categories,
    Products: Products,
    ShoppingCart: ShoppingCart,
    DetailsStack: {
      screen: DetailsStack,
      navigationOptions:({ navigation }) => ({
        title: navigation.getParam('product', {name: ''}).name,
        headerRight: (<CartButton shop={navigation.getParam('shop', {})}/>)
      })
    },
  },
  {
    initialRouteName: 'Shops',
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
  constructor(props) {
    super(props);
    this.state = {
      allCarts: {}
    };         
  }

  updateCart = (shop, shopCart) => {
    let {allCarts} = this.state
    shopCart.total = Math.round(shopCart.total*100)/100
    allCarts[shop.baseUrl] = shopCart    
    this.setState({ allCarts: allCarts })
  }

  render() {
    const {allCarts} = this.state
    const screenProps = {      
      allCarts: allCarts,
      updateCart: this.updateCart,
    }
    return <RootStack screenProps = {screenProps}/>;
  }
}
