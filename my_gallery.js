$.widget("custom.mygallery", {
 
  options: {
    count: 1
  },

  _create: function() {
    var initial = this.element.find('[data-initial-slide=true]');

    this.options = $.extend( {
      nextIndex: 0,
      prevIndex: initial.length - 1,
      content: this.element.find('.photo-gallery__slides'),
      initial: initial
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
    var $content = this.options.content;
    var value = this._slideValue($content, true);

    $content.animate({
      left: value
    });
    console.log(this._neededNextCount());
  },

  _slidePrev: function() {
    var $content = this.options.content;
    var value = this._slideValue($content, false);

    $content.animate({
      left: value
    });
    console.log(this._neededPrevCount());
  },

  _neededNextCount: function() {
    var given = this.options.initial.length;
    var left = given - (this.options.nextIndex + this.options.count);
    var needed = this.options.count - left;
    return needed;
  },

  _neededPrevCount: function() {
    var delta = this.options.prevIndex - this.options.count;
    if (delta > 0) {
      return 0;
    } else {
      return (this.options.prevIndex - delta);
    }
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