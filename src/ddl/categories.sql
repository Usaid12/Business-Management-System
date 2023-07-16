-- public.categories definition

-- Drop table

-- DROP TABLE public.categories;

CREATE TABLE public.categories (
	id serial4 NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NULL DEFAULT now(),
	deleted_at timestamptz NULL,
	"name" varchar NOT NULL,
	parent_id int4 NULL,
	CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY (id),
	CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE (name),
	CONSTRAINT category_parent_fk FOREIGN KEY (parent_id) REFERENCES public.categories(id)
);