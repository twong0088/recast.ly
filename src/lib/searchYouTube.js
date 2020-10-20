var searchYouTube = (options, callback) => {
  // TODO
  // options is object with properties:
  // query - the string to search for
  // max - the max number of videos to get, should default to 5
  // key - an authorized YouTube Browers API key

  // callback function should be invoked with the viedoes array
  // returned from hitting the endpoint

  //$.get('https://www.googleapis.com/youtube/v3/search', callback(videosArray));

  $.ajax({
    type: 'GET',
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: {
      key: options.key,
      q: options.query,
      part: 'snippet',
      maxResults: options.max,
      type: 'video',
      videoEmbeddable: true,
    },
    success: function(data) {
      callback(data.items);
    },
    error: function(response) {
      console.log('Request Failed');
    }
  });
};

export default searchYouTube;
