USE actionapp;

-- alter table federallegislators add column stateid int null

/* update actionappstaging.federallegislators t
inner join actionapp.lookupitem l
on l.DisplayName = t.state and l.Lookup_ID = 1
set t.stateid = l.LookupItemDefinition
*/

-- truncate table actionapp.official;

INSERT INTO actionapp.official
           (FirstName
           ,LastName
		   ,GovernmentLevelId
		   ,GeographyId
           ,Gender
		   ,phone
           ,Party
           ,Url
           ,ContactForm
           ,Twitter
           ,Facebook)
select first_name,
		last_name,
		case type
		when 'sen' then 3
		when 'rep' then 2
		end,
		case type
		when 'sen' then cast(stateid as char(2))
		when 'rep' then Concat(cast(stateid as char(2)),'-',cast(district as char(2)))
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
From actionappstaging.federallegislators
where stateid is not null;

INSERT INTO actionapp.official
           (FirstName
           ,LastName
		   ,GovernmentLevelId
		   ,GeographyId
		   ,phone
		   ,email
           ,Party)
select 
		SUBSTRING_INDEX(`Member Name`, '\n', 1),
        SUBSTRING_INDEX(`Member Name`, '\n', 2),
        6,
		concat('53-',cast(District as char(2))),
		phone,
		email,
		case party
		when 'D' then '1'
		when 'R' then '5'
		when 'I' then '2'
		end
From actionappstaging.StateSenate;

INSERT INTO actionapp.official
           (FirstName
           ,LastName
		   ,GovernmentLevelId
		   ,GeographyId
		   ,phone
		   ,email
           ,Party)
select 
		SUBSTRING_INDEX(`Member Name`, '\n', 1),
        SUBSTRING_INDEX(`Member Name`, '\n', 2),
        5,
		concat('53-',cast(District as char(2))),
		phone,
		email,
		case party
		when 'D' then '1'
		when 'R' then '5'
		when 'I' then '2'
		end
From actionappstaging.StateHouse;


