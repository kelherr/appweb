import os
from flask import Flask, render_template


#UPLOAD_FOLDER = 'static/img'
app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'dev_key')
app.config['UPLOAD_FOLDER'] = os.path.join('static', 'img')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

@app.route('/')
def inicio():
    return render_template('inicio.html')