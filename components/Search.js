import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, TextInput, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

export default class Search extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      suggestions: [] 
    };
  }

  autocompletion = (text) => {
    fetch(`http://audioscrobbler.com/2.0/?method=artist.search&artist=${text}&limit=4&api_key=af05581a38f69802ba020346115c8834&format=json`)
    .then(resp => resp.json())
    .then(resp => this.setState({suggestions : resp.results.artistmatches.artist}))
  }

  componentWillMount() {
    this.startHeaderHeight = 80 // régler taille pour IOS
    if(Platform.OS == 'android') {
      this.startHeaderHeight = 60 + StatusBar.currentHeight
    }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style= {{ height: this.startHeaderHeight, backgroundColor: 'grey', borderBottomColor: '#dddddd' }}>
            <View style={styles.inputContainer}>
              <Icon name= "md-search" size={20} color='grey' style={{marginTop: 4}}/>
              <TextInput underlineColorAndroid='transparent' spellCheck={false} autoCorrect={false} placeholder="Try 'Ty Segall'" placeholderTextColor="grey" 
              style={styles.input} 
              onChangeText= {(text) => this.autocompletion(text)} />
            </View>
          </View>
          <View>
            {this.state.suggestions.length !== 0 && this.state.suggestions.map((element, i) => (
            <View key={i} style={styles.artistThumbnail}>
              <Image style={styles.artistAvatar} source={{ uri: element.image[2]["#text"] }} />
              <Text style={styles.artistName}>{element.name}</Text>
              <Text></Text>
            </View>))}
          </View>       
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: 9,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    marginHorizontal: 20,
    shadowOffset:{width:0, height:0},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 1,
    borderRadius: 5,
    marginTop: Platform.OS == 'android' ? 30 : null
  },
  input: {
    flex: 1,
    fontWeight: '700',
    textDecorationLine: 'none',
    backgroundColor: 'white',
    paddingLeft: 9
  },
  artistThumbnail: {
    flexDirection:"row",
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#dddddd',
    paddingVertical: 10
  },
  artistAvatar: {
    marginLeft: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'flex-start'
    },
  artistName: {
    paddingLeft: 15,
    justifyContent: 'flex-end',
    fontWeight: '700'
    }
});
