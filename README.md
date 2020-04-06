# NgWishlist

[DEMO](http://ng-wishlist.irustam.ru/)

Обычный wishlist/todo на Angular.

Для визуальной части использовал [ngBootstrap](https://ng-bootstrap.github.io/#/home). 

**Backend:** `PHP`, `MySQL`.

БД состоит из таблиц `category` - где хрянятся название категории и завершеность.  
И `items` - название элемента, описание, ссылка, id категории, цена и завершеность.

БД одна для `Angular` и аналога на `VUE`.

На основе этих данных выстраивается список.  
Категории сортируются по завершенности (завершенные внизу).  
Элементы по цене - от большей к меньшей.

Категории как и элементы добавляются через форму. Удаляются через кнопку.