from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS
import json
from waitress import serve
import datetime
import requests
import re
from flask_jwt_extended import create_access_token, verify_jwt_in_request
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

app = Flask(__name__)
cors = CORS(app)


app.config["JWT_SECRET_KEY"] = "super-secret" # Cambiar por el que se conveniente
jwt = JWTManager(app)


@app.route("/login", methods=["POST"])
def create_token():
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url=dataConfig["url-backend-security"]+'/usuarios/validar'
    response = requests.post(url, json=data, headers=headers)
    if response.status_code == 200:
        user = response.json()
        expires = datetime.timedelta(seconds=60 * 60*24)
        access_token = create_access_token(identity=user, expires_delta=expires)
        return jsonify({"token": access_token, "user_id": user["_id"]})
    else:
        return jsonify({"msg": "Bad username or password"}), 401


# Funcion que se ejecutará siempre de primero antes de que la consulta llegue a la ruta solicitada
@app.before_request
def before_request_callback():
    endPoint = limpiarURL(request.path)
    excludedRoutes = ["/login"]
    if excludedRoutes.__contains__(request.path):
        pass
    elif verify_jwt_in_request():
        usuario = get_jwt_identity()
        if usuario["rol"] is not None:
            tienePersmiso = validarPermiso(endPoint, request.method,usuario["rol"]["_id"])
            if not tienePersmiso:
                return jsonify({"message": "Permission denied"}), 401
        else:
            return jsonify({"message": "Permission denied"}), 401


def limpiarURL(url):
    partes = url.split("/")
    for laParte in partes:
        if re.search('\\d', laParte):
            url = url.replace(laParte, "?")
    return url


def validarPermiso(endPoint, metodo, idRol):
    url = dataConfig["url-backend-security"] + "/permisos-roles/validar-permiso/rol/" + str(idRol)
    tienePermiso = False
    headers = {"Content-Type": "application/json; charset=utf-8"}
    body = {
        "url": endPoint,
        "metodo": metodo
    }
    response = requests.get(url, json=body, headers=headers)
    try:
        data = response.json()
        if ("_id" in data):
            tienePermiso = True
    except:
        pass
    return tienePermiso


############################redireccionamiento###########################
#############


"""RUTAS DE USUARIO"""


@app.route("/usuarios",methods=['GET'])
def getUsuarios():
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"] + '/usuarios'
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)


@app.route("/usuarios",methods=['POST'])
def crearUsuario():
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"] + '/usuarios'
    response = requests.post(url, headers=headers, json=data)
    json = response.json()
    return jsonify(json)


@app.route("/usuarios/validar",methods=['POST'])
def validarUsuario():
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"] + '/usuarios/validar'
    response = requests.post(url, headers=headers, json=data)
    json = response.json()
    return jsonify(json)


@app.route("/usuarios/<string:id>",methods=['GET'])
def getUsuario(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"] + '/usuarios/' + id
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)


@app.route("/usuarios/<string:id>",methods=['PUT'])
def modificarUsuario(id):
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"] + '/usuarios/' + id
    response = requests.put(url, headers=headers, json=data)
    json = response.json()
    return jsonify(json)


@app.route("/usuarios/<string:id>", methods=['DELETE'])
def eliminarUsuario(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"] + '/usuarios/' + id
    response = requests.delete(url, headers=headers)
    if response.status_code == 204:
        # Si el estado es 204 No Content, devolver un mensaje adecuado
        return jsonify({'message': 'Permiso eliminado exitosamente'}), 200
    else:
        try:
            json_response = response.json() if response.content else None
        except requests.exceptions.JSONDecodeError:
            json_response = None

        error_message = {
            'error': 'Error al eliminar el permiso',
            'details': json_response if json_response else 'Respuesta no es JSON válido o está vacía'
        }
        return jsonify(error_message), response.status_code


"""RUTAS DE ROL"""


@app.route("/roles",methods=['GET'])
def getRoles():
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"] + '/roles'
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)


@app.route("/roles",methods=['POST'])
def crearRol():
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"] + '/roles'
    response = requests.post(url, headers=headers, json=data)
    json = response.json()
    return jsonify(json)


@app.route("/roles/<string:id>",methods=['GET'])
def getRol(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"] + '/roles/' + id
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)


@app.route("/roles/<string:id>",methods=['PUT'])
def modificarRol(id):
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"] + '/roles/' + id
    response = requests.put(url, headers=headers, json=data)
    json = response.json()
    return jsonify(json)

@app.route("/usuarios/<string:id_usuario>/rol/<string:id>",methods=['PUT'])
def asignarRol(id_usuario, id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"] + '/usuarios/' + id_usuario + '/rol/' + id
    response = requests.put(url, headers=headers)
    json = response.json()
    return jsonify(json)


@app.route("/roles/<string:id>",methods=['DELETE'])
def eliminarRol(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"] + '/roles/' + id
    response = requests.delete(url, headers=headers)
    if response.status_code == 204:
        # Si el estado es 204 No Content, devolver un mensaje adecuado
        return jsonify({'message': 'Permiso eliminado exitosamente'}), 200
    else:
        try:
            json_response = response.json() if response.content else None
        except requests.exceptions.JSONDecodeError:
            json_response = None

        error_message = {
            'error': 'Error al eliminar el permiso',
            'details': json_response if json_response else 'Respuesta no es JSON válido o está vacía'
        }
        return jsonify(error_message), response.status_code


"""RUTAS DE PERMISO"""


@app.route("/permisos",methods=['GET'])
def getPermisos():
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"] + '/permisos'
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)


@app.route("/permisos",methods=['POST'])
def crearPermiso():
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"] + '/permisos'
    response = requests.post(url, headers=headers, json=data)
    json = response.json()
    return jsonify(json)


@app.route("/permisos/<string:id>",methods=['GET'])
def getPermiso(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"] + '/permisos/' + id
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)


@app.route("/permisos/<string:id>",methods=['PUT'])
def modificarPermiso(id):
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"] + '/permisos/' + id
    response = requests.put(url, headers=headers, json=data)
    json = response.json()
    return jsonify(json)


@app.route("/permisos/<string:id>",methods=['DELETE'])
def eliminarPermiso(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"] + '/permisos/' + id
    response = requests.delete(url, headers=headers)
    if response.status_code == 204:
        # Si el estado es 204 No Content, devolver un mensaje adecuado
        return jsonify({'message': 'Permiso eliminado exitosamente'}), 200
    else:
        try:
            json_response = response.json() if response.content else None
        except requests.exceptions.JSONDecodeError:
            json_response = None

        error_message = {
            'error': 'Error al eliminar el permiso',
            'details': json_response if json_response else 'Respuesta no es JSON válido o está vacía'
        }
        return jsonify(error_message), response.status_code


"""RUTAS PERMISO-ROL"""


@app.route("/permisos-roles",methods=['GET'])
def getPermisosRoles():
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"] + '/permisos-roles'
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)


@app.route("/permisos-roles/rol/<string:id_rol>/permiso/<string:id_permiso>", methods=['POST'])
def crearPrmisoRol(id_rol, id_permiso):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"] + '/permisos-roles/rol/' + id_rol + '/permiso/' + id_permiso
    response = requests.post(url, headers=headers)
    json = response.json()
    return jsonify(json)


@app.route("/permisos-roles/<string:id>",methods=['GET'])
def getPermisoRol(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"] + '/permisos-roles/' + id
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)


@app.route("/permisos-roles/<string:id_permisoRol>/rol/<string:id_rol>/permiso/<string:id_permiso>", methods=['PUT'])
def modificarPrmisoRol(id_permisoRol,id_rol, id_permiso):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"] + '/permisos-roles/'+ id_permisoRol + '/rol/' + id_rol + '/permiso/' + id_permiso
    response = requests.put(url, headers=headers)
    json = response.json()
    return jsonify(json)


@app.route("/permisos-roles/<string:id>",methods=['DELETE'])
def eliminarPermisoRol(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-security"] + '/permisos-roles/' + id
    response = requests.delete(url, headers=headers)
    if response.status_code == 204:
        # Si el estado es 204 No Content, devolver un mensaje adecuado
        return jsonify({'message': 'Permiso eliminado exitosamente'}), 200
    else:
        try:
            json_response = response.json() if response.content else None
        except requests.exceptions.JSONDecodeError:
            json_response = None

        error_message = {
            'error': 'Error al eliminar el permiso',
            'details': json_response if json_response else 'Respuesta no es JSON válido o está vacía'
        }
        return jsonify(error_message), response.status_code


"""RUTAS DE CAPACIDAD"""


@app.route("/capacidades", methods=['GET'])
def getCapacidades():
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/capacidades'
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)


@app.route("/capacidades", methods=['POST'])
def crearCapacidad():
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/capacidades'
    response = requests.post(url, headers=headers, json=data)
    json = response.json()
    return jsonify(json)


@app.route("/capacidades/<string:id>", methods=['GET'])
def getCapacidad(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/capacidades/' + id
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)


@app.route("/capacidades/<string:id>", methods=['PUT'])
def modificarCapacidad(id):
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/capacidades/' + id
    response = requests.put(url, headers=headers, json=data)
    json = response.json()
    return jsonify(json)


@app.route("/capacidades/<string:id>", methods=['DELETE'])
def eliminarCapacidad(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/capacidades/' + id
    response = requests.delete(url, headers=headers)
    json = response.json()
    return jsonify(json)


"""RUTAS DE PROGRAMA"""


@app.route("/programas",methods=['GET'])
def getProgramas():
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/programas'
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)


@app.route("/programas",methods=['POST'])
def crearPrograma():
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/programas'
    response = requests.post(url, headers=headers, json=data)
    json = response.json()
    return jsonify(json)


@app.route("/programas/<string:id>",methods=['GET'])
def getPrograma(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/programas/' + id
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)


@app.route("/programas/<string:id>",methods=['PUT'])
def modificarPrograma(id):
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/programas/' + id
    response = requests.put(url, headers=headers, json=data)
    json = response.json()
    return jsonify(json)


@app.route("/programas/<string:id>",methods=['DELETE'])
def eliminarPrograma(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/programas/' + id
    response = requests.delete(url, headers=headers)
    json = response.json()
    return jsonify(json)


"""RUTAS DE PERSONA"""


@app.route("/personas",methods=['GET'])
def getPersonas():
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/personas'
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)


@app.route("/personas",methods=['POST'])
def crearPersona():
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/personas'
    response = requests.post(url, headers=headers, json=data)
    json = response.json()
    return jsonify(json)


@app.route("/personas/<string:id>",methods=['GET'])
def getPersona(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/personas/' + id
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)


@app.route("/personas/<string:id>",methods=['PUT'])
def modificarPersona(id):
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/personas/' + id
    response = requests.put(url, headers=headers, json=data)
    json = response.json()
    return jsonify(json)


@app.route("/personas/<string:id>",methods=['DELETE'])
def eliminarPersona(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/personas/' + id
    response = requests.delete(url, headers=headers)
    json = response.json()
    return jsonify(json)


@app.route("/personas/<string:id>/programas/<string:id_programa>",methods=['PUT'])
def asignarDepartamentoAPersona(id,id_programa):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/personas/' + id +"/programas/" + id_programa
    response = requests.put(url, headers=headers)
    json = response.json()
    return jsonify(json)


"""RUTAS DE ASIGNACIONES"""


@app.route("/asignaciones", methods=['GET'])
def getAsignaciones():
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/asignaciones'
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)


@app.route("/asignaciones/capacidad/<string:id_capacidad>/persona/<string:id_persona>", methods=['POST'])
def crearAsignacion(id_capacidad, id_persona):
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/asignaciones/capacidad/' + id_capacidad + '/persona/' + id_persona
    response = requests.post(url, headers=headers, json=data)
    json = response.json()
    return jsonify(json)


@app.route("/asignaciones/<string:id>", methods=['GET'])
def getAsignacion(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/asignaciones/' + id
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)


@app.route("/asignaciones/<string:id_asignacion>/capacidad/<string:id_capacidad>/persona/<string:id_persona>", methods=['PUT'])
def modificarAsignacion(id_asignacion, id_capacidad, id_persona):
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/asignaciones/' + id_asignacion + '/capacidad/' + id_capacidad + '/persona/' + id_persona
    response = requests.put(url, headers=headers, json=data)
    json = response.json()
    return jsonify(json)


@app.route("/asignaciones/<string:id_asignacion>", methods=['DELETE'])
def eliminarAsignacion(id_asignacion):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/asignaciones/' + id_asignacion
    response = requests.delete(url, headers=headers)
    json = response.json()
    return jsonify(json)


"""RUTAS DE CONSEJOS"""


@app.route("/consejos",methods=['GET'])
def getConsejos():
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/consejos'
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)


@app.route("/consejos/capacidad/<string:id_capacidad>",methods=['POST'])
def crearConsejo(id_capacidad):
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/consejos/capacidad/' + id_capacidad
    response = requests.post(url, headers=headers, json=data)
    json = response.json()
    return jsonify(json)


@app.route("/consejos/<string:id>",methods=['GET'])
def getConsejo(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/consejos/' + id
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)


@app.route("/consejos/<string:id_consejo>/capacidad/<string:id_capacidad>",methods=['PUT'])
def modificarConsejo(id_consejo,id_capacidad):
    data = request.get_json()
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/consejos/' + id_consejo + '/capacidad/' + id_capacidad
    response = requests.put(url, headers=headers, json=data)
    json = response.json()
    return jsonify(json)


@app.route("/consejos/<string:id>",methods=['DELETE'])
def eliminarConsejo(id):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/consejos/' + id
    response = requests.delete(url, headers=headers)
    json = response.json()
    return jsonify(json)


@app.route("/consejos/capacidad/<string:id_capacidad>",methods=['GET'])
def consejosEnCapacidad(id_capacidad):
    headers = {"Content-Type": "application/json; charset=utf-8"}
    url = dataConfig["url-backend-capacity"] + '/consejos/capacidad/' + id_capacidad
    response = requests.get(url, headers=headers)
    json = response.json()
    return jsonify(json)


def loadFileConfig():
    with open('config.json') as f:
        data = json.load(f)
    return data


if __name__ == '__main__':
    dataConfig = loadFileConfig()
    print("server running:" + "http://" + dataConfig["url-backend"] +
        ":" + str(dataConfig["port"]))
    serve(app, host=dataConfig["url-backend"], port=dataConfig["port"])