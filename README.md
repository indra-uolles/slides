# slides

Надо скроллить на ширину картинок в "окошке" галереи + отступы между ними.
Что делать, если, например, скроллим вперёд, а картинок не хватает?

Тогда надо склонировать дом-ноды картинок с самого начала. А если скроллим назад, то копировать дом-ноды исходных картинок с конца.

Значит, нужно к исходным картинкам добавить дата-атрибуты, типа data-initial-slide=true
будем jquery получать массив этих исходных картинок

будем хранить индекс i_next, начиная с которого нужно идти по этому массиву, если скроллишь вперёд, 
и индекс i_prev, начиная с которого нужно идти по этому массиву, если скроллишь назад.
