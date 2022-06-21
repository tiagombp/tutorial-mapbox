library(tidyverse)
library(geobr)
library(sf)
library(geojsonsf)

estados <- geobr::read_state()

mun_ce <- geobr::read_municipality(code_muni = 23)
mun_ce_simples <- sf::st_simplify(mun_ce, dTolerance = .01)

#ggplot(mun_ce_simples) + geom_sf()

geojsonsf::sf_geojson(mun_ce_simples, digits = 6) %>% write_file('mun_ce.geojson')
