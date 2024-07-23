from Modelos.AsignacionCapacidad import AsignacionCapacidad
from Modelos.Persona import Persona
from Modelos.Capacidad import Capacidad
from Repositorios.RepositorioAsignacionCapacidad import RepositorioAsignacionCapacidad
from Repositorios.RepositorioPersona import RepositorioPersona
from Repositorios.RepositorioCapacidad import RepositorioCapacidad

class ControladorAsignacionCapacidad():

    def __init__(self):
        self.repositorioAsignacionCapacidad = RepositorioAsignacionCapacidad()
        self.repositorioPersona = RepositorioPersona()
        self.repositorioCapacidad = RepositorioCapacidad()

    def index(self):
        return self.repositorioAsignacionCapacidad.findAll()

    """
        Asignacion capacidad y persona a AsignacionCapacidad
    """
    def create(self,infoAsignacionCapacidad, id_capacidad, id_persona):
        nuevaAsignacionCapacidad=AsignacionCapacidad(infoAsignacionCapacidad)
        laCapacidad = Capacidad(self.repositorioCapacidad.findById(id_capacidad))
        laPersona = Persona(self.repositorioPersona.findById(id_persona))
        nuevaAsignacionCapacidad.capacidad = laCapacidad
        nuevaAsignacionCapacidad.persona = laPersona
        return self.repositorioAsignacionCapacidad.save(nuevaAsignacionCapacidad)

    def show(self,id):
        laAsignacionCapacidad=AsignacionCapacidad(self.repositorioAsignacionCapacidad.findById(id))
        return laAsignacionCapacidad.__dict__

    """
        Modificación de inscripción (estudiante y materia)
    """

    def update(self,id,infoAsignacionCapacidad, id_capacidad, id_persona):
        laAsignacionCapacidad = AsignacionCapacidad(self.repositorioAsignacionCapacidad.findById(id))
        laAsignacionCapacidad.Nivel_Capacidad = infoAsignacionCapacidad["Nivel_Capacidad"]
        laAsignacionCapacidad.Fecha_Diagnostico = infoAsignacionCapacidad["Fecha_Diagnostico"]
        laAsignacionCapacidad.Descripcion = infoAsignacionCapacidad["Descripcion"]
        laCapacidad = Capacidad(self.repositorioCapacidad.findById(id_capacidad))
        laPersona = Persona(self.repositorioPersona.findById(id_persona))
        laAsignacionCapacidad.capacidad = laCapacidad
        laAsignacionCapacidad.persona = laPersona
        return self.repositorioAsignacionCapacidad.save(laAsignacionCapacidad)

    def delete(self, id):
        return self.repositorioAsignacionCapacidad.delete(id)