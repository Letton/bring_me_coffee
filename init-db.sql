--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: order_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_products (
    id uuid NOT NULL,
    quantity integer NOT NULL,
    order_id uuid NOT NULL,
    product_id uuid NOT NULL
);


ALTER TABLE public.order_products OWNER TO postgres;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id uuid NOT NULL,
    address character varying(255) NOT NULL,
    creation_date timestamp(6) without time zone,
    status character varying(255) NOT NULL,
    total double precision NOT NULL,
    user_id uuid
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id uuid NOT NULL,
    description character varying(255),
    image character varying(255),
    name character varying(255) NOT NULL,
    price double precision NOT NULL,
    net_weight integer,
    type character varying(255)
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    CONSTRAINT users_role_check CHECK (((role)::text = ANY ((ARRAY['ROLE_USER'::character varying, 'ROLE_ADMIN'::character varying])::text[])))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: order_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_products (id, quantity, order_id, product_id) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, address, creation_date, status, total, user_id) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, description, image, name, price, net_weight, type) FROM stdin;
044958d9-f795-4a05-924b-5c68c08c0b6e	Мука пшеничная, сахар, какао-порошок, крахмал картофельный, консервант Е282, разрыхлители, масло растительное, соль, загуститель Е415, ароматизатор пищевой), яйцо куриное, капли из темного шоколада.	https://sedelice.ru/uploads/product/new/RmwLabjOHf90.jpg	Маффин шоколадный	120	630	Выпечка
f47da9a4-2d4e-4ece-b94e-11e91555dda5	Кофе американо - это эспрессо, разбавленное горячей водой, для более мягкого вкуса.	https://sedelice.ru/uploads/product/new/zPdIEcOLdHHj.jpg	Американо	119.9	12	Кофе
2500f5df-32ad-41fb-aead-7975575e3672	Латте - это кофейный напиток, состоящий из эспрессо и горячего молока, обычно с добавлением нежной пенки на поверхности.	https://sedelice.ru/uploads/product/new/RoaVPE38FoEF.jpg	Латте	389.9	427	Кофе
531284b6-38ba-4e16-93fb-8425d219beeb	Айс латте - это освежающий кофейный напиток, приготовленный из эспрессо и холодного молока, подается с кубиками льда для прохлады.	https://sedelice.ru/uploads/product/new/zexfemXi90dD.jpg	Айф Латте	230	228	Кофе
25ec66e6-fd62-4154-9bf7-99fb7b26902b	Капуччино - это кофейный напиток, состоящий из эспрессо, горячего молока и пышной молочной пенки, создающий баланс ароматов и текстур.	https://sedelice.ru/uploads/product/new/V1I7JttD-iAh.jpg	Капучино	149.9	158	Кофе
c68acb85-9d94-4d97-b1f4-3956df3846f8	Мокко - это кофейный напиток, объединяющий эспрессо, шоколад и молоко, создавая насыщенный и ароматный вкус с легкой сладостью	https://sedelice.ru/uploads/product/new/VN7LNMcHE2cR.jpg	Мокко	319.9	350	Кофе
62c2f8ee-90cf-461e-a170-26f05cf0a724	Мука пшеничная хлебопекарная высшего сорта, молоко, соль, дрожжи, сахар, яйцо куриное, масло сливочное 82,5%, арахисовые лепестки, мука миндальная, сахарная пудра, ром.	https://sedelice.ru/uploads/product/new/BPETtDnj7Pjk.jpg	Круассан с миндалем	180	158	Выпечка
9ec6a927-aa28-489b-8fe4-4df484019845	Мука пшеничная хлебопекарная высшего сорта, сахар, масло сливочное 82,5% жирности, соль, дрожжи, яйцо столовое, молоко 3.2%, сгущенное молоко, маргарин, ванилин.	https://sedelice.ru/uploads/product/new/4fugmPecHbJu.jpg	Круассан с ванильным кремом	160	110	Выпечка
b991f182-1fe9-4a98-8d9f-4b2507dba9a0	Мука пшеничная хлебопекарная высшего сорта, молоко, соль, дрожжи, сахар, сметанный продукт, творожный продукт, маргарин, масло сливочное 82,5%, сахарная пудра.	https://sedelice.ru/uploads/product/new/PzxZefqW9GrC.jpg	Круассан с творогом	160	114	Выпечка
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, role, username, first_name, last_name) FROM stdin;
5267bb0b-d9c4-4a12-8e59-99d764ee0fd8	lettonchannel@gmail.com	$2a$10$0Xa5zGt07aqca1hioIMHsebQRlNScLS9xY0qNYJVihtlnvO48X2X.	ROLE_USER	Letton	Егор	Комарницкиййй
\.


--
-- Name: order_products order_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_products
    ADD CONSTRAINT order_products_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: users uk_6dotkott2kjsp8vw4d0m25fb7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk_6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email);


--
-- Name: users uk_r43af9ap4edm43mmtq01oddj6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uk_r43af9ap4edm43mmtq01oddj6 UNIQUE (username);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: orders fk32ql8ubntj5uh44ph9659tiih; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk32ql8ubntj5uh44ph9659tiih FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: order_products fkawxpt1ns1sr7al76nvjkv21of; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_products
    ADD CONSTRAINT fkawxpt1ns1sr7al76nvjkv21of FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: order_products fkdxjduvg7991r4qja26fsckxv8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_products
    ADD CONSTRAINT fkdxjduvg7991r4qja26fsckxv8 FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- PostgreSQL database dump complete
--

