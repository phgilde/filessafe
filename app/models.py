from app import app
from app import db


class File(db.Model):
    file_id = db.Column(db.BigInteger, primary_key=True)
    filepath = db.Column(db.String(length=255))
    filename_crypt = db.Column(db.String(length=255))
