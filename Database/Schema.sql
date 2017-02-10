USE [ActionApp]
GO

IF NOT EXISTS (
SELECT  schema_name
FROM    information_schema.schemata
WHERE   schema_name = 'CodeSets' )
 
BEGIN
EXEC sp_executesql N'CREATE SCHEMA CodeSets'   
END
GO

IF NOT EXISTS (
SELECT  schema_name
FROM    information_schema.schemata
WHERE   schema_name = 'Data' )
 
BEGIN
EXEC sp_executesql N'CREATE SCHEMA Data'   
END
GO

IF NOT EXISTS (
SELECT  schema_name
FROM    information_schema.schemata
WHERE   schema_name = 'Account' )
 
BEGIN
EXEC sp_executesql N'CREATE SCHEMA Account'   
END
GO

--delete existing constraints
DECLARE @sql NVARCHAR(MAX);
SET @sql = N'';

SELECT @sql = @sql + N'
  ALTER TABLE ' + QUOTENAME(s.name) + N'.'
  + QUOTENAME(t.name) + N' DROP CONSTRAINT '
  + QUOTENAME(c.name) + ';'
FROM sys.objects AS c
INNER JOIN sys.tables AS t
ON c.parent_object_id = t.[object_id]
INNER JOIN sys.schemas AS s 
ON t.[schema_id] = s.[schema_id]
WHERE c.[type] IN ('D','C','F','PK','UQ')
ORDER BY c.[type];

--EXEC sys.sp_executesql @sql;
Print @sql

--Delete tables
EXEC sp_MSforeachtable @command1 = "DROP TABLE ?"
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

/******************************************************************************************************

OFFICIAL

******************************************************************************************************/

CREATE TABLE [Data].[Official](
	OfficialId int identity(1,1) not null,
	FirstName varchar(100) not null,
	LastName varchar(100) not null,
	Twitter varchar(100) null,
	Facebook varchar(100) null,
	[Timestamp] timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM'
 CONSTRAINT [PK_OfficialId] PRIMARY KEY CLUSTERED 
 (	
   OfficialId ASC
 ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
 ) ON [PRIMARY]

 
/******************************************************************************************************

EVENT

******************************************************************************************************/

CREATE TABLE [Data].[Event](
	EventId int identity(1,1) not null,
	Name varchar(100) not null,
	EventDate datetime NOT NULL,
	EventTime datetime NOT NULL,
	EventType int NOT NULL, -- from eventtype codeset
	EventDescription varchar(Max) null,
	[Timestamp] timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM'
 CONSTRAINT [PK_EventId] PRIMARY KEY CLUSTERED 
 (	
   EventId ASC
 ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
 ) ON [PRIMARY]

  CREATE TABLE Data.Event_Official(
	Event_OfficialId int identity(1,1) not null,
	EventId int not null,
	OfficialId int not null,
	[Timestamp] timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM'
 CONSTRAINT [PK_Event_OfficialId] PRIMARY KEY CLUSTERED 
 (	
   Event_OfficialId ASC
 ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
 ) ON [PRIMARY]

 ALTER TABLE Data.Event_Official 
 ADD CONSTRAINT	FK_Event_Event_Official FOREIGN KEY (EventId) 
 REFERENCES Data.[Event] (EventId) 
 ON UPDATE NO ACTION ON DELETE NO ACTION

 ALTER TABLE Data.Event_Official 
 ADD CONSTRAINT	FK_Official_Event_Official FOREIGN KEY (OfficialId) 
 REFERENCES Data.[Official] (OfficialId) 
 ON UPDATE NO ACTION ON DELETE NO ACTION


/******************************************************************************************************

ISSUE/ACTION

******************************************************************************************************/

CREATE TABLE [Data].[Issue](
	IssueId int identity(1,1) not null,
	Name varchar(100) not null,
	IssueDescription varchar(Max) NOT NULL,
	[Timestamp] timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM'
 CONSTRAINT [PK_IssueId] PRIMARY KEY CLUSTERED 
 (	
   IssueId ASC
 ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
 ) ON [PRIMARY]

CREATE TABLE [Data].[Action](
	 ActionId int identity(1,1) not null,
	 IssueId int not null,	 
	 Name varchar(100) not null,
	 ActionDateStart datetime NOT NULL,
	 ActionDateEnd datetime NOT NULL, 
	 ActionDescription varchar(Max) NOT NULL,
	 ScriptTemplate varchar(Max) NULL,
	 [Timestamp] timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM'
 CONSTRAINT [PK_ActionId] PRIMARY KEY CLUSTERED 
 (	
   ActionId ASC
 ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
 ) ON [PRIMARY]

 ALTER TABLE Data.Action 
 ADD CONSTRAINT	FK_Action_Issue FOREIGN KEY (IssueId) 
 REFERENCES Data.Issue (IssueId) 
 ON UPDATE CASCADE ON DELETE CASCADE
	

/******************************************************************************************************

RESOURCE

******************************************************************************************************/

CREATE TABLE [Data].[Resource](
	 ResourceId int identity(1,1) not null,
	 Name varchar(100) NULL,
	 ResourceDescription varchar(Max) null,
	 Url varchar(100) NULL,
	 Media binary null,
	 [Timestamp] timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM'
 CONSTRAINT [PK_ResourceId] PRIMARY KEY CLUSTERED 
 (	
   ResourceId ASC
 ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
 ) ON [PRIMARY]

 CREATE TABLE Data.Resource_Official(
	Resource_OfficialId int identity(1,1) not null,
	ResourceId int not null,
	OfficialId int not null,
	[Timestamp] timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM'
 CONSTRAINT [PK_Resource_OfficialId] PRIMARY KEY CLUSTERED 
 (	
   Resource_OfficialId ASC
 ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
 ) ON [PRIMARY]


/******************************************************************************************************

CodeSets

******************************************************************************************************/

 CREATE TABLE [CodeSets].[CodeSetCategory]  (
	CodeSetCategoryId int IDENTITY(1,1) NOT NULL,
	DisplayName varchar(50) NOT NULL,
	CategoryDescription varchar(1000) NULL,
	[Timestamp] timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM'
 CONSTRAINT [PK_CodeSetCategory] PRIMARY KEY CLUSTERED 
(
	[CodeSetCategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

 CREATE TABLE [CodeSets].[CodeSet](
	CodeSetId int IDENTITY(1,1) NOT NULL,
	CodeSetCategoryId int NOT NULL,
	Name varchar(100) NOT NULL,
	DisplayName varchar(100) NOT NULL,
	CodeSetDescription varchar(1000) NULL,
	[Timestamp] timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM'
 CONSTRAINT [PK_CodeSet] PRIMARY KEY CLUSTERED 
(
	[CodeSetId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

 ALTER TABLE CodeSets.CodeSet 
 ADD CONSTRAINT	FK_CodeSet_CodeSetCategory FOREIGN KEY (CodeSetCategoryId) 
 REFERENCES CodeSets.CodeSetCategory (CodeSetCategoryId) 
 ON UPDATE CASCADE ON DELETE CASCADE

 CREATE TABLE [CodeSets].[Code](
	CodeId int IDENTITY(1,1) NOT NULL,
	CodeSetId int NOT NULL,
	Name varchar(100) NOT NULL,
	DisplayName varchar(100) NOT NULL,
	CodeDescription varchar(1000) NULL,
	[Timestamp] timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM'
 CONSTRAINT [PK_Code] PRIMARY KEY CLUSTERED 
(
	[CodeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

 ALTER TABLE CodeSets.Code 
 ADD CONSTRAINT	FK_Code_CodeSet FOREIGN KEY (CodeSetId) 
 REFERENCES CodeSets.CodeSet (CodeSetId) 
 ON UPDATE CASCADE ON DELETE CASCADE

CREATE TABLE Account.Person(
	PersonId int identity(1,1) not null,
	FirstName varchar(100) not null,
	LastName varchar(100) not null,
	Twitter varchar(100) null,
	Facebook varchar(100) null,
	ZipCode varchar(20) null,
	[Timestamp] timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM'
 CONSTRAINT [PK_PersonId] PRIMARY KEY CLUSTERED 
 (	
   PersonId ASC
 ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
 ) ON [PRIMARY]

/******************************************************************************************************

ACTION GROUP

******************************************************************************************************/

CREATE TABLE Account.ActionGroup(
	ActionGroupId int identity(1,1) not null,
	ActionGroupName varchar(100) not null,
	[Timestamp] timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM'
 CONSTRAINT [PK_ActionGroupId] PRIMARY KEY CLUSTERED 
 (	
   ActionGroupId ASC
 ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
 ) ON [PRIMARY]

 CREATE TABLE Account.Person_ActionGroup(
	Person_ActionGroupId int identity(1,1) not null,
	PersonId int not null,
	ActionGroupId int not null,
	[Timestamp] timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM'
 CONSTRAINT [PK_Person_ActionGroupId] PRIMARY KEY CLUSTERED 
 (	
   Person_ActionGroupId ASC
 ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
 ) ON [PRIMARY]

 ALTER TABLE Account.Person_ActionGroup 
 ADD CONSTRAINT	FK_Person_ActionGroup_Person FOREIGN KEY (PersonId) 
 REFERENCES Account.Person (PersonId) 
 ON UPDATE NO ACTION ON DELETE NO ACTION

 ALTER TABLE Account.Person_ActionGroup 
 ADD CONSTRAINT	FK_Person_ActionGroup_ActionGroup FOREIGN KEY (ActionGroupId) 
 REFERENCES Account.ActionGroup (ActionGroupId) 
 ON UPDATE NO ACTION ON DELETE NO ACTION


CREATE TABLE Account.Challenge(
	ChallengeId int identity(1,1) not null,
	ChallengeName varchar(100) not null,
	[Timestamp] timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedDateTime datetime NOT NULL DEFAULT GetDate(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM'
 CONSTRAINT [PK_ChallengeId] PRIMARY KEY CLUSTERED 
 (	
   ChallengeId ASC
 ) WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
 ) ON [PRIMARY]


