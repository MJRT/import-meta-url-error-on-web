export default [
  {
    "statements": [
      "CREATE TABLE \"items\" (\n  \"value\" TEXT NOT NULL,\n  CONSTRAINT \"items_pkey\" PRIMARY KEY (\"value\")\n);\n",
      "INSERT OR IGNORE INTO _electric_trigger_settings (namespace, tablename, flag) VALUES ('main', 'items', 1);",
      "DROP TRIGGER IF EXISTS update_ensure_main_items_primarykey;",
      "CREATE TRIGGER update_ensure_main_items_primarykey\n  BEFORE UPDATE ON \"main\".\"items\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"value\" != new.\"value\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column value as it belongs to the primary key')\n    END;\nEND;",
      "DROP TRIGGER IF EXISTS insert_main_items_into_oplog;",
      "CREATE TRIGGER insert_main_items_into_oplog\n   AFTER INSERT ON \"main\".\"items\"\n   WHEN 1 = (SELECT flag from _electric_trigger_settings WHERE namespace = 'main' AND tablename = 'items')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'items', 'INSERT', json_patch('{}', json_object('value', new.\"value\")), json_object('value', new.\"value\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_items_into_oplog;",
      "CREATE TRIGGER update_main_items_into_oplog\n   AFTER UPDATE ON \"main\".\"items\"\n   WHEN 1 = (SELECT flag from _electric_trigger_settings WHERE namespace = 'main' AND tablename = 'items')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'items', 'UPDATE', json_patch('{}', json_object('value', new.\"value\")), json_object('value', new.\"value\"), json_object('value', old.\"value\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_items_into_oplog;",
      "CREATE TRIGGER delete_main_items_into_oplog\n   AFTER DELETE ON \"main\".\"items\"\n   WHEN 1 = (SELECT flag from _electric_trigger_settings WHERE namespace = 'main' AND tablename = 'items')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'items', 'DELETE', json_patch('{}', json_object('value', old.\"value\")), NULL, json_object('value', old.\"value\"), NULL);\nEND;"
    ],
    "version": "1"
  },
  {
    "statements": [
      "CREATE TABLE \"settings\" (\n  \"id\" TEXT NOT NULL,\n  \"name\" TEXT NOT NULL,\n  \"value\" TEXT NOT NULL,\n  \"created_at\" TEXT,\n  \"updated_at\" TEXT,\n  CONSTRAINT \"settings_pkey\" PRIMARY KEY (\"id\")\n);\n",
      "INSERT OR IGNORE INTO _electric_trigger_settings (namespace, tablename, flag) VALUES ('main', 'settings', 1);",
      "DROP TRIGGER IF EXISTS update_ensure_main_settings_primarykey;",
      "CREATE TRIGGER update_ensure_main_settings_primarykey\n  BEFORE UPDATE ON \"main\".\"settings\"\nBEGIN\n  SELECT\n    CASE\n      WHEN old.\"id\" != new.\"id\" THEN\n      \t\tRAISE (ABORT, 'cannot change the value of column id as it belongs to the primary key')\n    END;\nEND;",
      "DROP TRIGGER IF EXISTS insert_main_settings_into_oplog;",
      "CREATE TRIGGER insert_main_settings_into_oplog\n   AFTER INSERT ON \"main\".\"settings\"\n   WHEN 1 = (SELECT flag from _electric_trigger_settings WHERE namespace = 'main' AND tablename = 'settings')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'settings', 'INSERT', json_patch('{}', json_object('id', new.\"id\")), json_object('created_at', new.\"created_at\", 'id', new.\"id\", 'name', new.\"name\", 'updated_at', new.\"updated_at\", 'value', new.\"value\"), NULL, NULL);\nEND;",
      "DROP TRIGGER IF EXISTS update_main_settings_into_oplog;",
      "CREATE TRIGGER update_main_settings_into_oplog\n   AFTER UPDATE ON \"main\".\"settings\"\n   WHEN 1 = (SELECT flag from _electric_trigger_settings WHERE namespace = 'main' AND tablename = 'settings')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'settings', 'UPDATE', json_patch('{}', json_object('id', new.\"id\")), json_object('created_at', new.\"created_at\", 'id', new.\"id\", 'name', new.\"name\", 'updated_at', new.\"updated_at\", 'value', new.\"value\"), json_object('created_at', old.\"created_at\", 'id', old.\"id\", 'name', old.\"name\", 'updated_at', old.\"updated_at\", 'value', old.\"value\"), NULL);\nEND;",
      "DROP TRIGGER IF EXISTS delete_main_settings_into_oplog;",
      "CREATE TRIGGER delete_main_settings_into_oplog\n   AFTER DELETE ON \"main\".\"settings\"\n   WHEN 1 = (SELECT flag from _electric_trigger_settings WHERE namespace = 'main' AND tablename = 'settings')\nBEGIN\n  INSERT INTO _electric_oplog (namespace, tablename, optype, primaryKey, newRow, oldRow, timestamp)\n  VALUES ('main', 'settings', 'DELETE', json_patch('{}', json_object('id', old.\"id\")), NULL, json_object('created_at', old.\"created_at\", 'id', old.\"id\", 'name', old.\"name\", 'updated_at', old.\"updated_at\", 'value', old.\"value\"), NULL);\nEND;"
    ],
    "version": "2"
  }
]