use BetterThanRottenTomato;

if exists(SELECT 1 FROM sysobjects WHERE id = object_id(N'[dbo].[GetMovieGenres]') and OBJECTPROPERTY(id, N'IsProcedure') = 1 )
begin
	drop procedure [dbo].[GetMovieGenres];
end
go

create procedure [dbo].[GetMovieGenres]
as
begin

	set nocount on;

	select
		[Id],
		[Genre]
	from [dbo].[MovieGenre]
	where [Active] = '1';

end