use BetterThanRottenTomato;

if exists(SELECT 1 FROM sysobjects WHERE id = object_id(N'[dbo].[GetMoviesByParams]') and OBJECTPROPERTY(id, N'IsProcedure') = 1 )
begin
	drop procedure [dbo].[GetMoviesByParams];
end
go

create procedure [dbo].[GetMoviesByParams]
(
	@SearchBy varchar(500) = null,
	@SearchGenres dbo.SearchByGenre readonly,
	@page int,
	@offset int
)
as
begin
	
	set nocount on;
	declare @genreIds table
	(
		Id int
	);

	insert into @genreIds
	select
		genre.Id
	from [dbo].[MovieGenre] genre
		join @SearchGenres search 
			on genre.Genre = search.Genre
	where genre.Active = '1';

	select
		movie.[Id],
		movie.[Name],
		movie.[Description],
		movie.[YearReleased],
		movie.[Picture]
	from [dbo].[Movie] movie
		join @genreIds genreIds 
			on movie.GenreId = genreIds.Id
	where movie.[Name] like (case when @SearchBy is null or @SearchBy = '' then movie.[Name] else '%' + @SearchBy + '%' end)
	order by movie.[Id]
	offset ((@page - 1) * @offset) rows
	fetch next @offset rows only;

end