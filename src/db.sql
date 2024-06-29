--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.1

-- Started on 2024-06-14 15:13:32

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE TABLE public.measures_types (
    type_id SERIAL PRIMARY KEY,
    type_name character varying(40),
    type_units character varying(12)
);


CREATE SEQUENCE public.measures_types_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.measures_types_type_id_seq OWNED BY public.measures_types.type_id;


CREATE TABLE public.sensors (
    sensor_id SERIAL PRIMARY KEY,
    sensor_name character varying(40)
);



CREATE TABLE public.sensors_measures (
    sensor_id integer FOREIGN KEY (sensor_id) REFERENCES public.sensors(sensor_id),
    type_id integer FOREIGN KEY (type_id) REFERENCES public.measures_types(type_id),
    formula character varying(255)
);

INSERT INTO public.measures_types VALUES (1, 'Humidity', '%');
INSERT INTO public.measures_types VALUES (2, 'temp', 'degrees');
INSERT INTO public.measures_types VALUES (3, 'Pressure', 'mercury`s mm');

-- Completed on 2024-06-14 15:13:35

--
-- PostgreSQL database dump complete
--
