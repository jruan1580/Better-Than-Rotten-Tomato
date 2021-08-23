
-- =============================================
-- Author:		Anakaren Rojas
-- Create date: 08/22/2021
-- Description: Procedure to pull a single movie from from database based on ID provided 
-- =============================================
USE BetterThanRottenTomato;

if exists(SELECT 1 FROM sysobjects WHERE id = object_id(N'[dbo].[GetMovieById]') and OBJECTPROPERTY(id, N'IsProcedure') = 1 )
begin
	drop procedure [dbo].[GetMovieById];
end
go

CREATE PROCEDURE [dbo].[GetMovieById] 
	-- Add the parameters for the stored procedure here
	@Id bigint
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT TOP 1  * 
	FROM dbo.Movie m
	WHERE m.Id = @Id;
END
GO
