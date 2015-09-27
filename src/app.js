angular.module('app', ['uiGmapgoogle-maps'])
    .config(['uiGmapGoogleMapApiProvider', function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            // api_key is a global loaded from an external file
            key: api_key,
            v: '3.20',
            libraries: 'weather,geometry,visualization'
        });
    }])
    .directive('app', ()=> {
        return {
            restrict: 'E',
            replace: true,
            controller: MapController,
            controllerAs: 'vm',
            template: `
                <div>
                    <ui-gmap-google-map center='vm.map.center' zoom='vm.map.zoom'>
                        <ui-gmap-markers
                                models='vm.markers'
                                idKey="'id'"
                                type="'spider'"
                                fit="true"
                                coords="'coords'"
                                options="'mapOptions'"
                                >
                        </ui-gmap-markers>
                    </ui-gmap-google-map>
                </div>
            `
        };
    })
;

class MapController {
    constructor($http, uiGmapGoogleMapApi, $q) {
        var self = this;
        this.markers = [];
        this.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8
        };

        var promises = [
            uiGmapGoogleMapApi,
            $http.get('lib/map-pin.svg')
        ];
        $q.all(promises).then(function(data) {
            self.setMarkers(data[1]);
        });

        this.setMarkers = function(svgString) {
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
                        latitude: self.map.center.latitude + (Math.random() * 2),
                        longitude: self.map.center.longitude + (Math.random() * 2)
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
        }
    }
}

MapController.$inject = ['$http', 'uiGmapGoogleMapApi', '$q'];
