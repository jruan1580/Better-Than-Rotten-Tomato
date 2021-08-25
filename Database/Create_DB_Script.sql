use master;
If(DB_ID(N'BetterThanRottenTomato') is not null)
begin
	drop database BetterThanRottenTomato;
end;
go

create database BetterThanRottenTomato;
go

use BetterThanRottenTomato;

--- craete tables

create table MovieGenre
(
	Id int not null primary key identity(1, 1),
	Genre varchar(255) not null,
	Active bit not null default ('1')
);

create table Movie
(
	Id bigint not null primary key identity(1, 1),
	[Name] varchar(500) not null,
	[Description] varchar(max) not null,
	YearReleased int not null,
	Picture varbinary(max) not null,
	GenreId int foreign key references MovieGenre(Id)
);

--- user define table types

create type SearchByGenre as table
(
	Genre varchar(255)
);

-- initial data

insert into dbo.MovieGenre
(
	Genre	
)
values
('Action'),
('Comedy'),
('Drama'),
('Fantasy'),
('Horror'),
('Romance'),
('Mystery'),
('Thriller'),
('Sci-Fi'),
('Adventure'),
('Cartoon'),
('Anime'),
('Documentary'),
('Superhero');
