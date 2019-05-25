DROP DATABASE IF EXISTS zayo_takehome;
CREATE DATABASE zayo_takehome;

\c zayo_takehome

DROP TABLE IF EXISTS revenue;

CREATE TABLE revenue (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  one_time DECIMAL(15, 2) NOT NULL,
  monthly DECIMAL(15, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT Now(),
  updated_at TIMESTAMPTZ DEFAULT Now()
);

DROP TABLE IF EXISTS expenses;

CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  one_time DECIMAL(15, 2) NOT NULL,
  monthly DECIMAL(15, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT Now(),
  updated_at TIMESTAMPTZ DEFAULT Now()
);

INSERT INTO revenue(name, one_time, monthly)
VALUES
  ('Item 1', 100, 50),
  ('Item 2', 50, 25),
  ('Item 3', 25, 85);


INSERT INTO expenses(name, one_time, monthly)
VALUES
  ('Expense 1', 500, 20),
  ('Expense 2', 200, 40);
