//$($('.photo-gallery')[0]).find("[data-initial-slide=true]")
// (function($) {
//   $.fn.myGallery.defaults = {
//     foreground: "red",
//     background: "yellow"
//   };
//   var methods = {
//     init: function(options) { 
//       return this.each(function(options){
         
//         var $this = $(this),
//           data = $this.data('gallery');
         
//         // Если плагин ещё не проинициализирован
//         if (!data) {
//           /*
//           * Тут выполняем инициализацию
//           */

//           $(this).data('gallery', {
//             target: $this
//           });
//           $(this).data('options', {
//             options: options;
//           });

//         }
//       });
//     },
//     showNext: function() {
//       //alert $(this).data;
//       console.log('ha');
//     },
//     showPrev: function( ) {
//     }
//   };
//   $.fn.myGallery = function(method, options) {
//     if (typeof(options) == 'undefined') {
//       options = {};
//     }
//     if (methods[method]) {
//       return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
//     } else if (typeof method === 'object' || !method) {
//       return methods.init.apply(this, arguments);
//     } else {
//       $.error('Метод с именем ' +  method + ' не существует для jQuery.myGallery');
//     }    
//   };
// })(jQuery);

$.widget("custom.mygallery", {
 
  options: {
    count: 1
  },

  showNext: function() {
    console.log(this.options.count);
  }
});