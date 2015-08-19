$.widget("custom.mygallery", {
 
  options: {
    count: 1
  },

  _create: function() {
    var slides = this.element.find('.photo-gallery__slides');

    this.options = $.extend({
      currIndex: 0,
      slides: slides
    }, this.options);

    this._on(this.element, {
      "click .photo-gallery__next": function(event) {
        this._slideNext();
      },
      "click .photo-gallery__prev": function(event) {
        this._slidePrev();
      },
    });

    this._togglePrevState();
    this._toggleNextState();
  },

  _toggleNextState: function() {
    var index = this.options.currIndex + this.options.count,
        left  = this._ifSlidesLeft(index),
        element = this.element.find('.photo-gallery__next');

    if (left == false) {
      element.addClass('is-disabled');
    } else {
      element.removeClass('is-disabled');
    }
  },

  _togglePrevState: function() {
    var index = this.options.currIndex - this.options.count,
        left  = this._ifSlidesLeft(index, false),
        element = this.element.find('.photo-gallery__prev');

    if (left == false) {
      element.addClass('is-disabled');
    } else {
      element.removeClass('is-disabled');
    }
  },

  _slideNext: function() {
    if (this._canSlide() == false) {
      return;
    }
    var $slides = this.options.slides;

    var value = this._slideValue($slides, true);
    $slides.transition({ x: value }, 1000);

    this._increaseCurrIndex();
    this._togglePrevState();
    this._toggleNextState();
  },

  _slidePrev: function() {
    if (this._canSlide(false) == false) {
      return;
    }
    var $slides = this.options.slides;
    var value = this._slideValue($slides, false);
    $slides.transition({ x: value }, 1000);

    this._decreaseCurrIndex();
    this._togglePrevState();
    this._toggleNextState();
  },

  _canSlide: function(forward) {
    var result = true;
    if (typeof(forward) == 'undefined') {
      forward = true;
    }
    var selector = (forward == true ? '.photo-gallery__next' : '.photo-gallery__prev');
    var element = this.element.find(selector);
    if (element.hasClass("is-disabled")) {
      result = false;
    }

    return result;
  },

  _ifSlidesLeft: function(index, forward) {
    if (typeof(forward) == 'undefined') {
      forward = true;
    }
    var result = false;

    if (forward == true) {
      left = this.options.slides.find('.photo-gallery__slide').length - index;
    } else {
      left = index;
    }

    if ((forward == true && left > 0) || (forward == false && left >= 0)) {
      result = true;
    }

    return result;
  },

  _slideValue: function(element, next) {
    var $slide = $(element.find('.photo-gallery__slide')[0]);
    var slideWidth = $slide.outerWidth(true)*this.options.count;
    if (next == true) {
      return "-=" + slideWidth;
    } else {
      return "+=" + slideWidth;
    }
  },

  _increaseCurrIndex: function() {
    this.options.currIndex += this.options.count;
   },

  _decreaseCurrIndex: function() {
    this.options.currIndex -= this.options.count;
  }
});