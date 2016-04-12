'use strict'

var React = require('react-native')
var SearchBooks = require('./SearchBooks')

var {
  StyleSheet,
  NavigatorIOS,
  Component
} = React

var style = StyleSheet.create({
  container: {
    flex: 1,
  }
})

class Search extends Component {
  render() {
    return (
      <NavigatorIOS
        style={style.container}
        initialRoute={{
          title: 'Search Books',
          component: SearchBooks
        }}
      />
    )
  }
}

module.exports = Search
