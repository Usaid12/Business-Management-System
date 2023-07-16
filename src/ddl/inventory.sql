-- public.inventory definition

-- Drop table

-- DROP TABLE public.inventory;

CREATE TABLE public.inventory (
	id serial4 NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NULL DEFAULT now(),
	deleted_at timestamptz NULL,
	quantity int4 NOT NULL,
	price_per_unit numeric NOT NULL,
	arrived_at date NOT NULL,
	product_id int4 NOT NULL,
	CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY (id),
	CONSTRAINT inventory_parent_fk FOREIGN KEY (product_id) REFERENCES public.products(id)
);