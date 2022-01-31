USE [BetterThanRottenTomato]
GO
/****** Object:  StoredProcedure [dbo].[GetReviewsByMovieId]    Script Date: 1/9/2022 11:53:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER procedure [dbo].[GetReviewsByMovieId] 
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
	@Total as 'Total'

	from dbo.MovieReviews mr
	where mr.MovieId = @MovieId
	order by mr.Id
	offset ((@Page - 1) * @Offset) rows
	fetch next @Offset rows only;
end
