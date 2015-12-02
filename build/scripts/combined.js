function addCommas(e){e+="";for(var i=e.split("."),a=i[0],t=i.length>1?"."+i[1]:"",n=/(\d+)(\d{3})/;n.test(a);)a=a.replace(n,"$1,$2");return a+t}function camelize(e){return e.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,i){return 0===i?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,"")}var allLayers;require(["dojo/domReady!"],function(){allLayers=[{groupHeading:"ESRI dynamic map services",showGroupHeading:!1,includeInLayerList:!0,layers:{Wetlands:{url:"http://52.70.106.103/ArcGIS/rest/services/Wetlands/MapServer",options:{id:"wetlands",opacity:.75,visible:!0},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,zoomScale:144448,hasOpacitySlider:!0,includeLegend:!0,moreinfo:"http://www.fws.gov/wetlands/Data/Wetlands-Product-Summary.html",otherLayersToggled:["wetlandsStatus","wetlandsRaster"]}},"Wetlands Status":{url:"http://52.70.106.103/ArcGIS/rest/services/Wetlands_Status/MapServer",options:{id:"wetlandsStatus",layers:[1],visible:!0,maxScale:285e3,opacity:.6},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!1,includeLegend:!0,layerDefinitions:{0:"STATUS = 'Digital' OR STATUS = 'No_Data'"}}},"Wetlands Raster":{url:"http://52.70.106.103/arcgis/rest/services/Wetlands_Raster/ImageServer",options:{id:"wetlandsRaster",visible:!0,maxScale:285e3,opacity:.6},wimOptions:{type:"layer",layerType:"agisImage",includeInLayerList:!1,includeLegend:!0}},Riparian:{url:"http://52.70.106.103/ArcGIS/rest/services/Riparian/MapServer",visibleLayers:[0],options:{id:"riparian",opacity:.75,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,zoomScale:144448,hasOpacitySlider:!0,moreinfo:"http://www.fws.gov/wetlands/Other/Riparian-Product-Summary.html",includeLegend:!0}},"Riparian Mapping Areas":{url:"http://52.70.106.103/ArcGIS/rest/services/Riparian/MapServer",visibleLayers:[1],options:{id:"riparianStatus",visible:!1,opacity:.6},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,hasOpacitySlider:!0,includeLegend:!0}}}},{groupHeading:"Data Source Group",showGroupHeading:!1,includeInLayerList:!0,layers:{"Source Type":{url:"http://52.70.106.103/arcgis/rest/services/Data_Source/MapServer",visibleLayers:[1],options:{id:"sourceType",opacity:.6,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,exclusiveGroupName:"Data Source",includeLegend:!0}},"Image Scale":{url:"http://52.70.106.103/arcgis/rest/services/Data_Source/MapServer",visibleLayers:[2],options:{id:"imageScale",opacity:.6,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,exclusiveGroupName:"Data Source",includeLegend:!0}},"Image Year":{url:"http://52.70.106.103/arcgis/rest/services/Data_Source/MapServer",visibleLayers:[3],options:{id:"imageYear",opacity:.6,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,exclusiveGroupName:"Data Source",includeLegend:!0}}}},{groupHeading:"refuges and historic",showGroupHeading:!1,includeInLayerList:!0,layers:{"FWS Refuges":{url:"http://gis.fws.gov/ArcGIS/rest/services/FWS_Refuge_Boundaries/MapServer",visibleLayers:[0,1,3],options:{id:"fwsRefuges",opacity:.75,visible:!1},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,zoomScale:144448,hasOpacitySlider:!0,moreinfo:"http://www.fws.gov/gis/data/CadastralDB/FwsInterest.html",includeLegend:!0}},"Historic Wetland Data":{url:"http://52.70.106.103/ArcGIS/rest/services/Historic_Wetlands/MapServer",visibleLayers:[0,1],options:{id:"historic",visible:!1,opacity:.6},wimOptions:{type:"layer",layerType:"agisDynamic",includeInLayerList:!0,hasOpacitySlider:!0,moreinfo:"http://www.fws.gov/wetlands/Data/Historic-Wetlands-Product-Summary.html",includeLegend:!0}}}}]});var map,allLayers,maxLegendHeight,maxLegendDivHeight,printCount=0,legendLayers=[],identifyTask,identifyParams;require(["maptiks/map","esri/arcgis/utils","esri/config","esri/dijit/Geocoder","esri/dijit/HomeButton","esri/dijit/Legend","esri/dijit/LocateButton","esri/dijit/Measurement","esri/dijit/PopupTemplate","esri/graphic","esri/geometry/Extent","esri/geometry/Multipoint","esri/geometry/Point","esri/layers/ArcGISTiledMapServiceLayer","esri/SpatialReference","esri/symbols/PictureMarkerSymbol","esri/tasks/GeometryService","esri/tasks/IdentifyParameters","esri/tasks/IdentifyTask","esri/tasks/LegendLayer","esri/tasks/PrintTask","esri/tasks/PrintParameters","esri/tasks/PrintTemplate","esri/geometry/webMercatorUtils","esri/urlUtils","dojo/dom","dojo/dom-class","dojo/dnd/Moveable","dojo/query","dojo/on","dojo/domReady!"],function(e,i,a,t,n,s,o,r,l,p,c,d,y,m,u,g,f,h,b,v,w,L,S,T,x,I,k,O,D,P){function C(){$("#printModal").modal("show")}function M(){1===I.byId("chkExtent").checked?Y.activeGeocoder.searchExtent=map.extent:Y.activeGeocoder.searchExtent=null}function W(){M();var e=Y.find();e.then(function(e){G(e)}),$("#geosearchModal").modal("hide")}function E(e){R();var i=e.graphic?e.graphic:e.result.feature;i.setSymbol(V)}function G(e){if(e=e.results,e.length>0){R();for(var i=0;i<e.length;i++);var a=new y(e[0].feature.geometry);map.centerAndZoom(a,17)}}function R(){map.infoWindow.hide(),map.graphics.clear()}function H(e,i,a,t,n){return new g({angle:0,xoffset:i,yoffset:a,type:"esriPMS",url:e,contentType:"image/png",width:t,height:n})}function N(){function e(e){printCount++;var i=$("<p><label>"+printCount+': </label>&nbsp;&nbsp;<a href="'+e.url+'" target="_blank">'+o+" </a></p>");$("#printJobsDiv").find("p.toRemove").remove(),$("#printModalBody").append(i),$("#printTitle").val(""),$("#printExecuteButton").button("reset")}function i(e){alert("Sorry, an unclear print error occurred. Please try refreshing the application to fix the problem")}var a=new L;a.map=map;var t=new S;t.exportOptions={width:500,height:400,dpi:300},t.format="PDF",t.layout="Letter ANSI A Landscape",t.preserveScale=!1;var n=new v;n.layerId="Wetlands";var s=$("#printTitle").val();""==s?t.layoutOptions={titleText:"Wetlands",authorText:"National Wetlands Inventory (NWI)",copyrightText:"This page was produced by the NWI mapper"}:t.layoutOptions={titleText:s,authorText:"National Wetlands Inventory (NWI)",copyrightText:"This page was produced by the NWI mapper"};var o=t.layoutOptions.titleText;a.template=t;var r=new w("http://52.70.106.103/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task");r.execute(a,e,i)}function j(e,i){var a;document.getElementById&&(a=document.getElementById(e))&&a.style&&(a.style.cursor=i)}esri.config.defaults.io.proxyUrl="http://52.70.106.103/serviceProxy/proxy.ashx",a.defaults.geometryService=new f("http://52.70.106.103/arcgis/rest/services/Utilities/Geometry/GeometryServer"),map=new e("mapDiv",{basemap:"hybrid",maptiks_trackcode:"e8643190-34de-4f1f-8c49-6692f1223666",maptiks_id:"fwsmobile",extent:new c(-14638882.654811008,2641706.3772205533,-6821514.898031538,6403631.161302788,new u({wkid:3857}))});var A=new n({map:map},"homeButton");A.startup();var z=new o({map:map,scale:4514},"locateButton");z.startup();var F=new r({map:map,advancedLocationUnits:!0},I.byId("measurementDiv"));F.startup();var q=$('<tr class="esriMeasurementTableRow" id="utmCoords"><td><span>UTM17</span></td><td class="esriMeasurementTableCell"> <span id="utmX" dir="ltr">UTM X</span></td> <td class="esriMeasurementTableCell"> <span id="utmY" dir="ltr">UTM Y</span></td></tr>');$(".esriMeasurementResultTable").append(q),$(window).resize(function(){$("#legendCollapse").hasClass("in")?(maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("height",maxLegendHeight),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=$("#legendElement").height()-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight)):$("#legendElement").css("height","initial")}),$("#printNavButton").click(function(){C()}),$("#printExecuteButton").click(function(){$(this).button("loading"),N()}),$("#printTitle").keyup(function(e){13==e.which&&N()}),P(map,"load",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e);var i=T.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(i.y.toFixed(3)),$("#longitude").html(i.x.toFixed(3))}),P(map,"zoom-end",function(){var e=map.getScale().toFixed(0);$("#scale")[0].innerHTML=addCommas(e)}),P(map,"mouse-move",function(e){if($("#mapCenterLabel").css("display","none"),null!=e.mapPoint){var i=T.webMercatorToGeographic(e.mapPoint);$("#latitude").html(i.y.toFixed(3)),$("#longitude").html(i.x.toFixed(3))}}),P(map,"pan-end",function(){$("#mapCenterLabel").css("display","inline");var e=T.webMercatorToGeographic(map.extent.getCenter());$("#latitude").html(e.y.toFixed(3)),$("#longitude").html(e.x.toFixed(3))});var B=new m("http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer");P(I.byId("btnStreets"),"click",function(){map.setBasemap("streets"),map.removeLayer(B)}),P(I.byId("btnSatellite"),"click",function(){map.setBasemap("satellite"),map.removeLayer(B)}),P(I.byId("btnHybrid"),"click",function(){map.setBasemap("hybrid"),map.removeLayer(B)}),P(I.byId("btnTerrain"),"click",function(){map.setBasemap("terrain"),map.removeLayer(B)}),P(I.byId("btnGray"),"click",function(){map.setBasemap("gray"),map.removeLayer(B)}),P(I.byId("btnNatGeo"),"click",function(){map.setBasemap("national-geographic"),map.removeLayer(B)}),P(I.byId("btnOSM"),"click",function(){map.setBasemap("osm"),map.removeLayer(B)}),P(I.byId("btnTopo"),"click",function(){map.setBasemap("topo"),map.removeLayer(B)}),P(I.byId("btnNatlMap"),"click",function(){map.addLayer(B,1)}),identifyParams=new h,identifyParams.tolerance=0,identifyParams.returnGeometry=!0,identifyParams.layerOption=h.LAYER_OPTION_ALL,identifyParams.width=map.width,identifyParams.height=map.height,identifyTask=new b(allLayers[0].layers.Wetlands.url);var _=D(".title",map.infoWindow.domNode)[0],U=new O(map.infoWindow.domNode,{handle:_});P(U,"FirstMove",function(){var e=D(".outerPointer",map.infoWindow.domNode)[0];k.add(e,"hidden");var e=D(".pointer",map.infoWindow.domNode)[0];k.add(e,"hidden")}.bind(this)),P(map,"click",function(e){if(map.graphics.clear(),identifyParams.geometry=e.mapPoint,identifyParams.mapExtent=map.extent,map.getLevel()>=12){identifyTask=new b(allLayers[0].layers.Wetlands.url);var i=identifyTask.execute(identifyParams);j("mainDiv","wait"),map.setCursor("wait"),i.addCallback(function(i){if(i.length>1){for(var a,t,n,s=0;s<i.length;s++)0==i[s].layerId?(a=i[s].feature,t=a.attributes):1==i[s].layerId&&(n=i[s].feature.attributes);var o=new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new dojo.Color([255,255,0]),2),new dojo.Color([98,194,204,0]));a.geometry.spatialReference=map.spatialReference;var r=a;r.setSymbol(o),map.graphics.add(r);var l="";l="None"==n.SUPPMAPINFO?" NONE":" <a target='_blank' href='"+n.SUPPMAPINFO+"'>click here</a>";var p=new esri.InfoTemplate("Wetland","<b>Classification:</b> "+t.ATTRIBUTE+" (<a target='_blank' href='http://52.70.106.103/decoders/wetlands.aspx?CodeURL="+t.ATTRIBUTE+"''>decode</a>)<br/><p><b>Wetland Type:</b> "+t.WETLAND_TYPE+"<br/><b>Acres:</b> "+Number(t.ACRES).toFixed(2)+"<br/><b>Image Date(s):</b> "+n.IMAGE_DATE+"<br/><b>Project Metadata:</b>"+l+"<br/><p><a id='infoWindowLink' href='javascript:void(0)'>Zoom to wetland</a></p>");a.setInfoTemplate(p),map.infoWindow.setFeatures([a]),map.infoWindow.show(e.mapPoint,map.getInfoWindowAnchor(e.screenPoint));var c=dojo.connect(map.infoWindow,"onHide",function(e){map.graphics.clear(),dojo.disconnect(map.infoWindow,c)});j("mainDiv","default"),map.setCursor("default"),$("#infoWindowLink").click(function(e){var i=T.webMercatorToGeographic(a.geometry),t=i.getExtent();map.setExtent(t,!0)})}else if(i.length<=1){identifyTask=new b(allLayers[0].layers.Riparian.url);var d=identifyTask.execute(identifyParams);d.addCallback(function(i){if(i.length>1){for(var a,t,n,s=0;s<i.length;s++)0==i[s].layerId?(a=i[s].feature,t=a.attributes):1==i[s].layerId&&(n=i[s].feature.attributes);var o=new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new dojo.Color([255,255,0]),2),new dojo.Color([98,194,204,0]));a.geometry.spatialReference=map.spatialReference;var r=a;r.setSymbol(o),map.graphics.add(r);var l="";l="None"==n.SUPPMAPINFO?" NONE":" <a target='_blank' href='"+n.SUPPMAPINFO+"'>click here</a>";var p=new esri.InfoTemplate("Riparian","<b>Classification:</b> "+t.ATTRIBUTE+" (<a target='_blank' href='http://52.70.106.103/decoders/wetlands.aspx?CodeURL="+t.ATTRIBUTE+"''>decode</a>)<br/><p><b>Wetland Type:</b> "+t.WETLAND_TYPE+"<br/><b>Acres:</b> "+Number(t.ACRES).toFixed(2)+"<br/><b>Image Date(s):</b> "+n.IMAGE_DATE+"<br/><b>Project Metadata:</b>"+l+"<br/><p><a id='infoWindowLink' href='javascript:void(0)'>Zoom to wetland</a></p>");a.setInfoTemplate(p),map.infoWindow.setFeatures([a]),map.infoWindow.show(e.mapPoint);var c=dojo.connect(map.infoWindow,"onHide",function(e){map.graphics.clear(),dojo.disconnect(map.infoWindow,c)});j("mainDiv","default"),map.setCursor("default"),$("#infoWindowLink").click(function(e){var i=T.webMercatorToGeographic(a.geometry),t=i.getExtent();map.setExtent(t,!0)})}else j("mainDiv","default"),map.setCursor("default"),map.infoWindow.hide()})}})}});var Y=new t({value:"",maxLocations:25,autoComplete:!0,arcgisGeocoder:!0,autoNavigate:!1,map:map},"geosearch");Y.startup(),Y.on("select",E),Y.on("findResults",G),Y.on("clear",R),P(Y.inputNode,"keydown",function(e){13==e.keyCode&&M()});var V=H("../images/purple-pin.png",0,12,13,24);map.on("load",function(){map.infoWindow.set("highlight",!1),map.infoWindow.set("titleInBody",!1)}),P(I.byId("btnGeosearch"),"click",W),$(document).ready(function(){function e(){$("#geosearchModal").modal("show")}$("#geosearchNav").click(function(){e()}),$("#html").niceScroll(),$("#sidebar").niceScroll(),$("#sidebar").scroll(function(){$("#sidebar").getNiceScroll().resize()}),maxLegendHeight=.9*$("#mapDiv").height(),$("#legendElement").css("max-height",maxLegendHeight),maxLegendDivHeight=maxLegendHeight-parseInt($("#legendHeading").css("height").replace("px","")),$("#legendDiv").css("max-height",maxLegendDivHeight),$("#legendCollapse").on("shown.bs.collapse",function(){if(0==legendDiv.innerHTML.length){var e=new s({map:map,layerInfos:legendLayers},"legendDiv");e.startup(),$("#legendDiv").niceScroll()}}),$("#legendCollapse").on("hide.bs.collapse",function(){$("#legendElement").css("height","initial")}),$("#measurementCollapse").on("shown.bs.collapse",function(){$("#measureLabel").show()}),$("#measurementCollapse").on("hide.bs.collapse",function(){window.innerWidth<=767&&$("#measureLabel").hide()})}),require(["esri/tasks/locator","esri/tasks/query","esri/tasks/QueryTask","esri/graphicsUtils","esri/geometry/Point","esri/geometry/Extent","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/ArcGISImageServiceLayer","esri/layers/FeatureLayer","esri/layers/WMSLayer","esri/layers/WMSLayerInfo","dijit/form/CheckBox","dijit/form/RadioButton","dojo/query","dojo/dom","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/on"],function(e,i,a,t,n,s,o,r,l,p,c,d,y,m,g,f,h,b,v){function w(e,i,a,t,n,s,o){if(map.addLayer(a),L.push([n,camelize(t),a]),n){if(!$("#"+camelize(n)).length){var r=$('<div id="'+camelize(n+" Root")+'" class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+n+"</button> </div>");r.click(function(e){r.find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$.each(L,function(e,i){var a=map.getLayer(i[2].id);if(i[0]==n)if($("#"+i[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&r.find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",i[1]),map.addLayer(i[2]);var a=map.getLayer(i[2].id);a.setVisibility(!0)}else if(r.find("i.glyphspan").hasClass("fa-square-o")){console.log("removing layer: ",i[1]);var a=map.getLayer(i[2].id);a.setVisibility(!1)}})});var l=$('<div id="'+camelize(n)+'" class="btn-group-vertical" data-toggle="buttons"></div');$("#toggle").append(l)}if(a.visible)var p=$('<div id="'+camelize(t)+'" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(n)+'" autocomplete="off"><i class="glyphspan fa fa-dot-circle-o '+camelize(n)+'"></i>&nbsp;&nbsp;'+t+"</label> </div>");else var p=$('<div id="'+camelize(t)+'" class="btn-group-vertical lyrTog radioTog" style="cursor: pointer;" data-toggle="buttons"> <label class="btn btn-default"  style="font-weight: bold;text-align: left"> <input type="radio" name="'+camelize(n)+'" autocomplete="off"><i class="glyphspan fa fa-circle-o '+camelize(n)+'"></i>&nbsp;&nbsp;'+t+"</label> </div>");$("#"+camelize(n)).append(p),p.click(function(e){if($(this).find("i.glyphspan").hasClass("fa-circle-o")){$(this).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o");var i=$(this)[0].id;$.each(L,function(e,a){if(a[0]==n)if(a[1]==i&&$("#"+camelize(n+" Root")).find("i.glyphspan").hasClass("fa-check-square-o")){console.log("adding layer: ",a[1]),map.addLayer(a[2]);var t=map.getLayer(a[2].id);t.setVisibility(!0)}else if(a[1]==i&&$("#"+camelize(n+" Root")).find("i.glyphspan").hasClass("fa-square-o"))console.log("group heading not checked");else{console.log("removing layer: ",a[1]);var t=map.getLayer(a[2].id);t.setVisibility(!1),$("#"+a[1]).find("i.glyphspan").hasClass("fa-dot-circle-o")&&$("#"+a[1]).find("i.glyphspan").toggleClass("fa-dot-circle-o fa-circle-o")}})}})}else if(o.includeInLayerList){if(a.visible&&void 0!==o.hasOpacitySlider&&1==o.hasOpacitySlider&&void 0!==o.moreinfo&&o.moreinfo)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+t+'<span id="info'+camelize(t)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"><span id="opacity'+camelize(t)+'" style="padding-left: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');else if(!a.visible&&void 0!==o.hasOpacitySlider&&1==o.hasOpacitySlider&&void 0!==o.moreinfo&&o.moreinfo)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+t+'<span id="info'+camelize(t)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"><span id="opacity'+camelize(t)+'" style="padding-left: 5px" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');else if(a.visible&&void 0!==o.hasOpacitySlider&&1==o.hasOpacitySlider)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+t+'<span id="info'+camelize(t)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');else if(a.visible||void 0===o.hasOpacitySlider||1!=o.hasOpacitySlider)if(a.visible&&void 0!==o.moreinfo&&o.moreinfo)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+t+'<span id="opacity'+camelize(t)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');else if(!a.visible&&void 0!==o.moreinfo&&o.moreinfo)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+t+'<span id="info'+camelize(t)+'" title="more info" class="glyphspan glyphicon glyphicon-question-sign pull-right"></button></span></div>');else if(a.visible)var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-check-square-o"></i>&nbsp;&nbsp;'+t+"</button></span></div>");else var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+t+"</button> </div>");else var p=$('<div class="btn-group-vertical lyrTog" style="cursor: pointer;" data-toggle="buttons"> <button type="button" class="btn btn-default active" aria-pressed="true" style="font-weight: bold;text-align: left"><i class="glyphspan fa fa-square-o"></i>&nbsp;&nbsp;'+t+'<span id="opacity'+camelize(t)+'" class="glyphspan glyphicon glyphicon-adjust pull-right"></button></span></div>');p.click(function(e){$(this).find("i.glyphspan").toggleClass("fa-check-square-o fa-square-o"),$(this).find("button").button("toggle"),a.visible?a.setVisibility(!1):a.setVisibility(!0),o.otherLayersToggled&&$.each(o.otherLayersToggled,function(e,i){var t=map.getLayer(i);t.setVisibility(a.visible)})})}if(void 0!==i){var c=camelize(e);if(!$("#"+c).length){if(i)var d=$('<div id="'+c+'"><div class="alert alert-info" role="alert"><strong>'+e+"</strong></div></div>");else var d=$('<div id="'+c+'"></div>');$("#toggle").append(d)}if(n)$("#"+c).append(r),$("#"+c).append(l);else{if($("#"+c).append(p),void 0!==o.moreinfo&&o.moreinfo){var y="#info"+camelize(t),m=$(y);m.click(function(e){window.open(o.moreinfo,"_blank"),e.preventDefault(),e.stopPropagation()})}$("#opacity"+camelize(t)).length>0&&$("#opacity"+camelize(t)).hover(function(){$(".opacitySlider").remove();var e=map.getLayer(s.id).opacity,i=$('<div class="opacitySlider"><label id="opacityValue">Opacity: '+e+'</label><label class="opacityClose pull-right">X</label><input id="slider" type="range"></div>');$("body").append(i),$("#slider")[0].value=100*e,$(".opacitySlider").css("left",event.clientX-180),$(".opacitySlider").css("top",event.clientY-50),$(".opacitySlider").mouseleave(function(){$(".opacitySlider").remove()}),$(".opacityClose").click(function(){$(".opacitySlider").remove()}),$("#slider").change(function(e){var i=$("#slider")[0].value/100;console.log("o: "+i),$("#opacityValue").html("Opacity: "+i),map.getLayer(s.id).setOpacity(i),o.otherLayersToggled&&$.each(o.otherLayersToggled,function(e,a){var t=map.getLayer(a);t.setOpacity(i)})})})}}else if($("#toggle").append(p),void 0!==o.moreinfo&&o.moreinfo){var y="#info"+camelize(t),m=$(y);m.click(function(e){alert(e.currentTarget.id),e.preventDefault(),e.stopPropagation()})}}var L=[];$.each(allLayers,function(e,i){console.log("processing: ",i.groupHeading),$.each(i.layers,function(e,a){var t="";if(a.wimOptions.exclusiveGroupName&&(t=a.wimOptions.exclusiveGroupName),"agisFeature"===a.wimOptions.layerType){var n=new l(a.url,a.options);a.wimOptions&&1==a.wimOptions.includeLegend&&legendLayers.unshift({layer:n,title:e}),w(i.groupHeading,i.showGroupHeading,n,e,t,a.options,a.wimOptions)}else if("agisWMS"===a.wimOptions.layerType){var n=new p(a.url,{resourceInfo:a.options.resourceInfo,visibleLayers:a.options.visibleLayers},a.options);a.wimOptions&&1==a.wimOptions.includeLegend&&legendLayers.unshift({layer:n,title:e}),w(i.groupHeading,i.showGroupHeading,n,e,t,a.options,a.wimOptions)}else if("agisDynamic"===a.wimOptions.layerType){var n=new o(a.url,a.options);if(a.visibleLayers&&n.setVisibleLayers(a.visibleLayers),a.wimOptions&&a.wimOptions.layerDefinitions){var s=[];$.each(a.wimOptions.layerDefinitions,function(e,i){s[e]=i}),n.setLayerDefinitions(s)}a.wimOptions&&1==a.wimOptions.includeLegend&&legendLayers.unshift({layer:n,title:e}),w(i.groupHeading,i.showGroupHeading,n,e,t,a.options,a.wimOptions)}else if("agisImage"===a.wimOptions.layerType){var n=new r(a.url,a.options);a.wimOptions&&1==a.wimOptions.includeLegend&&legendLayers.unshift({layer:n,title:e}),a.visibleLayers&&n.setVisibleLayers(a.visibleLayers),w(i.groupHeading,i.showGroupHeading,n,e,t,a.options,a.wimOptions)}})});var S=new u(26917);F.on("measure-end",function(e){var i,a=e.geometry,t=-1*e.geometry.x;84>t&&t>78?geomService.project([a],S,function(e){i=e[0],console.log(i);var a=i.x.toFixed(0),t=i.y.toFixed(0);$("#utmX").html(a),$("#utmY").html(t)}):($("#utmX").html('<span class="label label-danger">outside zone</span>'),$("#utmY").html('<span class="label label-danger">outside zone</span>'))})})}),$(document).ready(function(){});