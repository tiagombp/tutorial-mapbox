# tutorial-mapbox

Um tutorial simples de mapbox.

## Referências do Mapbox

Instalação
https://docs.mapbox.com/mapbox-gl-js/guides/install/

Referência
https://docs.mapbox.com/mapbox-gl-js/api/

Referência -- Layers
https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/

Referência -- Expressions
https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/

Exemplo de `map.setPaintProperty()` com interpolação
https://docs.mapbox.com/mapbox-gl-js/example/visualize-population-density/


## Algumas funções para você experimentar no console:

### `voaParaCidade(nome)`

Voa até o centro da cidade escolhida.

Exemplo:

```js
voaParaCidade('Fortaleza');
```
 
### `destacaCidade(nome)`

Pinta a cidade escolhida de rosa.

Exemplo: 

```js
destacaCidade('Fortaleza');
```

Na prática, foi criada uma nova _layer_ chamada `mun-destacado`, e esta função está ajustando o filtro dessa camada de forma que a camada fique restria a apenas um feature, identificado por meio do `nome`. 

Controle a posição do layer (a posição na pilha de layers) usando `map.moveLayer('mun-destacado', 'nome-da-layer-embaixo-da-qual-sera-posicionada-nossa-layer')`.

Exemplos:

```js
map.moveLayer('mun-destacado', 'road-label-simple');
map.moveLayer('mun-destacado', 'water');
```

Para remover o destaque, basta passar uma string vazia para a função:

```js
destacaCidade('');
```

### `voltaVisaoGeral()`

Volta para a visão inicial, mostrando todo o estado do Ceará.

### `ajustaCidade(nome)`

Viaja até a cidade desejada, mas garantindo que todo o polígono da cidade ficará visível no mapa. Usa `map.fitBounds()` (usando um bounding box calculado pelo `turf.js`) no lugar de `map.flyTo()`.

Exemplo:

```js
ajustaCidade('Crato');
```

### `criaMascara(nome)`

Cria uma `source` e uma `layer` com um polígono cobrindo todo o mapa, com a exceção do município desejado. Usa o `turf.js` para calcular esse polígono.

Exemplo:

```js
criaMascara('Crato');
```

### `montaChoropleth()`

Cria uma layer adicional (poderia ter usado a layer de municípios já existente) para pintar os municípios de acordo com o valor do seu código do IBGE (não tem sentido algum, mas era a variável numérica que eu tinha à disposição `¯\_(ツ)_/¯`), usando o `map.setPaintProperty()` com expressões e interpolação.

Use `removeChoropleth()` para deixar essa layer adicional transparente.

