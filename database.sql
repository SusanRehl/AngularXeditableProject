CREATE TABLE roominfo (
	id SERIAL PRIMARY KEY NOT NULL DEFAULT next value for roominfo_id_seq,
	room_type VARCHAR(20),
	capacity INTEGER,
	room_number VARCHAR(20),
	notes VARCHAR (30),
	price INTEGER,
	check_in_date VARCHAR(20),
	check_out_date VARCHAR(20)
	);

CREATE UNIQUE INDEX roominfo_pkey ON roominfo USING btree (id);
