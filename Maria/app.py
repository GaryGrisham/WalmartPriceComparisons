from sqlalchemy.sql import text
from flask import Flask, jsonify, render_template
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import numpy as np
import json


# create engine
engine = create_engine('postgresql://admin22:12345@localhost:5432/saccrewproject2')
session = Session(engine)


app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")


@app.route('/api/datacall')
def jsonifyData():
    results = engine.execute('SELECT * FROM walmartdata').fetchall()
    return jsonify({'result': [dict(row) for row in results]})


if __name__ == '__main__':
    app.run(debug=True)

