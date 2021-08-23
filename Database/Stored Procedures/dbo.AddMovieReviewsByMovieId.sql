
-- =============================================
-- Author:		Anakaren Rojas
-- Create date: 08/22/2021
-- Description:	Procedure to add new review / comment based on movie id 
-- =============================================
USE BetterThanRottenTomato;

if exists(SELECT 1 FROM sysobjects WHERE id = object_id(N'[dbo].[AddMovieReviewsByMovieId]') and OBJECTPROPERTY(id, N'IsProcedure') = 1 )
begin
	drop procedure [dbo].[AddMovieReviewsByMovieId];
end
go

CREATE PROCEDURE [dbo].[AddMovieReviewsByMovieId] 
	-- Add the parameters for the stored procedure here
	@MovieId bigint,
	@Comment varchar(max),
	@Review int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	Insert into dbo.MovieReviews
	(
		MovieId,
		Review,
		Comment
	)
	Values
	(
		@MovieId,
		@Review,
		@Comment
	)
END
GO
