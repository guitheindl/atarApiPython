
from config import *

class Moto(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    modelo = db.Column(db.String(254))
    cilindradas = db.Column(db.String(254))
    motor = db.Column(db.String(254))

    def __str__(self):
        return str(self.id)+") "+ self.modelo + ", " +\
            self.cilindradas + ", " + self.motor

    def json(self):
        return {
            "id": self.id,
            "modelo": self.modelo,
            "cilindradas": self.cilindradas,
            "motor": self.motor
        }

if __name__ == "__main__":

    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    moto1 = Moto(modelo = "xt 660", cilindradas = "550cc", 
        motor = "4t")
    moto2 = Moto(modelo = "cb 500", cilindradas = "470cc", 
        motor = "4t")        
    
    db.session.add(moto1)
    db.session.add(moto2)
    db.session.commit()
    
    print(moto2)
    print(moto2.json())
