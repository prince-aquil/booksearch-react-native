'use strict'

var REQUEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction';

var React = require('react-native')
var BookDetail = require('./BookDetail')

var {
  Image,
  StyleSheet,
  Text,
  View,
  Component,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React

var style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  thumbnail: {
    width: 53,
    height: 81,
    marginRight: 10
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8
  },
  author: {
    color: '#656565'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  listView: {
    backgroundColor: '#F5FCFF',
    marginTop: 60,
    marginBottom: 50
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

class BookList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
       dataSource: new ListView.DataSource({
           rowHasChanged: (row1, row2) => row1 !== row2
       })
     }
   }
  componentDidMount() {
    this.fetchData()
  }
  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.items),
          isLoading: false
        })
      })
      .done()
  }
  showBookDetail(book) {
    this.props.navigator.push({
      title: book.volumeInfo.title,
      component: BookDetail,
      passProps: {book}
    })
  }
  render() {
    if (this.state.isLoading) {
      return this.renderLoadingView()
    }
    return (
      <ListView dataSource={this.state.dataSource} renderRow={this.renderBook.bind(this)} style={style.listView}/>
    )
  }
  renderBook(book) {
       return (
          <TouchableHighlight onPress={() => this.showBookDetail(book)} underlayColor="#dddddd">
            <View>
              <View style={style.container}>
                <Image source={{uri: book.volumeInfo.imageLinks.thumbnail}} style={style.thumbnail} />
                  <View style={style.rightContainer}>
                    <Text style={style.title}>{book.volumeInfo.title}</Text>
                    <Text style={style.author}>{book.volumeInfo.authors}</Text>
                  </View>
                </View>
                <View style={style.separator} />
            </View>
          </TouchableHighlight>
       )
   }
   renderLoadingView() {
     return (
       <View style={style.loading}>
         <ActivityIndicatorIOS size="large"/>
         <Text>Loading Books </Text>
       </View>
     )
   }
}

module.exports = BookList
