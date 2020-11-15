
from config import *

class Moto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    modelo = db.Column(db.String(254))
    cilindradas = db.Column(db.String(254))
    motor = db.Column(db.String(254))

    oficina = db.relationship("Oficina", back_populates="moto")


    def __str__(self):
        return f"{self.id}. {self.modelo}; {self.cilindradas}; {self.motor}"


    def json(self):
        return {
            "id": self.id,
            "modelo": self.modelo,
            "cilindradas": self.cilindradas,
            "motor": self.motor
        }


class Mecanico(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    cargo = db.Column(db.String(254))

    oficina = db.relationship("Oficina", back_populates="mecanico")


    def __str__(self):
        return f"{self.id}. {self.nome}; {self.cargo}"


    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "cargo": self.cargo
        }


class Oficina(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    endereco = db.Column(db.String(254))

    mecanico_id = db.Column(db.Integer, db.ForeignKey(Mecanico.id), nullable=False)
    mecanico = db.relationship("Mecanico", back_populates="oficina")

    moto_id = db.Column(db.Integer, db.ForeignKey(Moto.id), nullable=False)
    moto = db.relationship("Moto", back_populates="oficina")


    def __str__(self):
        return f"{self.id}. {self.nome}; {self.endereco}; {self.mecanico}; {self.moto}"


    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "endereco": self.endereco,
            "mecanico_id": self.mecanico_id,
            "mecanico": self.mecanico,
            "moto_id": self.moto_id,
            "moto": self.moto
        }


if __name__ == "__main__":

    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    moto1 = Moto(modelo="xt 660", cilindradas="550cc", motor="4t")
    db.session.add(moto1)

    mecanico1 = Mecanico(nome="Guilherme G. Theindl", cargo="Dono")
    db.session.add(mecanico1)

    oficina1 = Oficina(nome="IFCar", endereco="Rua dos Bobos, 0",
                       moto=moto1, mecanico=mecanico1)

    db.session.add(oficina1)


    db.session.commit()

    linha = '------------------------------------------------------------------'
    print(moto1)
    print(moto1.json())
    print(linha)
    print(mecanico1)
    print(mecanico1.json())
    print(linha)
    print(oficina1)
    print(oficina1.json())
