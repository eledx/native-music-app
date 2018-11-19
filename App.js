import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import Search from './components/Search';

export default class App extends Component {

  render() {
    return (
      <ScrollView>
        <Search />
      </ScrollView>
    );
  }
}

