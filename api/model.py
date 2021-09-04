
from os import name
from config import *
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50))
    lastname = db.Column(db.String(50))
    cpf = db.Column(db.String(11)) # apenas caracteres alfanuméricos
    email = db.Column(db.String(50))
    fone = db.Column(db.String(11)) # apenas caracteres alfanuméricos
    dtNasc = db.Column(db.String(10))

    def __str__(self):
        return f"{self.id}. {self.name}; {self.lastname}; {self.cpf}"


    def json(self):
        return {
            "id": self.id,
            "name": self.name,
            "lastname": self.lastname,
            "cpf": self.cpf,
            "email": self.email,
            "fone": self.fone,
            "dtNasc": self.dtNasc
        }

if __name__ == "__main__":

    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    user1 = User(name="Guilherme", lastname="Theindl", cpf="09882028918", email="guitheindl@gmail.com", fone="47992062552", dtNasc="2003-04-15")
    db.session.add(user1)

    db.session.commit()