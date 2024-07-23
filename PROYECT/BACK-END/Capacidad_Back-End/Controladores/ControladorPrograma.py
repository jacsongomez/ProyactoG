from Repositorios.RepositorioPrograma import RepositorioPrograma
from Modelos.Programa import Programa

class ControladorPrograma():

    def __init__(self):
        self.repositorioPrograma = RepositorioPrograma()

    def index(self):
        return self.repositorioPrograma.findAll()

    def create(self,infoPrograma):
        nuevoPrograma=Programa(infoPrograma)
        return self.repositorioPrograma.save(nuevoPrograma)

    def show(self,id):
        elPrograma=Programa(self.repositorioPrograma.findById(id))
        return elPrograma.__dict__

    def update(self,id,infoPrograma):
        ProgramaActual = Programa(self.repositorioPrograma.findById(id))
        ProgramaActual.codigo = infoPrograma["codigo"]
        ProgramaActual.nombre = infoPrograma["nombre"]
        ProgramaActual.facultad = infoPrograma["facultad"]
        return self.repositorioPrograma.save(ProgramaActual)

    def delete(self, id):
        return self.repositorioPrograma.delete(id)