CREATE TABLE Department(
	ID SERIAL PRIMARY KEY,
	"kod" INT NOT NULL UNIQUE,
	"name" CHAR(100) NOT NULL,
	"adds" CHAR(100) NOT NULL
);
CREATE TABLE Employee(
	ID SERIAL PRIMARY KEY,
	"kod" INT NOT NULL UNIQUE,
	"FCs" CHAR(100) NOT NULL,
	"birth_date" DATE NOT NULL
);
CREATE TABLE job(
	ID SERIAL PRIMARY KEY,
	"name" CHAR(100) NOT NULL UNIQUE,
	"min_wage" INT NOT NULL
);
CREATE TABLE career(
	ID SERIAL PRIMARY KEY,
	"department_kod" INT NOT NULL,
	"employee_kod" INT NOT NULL,
	"job_id" INT NOT NULL,
	"hiring_date" DATE NOT NULL,
	"termination_date" DATE,
	
	FOREIGN KEY ("department_kod") REFERENCES department ("kod"),
	FOREIGN KEY ("employee_kod") REFERENCES employee ("kod"),
	FOREIGN KEY ("job_id") REFERENCES job (ID)
);
CREATE TABLE Salary(
	ID SERIAL PRIMARY KEY,
	"employee_kod" INT NOT NULL,
	"month" INT NOT NULL CHECK("month" < 13 AND "month" > 0),
	"year" INT NOT NULL CHECK("year" < 2016 AND "year" > 2002),
	FOREIGN KEY ("employee_kod") REFERENCES employee ("kod")
)
ALTER TABLE salary ADD "money" INT NOT NULL
