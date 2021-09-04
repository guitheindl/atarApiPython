from config import *
from model import User
from datetime import datetime

@app.route("/")
def inicio():
    return 'Sistema de cadastro de usuários. '+\
        '<a href="/listar_users">Listar usuários</a>'

@app.route("/listar_users")
def listar_users():
    users = db.session.query(User).all()
    users_em_json = [ user.json() for user in users ]
    resposta = jsonify(users_em_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/incluir_user", methods = ["post"])
def incluir_user():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()

    try: 
        novo_usuario = User(**dados)
        db.session.add(novo_usuario)
        db.session.commit()
    except Exception as e: 
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})

    resposta.headers.add("Access-Control-Allow-Origin", "*") 
    return resposta

@app.route("/excluir_user/<int:id_user>", methods = ["delete"])
def excluir_user(id_user):
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})

    try: 
        User.query.filter(User.id == id_user).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
        
    resposta.headers.add("Access-Control-Allow-Origin", "*") 
    return resposta