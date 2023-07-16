-- public.order_items definition

-- Drop table

-- DROP TABLE public.order_items;

CREATE TABLE public.order_items (
	id serial4 NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NULL DEFAULT now(),
	deleted_at timestamptz NULL,
	order_id int4 NOT NULL,
	product_id int4 NOT NULL,
	CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY (id)
);