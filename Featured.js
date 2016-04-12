'use strict'

var React = require('react-native')
var BookList = require('./BookList')


var {
  StyleSheet,
  NavigatorIOS,
  Component
} = React

var style = StyleSheet.create({
  container: {
    flex: 1
  }
})


class Featured extends Component {
  render() {
    return (
      <NavigatorIOS
        style={style.container}
        initialRoute={{
          title: 'Featured Books',
          component: BookList
        }}
      />
    )
  }
}

module.exports = Featured
