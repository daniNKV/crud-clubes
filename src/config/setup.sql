DROP TABLE IF EXISTS teams;
CREATE TABLE teams (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
    `name` TEXT NOT NULL,
    area TEXT NOT NULL,
    short_name TEXT NOT NULL,
    tla TEXT NOT NULL,
    crest_url TEXT NOT NULL,
    `address` TEXT NOT NULL,
    phone TEXT NOT NULL,
    website TEXT NOT NULL,
    email TEXT NOT NULL,
    founded TEXT NOT NULL,
    club_colors TEXT NOT NULL,
    venue TEXT NOT NULL,
    created_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL,
    updated_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL
);