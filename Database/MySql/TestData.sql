delete from `actionapp`.`issue`
where ID <= 3;

delete from `actionapp`.`actionitem`
where ID=1;


INSERT INTO `actionapp`.`channel`
(
`ChannelName`,
`ChannelDescription`)
VALUES
('test channel', 'test c desc');

INSERT INTO `actionapp`.`issue`
(
 `Channel_ID`,
`IssueName`,
`IssueDescription`)
VALUES
(1,'Appointment of Scott Pruitt to head the EPA', 'Scott Pruitt was the Attorney General of Oklahoma and had an abysmal record.  He wanted to destroy the EPA and he worked for the interests of the oil companies.  The Sierra Cliub said that putting him in charge of the EPA is like "putting an arsonist in charge of the fire department"'),
(1,'Appointment of Jeff Sessions to head the DOJ', 'Jeff Sessions has a long history of working against civil rights from his time as AG of Alabama to his time in the Senate.  He was denied a seat on XXX in the 80s due to racist statements.  Coretta Scott King stated that "Jeff Sessions is unfit for any office."');

INSERT INTO `actionapp`.`actionitem`
(
`Issue_ID`,
`ActionItemName`,
`ActionItemStartDate`,
`ActionItemEndDate`,
`ActionItemType`,
`ActionItemDescription`)
VALUES
(38,'Call Your Federal Officials about Scott Pruitt', '2017-3-1', '2017-4-1', 1, 'Call your officials about this'),
(38,'Thank Senator Cantwell for her opposition to Scott Pruitt', '2017-3-1', '2017-4-1', 1, 'test d'),
(39,'Call Your Federal Officials about Jeff Sessions', '2017-3-1', '2017-4-1', 1, 'test d');

INSERT INTO `actionapp`.`resource`
(
`ResourceName`,
`ResourceDescription`,
`Url`)
VALUES
(
'test resource',
'test r desc',
'url test'
);

INSERT INTO `actionapp`.`resource_official`
(
`Resource_ID`,
`Official_ID`)
VALUES
(
'1',
'2'
);

INSERT INTO `actionapp`.`actionitem_official`
(
`ActionItem_ID`,
`Official_ID`)
VALUES
('2','2'),
('2','217'),
('4','2'),
('4','217'),
('3','2');



INSERT INTO `actionapp`.`appuser`
(`FirstName`,
`LastName`,
`Email`,
`Address1`,
`Address2`,
`ZipCode`,
`City`,
`State`,
`Gender`,
`Points`
)
VALUES
('Jeremy','Schrader', 'schraj@gmail.com', '8125 Ellison Loop NW',
'','98502', 'Olympia', 'WA', 1, 0);

