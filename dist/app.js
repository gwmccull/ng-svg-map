'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

angular.module('app', ['uiGmapgoogle-maps']).config(['uiGmapGoogleMapApiProvider', function (uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        // api_key is a global loaded from an external file
        key: api_key,
        v: '3.20',
        libraries: 'weather,geometry,visualization'
    });
}]).directive('app', function () {
    return {
        restrict: 'E',
        replace: true,
        controller: MapController,
        controllerAs: 'vm',
        template: '\n                <div>\n                    <ui-gmap-google-map center=\'vm.map.center\' zoom=\'vm.map.zoom\'>\n                        <ui-gmap-markers\n                                models=\'vm.markers\'\n                                idKey="\'id\'"\n                                type="\'spider\'"\n                                fit="true"\n                                coords="\'coords\'"\n                                options="\'mapOptions\'"\n                                >\n                        </ui-gmap-markers>\n                    </ui-gmap-google-map>\n                </div>\n            '
    };
});

var MapController = function MapController($http, uiGmapGoogleMapApi, $q) {
    _classCallCheck(this, MapController);

    var self = this;
    this.markers = [];
    this.map = {
        center: {
            latitude: 45,
            longitude: -73
        },
        zoom: 8
    };

    var promises = [uiGmapGoogleMapApi, $http.get('lib/map-pin.svg')];
    $q.all(promises).then(function (data) {
        self.setMarkers(data[1]);
    });

    this.setMarkers = function (svgString) {
        for (var ii = 1; ii <= 400; ii++) {
            var tempString = svgString.data;

            // randomize the icons color and opacity
            var rand1 = Math.round(Math.random() * 2);
            if (rand1 % 2) {
                tempString = tempString.split('fill:#0000ff').join('fill:#ff0000');
            }
            var rand2 = Math.round(Math.random() * 3);
            if (rand2 % 3) {
                tempString = tempString.split('fill-opacity:1').join('fill-opacity:.3');
            }

            self.markers.push({
                id: ii,
                coords: {
                    latitude: self.map.center.latitude + Math.random() * 2,
                    longitude: self.map.center.longitude + Math.random() * 2
                },
                mapOptions: {
                    icon: {
                        // replace the placeholder with the correct label and size/scale/anchor the marker
                        url: 'data:image/svg+xml,' + tempString.split('AAA').join(ii),
                        size: new google.maps.Size(21, 30),
                        scaledSize: new google.maps.Size(21, 30),
                        anchor: new google.maps.Point(10.5, 30)
                    },
                    zIndex: 1000
                }
            });
        }
    };
};

MapController.$inject = ['$http', 'uiGmapGoogleMapApi', '$q'];
//# sourceMappingURL=app.js.map