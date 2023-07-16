-- public.carts definition

-- Drop table

-- DROP TABLE public.carts;

CREATE TABLE public.carts (
	id serial4 NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NULL DEFAULT now(),
	deleted_at timestamptz NULL,
	user_id int4 NOT NULL,
	product_id int4 NOT NULL,
	quantity int4 NOT NULL,
	CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY (id),
	CONSTRAINT cart_product_fk_id FOREIGN KEY (product_id) REFERENCES public.products(id),
	CONSTRAINT user_cart_fk_id FOREIGN KEY (user_id) REFERENCES public.users(id)
);