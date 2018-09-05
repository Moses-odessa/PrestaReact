import React from 'react';

import {CategoriesPage} from './categories-page'

export default class App extends React.Component {
  constructor(props) {
    super(props);
  } 

  render() {
    console.log('Starting render');
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Categories',
          component: CategoriesPage,
        }}/>
  }

}

const styles = React.StyleSheet.create({  
  container: {
    flex: 1
  }
});