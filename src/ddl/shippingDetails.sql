
CREATE TABLE "public"."shipping_details" (
	id serial4 NOT NULL,
	created_at timestamptz NOT NULL DEFAULT now(),
	updated_at timestamptz NULL DEFAULT now(),
	deleted_at timestamptz NULL,
	carrier varchar NOT NULL,
	order_id int4 NOT NULL,
	shipping_address varchar NOT NULL,
	shipping_cost int4 NOT NULL,
	shipping_date date NOT NULL,
	delivery_date date NOT NULL,
	CONSTRAINT "PK_b2bc159c5806edb3add9eb1ce8f" PRIMARY KEY (id),
	CONSTRAINT "UQ_a9fe3ec588dbd5110ab7550406e" UNIQUE (order_id),
	CONSTRAINT order_shipment_fk FOREIGN KEY (order_id) REFERENCES "public"."orders"(id)
);