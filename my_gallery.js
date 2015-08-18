$.widget("custom.mygallery", {
 
  options: {
    count: 1
  },

  _create: function() {
    this.options = $.extend( {
      nextIndex: 0,
      prevIndex: this.options.count - 1
    }, this.options);

    this._on(this.element, {
      "click .photo-gallery__next": function( event ) {
        this._slideNext();
      },
      "click .photo-gallery__prev": function( event ) {
        this._slidePrev();
      },
    });
  },

  showNext: function() {
    console.log(this.options.count);
    console.log(this.options.prevIndex);
    this._slideNext();
    //var initialSlides = this.element.find("[data-initial-slide=true]");
  },

  _slideNext: function() {
    var $content = this.element.find('.photo-gallery__slides');
    var $slide = $($content.find('.photo-gallery__slide')[0]);
    var slideWidth = $slide.outerWidth(true)*3;
    var value = "-" + slideWidth + "px";

    $content.animate({
      left: value
    });
  },

  _slidePrev: function() {
    var $content = this.element.find('.photo-gallery__slides');
    var $slide = $($content.find('.photo-gallery__slide')[0]);
    var slideWidth = $slide.outerWidth(true)*3;
    var value = slideWidth + "px";

    $content.animate({
      left: value
    });
  }
});