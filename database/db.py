from dotenv import load_dotenv
import pymysql
import json
import os

load_dotenv()

with open('database/querys.json', 'r') as querys:
    QUERY_DICT = json.load(querys)

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

def addDonation(comuna, region, calle, tipo, cantidad, fecha, desc, 
                cond, nombre, email, celular):
    conn = get_conn()
    cursor = conn.cursor()
    try:
        cursor.execute(QUERY_DICT["num_comuna"], (comuna, region))
        id_comuna = cursor.fetchone()
        cursor.execute(QUERY_DICT["add_donation"], (id_comuna, calle, tipo, 
             cantidad, fecha, desc, cond, nombre, email, celular))
        conn.commit()
        return True
    except:
        return False
    

def getIdDonation():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["num_donation"])
    num_donacion = cursor.fetchone()
    return num_donacion

def addImage(ruta, nombre, num_don):
    conn = get_conn()
    cursor = conn.cursor()
    try:
        cursor.execute(QUERY_DICT["add_pictures"], (ruta, nombre, num_don))
        conn.commit()
        return True
    
    except:
        return False

def addOrder(email, celular, region, comuna, tipo, cantidad, nombre, descripcion):
    conn = get_conn()
    cursor = conn.cursor()
    try:
        cursor.execute(QUERY_DICT["num_comuna"], (comuna, region))
        id_comuna = cursor.fetchone()
        cursor.execute(QUERY_DICT["add_order"], (id_comuna, tipo, descripcion, 
                    cantidad, nombre, email, celular))
        conn.commit()
        return True
    except:
        return False

def getComuna(id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["comuna_nombre"], id)
    nombre = cursor.fetchall()
    return nombre

def getOrders(start, finish):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["orders"], (start, finish))
    pedidos = cursor.fetchall()
    return pedidos

def getDonations(start, finish):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["donations"], (start, finish))
    donaciones = cursor.fetchall()
    return donaciones
    
def getPictures(id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["prim_foto"], id)
    foto = cursor.fetchone()
    return foto

def infoOrder(id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["info_pedido"], id)
    pedido = cursor.fetchone()
    return pedido

def infoDonation(id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["info_donacion"], id)
    donacion = cursor.fetchone()
    return donacion

def infoDonationPhoto(id):
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute(QUERY_DICT["info_fotos"], id)
    fotos = cursor.fetchall()
    return fotos
