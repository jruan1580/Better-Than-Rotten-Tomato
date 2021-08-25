use BetterThanRottenTomato;

if exists(SELECT 1 FROM sysobjects WHERE id = object_id(N'[dbo].[AddMovie]') and OBJECTPROPERTY(id, N'IsProcedure') = 1 )
begin
	drop procedure [dbo].[AddMovie];
end
go

create procedure [dbo].[AddMovie]
(
	@Name varchar(500),
	@Description varchar(max),
	@Year int,
	@GenreId int,
	@Pic varbinary(max)
)
as
begin
	
	set nocount on;

	if exists (select 1 from [dbo].[Movie] where [Name] = @Name)
	begin
		;raiserror(N'The movie with name %s already exists', 16, 1, @Name);
	end

	insert into [dbo].[Movie]
	(
		[Name],
		[Description],
		[YearReleased],
		[GenreId],
		[Picture]
	)
	values
	(
		@Name,
		@Description,
		@Year,
		@GenreId,
		@Pic
	);
end
