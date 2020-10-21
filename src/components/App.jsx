import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import exampleVideoData from '../data/exampleVideoData.js';
import YOUTUBE_API_KEY from '../config/youtube.js';
import Search from './Search.js';
// import searchYouTube from '../lib/searchYouTube.js';
var currentList = exampleVideoData;
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      youTubeVideos: exampleVideoData,
      currentVideo: exampleVideoData[0],
      currentSearch: 'cats'
    };
    this.onTitleClick = this.onTitleClick.bind(this);
    this.clickSearch = this.clickSearch.bind(this);
    this.userInput = this.userInput.bind(this);
  }

  componentDidMount() {
    this.props.searchYouTube({
      key: YOUTUBE_API_KEY,
      query: 'cats',
      max: 5
    }, (data) => {
      currentList = data;
      this.setState({youTubeVideos: data, currentVideo: data[0]});
    });
  }

  onTitleClick(event) {
    this.setState({
      currentVideo: currentList[event.target.id]
    });
  }

  clickSearch() {
    this.props.searchYouTube({
      key: YOUTUBE_API_KEY,
      query: this.state.currentSearch,
      max: 5
    }, (data) => {
      currentList = data;
      this.setState({youTubeVideos: data, currentVideo: data[0]});
    });
  }

  // userInput(event) {
  //   console.log(event.target.value);
  //   this.setState({
  //     currentSearch: event.target.value
  //   });
  // }

  userInput(event) {
    this.props.searchYouTube({
      key: YOUTUBE_API_KEY,
      query: event.target.value,
      max: 5
    }, (data) => {
      currentList = data;
      this.setState({youTubeVideos: data, currentVideo: data[0]});
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div><h5><em>search</em><Search click= {this.clickSearch} searchText={this.userInput}/></h5></div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <div><h5><em>videoPlayer</em><VideoPlayer video = {this.state.currentVideo} /></h5></div>
          </div>
          <div className="col-md-5">
            <div><h5><em>videoList</em><VideoList click={this.onTitleClick} videos = {this.state.youTubeVideos}/></h5></div>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
