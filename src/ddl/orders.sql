-- public.orders definition

-- Drop table

-- DROP TABLE public.orders;

CREATE TABLE public.orders (
	id serial4 NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NULL DEFAULT now(),
	deleted_at timestamptz NULL,
	user_id int4 NOT NULL,
	product_id int4 NOT NULL,
	quantity int4 NOT NULL,
	total_price int4 NOT NULL,
	status varchar NOT NULL,
	CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY (id),
	CONSTRAINT product_order_fk FOREIGN KEY (product_id) REFERENCES public.products(id),
	CONSTRAINT user_order_fk FOREIGN KEY (user_id) REFERENCES public.users(id)
);