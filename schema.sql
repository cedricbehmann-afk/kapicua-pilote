-- Comptes clients, demandes et newsletter pour /offre/ (Kapicua) et /encargalo/ (Encárgalo)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  site TEXT NOT NULL,
  email TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  company TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  lang TEXT NOT NULL DEFAULT 'fr',
  pass_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  newsletter INTEGER NOT NULL DEFAULT 0,
  newsletter_at TEXT,
  created_at TEXT NOT NULL,
  UNIQUE (site, email)
);
CREATE TABLE IF NOT EXISTS sessions (
  token_hash TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS requests (
  id TEXT PRIMARY KEY,
  site TEXT NOT NULL,
  user_id TEXT NOT NULL,
  kind TEXT NOT NULL,
  data TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  price TEXT NOT NULL DEFAULT '',
  note TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS subscribers (
  site TEXT NOT NULL,
  email TEXT NOT NULL,
  lang TEXT NOT NULL DEFAULT 'fr',
  created_at TEXT NOT NULL,
  PRIMARY KEY (site, email)
);
CREATE TABLE IF NOT EXISTS attempts (
  k TEXT PRIMARY KEY,
  n INTEGER NOT NULL,
  since INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS req_user ON requests (user_id);
CREATE INDEX IF NOT EXISTS req_site ON requests (site, created_at);
CREATE INDEX IF NOT EXISTS ses_user ON sessions (user_id);
-- Dossier de création de site (Kapicua) et fichiers envoyés (logo, photos)
CREATE TABLE IF NOT EXISTS briefs (
  user_id TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  submitted_at TEXT,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS files (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  kind TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  mime TEXT NOT NULL,
  size INTEGER NOT NULL,
  b64 TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS files_user ON files (user_id);
