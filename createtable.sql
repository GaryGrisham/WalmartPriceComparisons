DROP TABLE walmartdata

CREATE TABLE walmartdata (
item_number VARCHAR(500) PRIMARY KEY NOT NULL,
product_name VARCHAR(1000),
product_url VARCHAR (1000),
price_2019 FLOAT,
price_2020 FLOAT,
price_difference FLOAT,
price_percent_change FLOAT,
brand VARCHAR(1000),
category VARCHAR(1000)
)