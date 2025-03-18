CREATE TYPE "recipe_type" AS ENUM (
  'snack',
  'main',
  'side'
);

CREATE TYPE "unit_of_measure" AS ENUM (
  'g',
  'kg',
  'oz',
  'lbs',
  'tsp',
  'tbsp',
  'cup'
);

CREATE TABLE "users" (
  "id" varchar(255) PRIMARY KEY,
  "email" varchar(60) UNIQUE NOT NULL,
  "password_has" varchar(255) NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "recipes" (
  "id" bigserial PRIMARY KEY,
  "user_id" varchar(255) NOT NULL,
  "name" varchar(25) NOT NULL,
  "image_url" varchar(255),
  "description" text NOT NULL,
  "servings" smallint NOT NULL,
  "calories" smallint,
  "fat" smallint,
  "carbs" smallint,
  "protein" smallint,
  "recipe_type" recipe_type NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "ingredient_list" (
  "id" bigserial PRIMARY KEY,
  "recipe_id" bigint NOT NULL,
  "ingredient_id" bigint NOT NULL,
  "quantity" smallint NOT NULL
);

CREATE TABLE "ingredients" (
  "id" bigserial PRIMARY KEY,
  "title" varchar NOT NULL,
  "unit_of_measure" unit_of_measure NOT NULL,
  "food_type" bigint NOT NULL
);

CREATE TABLE "recipe_data" (
  "id" bigserial PRIMARY KEY,
  "recipe_id" bigint NOT NULL,
  "step_order" smallint UNIQUE NOT NULL,
  "statement" text NOT NULL
);

CREATE TABLE "food_type" (
  "id" bigserial PRIMARY KEY,
  "title" varchar NOT NULL
);

ALTER TABLE "recipes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "ingredient_list" ADD FOREIGN KEY ("ingredient_id") REFERENCES "ingredients" ("id");

ALTER TABLE "ingredients" ADD FOREIGN KEY ("food_type") REFERENCES "food_type" ("id");

ALTER TABLE "ingredient_list" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE CASCADE;

ALTER TABLE "recipe_data" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id") ON DELETE CASCADE;
