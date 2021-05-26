CREATE TABLE IF NOT EXISTS log(id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, pwd TEXT);
INSERT INTO log(id, user, pwd) VALUES (1,'admin', 'password');
INSERT INTO log(id, user, pwd) VALUES (2,'user', '1234');