use actionapp;

drop table politicalevent_official;
drop table resource_politicalevent;
drop table resource_issue;
drop table resource_official;
drop table actionitem_official;
drop table appuser_actionitem;
drop table politicalevent;
drop table official;
drop table lookupitem;
drop table lookup;
drop table actionitem;
drop table issue;
drop table resource;
drop table appuser;

CREATE TABLE official (
	ID int AUTO_INCREMENT not null,
	FirstName varchar(100) not null,
	LastName varchar(100) not null,
	GovernmentLevelId int not null,
	GeographyId varchar(20) not null,
	Gender int null,
	Party int null,
	Phone varchar(50) null,
	Email varchar(250) null,
	Url varchar(250) null,
	ContactForm varchar(250) null,
	Twitter varchar(100) null,
	Facebook varchar(100) null,
	Time_stamp timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM',
    Primary Key(ID)
    );

CREATE TABLE politicalevent(
	ID int AUTO_INCREMENT not null,
	PoliticalEventName varchar(100) not null,
	PoliticalEventDate datetime NOT NULL,
	PoliticalEventTime varchar(10) NOT NULL,
	PoliticalEventType int NOT NULL, -- from eventtype codeset
	PoliticalEventDescription varchar(20000) null,
	time_stamp timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM',
	PRIMARY KEY (ID)
);

CREATE TABLE politicalevent_official(
	ID int AUTO_INCREMENT not null,
	PoliticalEvent_ID int not null,
	Official_ID int not null,
	time_stamp timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM',
	PRIMARY KEY (ID),
    FOREIGN KEY (PoliticalEvent_ID) REFERENCES politicalevent(ID),
    FOREIGN KEY (Official_ID) REFERENCES official(ID)
);

CREATE TABLE issue(
	ID int AUTO_INCREMENT not null,
	IssueName varchar(100) not null,
	IssueDescription varchar(20000) null,
	time_stamp timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM',
	PRIMARY KEY (ID)
);

CREATE TABLE actionitem(
	ID int AUTO_INCREMENT not null,
	Issue_ID int not null,
	ActionItemName varchar(100) not null,
	ActionItemStartDate datetime NOT NULL,
	ActionItemEndDate datetime NOT NULL,
	ActionItemType int NOT NULL,
	ActionItemDescription varchar(20000) null,
	time_stamp timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM',    
	PRIMARY KEY (ID),
    FOREIGN KEY (Issue_ID) REFERENCES issue(ID)
);

CREATE TABLE resource(
	ID int AUTO_INCREMENT not null,
	ResourceName varchar(1000) NULL,
	ResourceDescription varchar(2000) null,
	Url varchar(1000) NULL,
	Media blob null,
	time_stamp timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM',
	PRIMARY KEY (ID)
);

CREATE TABLE resource_official(
	ID int AUTO_INCREMENT not null,
	Resource_ID int not null,
	Official_ID int not null,
	time_stamp timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM',
	PRIMARY KEY (ID),
    FOREIGN KEY (Resource_ID) REFERENCES resource(ID),
    FOREIGN KEY (Official_ID) REFERENCES official(ID)
);

CREATE TABLE resource_issue(
	ID int AUTO_INCREMENT not null,
	Resource_ID int not null,
	Issue_ID int not null,
	time_stamp timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM',
	PRIMARY KEY (ID),
    FOREIGN KEY (Resource_ID) REFERENCES resource(ID),
    FOREIGN KEY (Issue_ID) REFERENCES issue(ID)
);

CREATE TABLE resource_politicalevent(
	ID int AUTO_INCREMENT not null,
	Resource_ID int not null,
	PoliticalEvent_ID int not null,
	time_stamp timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM',
	PRIMARY KEY (ID),
    FOREIGN KEY (Resource_ID) REFERENCES resource(ID),
    FOREIGN KEY (PoliticalEvent_ID) REFERENCES politicalevent(ID)
);

CREATE TABLE actionitem_official(
	ID int AUTO_INCREMENT not null,
	ActionItem_ID int not null,
	Official_ID int not null,
	time_stamp timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM',
	PRIMARY KEY (ID),
    FOREIGN KEY (ActionItem_ID) REFERENCES actionitem(ID),
    FOREIGN KEY (Official_ID) REFERENCES official(ID)
);

CREATE TABLE lookup(
	ID int AUTO_INCREMENT not null,
	LookupName varchar(100) NOT NULL,
	DisplayName varchar(100) NOT NULL,
	LookupDescription varchar(1000) NULL,
	time_stamp timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM',
	PRIMARY KEY (ID)
);

CREATE TABLE lookupitem(
	ID int AUTO_INCREMENT not null,
	Lookup_ID int NOT NULL,
	LookupItemDefinition varchar(100) NOT NULL,  -- how the code is identified within a codeset
	LookupItemName varchar(100) NOT NULL,
	DisplayName varchar(100) NOT NULL,
	LookupItemDescription varchar(1000) NULL,
	time_stamp timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM',
	PRIMARY KEY (ID),
    FOREIGN KEY (Lookup_ID) REFERENCES lookup(ID)
);

CREATE TABLE appuser (
	ID int AUTO_INCREMENT not null,
	FirstName varchar(100) not null,
	LastName varchar(100) not null,
	Email varchar(100) not null,
	Address1 varchar(250) null,
	Address2 varchar(250) null,
	ZipCode varchar(20) null,
	City varchar(100) not null,
	State varchar(100) not null,				
    Gender int null,
    Points int null,
	Time_stamp timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM',
    Primary Key(ID)
    );
    
CREATE TABLE appuser_actionitem(
	ID int AUTO_INCREMENT not null,
	ActionItem_ID int not null,
	AppUser_ID int not null,
	Completed bit not null,
	Skipped bit not null,
	time_stamp timestamp NOT NULL,
	CreatedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedDateTime datetime NOT NULL DEFAULT NOW(),
	ModifiedByUser varchar(255) NOT NULL DEFAULT 'SYSTEM',
	PRIMARY KEY (ID),
    FOREIGN KEY (ActionItem_ID) REFERENCES actionitem(ID),
    FOREIGN KEY (AppUser_ID) REFERENCES appuser(ID)
);
    
    