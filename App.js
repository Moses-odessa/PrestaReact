import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Categories from './src/component/categories/Categories'
import Products from './src/component/products/Products'
import ProductDetails from './src/component/product_details/ProductDetails'
import ImagesGallery from './src/component/product_details/ImagesGallery'
import ProductSpec from './src/component/product_details/ProductSpec'
import CartButton from './src/component/cart/CartButton';
import ShoppingCart from './src/component/cart/ShoppingCart';
import Shops from './src/component/shops/Shops';

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
    DetailsStack: DetailsStack,
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
      headerRight: (<CartButton />),      
    },
  }
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartProducts: {
        items: {},
        qty: 0, 
        total: 0,
        }
    };         
  }

  updateCart = (cartProducts) => {
    cartProducts.total = Math.round(cartProducts.total*100)/100
    this.setState({ cartProducts: cartProducts })
  }

  render() {
    const {cartProducts} = this.state
    const screenProps = {      
      cartProducts: cartProducts,
      updateCart: this.updateCart,
    }
    return <RootStack screenProps = {screenProps}/>;
  }
}
