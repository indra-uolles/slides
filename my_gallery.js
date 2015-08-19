$.widget("custom.mygallery", {
 
  options: {
    count: 1
  },

  _create: function() {
    var slides = this.element.find('.photo-gallery__slides');

    this.options = $.extend({
      nextIndex: 0,
      prevIndex: slides.length - 1,
      slides: slides
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

  _slideNext: function() {
    var $slides = this.options.slides;

    var value = this._slideValue($slides, true);
    $slides.transition({ x: value }, 1000);
  },

  _slidePrev: function() {
    var $slides = this.options.slides;
    var value = this._slideValue($slides, false);
    $slides.transition({ x: value }, 1000);
  },

  _slideValue: function(element, next) {
    var $slide = $(element.find('.photo-gallery__slide')[0]);
    var slideWidth = $slide.outerWidth(true)*this.options.count;
    if (next == true) {
      return "-=" + slideWidth;
    } else {
      return "+=" + slideWidth;
    }
  }
});