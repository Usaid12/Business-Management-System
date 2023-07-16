-- public.products definition

-- Drop table

-- DROP TABLE public.products;

CREATE TABLE public.products (
	id serial4 NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NULL DEFAULT now(),
	deleted_at timestamptz NULL,
	"name" varchar NOT NULL,
	description text NOT NULL,
	price int4 NOT NULL,
	business_id int4 NOT NULL,
	category_id int4 NOT NULL,
	thumbnail text NOT NULL DEFAULT ''::text,
	CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY (id),
	CONSTRAINT product_business_fk FOREIGN KEY (business_id) REFERENCES public.businesses(id),
	CONSTRAINT product_category_fk FOREIGN KEY (category_id) REFERENCES public.categories(id)
);