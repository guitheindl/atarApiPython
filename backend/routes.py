from config import *
from model import Moto, Mecanico, Oficina

@app.route("/")
def inicio():
    return 'Sistema de cadastro de motos. '+\
        '<a href="/listar_motos">Operação listar</a>'

@app.route("/listar_motos")
def listar_motos():
    motos = db.session.query(Moto).all()
    motos_em_json = [ moto.json() for moto in motos ]
    resposta = jsonify(motos_em_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/incluir_moto", methods = ["post"])
def incluir_moto():
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    dados = request.get_json()

    try: 
        nova_moto = Moto(**dados)
        db.session.add(nova_moto)
        db.session.commit()
    except Exception as e: 
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})

    resposta.headers.add("Access-Control-Allow-Origin", "*") 
    return resposta

@app.route("/excluir_moto/<int:id_moto>", methods = ["delete"])
def excluir_moto(id_moto):
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})

    try: 
        Moto.query.filter(Moto.id == id_moto).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
        
    resposta.headers.add("Access-Control-Allow-Origin", "*") 
    return resposta

@app.route("/listar_mecanicos")
def listar_mecanicos():
    mecanicos = db.session.query(Mecanico).all()
    mecanicos_em_json = [ mecanico.json() for mecanico in mecanicos ]
    resposta = jsonify(mecanicos_em_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/listar_oficinas")
def listar_oficinas():
    oficinas = db.session.query(Oficina).all()
    oficinas_em_json = [ oficina.json() for oficina in oficinas ]
    resposta = jsonify(oficinas_em_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta