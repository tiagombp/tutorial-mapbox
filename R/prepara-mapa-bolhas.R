tab <- read.csv('dados-jessica.csv')
jsonlite::write_json(tab, 'dados-jessica.json')


muns <- geobr::read_municipal_seat()

cidades <- c('Imbituba', 'Recife', 'Brasília', 'Tubarão', 'Laguna', 'Salvador', 'Niterói')
qde <- c(4, 9, 17, 1, 1, 1, 1)

tab <- data.frame(name_muni = cidades, qde = qde)

minhas_cidades <- muns %>% filter(
  name_muni %in% cidades
) %>%
  left_join(tab)

dados_geojson <- geojsonsf::sf_geojson(minhas_cidades, digits = 6)
write_file(dados_geojson, 'dados.json')
