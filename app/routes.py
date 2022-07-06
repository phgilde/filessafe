from flask import render_template, request, flash, redirect, url_for, send_file
from app import app, db
from werkzeug.utils import secure_filename
import os
import json
from app.models import File


@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html")


@app.route("/upload", methods=["POST"])
def upload():
    filename = request.form["filename"]
    try:
        file_id = int(filename)
    except ValueError:
        flash("Invalid filename")
        return redirect(url_for("index"))
    if File.query.get(file_id):
        flash("Invalid filename")
        return redirect(url_for("index"))
    file = request.form["encryptedfile"]
    with open(os.path.join("uploads", secure_filename(filename)), "x") as f:
        f.write(file)
    db.session.add(
        File(
            file_id=int(filename),
            filepath=os.path.join("uploads", secure_filename(filename)),
            filename_crypt=request.form["filename_crypt"],
        )
    )
    db.session.commit()
    return json.dumps({"filename": filename})


@app.route("/getfile/<file_id>")
def getfile(file_id):
    try:
        file_id = int(file_id)
    except ValueError:
        flash("Invalid filename")
        return redirect(url_for("index"))
    file = File.query.get(file_id)
    if not file:
        flash("Unknown filename")
        return redirect(url_for("index"))
    with open(file.filepath) as f:
        return json.dumps({"file": f.read(), "name": file.filename_crypt})


@app.route("/viewfile")
def viewfile():
    return render_template("viewfile.html")
