from Repositorios.InterfaceRepositorio import InterfaceRepositorio
from Modelos.Consejo import Consejo
from bson import ObjectId

class RepositorioConsejo(InterfaceRepositorio[Consejo]):
    def getListadoConsejosEnCapacidad(self, id_capacidad):
        theQuery = {"capacidad.$id":
                        ObjectId(id_capacidad)}
        return self.query(theQuery)