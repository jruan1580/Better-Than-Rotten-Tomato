
-- =============================================
-- author:		anakaren rojas
-- create date: 08/22/2021
-- description: procedure to pull a single movie from from database based on id provided 
-- =============================================
use betterthanrottentomato;

if exists(select 1 from sysobjects where id = object_id(N'[dbo].[GetMovieById]') and objectproperty(id, N'isprocedure') = 1 )
begin
	drop procedure [dbo].[GetMovieById];
end
go

create procedure [dbo].[GetMovieById] 
	-- add the parameters for the stored procedure here
	@Id bigint
as
begin
	-- set nocount on added to prevent extra result sets from
	-- interfering with select statements.
	set nocount on;
	declare @AverageRating int = (select avg(mr.Rating) from dbo.MovieReviews mr where mr.MovieId = @Id);

    -- insert statements for procedure here
	select top 1  *, @AverageRating 
	from dbo.Movie m
	where m.Id = @Id;
end
go
