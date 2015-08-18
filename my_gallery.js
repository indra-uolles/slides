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
    //var initialSlides = this.element.find("[data-initial-slide=true]");
  },

  showPrev: function() {

  }
});