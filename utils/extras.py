import json

with open('utils/comunas_chile.json', 'r') as querys:
    QUERY_COMUNAS = json.load(querys)


# Buscar la latitud y longitud de la comuna ingresada. 
# Si no la encuentra devuelve None
COMUNAS_DICT = {
    c["name"]: (c["lng"], c["lat"])
    for c in QUERY_COMUNAS
}

def search_comuna(comuna):
    return COMUNAS_DICT.get(comuna)