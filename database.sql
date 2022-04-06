CREATE DATABASE cas_chat_app;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    id uuid DEFAULT public.uuid_generate_v4 () NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    isloggedin boolean DEFAULT false
    );

CREATE TABLE messages(
    messageid SERIAL PRIMARY KEY,
    text TEXT,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    user_id uuid REFERENCES users(id) NOT NULL
);