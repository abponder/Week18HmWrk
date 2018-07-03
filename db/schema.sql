
CREATE DATABASE baca_db;
USE baca_db;

DROP TABLE SignUps;
DROP TABLE WhoBeDo;
DROP TABLE artists;
DROP TABLE events;

CREATE TABLE SignUps
(
	id int NOT NULL AUTO_INCREMENT,
	signUpName varchar(75) NOT NULL,
	signUpMobile varchar(25) NOT NULL,
	signUpEmail varchar(75) NOT NULL,
	createdAt date,
	updatedAt date,
	active BOOLEAN DEFAULT true,
	PRIMARY KEY (id)
);


CREATE TABLE WhoBeDo
(
	id int NOT NULL AUTO_INCREMENT,
	userName varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	password varchar(50) NOT NULL,
	createdAt date,
	updatedAt date,
	active BOOLEAN DEFAULT false,
	isAdmin BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);


CREATE TABLE artists
(
	id int NOT NULL AUTO_INCREMENT,
	groupName varchar(75) NOT NULL,
	contactName varchar(75) NOT NULL,
	contactEmail varchar (75) NOT NULL,
	contactPhone varchar (50),
	personalWebsite varchar (75),
	instagramLink varchar (75),
	facebookLink varchar (75),
	spotifyLink varchar (75),
	twitterLink varchar (75),
	soundcloudLink varchar (75),
	youtubeLink varchar (75),
	appleMusicLink varchar (75),
	otherLink1 varchar (75),
	otherLink2 varchar (75),
	comments varchar (500),
	upcomingProjects varchar (500),
	createdAt date,
	updatedAt date,
	PRIMARY KEY (id)
);


CREATE TABLE events
(
	id int NOT NULL AUTO_INCREMENT,
	eventName varchar(150),
	venueName varchar(150),
	eventDate date,
	startTime time,
	showLength time,
	eventAddress varchar (50),
	eventCity varchar (50),
	eventState varchar (25),
	eventZip varchar (15),
	eventCountry varchar (50),
	coordinates varchar (150),
	ageRestrictions varchar (255),
	showDetails varchar (255),
	eventLink varchar (255),
	artist_01 varchar (50),
	artist_02 varchar (50),
	artist_03 varchar (50),
	createdAt date,
	updatedAt date,
	PRIMARY KEY (id)
);
