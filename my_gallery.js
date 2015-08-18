$.widget("custom.mygallery", {
 
  options: {
    count: 1
  },

  _create: function() {
    var initial = this.element.find('[data-initial-slide=true]');

    this.options = $.extend({
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
    $content.closest('.photo-gallery__slides')
      .transition({ x: value }, 1000);
  },

  _slidePrev: function() {
    var $content = this.options.content;
    var value = this._slideValue($content, false);
    $content.closest('.photo-gallery__slides')
      .transition({ x: value }, 1000);
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