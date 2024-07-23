from Repositorios.RepositorioPersona import RepositorioPersona
from Repositorios.RepositorioPrograma import RepositorioPrograma
from Modelos.Persona import Persona
from Modelos.Programa import Programa

class ControladorPersona():

    def __init__(self):
        self.repositorioPersona = RepositorioPersona()
        self.repositorioPrograma = RepositorioPrograma()

    def index(self):
        return self.repositorioPersona.findAll()

    def create(self,infoPersona):
        nuevaPersona=Persona(infoPersona)
        return self.repositorioPersona.save(nuevaPersona)

    def show(self,id):
        laPersona=Persona(self.repositorioPersona.findById(id))
        return laPersona.__dict__

    def update(self,id,infoPersona):
        PersonaActual = Persona(self.repositorioPersona.findById(id))
        PersonaActual.identificacion = infoPersona["identificacion"]
        PersonaActual.nombre = infoPersona["nombre"]
        PersonaActual.tipo = infoPersona["tipo"]
        PersonaActual.grupo = infoPersona["grupo"]
        return self.repositorioPersona.save(PersonaActual)

    def delete(self, id):
        return self.repositorioPersona.delete(id)

    """
       Relación programa y persona
    """

    def asignarprograma(self, id, id_programa):
        personaActual = Persona(self.repositorioPersona.findById(id))
        programaActual = Programa(self.repositorioPrograma.findById(id_programa))
        personaActual.programa = programaActual
        return self.repositorioPersona.save(personaActual)