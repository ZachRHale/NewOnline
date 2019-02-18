CREATE TABLE "Composer" (
    id UUID PRIMARY KEY,
	first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL, 
    birth_date DATE
);

CREATE TABLE "User" (
    id UUID PRIMARY KEY,
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR(200) NOT NULL,
    handle VARCHAR(50) NOT NULL,
    create_date DATE
);

CREATE TABLE "Score" (
	id UUID PRIMARY KEY,
    title VARCHAR(200) NOT NULL, 
    composer UUID REFERENCES "Composer",
    creator UUID REFERENCES "User",
    create_date DATE
);