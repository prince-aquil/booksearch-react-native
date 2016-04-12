'use strict'

var React = require('react-native')
var SearchResults = require('./SearchResults')

var {
  StyleSheet,
  View,
  Component,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Text
} = React

var style = StyleSheet.create({
  container: {
    marginTop: 65,
    padding: 10
  },
  searchInput: {
    height: 36,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    borderWidth: 1,
    flex: 1,
    borderRadius: 4,
    padding: 5
  },
  button: {
    height: 36,
    backgroundColor: '#f39c12',
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 15
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  instructions: {
    fontSize: 18,
    alignSelf: 'center',
    marginBottom: 15
  },
  fieldLabel: {
    fontSize: 15,
    marginTop: 15
  },
  errorMessage: {
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 15,
    color: 'red'
  }
})

class SearchBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookAuthor: '',
      bookTitle: '',
      isLoading: false,
      errorMessage: ''
    }
  }
  render() {
    var spinner = this.state.isLoading ? (<ActivityIndicatorIOS hidden='true' size='large'/>) : ( <View/> )
    return (
      <View style={style.container}>
        <Text style={style.instructions}>Search by book title and/or author</Text>
          <View>
            <Text style={style.fieldLabel}>Book Title:</Text>
            <TextInput style={style.searchInput} onChange={this.bookTitleInput.bind(this)}/>
          </View>
        <View>
          <Text style={style.fieldLabel}>Author Title</Text>
          <TextInput style={style.searchInput} onChange={this.bookAuthorInput.bind(this)}/>
        </View>
        <TouchableHighlight style={style.button} underlayColor='#f1c40f' onPress={this.searchBooks.bind(this)}>
          <Text style={stile.buttonText}>Search</Text>
          {spinner}
        </TouchableHighlight>
        <Text style={style.errorMessage}>{this.state.errorMessage}</Text>
      </View>
    )
  }
  searchBooks() {
    this.fetchData()
  }
  fetchData() {
    this.fetchData
  }
  fetchData() {
    this.setState({ isLoading: true })
    var baseURL = 'https://www.googleapis.com/books/v1/volumes?q='
    if (this.state.bookAuthor !== '') {
      baseURL += encodeURIComponent('inauthor:' + this.state.bookAuthor);
    }
    if (this.state.bookTitle !== '') {
      baseURL += (this.state.bookAuthor === '') ? encodeURIComponent('intitle:' + this.state.bookTitle) : encodeURIComponent('+intitle:' + this.state.bookTitle);
    }
    console.log('URL: >>> ' + baseURL);
       fetch(baseURL)
           .then((response) => response.json())
           .then((responseData) => {
               this.setState({ isLoading: false});
               if (responseData.items) {

                   this.props.navigator.push({
                       title: 'Search Results',
                       component: SearchResults,
                       passProps: {books: responseData.items}
                   });
               } else {
                   this.setState({ errorMessage: 'No results found'});
               }
           })
           .catch(error =>
               this.setState({
                   isLoading: false,
                   errorMessage: error
               }))
           .done();
  }

}

module.exports = SearchBooks
