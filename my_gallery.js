$.widget("custom.mygallery", {
 
  options: {
    count: 1
  },

  _create: function() {
    this.options = $.extend( {
      nextIndex: 0,
      prevIndex: this.options.count - 1,
      content: this.element.find('.photo-gallery__slides')
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
    //var initialSlides = this.element.find("[data-initial-slide=true]");
  },

  _slideNext: function() {
    var $content = this.options.content;
    var value = this._slideValue($content, true);

    $content.animate({
      left: value
    });
  },

  _slidePrev: function() {
    var $content = this.options.content;
    var value = this._slideValue($content, false);

    $content.animate({
      left: value
    });
  },

  _slideValue: function(element, next) {
    var left = element.css('left');
    var initValue = (left == 'auto' ? 0 : parseInt(left.split("px")[0]));
    var $slide = $(element.find('.photo-gallery__slide')[0]);
    var slideWidth = $slide.outerWidth(true)*3;
    if (next == true) {
      return (initValue - slideWidth) + "px";
    } else {
      return (initValue + slideWidth) + "px";
    }
  }
});