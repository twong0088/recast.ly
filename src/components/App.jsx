import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import exampleVideoData from '../data/exampleVideoData.js';
import YOUTUBE_API_KEY from '../config/youtube.js';
import searchYouTube from '../lib/searchYouTube.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentVideo: exampleVideoData[0],
      youTubeVideos: exampleVideoData
    };
    this.onTitleClick = this.onTitleClick.bind(this);
  }

  componentDidMount() {
    searchYouTube({
      key: YOUTUBE_API_KEY,
      query: 'cats',
      max: 5
    }, (data) => this.setState({youTubeVideos: data}));
  }

  onTitleClick(event) {
    console.log(event.target.id);
    this.setState({

      currentVideo: exampleVideoData[event.target.id]
    });
    console.log('button clicked');
  }

  // onSearchClick() {

  // }

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div><h5><em>search</em> view goes here</h5></div>
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
