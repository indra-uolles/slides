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
    var count = this._nextSlidesCount(this.options.currentIndex);
    var value = this._slideValue(count, true);

    this.options.slides.transition({ x: value }, 1000);

    this._increaseCurrIndex();
    this._togglePrevState();
    this._toggleNextState();
  },

  _slidePrev: function() {
    if (this._canSlide(false) == false) {
      return;
    }
    var count = this._nextSlidesCount(this.options.currentIndex, false);
    var value = this._slideValue(count, false);
    
    this.options.slides.transition({ x: value }, 1000);

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

  _nextSlidesCount: function(index, forward) {
    if (typeof(forward) == 'undefined') {
      forward = true;
    }
    var result = 0;

    if (forward == true) {
      var delta = this._slidesLength() - this.options.currIndex - this.options.count;
      if (delta >= this.options.count) {
        result = this.options.count;
      } else {
        result = delta;
      }
    } else {
      if (this.options.currIndex + 1 > this.options.count) {
        result = this.options.currIndex + 1 - this.options.count;
      } else {
        result = this.options.currIndex + 1;
      }
    }

    return result;
  },

  _slidesLength: function() {
    return this.options.slides.find('.photo-gallery__slide').length;
  },

  _slideValue: function(count, forward) {
    if (typeof(forward) == 'undefined') {
      forward = true;
    }
    var slides = this.options.slides.find('.photo-gallery__slide'),
        slideWidth = 0,
        start = 0,
        len = 0;

    if (forward == true) {
      if (count < this.options.count) {
        start = this.options.currIndex + this.options.count;
      } else {
        start = this.options.currIndex;
      }
      len = start + count;

      for (var i = start; i < len; i++) {
        slideWidth += $(slides[i]).outerWidth(true);
      }
    } else {
      start = this.options.currIndex;
      len = this.options.currIndex - count;
      
      for (var i = start; i > len; i--) {
        slideWidth += $(slides[i]).outerWidth(true);
      }
    }

    if (forward == true) {
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