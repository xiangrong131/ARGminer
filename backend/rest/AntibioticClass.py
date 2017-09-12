from rest.MetadataInterface.antibioticTypeClass import Type
from rest.MetadataInterface.antibioticSubtypeClass import Subtype
from rest.MetadataInterface.antibioticCuration import Curate

type = Type();
subtype = Subtype();
curate = Curate();

class Antibiotic():
    def __init__(self):
        self.about=""

    def ListARGType(self):
        return type.ListARGTypes()

    def ListARGSubtype(self):
        return subtype.ListARGSubtypes()

    def insertCuration(self, data):
        try:
            insert = curate.insert(data)
            return {"status":True}
        except:
            return {"status":False}