from dotenv import load_dotenv
import pymysql
import json
import os

load_dotenv()

with open('database/querys.json', 'r') as querys:
    QUERY_DICT = json.load(querys)

###############################
# Conexión a la base de datos
###############################
def get_conn():
    conn = pymysql.connect(
        db = os.getenv('DB_NAME'),
        user = os.getenv('DB_USER'),
        passwd = os.getenv('DB_PASSWORD'),
        host = os.getenv('DB_HOST'),
        port = os.getenv('DB_PORT'),
        charset = "utf8",
    )
    return conn


###########################################
# Añadir elementos a la base de datos
###########################################
def agregar_donacion(comuna, region, calle, tipo, cantidad, fecha, desc, 
                cond, nombre, email, celular):
    conn = get_conn()
    cursor = conn.cursor()
    try:
        cursor.execute(QUERY_DICT["num_comuna"], (comuna, region))
        id_comuna = cursor.fetchone()
        cursor.execute(QUERY_DICT["agregar_donacion"], (id_comuna, calle, tipo, 
             cantidad, fecha, desc, cond, nombre, email, celular))
        conn.commit()
        return True
    except:
        return False

def agregar_imagen(ruta, nombre, num_don):
    conn = get_conn()
    cursor = conn.cursor()
    try:
        cursor.execute(QUERY_DICT["agregar_imagen"], (ruta, nombre, num_don))
        conn.commit()
        return True
    
    except:
        return False    

def agregar_pedido(email, celular, region, comuna, tipo, cantidad, nombre, descripcion):
    conn = get_conn()
    cursor = conn.cursor()
    try:
        cursor.execute(QUERY_DICT["num_comuna"], (comuna, region))
        id_comuna = cursor.fetchone()
        cursor.execute(QUERY_DICT["agregar_pedido"], (id_comuna, tipo, descripcion, 
                    cantidad, nombre, email, celular))
        conn.commit()
        return True
    except:
        return False


############################
# Obtener id 
############################
def obtener_id_donacion():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["num_donacion"])
    num_donacion = cursor.fetchone()
    return num_donacion


#######################################
# Obtener de a 5 pedidos/donaciones
#######################################
def obtener_pedidos(start, finish):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["pedidos"], (start, finish))
    pedidos = cursor.fetchall()
    return pedidos

def obtener_donaciones(start, finish):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["donaciones"], (start, finish))
    donaciones = cursor.fetchall()
    return donaciones


###################################################
# Obtener información de un pedido/donación por id
###################################################
def info_pedido(id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["info_pedido"], id)
    pedido = cursor.fetchone()
    return pedido

def info_donacion(id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["info_donacion"], id)
    donacion = cursor.fetchone()
    return donacion

def info_donacion_foto(id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["info_fotos"], id)
    fotos = cursor.fetchall()
    return fotos

############################################################
# Determinar el número de cada tipo para pedidos/donaciones
############################################################
def num_pedidos():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["pedidos_por_tipo"])
    cant = cursor.fetchall()
    return cant

def num_donaciones():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["donaciones_por_tipo"])
    cant = cursor.fetchall()
    return cant


################################################################
# Obtener los datos para el mapa (últimos 10 pedidos/donaciones)
################################################################
def pedidos_mapa():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["pedidos_mapa"])
    cant = cursor.fetchall()
    return cant

def donaciones_mapa():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["donaciones_mapa"])
    cant = cursor.fetchall()
    return cant


#######################################################
# Consultas para los gráficos y tarjetas del dashboard
#######################################################
def total_donaciones():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["total_donaciones"])
    cant = cursor.fetchone()
    return cant

def total_pedidos():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["total_pedidos"])
    cant = cursor.fetchone()
    return cant

def donaciones_por_region():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["donaciones_por_region"])
    cant = cursor.fetchall()
    return cant

def pedidos_por_region():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["pedidos_por_region"])
    cant = cursor.fetchall()
    return cant