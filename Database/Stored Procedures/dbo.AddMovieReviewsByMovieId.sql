
-- =============================================
-- author:		anakaren rojas
-- create date: 08/22/2021
-- description:	procedure to add new review / comment based on movie id 
-- =============================================
use betterthanrottentomato;

if exists(select 1 from sysobjects where id = object_id(N'[dbo].[addmoviereviewsbymovieid]') and objectproperty(id, N'isprocedure') = 1 )
begin
	drop procedure [dbo].[addmoviereviewsbymovieid];
end
go

create procedure [dbo].[addmoviereviewsbymovieid] 
	-- add the parameters for the stored procedure here
	@movieid bigint,
	@comment varchar(max),
	@rating int
as
begin
	-- set nocount on added to prevent extra result sets from
	-- interfering with select statements.
	set nocount on;

    -- insert statements for procedure here
	insert into dbo.moviereviews
	(
		movieid,
		rating,
		comment
	)
	values
	(
		@movieid,
		@rating,
		@comment
	);
end
go
