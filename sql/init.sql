CREATE TABLE IF NOT EXISTS locomotive_summary (
	summary_id serial4 NOT NULL,
	total_loc int4 NOT NULL,
	total_loc_maintenance int4 NOT NULL,
	total_loc_transit int4 NOT NULL,
	total_loc_departure int4 NOT NULL,
	created_date timestamptz NULL,
	last_modified_date timestamptz NULL,
	CONSTRAINT locomotive_summary_pkey PRIMARY KEY (summary_id)
);
