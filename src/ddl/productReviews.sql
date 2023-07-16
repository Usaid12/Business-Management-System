-- public.product_reviews definition

-- Drop table

-- DROP TABLE public.product_reviews;

CREATE TABLE public.product_reviews (
	id serial4 NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NULL DEFAULT now(),
	deleted_at timestamptz NULL,
	product_id int4 NOT NULL,
	user_id int4 NOT NULL,
	"comments" text NOT NULL,
	CONSTRAINT "PK_67c1501aea1b0633ec441b00bd5" PRIMARY KEY (id),
	CONSTRAINT product_review_fk_id FOREIGN KEY (product_id) REFERENCES public.products(id),
	CONSTRAINT user_review_fk_id FOREIGN KEY (user_id) REFERENCES public.users(id)
);