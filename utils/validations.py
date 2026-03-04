import re
from datetime import datetime
import filetype

def validar_nombre(value):
    formato = bool(re.fullmatch(r'\b^[a-zA-Z]+[a-zA-z|\s]+\b', value))
    largo_valido = len(value)>2 and len(value)<81
    return formato and largo_valido

def validar_email(value):
    formato = re.fullmatch(r'\b^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}\b', value)
    return bool(formato)

def validar_celular(value):
    num = bool(re.fullmatch(r'\b^[0-9]+\b', value))
    largo = len(value) == 9
    return value and num and largo

def validar_calle(value):
    return value and len(value)>2

def validar_obligatorio(value):
    return len(value)>0

def validar_fecha(value):
    try:
        fecha_ingresada = datetime.strptime(value, "%Y-%m-%d")
        fecha_actual = datetime.today()
        if(fecha_ingresada < fecha_actual):
            return False
        return True
    except ValueError:
        return False

def validar_foto(value):
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
    ALLOWED_MIMETYPES = {"image/jpeg", "image/png", "image/gif"}

    if value.filename == "":
        return True
    
    ftype = filetype.guess(value)
    if ftype.extension not in ALLOWED_EXTENSIONS:
        return False
    if ftype.mime not in ALLOWED_MIMETYPES:
        return False

    return True

def validar_fotos(foto1, foto2, foto3):
    if(foto1.filename == "" and foto2.filename == "" and foto3 == ""):
        return False
    return validar_foto(foto1) and validar_foto(foto2) and validar_foto(foto3)

def validar_descripcion(value):
    return len(value)<=250

def validar_celular2(value):
    if len(value) == 0:
        return True
    return validar_celular(value)

def validar_donacion(nombre, email, region, comuna, calle, celular, 
    cantidad, tipo, fecha, foto1, foto2, foto3):
    return validar_nombre(nombre) and validar_obligatorio(region) and validar_obligatorio(comuna) and validar_obligatorio(tipo) and validar_email(email) and validar_calle(calle) and validar_celular(celular) and validar_obligatorio(cantidad) and validar_fecha(fecha) and validar_fotos(foto1, foto2, foto3)

def validar_pedido(email, celular, region, comuna, tipo, cantidad, nombre, descripcion):
    return validar_email(email) and validar_celular2(celular) and validar_obligatorio(region) and validar_obligatorio(comuna) and validar_obligatorio(tipo) and validar_obligatorio(cantidad) and validar_nombre(nombre) and validar_descripcion(descripcion)