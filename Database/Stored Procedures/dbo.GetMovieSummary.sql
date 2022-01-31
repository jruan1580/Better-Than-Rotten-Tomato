USE [BetterThanRottenTomato]
GO
/****** Object:  StoredProcedure [dbo].[GetMovieSummary]    Script Date: 1/23/2022 1:20:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Anakaren Rojas
-- Create date: 01/23/22
-- Description:	Returns movie name, description, average rating, and picture
-- =============================================
ALTER PROCEDURE [dbo].[GetMovieSummary] 
	-- Add the parameters for the stored procedure here
	@MovieId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	declare @AverageRating int = (select AVG(Rating) from dbo.moviereviews where movieid = @movieid); 
    -- Insert statements for procedure here
	SELECT Distinct m.Name, m.Description, m.Picture, @AverageRating as 'AverageRating' 
	from dbo.Movie m
	Join dbo.MovieReviews mr on m.Id = mr.MovieId
	Where m.Id = @MovieId
END
