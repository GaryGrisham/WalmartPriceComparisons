from sqlalchemy.sql import text
from flask import Flask, jsonify

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import numpy as np
import datetime as dt
app = Flask(__name__)

# create engine
engine = create_engine('postgresql://admin22:12345@localhost:5432/saccrewproject2')
Base = automap_base()
Base.prepare(engine, reflect = True)
session = Session(engine)

@app.route('/')
def testdb():
    try:
        engine.execute('SELECT * FROM walmartdata')
        return '<h1>It works.</h1>'
    except Exception as e:
        # e holds description of the error
        error_text = "<p>The error:<br>" + str(e) + "</p>"
        hed = '<h1>Something is broken.</h1>'
        return hed + error_text

if __name__ == '__main__':
    app.run(debug=True)

