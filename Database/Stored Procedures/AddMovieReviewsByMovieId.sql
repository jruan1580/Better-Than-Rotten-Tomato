USE [BetterThanRottenTomato]
GO
/****** Object:  StoredProcedure [dbo].[AddMovieReviewsByMovieId]    Script Date: 8/22/2021 8:42:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[AddMovieReviewsByMovieId] 
	-- Add the parameters for the stored procedure here
	@MovieId bigint,
	@Comment varchar(max),
	@Rating int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	Insert into dbo.MovieReviews
	(
		MovieId,
		Rating,
		Comment
	)
	Values
	(
		@MovieId,
		@Rating,
		@Comment
	)
END
