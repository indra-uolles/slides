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
    var needed = this._neededNextCount();
    if (needed !== 0) {
      this._appendNeededNext(needed);
    }

    var value = this._slideValue($content, true);
    $($content.closest('.photo-gallery__content'))
      .animate({ scrollLeft: value }, 1000);

    this._updateNextIndex();
  },

  _slidePrev: function() {
    var $content = this.options.content;
    var needed = this._neededPrevCount();
    if (needed !== 0) {
      this._appendNeededPrev(needed);
    }

    var value = this._slideValue($content, false);
    $($content.closest('.photo-gallery__content'))
      .animate({ scrollLeft: value }, 1000);

    this._updatePrevIndex();
  },

  _appendNeededNext: function(needed) {
    this.options.content.append(this.options.initial.clone());
  },

  _appendNeededPrev: function(needed) {
    this.options.content.prepend(this.options.initial.clone());
  },

  _updatePrevIndex: function() {

  },

  _updateNextIndex: function() {

  },

  _neededNextCount: function() {
    var given = this.options.initial.length;
    var left = given - (this.options.nextIndex + this.options.count);
    if (left - this.options.count >= 0) {
      return 0;
    } else {
      return this.options.count - left;
    }
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
    var $slide = $(element.find('.photo-gallery__slide')[0]);
    var slideWidth = $slide.outerWidth(true)*3;
    if (next == true) {
      return "+=" + slideWidth + "px";
    } else {
      return "-=" + slideWidth + "px";
    }
  }
});