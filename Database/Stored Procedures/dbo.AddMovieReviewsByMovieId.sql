
-- =============================================
-- author:		anakaren rojas
-- create date: 08/22/2021
-- description:	procedure to add new review / comment based on movie id 
-- =============================================
use betterthanrottentomato;

if exists(select 1 from sysobjects where id = object_id(N'[dbo].[AddMovieReviewsByMovieId]') and objectproperty(id, N'isprocedure') = 1 )
begin
	drop procedure [dbo].[AddMovieReviewsByMovieId];
end
go

create procedure [dbo].[AddMovieReviewsByMovieId] 
	-- add the parameters for the stored procedure here
	@MovieId bigint,
	@Comment varchar(max),
	@Rating int,
	@Username varchar(max)
as
begin
	-- set nocount on added to prevent extra result sets from
	-- interfering with select statements.
	set nocount on;

    -- insert statements for procedure here
	insert into dbo.moviereviews
	(
		MovieId,
		Rating,
		Comment,
		UserName
	)
	values
	(
		@MovieId,
		@Rating,
		@Comment,
		@Username
	);
end
go
