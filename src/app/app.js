/**
 * Add all your dependencies here.
 *
 * @require widgets/Viewer.js
 * @require widgets/WMSLayerPanel.js
 * @require plugins/LayerManager.js
 * @require plugins/OLSource.js
 * @require plugins/OSMSource.js
 * @require plugins/WMSCSource.js
 * @require plugins/ZoomToExtent.js
 * @require plugins/NavigationHistory.js
 * @require plugins/Zoom.js
 * @require plugins/AddLayers.js
 * @require plugins/RemoveLayer.js
 * @require plugins/Playback.js
 * @require plugins/LayerProperties.js
 * @require plugins/WMSRasterStylesDialog.js
 * @require RowExpander.js
 * @require TimeManagerOverride.js
 * @require OpenLayers/TimeAgent/WMS.js
 */

Ext.onReady(function() {
    app = new gxp.Viewer({
        proxy: "/proxy/?url=",
        portalConfig: {
            layout: "border",
            region: "center",
            items: [{
                id: "centerpanel",
                xtype: "panel",
                layout: "fit",
                region: "center",
                border: !1,
                items: ["mymap"]
            }, {
                id: "westpanel",
                xtype: "container",
                layout: "fit",
                region: "west",
                width: 200
            }],
            bbar: {
                id: "mybbar"
            }
        },
        tools: [{
            ptype: "gxp_layermanager",
            outputConfig: {
                id: "lyrmanager",
                border: !0,
                tbar: []
            },
            outputTarget: "westpanel"
        }, {
            ptype: "gxp_addlayers",
            actionTarget: "lyrmanager.tbar"
        }, {
            ptype: "gxp_removelayer",
            actionTarget: ["lyrmanager.tbar", "lyrmanager.contextMenu"]
        }, {
            ptype: "gxp_zoomtoextent",
            actionTarget: "lyrmanager.contextMenu"
        }, {
            ptype: "gxp_navigationhistory",
            actionTarget: "lyrmanager.tbar"
        }, {
            ptype: "gxp_layerproperties",
            actionTarget: "lyrmanager.contextMenu",
            layerPanelConfig: {
                gxp_wmslayerpanel: {
                    rasterStyling: !0
                }
            }
        }, {
            ptype: "gxp_playback"
        }],
        sources: {
            osm: {
                ptype: "gxp_osmsource"
            },
            wavewatch: {
                ptype: "gxp_wmssource",
                url: "http://oos.soest.hawaii.edu/thredds/wms/hioos/model/wav/ww3/WaveWatch_III_Global_Wave_Model_best.ncd",
                version: "1.3.0"
            }
        },
        map: {
            id: "mymap",
            title: "Map",
            projection: "EPSG:3857",
            center: [-1.0764594758211E7, 4523072.3184791],
            zoom: 3,
            layers: [{
                source: "osm",
                name: "mapnik",
                group: "background"
            }, {
                source: "wavewatch",
                name: "Thgt",
                selected: !0
            }],
            items: [{
                xtype: "gx_zoomslider",
                vertical: !0,
                height: 100
            }]
        }
    });
});
