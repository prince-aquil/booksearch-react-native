'use strict'

var React = require('react-native')

var {
  StyleSheet,
  Text,
  View,
  Component,
  Image,
  ScrollView
} = React

var style = StyleSheet.create({
  container: {
    marginTop: 75,
    alignItems: 'center'
  },
  image: {
    width: 107,
    height: 165,
    padding: 10
  },
  description: {
    padding: 10,
    fontSize: 15,
    color: '#656565'
  }
})

class BookDetail extends Component {
  render() {
    var book = this.props.book
    var imageURI = (typeof book.volumeInfo.imageLinks !== 'undefined' ? book.volumeInfo.imageLinks.thumbnail : '')
    var description = (typeof book.volumeInfo.description !== 'undefined' ? book.volumeInfo.description: '')
    return (
      <ScrollView>
      <View style={style.container}>
        <Image style={style.image} source={{uri: imageURI}}/>
        <Text style={style.description}>{description}</Text>
      </View>
    </ScrollView>
    )
  }
}

module.exports = BookDetail
