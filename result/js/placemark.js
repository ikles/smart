jQuery(document).ready(function( $ ) {

    ymaps.ready(init);

    function init () {
        var myMap = new ymaps.Map("map", {
            center: [56.860851, 35.879979],        
            controls: ['zoomControl'],
            zoom: 17            
        }),

        // Создаем геообъект с типом геометрии "Точка".
        myGeoObject = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: [55.8, 37.8]
            },
            // Свойства.
            properties: {
                // Контент метки.
                iconContent: 'islands#darkGreenIcon',

                balloonContent: 'Меня можно перемещать'
            }
        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'twirl#redStretchyIcon',
            // Метку можно перемещать.
            draggable: true
        }),



        // Создаем метку с помощью вспомогательного класса.
        myPlacemark1 = new ymaps.Placemark([56.860851, 35.879979], {
            // Свойства.
            // Содержимое иконки, балуна и хинта.
            iconContent: '',
            balloonContent: 'ул. В. Бонч-Бруевича, д. 16 оф. 11',
            hintContent: 'ул. В. Бонч-Бруевича, д. 16 оф. 11'
        }, {
            // Опции.
            // Стандартная фиолетовая иконка.
            preset: 'twirl#buildingsIcon'
        });





       myPlacemark2 = new ymaps.Placemark([56.860851, 35.879979], {
            // Свойства.
            hintContent: 'ул. В. Бонч-Бруевича, д. 16 оф. 11',
            iconContentLayout: '<div class="icn"></div>',
            iconContent: '<div class="icn"></div>'
        }, {
            // Опции.
            // Своё изображение иконки метки.
            iconImageHref: 'img/geo-map.svg',
            // Размеры метки.
            iconImageSize: [40, 56],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-18, -64],        
            iconContentOffset: [11, 9] // позиция подписи
        });

       /* myPlacemark3 = new ymaps.Placemark([52.718857, 41.449453], {
            // Свойства.
            hintContent: '',
            iconContentLayout: '<div class="icn"></div>',
            iconContent: '<div class="icn">Детский сад</div>'            
        }, {
            // Опции.
            // Своё изображение иконки метки.
            iconImageHref: 'img/geo-map.svg',
            // Размеры метки.
            iconImageSize: [50, 70],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-3, -42],        
            iconContentOffset: [11, 9] // позиция подписи
        });*/


        var zoomControl = new ymaps.control.ZoomControl({
            options: {
                size: "small"
            }
        });



    // Добавляем все метки на карту.
    myMap.controls.add(zoomControl);
    myMap.geoObjects
    .add(myPlacemark2)        
    .add(myGeoObject);
}

}); //ready