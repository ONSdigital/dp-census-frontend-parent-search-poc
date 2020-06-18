import Grid from '@material-ui/core/Grid'

// Start Openlayers imports
// @ts-ignore
import {
    Map,
    View
} from 'ol'
import {
    GeoJSON,
    XYZ
} from 'ol/format'
import {
    Tile as TileLayer,
    Vector as VectorLayer
} from 'ol/layer'
import {
    Vector as VectorSource,
    OSM as OSMSource,
    XYZ as XYZSource,
    TileWMS as TileWMSSource
} from 'ol/source'
import {
    Select as SelectInteraction,
    defaults as DefaultInteractions
} from 'ol/interaction'
import {
    Attribution,
    ScaleLine,
    ZoomSlider,
    Zoom,
    Rotate,
    MousePosition,
    OverviewMap,
    defaults as DefaultControls
} from 'ol/control'
import {
    Style,
    Fill as FillStyle,
    RegularShape as RegularShapeStyle,
    Stroke as StrokeStyle
} from 'ol/style'

import {
    Projection,
    get as getProjection
} from 'ol/proj'
import {defaults as defaultInteractions, DragRotateAndZoom, DragPan} from 'ol/interaction';
import Select from 'ol/interaction/Select';


// End Openlayers imports
import React from "react";

export interface OLMapFragmentProps {
}

export class OLMapFragment extends React.Component<OLMapFragmentProps, {}> {
    state = {
        height: "50%",
    };

    private select = new Select(); // ref to currently selected interaction
    private map;

    constructor(props: OLMapFragmentProps) {
        super(props);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.addInteractionToMap = this.addInteractionToMap.bind(this)
    }

    updateDimensions() {
        const h = window.innerWidth >= 992 ? window.innerHeight : 400;
        this.setState({height: h})
    }

    addInteractionToMap() {
        console.log("this.map");
        console.log(this.map);
        this.map.addInteraction(this.select);
        this.select.on('select', function (e) {
            console.log(e.target.getFeatures().getLength());
            console.log(e.selected);
            console.log(e);
        });
    }

    componentWillMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();
    }

    componentDidMount() {

        // Create an Openlayer Map instance with two tile layers
         this.map = new Map({
            //  Display the map in the div with the id of map
            target: 'map',
            interactions: defaultInteractions({onFocusOnly:true}).extend([
                //new DragRotateAndZoom(),
            ]),
            layers: [
                // new TileLayer({
                //     source: new XYZSource({
                //         url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                //         projection: 'EPSG:3857'
                //     })
                // }),
                new TileLayer({
                    source: new TileWMSSource({
                        url: 'https://ahocevar.com/geoserver/wms',
                        params: {'LAYERS': 'ne:ne', 'TILED': true},
                        serverType: 'geoserver',
                        crossOrigin: 'anonymous',
                        projection: 'EPSG:4326'
                    }),
                    name: 'USA'
                }),
            ],
            // Add in the following map controls
            controls: DefaultControls().extend([
                new ZoomSlider(),
                new MousePosition(),
                new ScaleLine(),
                new OverviewMap()
            ]),
            // Render the tile layers in a map view with a Mercator projection
            view: new View({
                projection: 'EPSG:3857',
                center: [-406052.603508, 7509144.994850],
                zoom: 6
            })
        });
        this.addInteractionToMap();

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions)
    }

    render() {
        const style = {
            width: '100%',
            height: this.state.height,
            backgroundColor: '#cccccc',
        };
        return (
            //<Grid container>
             //   <Grid item xs={12}>
                    <div id='map' style={style}>
                    </div>
               // </Grid>
        //    </Grid>
        )
    }
}