from Repositorios.RepositorioConsejo import RepositorioConsejo
from Modelos.Consejo import Consejo
from Modelos.Capacidad import Capacidad
from Repositorios.RepositorioCapacidad import RepositorioCapacidad

class ControladorConsejo():

    def __init__(self):
        self.repositorioConsejo = RepositorioConsejo()
        self.repositorioCapacidad = RepositorioCapacidad()

    def index(self):
        return self.repositorioConsejo.findAll()

    def create(self,infoConsejo, id_capacidad):
        nuevoConsejo=Consejo(infoConsejo)
        laCapacidad = Capacidad(self.repositorioCapacidad.findById(id_capacidad))
        nuevoConsejo.capacidad = laCapacidad
        return self.repositorioConsejo.save(nuevoConsejo)

    def show(self,id):
        elConsejo=Consejo(self.repositorioConsejo.findById(id))
        return elConsejo.__dict__

    def update(self,id,infoConsejo, id_capacidad):
        ConsejoActual = Consejo(self.repositorioConsejo.findById(id))
        laCapacidad = Capacidad(self.repositorioCapacidad.findById(id_capacidad))
        ConsejoActual.consejo = infoConsejo["consejo"]
        ConsejoActual.momento = infoConsejo["momento"]
        ConsejoActual.capacidad = laCapacidad
        ConsejoActual.Nivel_Capacidad = infoConsejo["Nivel_Capacidad"]
        return self.repositorioConsejo.save(ConsejoActual)

    def delete(self, id):
        return self.repositorioConsejo.delete(id)

    "Obtener todos los consejos de una capacidad"

    def listarConsejosEnCapacidad(self, id_capacidad):
        return self.repositorioConsejo.getListadoConsejosEnCapacidad(id_capacidad)