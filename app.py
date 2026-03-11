from flask import Flask, url_for, redirect, render_template, request, flash, jsonify
from utils.validations import *
from utils.extras import *
from database import db
from werkzeug.utils import secure_filename
from flask_cors import cross_origin
import hashlib
import filetype
import os

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'dev_key')
app.config['UPLOAD_FOLDER'] = os.path.join('static', 'img')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

@app.route('/')
def inicio():
    return render_template('inicio.html')

@app.route('/agregar-donacion', methods=['GET','POST'])
def agregar_donacion():
    error = None
    if request.method == 'POST':
        nombre = request.form.get('nombre')
        region = request.form.get('region')
        comuna = request.form.get('comuna')
        email = request.form.get('email')
        celular = request.form.get('celular')
        calle = request.form.get('calle-numero')
        cantidad = request.form.get('cantidad')
        tipo = request.form.get('tipo')
        fecha = request.form.get('fecha-disponibilidad')
        descripcion = request.form.get('descripcion')
        condiciones = request.form.get('condiciones')
        foto1 = request.files.get('foto-1')
        foto2 = request.files.get('foto-2')
        foto3 = request.files.get('foto-3')

        # validar datos
        if validar_donacion(
            nombre, email, region, comuna, calle,
            celular, cantidad, tipo, fecha,
            foto1, foto2, foto3
        ):
            donacion = db.agregar_donacion(comuna, region, calle, tipo, cantidad, fecha, descripcion, 
                                      condiciones, nombre, email, celular)
            if not donacion:
                error = "La solicitud no puede ser procesada"
                return render_template('agregar-donacion.html', error=error)

            # obtener id de la donación
            id_donation = db.obtener_id_donacion()
            fotos = [foto1, foto2, foto3]
            for foto in fotos:
                if foto and foto.filename != "":
                    filename_seguro = secure_filename(foto.filename)
                    hash_nombre = hashlib.sha256(
                        filename_seguro.encode("utf-8")
                    ).hexdigest()
                    tipo_archivo = filetype.guess(foto)
                    if not tipo_archivo:
                        error = "Tipo de archivo no válido"
                        return render_template('agregar-donacion.html', error=error)
                    extension = tipo_archivo.extension
                    img_filename = f"{hash_nombre}.{extension}"
                    ruta_guardado = os.path.join(
                        app.config['UPLOAD_FOLDER'],
                        img_filename
                    )
                    foto.save(ruta_guardado)
                    path_db = 'img/' + img_filename
                    resultado = db.agregar_imagen(
                        path_db,
                        img_filename,
                        id_donation
                    )
                    if not resultado:
                        error = 'La solicitud no puede ser procesada'
                        return render_template('agregar-donacion.html', error=error)
            flash('¡Hemos recibido su donación!', 'success')
            return redirect(url_for('inicio'))
        else:
            error = "Datos inválidos"
    return render_template('agregar-donacion.html', error=error)

@app.route('/agregar-pedido', methods=["GET", "POST"])
def agregar_pedido():
    error = None
    if request.method == 'POST':
        nombre = request.form.get('nombre')
        region = request.form.get('region')
        comuna = request.form.get('comuna')
        email = request.form.get('email')
        celular = request.form.get('celular')
        cantidad = request.form.get('cantidad')
        tipo = request.form.get('tipo')
        descripcion = request.form.get('descripcion')

        if validar_pedido(email, celular, region, comuna, tipo, cantidad, nombre, descripcion):
            result = db.addOrder(email, celular, region, comuna, tipo, cantidad, nombre, descripcion)
            if result:
                flash('¡Hemos recibido su pedido!', 'success')
                return redirect(url_for('inicio'))
            else:
                flash('La solicitud no puede ser procesada', 'error')
        else:
            flash('Datos inválidos en el formulario', 'error')
    return render_template('agregar-pedido.html')        

@app.route('/ver-pedidos', defaults={'pagina': 1})
@app.route('/ver-pedidos/<int:pagina>')
def ver_pedidos(pagina):
    data = []
    por_pagina = 5
    offset = (pagina - 1) * por_pagina
    pedidos = db.obtener_pedidos(por_pagina, offset)

    for p in pedidos:
        pedido_id, comuna_nomb, tipo, descripcion, cantidad, nombre = p
        data.append({
            "id_pedido": pedido_id,
            "comuna_pedido": comuna_nomb,
            "tipo_pedido": tipo,
            "descripcion_pedido": descripcion,
            "cantidad_pedido": cantidad,
            "nombre_pedido": nombre
        })

    pag_ant = pagina - 1
    pag_sgte = pagina + 1

    if pag_ant < 1:
        pag_ant = 1
    
    if len(pedidos) < por_pagina:
        pag_sgte = pagina

    return render_template('ver-pedidos.html', data=data, pagina=pagina, pag_sgte=pag_sgte, pag_ant=pag_ant)


@app.route('/ver-donaciones', defaults={'pagina': 1})
@app.route('/ver-donaciones/<int:pagina>')
def ver_donaciones(pagina):
    por_pagina = 5
    offset = (pagina - 1) * por_pagina
    donaciones = db.obtener_donaciones(por_pagina, offset)
    data = []
    for d in donaciones:
        id_don, comuna, tipo, cantidad, fecha, nombre, ruta = d
        
        data.append({
            "id_donacion": id_don,
            "comuna_donacion": comuna,
            "tipo_donacion": tipo,
            "cantidad_donacion": cantidad,
            "fecha_donacion": fecha,
            "nombre_donacion": nombre,
            "ruta_foto": ruta
        })
    
    pag_ant = pagina - 1
    pag_sgte = pagina + 1

    if pag_ant < 1:
        pag_ant = 1
    
    if len(donaciones) < por_pagina:
        pag_sgte = pagina

    return render_template('ver-donaciones.html', data=data, pagina=pagina, pag_sgte=pag_sgte, pag_ant=pag_ant)



@app.route('/información-pedido')
@app.route('/informacion-pedido/<int:id_p>')
def informacion_pedido(id_p):
    data = []
    pedido = db.info_pedido(id_p)
    _, comuna_nomb, tipo, descripcion, cantidad, nombre, email, celular = pedido
    
    data.append({
        "info_comuna": comuna_nomb,
        "info_tipo": tipo,
        "info_desc": descripcion,
        "info_cantidad": cantidad,
        "info_nombre": nombre,
        "info_email": email,
        "info_celular": celular  
    })
    return render_template('informacion-pedido.html', data=data)

@app.route('/información-donacion')
@app.route('/informacion-donacion/<int:id_d>')
def informacion_donacion(id_d):
    data = []
    data_fotos = []
    donacion = db.info_donacion(id_d)
    fotos = db.info_donacion_foto(id_d)
    _, comuna_nomb, calle, tipo, cantidad, fecha, descripcion, condiciones, nombre, email, celular = donacion
  
    data.append({
        "info_comuna": comuna_nomb,
        "info_calle": calle,
        "info_tipo": tipo,
        "info_desc": descripcion,
        "info_condiciones": condiciones,
        "info_cantidad": cantidad,
        "info_fecha": fecha,
        "info_nombre": nombre,
        "info_email": email,
        "info_celular": celular  
    })

    for f in fotos:
        _, ruta_archivo, nombre_archivo, _ = f
        data_fotos.append({
            "info_ruta": ruta_archivo,
            "info_archivo": nombre_archivo 
        })

    return render_template('informacion-donacion.html', data=data, data_fotos=data_fotos)

@app.route('/obtener-mapa', methods=["GET"])
@cross_origin(origin="localhost", supports_credentials=True)
def obtener_mapa():
    total = []
    info_pedidos = []
    info_donaciones = []
    pedidos = db.pedidos_mapa()
    donaciones = db.donaciones_mapa()

    for p in pedidos:
        id_p, comuna_nomb, tipo, cantidad, email = p
        coord = search_comuna(comuna_nomb)
        if coord is not None:
            (lng, lat) = coord
            info_pedidos.append({
                "id_pedido": id_p,
                "tipo_pedido": tipo,
                "cantidad_pedido": cantidad,
                "email_pedido": email,
                "lng_pedido": lng,
                "lat_pedido": lat,
                "comuna_pedido": comuna_nomb,
            })
        
    total.append(info_pedidos)

    for d in donaciones:
        id_d, c_n, calle_numero, tipo_p, cantidad_p, fecha_disponibilidad, email_p= d
        coord = search_comuna(c_n)
        if coord is not None:
            (lng_p, lat_p) = coord
            info_donaciones.append({
                "id_donacion": id_d,
                "calle_numero": calle_numero,
                "tipo_donacion": tipo_p,
                "cantidad_donacion": cantidad_p,
                "email_donacion": email_p,
                "fecha_donacion": fecha_disponibilidad,
                "lng_donacion": lng_p,
                "lat_donacion": lat_p,
                "comuna_donacion": c_n,
            })

    total.append(info_donaciones)
    return jsonify(total)

@app.route('/dashboard', methods=["GET"])
def ver_dashboard():
    total_donaciones = db.total_donaciones()[0]
    print(total_donaciones)
    total_pedidos = db.total_pedidos()[0]

    data = {
        "donaciones": total_donaciones,
        "pedidos": total_pedidos 
    }

    return render_template('dashboard.html', data=data)

@app.route('/region-dashboard', methods=["GET"])
@cross_origin(origin="localhost", supports_credentials=True)
def datos_dashboard():
    data = {}
    tot_donaciones = []
    tot_pedidos = []

    donaciones = db.donaciones_por_region()
    pedidos = db.pedidos_por_region()

    for i in range(0, 16):
        tot_donaciones.append(donaciones[i][1])
        tot_pedidos.append(pedidos[i][1])
    
    data = {
        "tot_donaciones": tot_donaciones,
        "tot_pedidos": tot_pedidos
    }
    
    return data

@app.route('/tipos-dashboard', methods=['GET'])
@cross_origin(origin="localhost", supports_credentials=True)
def obtener_tipos():
    tipos = ["fruta", "verdura", "otro"]

    pedidos = dict(db.num_pedidos())
    donaciones = dict(db.num_donaciones())

    pedidos_totales = {tipo: pedidos.get(tipo, 0) for tipo in tipos}
    donaciones_totales = {tipo: donaciones.get(tipo, 0) for tipo in tipos}

    pedidos_formato = [
        {"name": tipo.capitalize(), "y": pedidos_totales[tipo]}
        for tipo in tipos
    ]

    donaciones_formato = [
        {"name": tipo.capitalize(), "y": donaciones_totales[tipo]}
        for tipo in tipos
    ]

    data = {
        "donaciones": donaciones_formato,
        "pedidos": pedidos_formato
    }

    return jsonify(data)
    

if __name__ == "__main__":
    app.run(debug=True, port=8007)