from Repositorios.RepositorioCapacidad import RepositorioCapacidad
from Modelos.Capacidad import Capacidad

class ControladorCapacidad():

    def __init__(self):
        self.repositorioCapacidad = RepositorioCapacidad()

    def index(self):
        return self.repositorioCapacidad.findAll()

    def create(self,infoCapacidad):
        nuevaCapacidad=Capacidad(infoCapacidad)
        return self.repositorioCapacidad.save(nuevaCapacidad)

    def show(self,id):
        laCapacidad=Capacidad(self.repositorioCapacidad.findById(id))
        return laCapacidad.__dict__

    def update(self,id,infoCapacidad):
        CapacidadActual = Capacidad(self.repositorioCapacidad.findById(id))
        CapacidadActual.nombre = infoCapacidad["nombre"]
        CapacidadActual.tipo = infoCapacidad["tipo"]
        return self.repositorioCapacidad.save(CapacidadActual)

    def delete(self, id):
        return self.repositorioCapacidad.delete(id)