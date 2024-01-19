CREATE TABLE Device(
   DeviceId INT AUTO_INCREMENT,
   Name VARCHAR(30)  NOT NULL,
   Version VARCHAR(15)  NOT NULL,
   DeviceRef VARCHAR(5)  NOT NULL,
   Image BLOB,
   PhoneNumber VARCHAR(10),
   PRIMARY KEY(DeviceId)
);

CREATE TABLE Role(
   RoleId INT AUTO_INCREMENT,
   Name VARCHAR(50) ,
   PRIMARY KEY(RoleId)
);

CREATE TABLE Users(
   UsersId INT AUTO_INCREMENT,
   Password VARCHAR(128)  NOT NULL,
   Lastname VARCHAR(30)  NOT NULL,
   Firstname VARCHAR(30)  NOT NULL,
   Email VARCHAR(100)  NOT NULL,
   Matricule VARCHAR(7)  NOT NULL,
   FirstConnection BOOLEAN Default 1,
   RoleId INT NOT NULL,
   PRIMARY KEY(UsersId),
   UNIQUE(Email),
   UNIQUE(Matricule),
   FOREIGN KEY(RoleId) REFERENCES Role(RoleId)
);

CREATE TABLE Book(
   DeviceId INT,
   StartDate DATETIME,
   EndDate DATETIME,
   UsersId INT NOT NULL,
   PRIMARY KEY(DeviceId, StartDate),
   FOREIGN KEY(DeviceId) REFERENCES Device(DeviceId),
   FOREIGN KEY(UsersId) REFERENCES Users(UsersId)
);
