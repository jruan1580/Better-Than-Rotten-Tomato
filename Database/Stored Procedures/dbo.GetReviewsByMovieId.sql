
-- =============================================
-- Author:		Anakaren Rojas
-- Create date: 08/22/2021
-- Description:	Procedure to pull reviews by Movie Id 
-- =============================================

USE BetterThanRottenTomato;

if exists(SELECT 1 FROM sysobjects WHERE id = object_id(N'[dbo].[GetReviewsByMovieId]') and OBJECTPROPERTY(id, N'IsProcedure') = 1 )
begin
	drop procedure [dbo].[GetReviewsByMovieId];
end
go

CREATE PROCEDURE [dbo].[GetReviewsByMovieId] 
	-- Add the parameters for the stored procedure here
	@MovieId bigint,
	@Offset int,
	@Page int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @Total int = (select count(*) from dbo.MovieReviews where MovieId = @MovieId); 

    -- Insert statements for procedure here
	SELECT 
	mr.Id,
	mr.Comment,
	mr.Rating,
	mr.MovieId,
	@Total

	FROM dbo.MovieReviews mr
	WHERE mr.MovieId = @MovieId
	order by mr.Id
	offset ((@Page - 1) * @offset) rows
	fetch next @offset rows only;
END
GO
