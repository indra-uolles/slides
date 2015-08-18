$.widget("custom.mygallery", {
 
  options: {
    count: 1
  },

  _create: function() {
    this.options = $.extend( {
      nextIndex: 0,
      prevIndex: this.options.count - 1
    }, this.options);
  },

  showNext: function() {
    console.log(this.options.count);
    console.log(this.options.prevIndex);
    this._slideNext();
    //var initialSlides = this.element.find("[data-initial-slide=true]");
  },

  showPrev: function() {

  },

  _slideNext: function() {
    $content = this.element.find('.photo-gallery__slides');

    $content.animate({
      left: "-200px"
    });
  },

  _slidePrev: function() {

  }
});