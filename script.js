mapboxgl.accessToken = 'pk.eyJ1IjoidGlhZ29tYnAiLCJhIjoiY2thdjJmajYzMHR1YzJ5b2huM2pscjdreCJ9.oT7nAiasQnIMjhUB-VFvmw';

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/tiagombp/cl4of2ys7006w14l570a9vz88', // style URL
  center: [-38.699, -5.305], // starting position [lng, lat]
  zoom: 6 // starting zoom
});

map.on('load', () => {

  map.addSource('municipios', {
    type : 'vector',
    url : 'mapbox://tiagombp.a607oyly'
  });

  map.addLayer({
    'id': 'municipios-ce',
    'source': 'municipios',
    'source-layer': 'mun_ce-adbvfq',
    'type': 'fill',
    'paint': {
      'fill-color': 'transparent',
      'fill-outline-color': 'gold'
    }
  });

  map.addLayer({
    'id': 'mun-destacado',
    'type': 'fill',
    'source': 'municipios',
    'source-layer': 'mun_ce-adbvfq',
    'paint': {
        'fill-opacity' : .5,
        'fill-outline-color' : '#d7a565',
        'fill-color' : 'hotpink'
    },
    'filter': ['==', 'name_muni', ''] 
  });

})

function pegaMun(nome) {

  return map.querySourceFeatures('municipios', {

    sourceLayer: 'mun_ce-adbvfq',
    filter: ['==', ['get', 'name_muni'], nome]
    
  })[0];

}

function criaMascara(nome) {

  let mun = turf.mask(pegaMun(nome))

  map.addSource('city-mask', {
    'type': 'geojson',
    'data': mun
  });

  map.addLayer({
    'id': 'city-mask',
    'type': 'fill',
    'source': 'city-mask',
    'paint': {
        'fill-color': 'black',
        'fill-opacity': 0.55,
        'fill-outline-color': 'transparent'
    }
  },
  'mun-destacado');

}
/*
function geraBbox(feature) {

  return [

    [
      feature.properties.xmin, 
      feature.properties.ymin
    ], 

    [
      feature.properties.xmax, 
      feature.properties.ymax
    ]

  ]

}
*/

function geraBbox(nome) {

  let mun = pegaMun(nome);
  let bbox = turf.bbox(mun.geometry);
  
  return bbox;

}

function pegaCentro(nome) {

  let mun = pegaMun(nome);
  let center = turf.center(mun.geometry).geometry.coordinates;

  return center;

}

function destacaCidade(nome) {

  map.setFilter(

    'mun-destacado', [
      '==', 
      ['get', 'name_muni'], 
      nome
    ]
  );

}

function voaParaCidade(nome) {

  let centro = pegaCentro(nome);
  
  map.flyTo({

    center: centro,
    zoom: 9,
    speed: 0.2,
    pitch: 45,
    bearing: 30    
  
  });

}

function ajustaCidade(nome) {

  let bbox = geraBbox(nome);
  
  map.fitBounds(bbox);


}

function voltaVisaoGeral() {

  map.flyTo({

    center: [-38.699, -5.305], 
    zoom: 6,
    pitch: 0,
    bearing: 0

  })

}

function montaChoropleth() {

  map.addLayer({
    'id': 'choro',
    'type': 'fill',
    'source': 'municipios',
    'source-layer': 'mun_ce-adbvfq',
    'paint': {
        'fill-outline-color': 'transparent'
    }
  })//, 'water')

  // vou usar uma variável nonsensical, o código do município

  const features = map.queryRenderedFeatures({layers: ['municipios-ce']});
  //let features_unicos = features.filter( (d,i,arr) => arr.indexOf(d) == i )
  const valores = features.map(d => d.properties.code_muni);

  const max = Math.max(...valores);
  const min = Math.min(...valores);

  map.setPaintProperty(
    'choro',
    'fill-color',
    [
      'interpolate', // declara uma interpolação para o valor do fill-color
      ['linear'], // declara que a interpolação é linear
      ['get', 'code_muni'], // indica a variável que vai ser usada como critério, capturando (via esse operador 'get') a propriedade "code_muni" dentre aquelas presentes na chave "properties" das features
      min, ['to-color', '#CC8899'], // indica o valor mínimo da variável, e a cor correspondente ao valor mínimo
      max, ['to-color', '#FFD700'] // indica o valor máximo da variável, e a cor correspondente ao valor máximo
    ]

  )

}

function removeChoropleth() {

  map.setPaintProperty(
    'choro',
    'fill-color',
    'transparent'
  )

}


/*
let bbox = geraBbox('Quixadá');
map.fitBounds(bbox);

let centro = pegaCentro('Fortaleza');
map.flyTo({

  center: centro,
  zoom: 9,
  speed: 0.2,
  pitch: 45,
  bearing: 30    

});

map.setPaintProperty('municipios-ce', 'fill-outline-color', 'blue');

map.setFilter(
  'highlighted_city', [
    '==', 
    ['get', 'code_muni'], 
    code
  ]);


map.getStyle().layers
map.getStyle().layers.map(d => d.id)
map.moveLayer('mun-destacado', 'water')
map.moveLayer('mun-destacado', 'road-label-simple')
*/




