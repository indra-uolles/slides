$.widget("custom.mygallery", {
 
  options: {
    count: 1    // Сколько картинок листать при клике на стрелки
  },

  _create: function() {
    var slides = this.element.find('.photo-gallery__slides');

    this.options = $.extend({
      currIndex: 0,
      totalSlides: slides.find('.photo-gallery__slide').length,
      slides: slides,
      useTransition: this._getSupportedTransform()
    }, this.options);

    this._on(this.element, {
      "click .photo-gallery__next": function(event) {
        this._slideNext();
      },
      "click .photo-gallery__prev": function(event) {
        this._slidePrev();
      },
    });

    this._toggleControlsStates();
  },

  _toggleControlsStates: function() {
    this._togglePrevState();
    this._toggleNextState();
  },

  _slideNext: function() {
    this._slide('next');
  },

  _slidePrev: function() {
    this._slide('prev');
  },

  _slide: function(direction) {
    if (this._canSlide(direction) == false) {
      return;
    }
    var count = this._willSlideCount(direction);
    var value = this._slideValue(count, direction);
    
    if (this.options.useTransition) {
      this.options.slides.transition({ x: value }, 300);
    } else {
      this.options.slides.animate({ marginLeft: value }, 300);
    }

    this._updateCurrIndex(count, direction);
    this._toggleControlsStates();
  },

  _canSlide: function(direction) {
    var result = true;
    var selector = (direction == 'next' ? '.photo-gallery__next' : '.photo-gallery__prev');
    var element = this.element.find(selector);
    if (element.hasClass("is-disabled")) {
      result = false;
    }

    return result;
  },

  _hasSlidesLeft: function(direction) {
    var count = this._nextSlidesCount(direction);
    if (count > 0) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * Возвращает количество картинок, на которые будем сдвигать 
   * с учётом настроек и имеющихся ограничений
   * 
   * @param  {"prev" | "next"} 
   * @return {Number}
   */
  _willSlideCount: function(direction) {
    var count = this._nextSlidesCount(direction);
    return (count > this.options.count ? this.options.count : count);
  },

  _nextSlidesCount: function(direction) {

    if (direction == 'prev') {
      return this.options.currIndex;
    } else {
      return this.options.totalSlides - this.options.currIndex - this.options.count;
    }

  },

  _slideValue: function(count, direction) {
    var slides = this.options.slides.find('.photo-gallery__slide'),
        slideWidth = 0,
        start = 0,
        len = 0;

    if (direction == 'next') {
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

    if (direction == 'next') {
      return "-=" + slideWidth;
    } else {
      return "+=" + slideWidth;
    }
  },

  _getSupportedTransform: function() {
    var prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' ');
    var div = document.createElement('div');
    for (var i = 0; i < prefixes.length; i++) {
        if (div && div.style[prefixes[i]] !== undefined) {
            return true;
        }
    }
    return false;
  },

  _toggleNextState: function() {
    var index = this.options.currIndex + this.options.count,
        left  = this._hasSlidesLeft('next'),
        element = this.element.find('.photo-gallery__next');

    if (left == false) {
      element.addClass('is-disabled');
    } else {
      element.removeClass('is-disabled');
    }
  },

  _togglePrevState: function() {
    var index = this.options.currIndex - 1,
        left  = this._hasSlidesLeft('prev'),
        element = this.element.find('.photo-gallery__prev');

    if (left == false) {
      element.addClass('is-disabled');
    } else {
      element.removeClass('is-disabled');
    }
  },

  _updateCurrIndex: function(count, direction) {
    if (direction == 'next') {
      this.options.currIndex += count;
    } else {
      this.options.currIndex -= count;
    }
  }
});