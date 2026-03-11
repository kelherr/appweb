import json

with open('utils/comunas_chile.json', 'r') as querys:
    QUERY_COMUNAS = json.load(querys)

COMUNAS_DICT = {
    c["name"]: (c["lng"], c["lat"])
    for c in QUERY_COMUNAS
}

# Buscar la latitud y longitud de la comuna ingresada. 
# Si no la encuentra devuelve None
def search_comuna(comuna):
    return COMUNAS_DICT.get(comuna)