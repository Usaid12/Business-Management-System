-- public.businesses definition

-- Drop table

-- DROP TABLE public.businesses;

CREATE TABLE public.businesses (
	id serial4 NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NULL DEFAULT now(),
	deleted_at timestamptz NULL,
	name varchar NOT NULL,
	address_line_1 varchar NOT NULL,
	address_line_2 varchar NULL,
	city varchar NOT NULL,
	country varchar NOT NULL,
	email varchar NOT NULL,
	contact_no varchar NOT NULL,
	owner_id int4 NOT NULL,
	postal_code varchar NOT NULL,
	CONSTRAINT "PK_bc1bf63498dd2368ce3dc8686e8" PRIMARY KEY (id),
	CONSTRAINT business_owner_fk_id FOREIGN KEY (owner_id) REFERENCES public.users(id)
);