from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
import json
from waitress import serve
from Controladores.ControladorPrograma import ControladorPrograma
from Controladores.ControladorCapacidad import ControladorCapacidad
from Controladores.ControladorPersona import ControladorPersona
from Controladores.ControladorAsignacionCapacidad import ControladorAsignacionCapacidad
from Controladores.ControladorConsejo import ControladorConsejo

app=Flask(__name__)
cors = CORS(app)

miControladorPrograma = ControladorPrograma()
miControladorCapacidad = ControladorCapacidad()
miControladorPersona = ControladorPersona()
miControladorAsignacionCapacidad = ControladorAsignacionCapacidad()
miControladorConsejo = ControladorConsejo()

"""RUTAS DE PROGRAMA"""


@app.route("/programas",methods=['GET'])
def getProgramas():
    json=miControladorPrograma.index()
    return jsonify(json)


@app.route("/programas",methods=['POST'])
def crearPrograma():
    data = request.get_json()
    json=miControladorPrograma.create(data)
    return jsonify(json)


@app.route("/programas/<string:id>",methods=['GET'])
def getPrograma(id):
    json=miControladorPrograma.show(id)
    return jsonify(json)


@app.route("/programas/<string:id>",methods=['PUT'])
def modificarPrograma(id):
    data = request.get_json()
    json=miControladorPrograma.update(id,data)
    return jsonify(json)


@app.route("/programas/<string:id>",methods=['DELETE'])
def eliminarPrograma(id):
    json=miControladorPrograma.delete(id)
    return jsonify(json)


"""RUTAS DE CAPACIDAD"""


@app.route("/capacidades",methods=['GET'])
def getCapacidades():
    json=miControladorCapacidad.index()
    return jsonify(json)


@app.route("/capacidades",methods=['POST'])
def crearCapacidad():
    data = request.get_json()
    json=miControladorCapacidad.create(data)
    return jsonify(json)


@app.route("/capacidades/<string:id>",methods=['GET'])
def getCapacidad(id):
    json=miControladorCapacidad.show(id)
    return jsonify(json)


@app.route("/capacidades/<string:id>",methods=['PUT'])
def modificarCapacidad(id):
    data = request.get_json()
    json=miControladorCapacidad.update(id,data)
    return jsonify(json)


@app.route("/capacidades/<string:id>",methods=['DELETE'])
def eliminarCapacidad(id):
    json=miControladorCapacidad.delete(id)
    return jsonify(json)


"""RUTAS DE PERSONA"""


@app.route("/personas",methods=['GET'])
def getPersonas():
    json=miControladorPersona.index()
    return jsonify(json)


@app.route("/personas",methods=['POST'])
def crearPersona():
    data = request.get_json()
    json=miControladorPersona.create(data)
    return jsonify(json)


@app.route("/personas/<string:id>",methods=['GET'])
def getPersona(id):
    json=miControladorPersona.show(id)
    return jsonify(json)


@app.route("/personas/<string:id>",methods=['PUT'])
def modificarPersona(id):
    data = request.get_json()
    json=miControladorPersona.update(id,data)
    return jsonify(json)


@app.route("/personas/<string:id>",methods=['DELETE'])
def eliminarPersona(id):
    json=miControladorPersona.delete(id)
    return jsonify(json)


@app.route("/personas/<string:id>/programas/<string:id_programa>",methods=['PUT'])
def asignarProgramaAPersona(id,id_programa):
    json=miControladorPersona.asignarprograma(id,id_programa)
    return jsonify(json)


"""RUTAS DE ASIGNACIONCAPACIDAD"""


@app.route("/asignaciones", methods=['GET'])
def getAsignaciones():
    json = miControladorAsignacionCapacidad.index()
    return jsonify(json)


@app.route("/asignaciones/<string:id>", methods=['GET'])
def getAsignacion(id):
    json = miControladorAsignacionCapacidad.show(id)
    return jsonify(json)


@app.route("/asignaciones/capacidad/<string:id_capacidad>/persona/<string:id_persona>", methods=['POST'])
def crearAsignacion(id_capacidad, id_persona):
    data = request.get_json()
    json = miControladorAsignacionCapacidad.create(data, id_capacidad, id_persona)
    return jsonify(json)


@app.route("/asignaciones/<string:id_asignacion>/capacidad/<string:id_capacidad>/persona/<string:id_persona>", methods=['PUT'])
def modificarAsignacion(id_asignacion, id_capacidad, id_persona):
    data = request.get_json()
    json = miControladorAsignacionCapacidad.update(id_asignacion, data, id_capacidad, id_persona)
    return jsonify(json)


@app.route("/asignaciones/<string:id_asignacion>", methods=['DELETE'])
def eliminarAsignacion(id_asignacion):
    json = miControladorAsignacionCapacidad.delete(id_asignacion)
    return jsonify(json)

"""RUTAS DE CONSEJOS"""


@app.route("/consejos",methods=['GET'])
def getConsejos():
    json=miControladorConsejo.index()
    return jsonify(json)


@app.route("/consejos/capacidad/<string:id_capacidad>",methods=['POST'])
def crearConsejo(id_capacidad):
    data = request.get_json()
    json=miControladorConsejo.create(data,id_capacidad)
    return jsonify(json)


@app.route("/consejos/<string:id>",methods=['GET'])
def getConsejo(id):
    json=miControladorConsejo.show(id)
    return jsonify(json)


@app.route("/consejos/<string:id_consejo>/capacidad/<string:id_capacidad>",methods=['PUT'])
def modificarConsejo(id_consejo,id_capacidad):
    data = request.get_json()
    json=miControladorConsejo.update(id_consejo,data,id_capacidad)
    return jsonify(json)


@app.route("/consejos/<string:id>",methods=['DELETE'])
def eliminarConsejo(id):
    json=miControladorConsejo.delete(id)
    return jsonify(json)

@app.route("/consejos/capacidad/<string:id_capacidad>",methods=['GET'])
def consejosEnCapacidad(id_capacidad):
    json=miControladorConsejo.listarConsejosEnCapacidad(id_capacidad)
    return jsonify(json)


def loadFileConfig():
    with open('config.json') as f:
        data = json.load(f)
    return data


if __name__=='__main__':
    dataConfig = loadFileConfig()
    print("Server running : "+"http://"+dataConfig["url-backend"]+":" + str(dataConfig["port"]))
    serve(app,host=dataConfig["url-backend"],port=dataConfig["port"])