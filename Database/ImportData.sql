USE [ActionApp]
GO

--update ActionAppStaging.dbo.[legislators-current] 
--set stateid = c.CodeDefinition
--from CodeSets.Code c inner join ActionAppStaging.dbo.[legislators-current] l
--on c.DisplayName = l.state
--where c.CodeSetId = 1

INSERT INTO [Data].[Official]
           ([FirstName]
           ,[LastName]
		   ,GovernmentLevelId
		   ,GeographyId
           ,[Gender]
		   ,phone
           ,[Party]
           ,[Url]
           ,[ContactForm]
           ,[Twitter]
           ,[Facebook])
select first_name,
		last_name,
		case [type]
		when 'sen' then 3
		when 'rep' then 2
		end,
		case [type]
		when 'sen' then cast(stateid as varchar)
		when 'rep' then cast(stateid as varchar) + '-' + cast(district as varchar)
		end,
		case gender
		when 'M' then '3'
		when 'F' then '2'
		end,
		phone,
		case party
		when 'Democrat' then '1'
		when 'Republican' then '5'
		when 'Independent' then '2'
		end,
		url,
		contact_form,
		twitter,
		facebook
From ActionAppStaging.dbo.[federal-legislators-current]
where stateid is not null

INSERT INTO [Data].[Official]
           ([FirstName]
           ,[LastName]
		   ,GovernmentLevelId
		   ,GeographyId
		   ,phone
		   ,email
           ,Party)
select 
	SUBSTRING([Member Name], 1, CASE CHARINDEX(' ', [Member Name])
            WHEN 0
                THEN LEN([Member Name])
            ELSE CHARINDEX(' ', [Member Name]) - 1
            END) AS FirstName
    ,SUBSTRING([Member Name], CASE CHARINDEX(' ', [Member Name])
            WHEN 0
                THEN LEN([Member Name]) + 1
            ELSE CHARINDEX(' ', [Member Name]) + 1
            END, 1000) AS LastName,
		6,
		'53-' + cast(District as varchar),
		phone,
		email,
		case party
		when 'D' then '1'
		when 'R' then '5'
		when 'I' then '2'
		end
From ActionAppStaging.dbo.StateSenate


INSERT INTO [Data].[Official]
           ([FirstName]
           ,[LastName]
		   ,GovernmentLevelId
		   ,GeographyId
		   ,phone
		   ,email
           ,Party)
select 
	SUBSTRING([Member Name], 1, CASE CHARINDEX(' ', [Member Name])
            WHEN 0
                THEN LEN([Member Name])
            ELSE CHARINDEX(' ', [Member Name]) - 1
            END) AS FirstName
    ,SUBSTRING([Member Name], CASE CHARINDEX(' ', [Member Name])
            WHEN 0
                THEN LEN([Member Name]) + 1
            ELSE CHARINDEX(' ', [Member Name]) + 1
            END, 1000) AS LastName,
		5,
		'53-' + cast(District as varchar),
		phone,
		email,
		case party
		when 'D' then '1'
		when 'R' then '5'
		when 'I' then '2'
		end
From ActionAppStaging.dbo.StateHouse



