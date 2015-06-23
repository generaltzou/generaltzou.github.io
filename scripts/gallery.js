MovieGallery = function() {
  this.fetchData();
};

/* 
 * Replace ID with the YouTube video ID and set to the src of the IFrame.
 */
MovieGallery.prototype.YOUTUBE_IFRAME_SRC =
    'http://www.youtube.com/embed/{{id}}?controls=0&showinfo=0';

MovieGallery.prototype.bindEventListeners = function() {
  $('.movie-thumbnail').on('touchend', function(e) {
    $(e.target).children('.preview-mask').css('transform', 'translateY(0)');
  });

  $('.show-info').on('touchend', function(e) {
    $(e.target).parent().css('transform', 'translateY(-100%)');
  });

  $('.show-youtube').on('touchend', function(e) {
    $('#dimmer').fadeIn(function() {
      $('#yt-player').attr('src', MovieGallery.prototype.YOUTUBE_IFRAME_SRC.replace('{{id}}', e.target.id));
    });
  });

  $('#dimmer').on('touchend', function(e) {
    $('#dimmer').hide();
    $('#yt-player').attr('src', 'about:blank');
  });
};

MovieGallery.prototype.fetchData = function() {
  $.get('https://ga-movies.firebaseio.com/movies.json', function(movies) {
    // Prepare template.
    var template = $('#movie-template').html();
    var renderedOutput = '';
    for (movie in movies) {
      renderedOutput += Mustache.render(template, movies[movie]);
    }

    $('#movies-container').append(renderedOutput);
    this.bindEventListeners();

  }.bind(this));
};

gallery = new MovieGallery();
