/**
 * Created by bdraper on 4/27/2015.
 */
var allLayers;

require([
    'dojo/domReady!'
], function(
) {

    allLayers = [
        {
            'groupHeading': 'ESRI dynamic map services',
            'showGroupHeading': false,
            'includeInLayerList': true,
            'layers': {
                'Wetlands' : {
                    'url': 'http://54.175.105.11:6080/ArcGIS/rest/services/Wetlands/MapServer',
                    'options': {
                        'id': 'wetlands',
                        'opacity': 0.75,
                        'visible': true
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': true,
                        'zoomScale': 144448,
                        'hasOpacitySlider': true,
                        'includeLegend' : true,
                        'moreinfo': 'http://www.fws.gov/wetlands/Data/Wetlands-Product-Summary.html',
                        'otherLayersToggled': ['wetlandsStatus', 'wetlandsRaster']
                    }
                },
                'Wetlands Status' : {
                    'url': 'http://54.175.105.11:6080/ArcGIS/rest/services/Wetlands_Status/MapServer',
                    'options': {
                        'id': 'wetlandsStatus',
                        'layers': [1],
                        'visible': true,
                        'maxScale': 285000,
                        'opacity': 0.6
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': false,
                        'includeLegend' : true,
                        'layerDefinitions': {0: "STATUS = 'Digital' OR STATUS = 'No_Data'"}
                    }
                },
                'Wetlands Raster' : {
                    'url': 'http://54.175.105.11:6080/arcgis/rest/services/Wetlands_Raster/ImageServer',
                    'options': {
                        'id': 'wetlandsRaster',
                        'visible': true,
                        'maxScale': 285000,
                        'opacity': 0.6
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisImage',
                        'includeInLayerList': false,
                        'includeLegend' : true
                    }
                },
                'Riparian' : {
                    'url': 'http://54.175.105.11:6080/ArcGIS/rest/services/Riparian/MapServer',
                    'visibleLayers': [0],
                    'options': {
                        'id': 'riparian',
                        'opacity': 0.75,
                        'visible': false
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': true,
                        'zoomScale': 144448,
                        'hasOpacitySlider': true,
                        'moreinfo': 'http://www.fws.gov/wetlands/Other/Riparian-Product-Summary.html',
                        'includeLegend' : true
                    }
                },
                'Riparian Mapping Areas' : {
                    'url': 'http://54.175.105.11:6080/ArcGIS/rest/services/Riparian/MapServer',
                    'visibleLayers': [1],
                    'options': {
                        'id': 'riparianStatus',
                        'visible': false,
                        'opacity': 0.6
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': true,
                        'hasOpacitySlider': true,
                        'includeLegend' : true
                    }
                }
            }
        },
        {
            'groupHeading': 'Data Source Group',
            'showGroupHeading': false,
            'includeInLayerList': true,
            'layers': {
                'Source Type':{
                    'url' : 'http://54.175.105.11:6080/arcgis/rest/services/Data_Source/MapServer',
                    'visibleLayers': [1],
                    'options':{
                        'id': 'sourceType',
                        'opacity': 0.6,
                        'visible': false
                    },
                    'wimOptions':{
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': true,
                        'exclusiveGroupName':'Data Source',
                        'includeLegend' : true
                    }
                },
                'Image Scale': {
                    'url' : 'http://54.175.105.11:6080/arcgis/rest/services/Data_Source/MapServer',
                    'visibleLayers': [2],
                    'options':{
                        'id': 'imageScale',
                        'opacity': 0.6,
                        'visible': false
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': true,
                        'exclusiveGroupName':'Data Source',
                        'includeLegend' : true
                    }
                },
                'Image Year': {
                    'url' : 'http://54.175.105.11:6080/arcgis/rest/services/Data_Source/MapServer',
                    'visibleLayers': [3],
                    'options':{
                        'id': 'imageYear',
                        'opacity': 0.6,
                        'visible': false
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': true,
                        'exclusiveGroupName':'Data Source',
                        'includeLegend' : true
                    }
                }
            }
        },
        {
            'groupHeading': 'refuges and historic',
            'showGroupHeading': false,
            'includeInLayerList': true,
            'layers': {
                'FWS Refuges' : {
                    'url': 'http://gis.fws.gov/ArcGIS/rest/services/FWS_Refuge_Boundaries/MapServer',
                    'visibleLayers': [0,1,3],
                    'options': {
                        'id': 'fwsRefuges',
                        'opacity': 0.75,
                        'visible': false
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': true,
                        'zoomScale': 144448,
                        'hasOpacitySlider': true,
                        'moreinfo': 'http://www.fws.gov/gis/data/CadastralDB/FwsInterest.html',
                        'includeLegend' : true
                    }
                },
                'Historic Wetland Data' : {
                    'url': 'http://54.175.105.11:6080/ArcGIS/rest/services/Historic_Wetlands/MapServer',
                    'visibleLayers': [0,1],
                    'options': {
                        'id': 'historic',
                        'visible': false,
                        'opacity': 0.6
                    },
                    'wimOptions': {
                        'type': 'layer',
                        'layerType': 'agisDynamic',
                        'includeInLayerList': true,
                        'hasOpacitySlider': true,
                        'moreinfo': 'http://www.fws.gov/wetlands/Data/Historic-Wetlands-Product-Summary.html',
                        'includeLegend' : true
                    }
                }
            }
        }
        
    ];

});