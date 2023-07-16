-- public.product_images definition

-- Drop table

-- DROP TABLE public.product_images;

CREATE TABLE public.product_images (
	id serial4 NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NULL DEFAULT now(),
	deleted_at timestamptz NULL,
	product_id int4 NOT NULL,
	image_url text NOT NULL,
	CONSTRAINT "PK_1974264ea7265989af8392f63a1" PRIMARY KEY (id),
	CONSTRAINT product_image_fk_id FOREIGN KEY (product_id) REFERENCES public.products(id)
);