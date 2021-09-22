
-- =============================================
-- author:		anakaren rojas
-- create date: 08/22/2021
-- description:	procedure to pull reviews by movie id 
-- =============================================

use betterthanrottentomato;

if exists(select 1 from sysobjects where id = object_id(N'[dbo].[GetReviewsByMovieId]') and objectproperty(id, N'isprocedure') = 1 )
begin
	drop procedure [dbo].[GetReviewsByMovieId];
end
go

create procedure [dbo].[GetReviewsByMovieId] 
	-- add the parameters for the stored procedure here
	@MovieId bigint,
	@Offset int,
	@Page int
as
begin
	-- set nocount on added to prevent extra result sets from
	-- interfering with select statements.
	set nocount on;

	declare @Total int = (select count(*) from dbo.moviereviews where movieid = @movieid); 

    -- insert statements for procedure here
	select 
	mr.Id,
	mr.Comment,
	mr.Rating,
	mr.MovieId,
	mr.UserName,
	@Total

	from dbo.MovieReviews mr
	where mr.MovieId = @MovieId
	order by mr.Id
	offset ((@Page - 1) * @Offset) rows
	fetch next @Offset rows only;
end
go
