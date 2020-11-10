# Dependencies
import pandas as pd
import sqlalchemy
#auto map module used for mapping sql tables
from sqlalchemy.ext.automap import automap_base
#session command is used to create a session to the database
from sqlalchemy.orm import Session
#create_engine allows us to connect to the sql server, func is used to do mathmatical functions
from sqlalchemy import create_engine, func
from flask import Flask, jsonify
from flask import Flask, render_template, redirect

#################################################
# Database Setup
#################################################
# Create a Connection String For Our Database

connection_string = "admin22:12345@localhost:5432/saccrewproject2"

# Connect to the database
engine = create_engine(f'postgresql://{connection_string}')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
walmartdata = Base.classes.walmartdata


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################
# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # Return template and data
    return render_template("index.html")
# This route will pull all the sqldata and display it as a json

@app.route("/api/walmartdata")
def getsqldata():
    # Create our session (link) from Python to the DB
    session = Session(engine)

# Grab All the data
    results=session.query(
        walmartdata.item_number,
        walmartdata.product_name,
        walmartdata.product_url,
        walmartdata.price_2019,
        walmartdata.price_2020,
        walmartdata.brand,
        walmartdata.category
        )

    session.close()

    # Create a dictionary from the row data and append to a list of all_sqldata
    all_sqldata = []
    for number, name, url, price19, price20, brand, cat in results:
        sql_dict = {}
        sql_dict["Item_Number"] = number
        sql_dict["Item_Name"] = name
        sql_dict["Item_Url"] = url
        sql_dict["2019_Price"] = price19
        sql_dict["2020_Price"] = price20
        sql_dict["Brand"] = brand
        sql_dict["Category"] = cat
        all_sqldata.append(sql_dict)

    return jsonify(all_sqldata)

# This route will pull the data for get the counts of products for each category
@app.route("/api/categorycounts")
def getcategorycounts():
    # Create our session (link) from Python to the DB
    session = Session(engine)

# Grab All the data
    results = session.query(
        walmartdata.category,
        func.count(walmartdata.item_number)
        ).\
        group_by(walmartdata.category)

    session.close()

    # Create a dictionary from the row data and append to a list of all_sqldata
    all_sqldata = []
    for cat, total in results:
        sql_dict = {}
        sql_dict["Category"] = cat
        sql_dict["Item_Count"] = total
        all_sqldata.append(sql_dict)

    return jsonify(all_sqldata)

# Add any additional queries here
@app.route("/api/categoryavgprice")
def getcategoryavg():
    # Create our session (link) from Python to the DB
    session = Session(engine)

# Grab All the data
    results=session.query(
        walmartdata.category,
        func.avg(walmartdata.price_2019),
        func.avg(walmartdata.price_2020),
        ).\
        group_by(walmartdata.category)

    session.close()

    # Create a dictionary from the row data and append to a list of all_sqldata
    all_sqldata = []
    for cat, avg19, avg20 in results:
        sql_dict = {}
        sql_dict["Category"] = cat
        sql_dict["2019_avg"] = avg19
        sql_dict["2020_avg"] = avg20
        all_sqldata.append(sql_dict)

    return jsonify(all_sqldata)

@app.route("/api/toptenpriceincrease")
def topten():
    # Create our session (link) from Python to the DB
    session = Session(engine)

# Grab All the data
    results=session.query(
        walmartdata.product_name,
        walmartdata.category,
        walmartdata.price_2020 - walmartdata.price_2019
        ).\
        order_by((walmartdata.price_2020 - walmartdata.price_2019).desc()).limit(10)

    session.close()

    # Create a dictionary from the row data and append to a list of all_sqldata
    all_sqldata = []
    for name, category, pricediff in results:
        sql_dict = {}
        sql_dict["ProductName"] = name
        sql_dict["Category"] = category
        sql_dict["PriceDiff"] = pricediff
        all_sqldata.append(sql_dict)

    return jsonify(all_sqldata)

@app.route("/api/toptenpricedecrease")
def lowerten():
    # Create our session (link) from Python to the DB
    session = Session(engine)

# Grab All the data
    results=session.query(
        walmartdata.product_name,
        walmartdata.category,
        walmartdata.price_2019 - walmartdata.price_2020
        ).\
        order_by((walmartdata.price_2019 - walmartdata.price_2020).desc()).limit(10)

    session.close()

    # Create a dictionary from the row data and append to a list of all_sqldata
    all_sqldata = []
    for name, category, pricediff in results:
        sql_dict = {}
        sql_dict["ProductName"] = name
        sql_dict["Category"] = category
        sql_dict["PriceDiff"] = pricediff
        all_sqldata.append(sql_dict)

    return jsonify(all_sqldata)

if __name__ == "__main__":
    app.run(debug=True)