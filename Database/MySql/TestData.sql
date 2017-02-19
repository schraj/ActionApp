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
(1,'test issue', 'test desc');

INSERT INTO `actionapp`.`actionitem`
(
`Issue_ID`,
`ActionItemName`,
`ActionItemStartDate`,
`ActionItemEndDate`,
`ActionItemType`,
`ActionItemDescription`)
VALUES
(1,'test ai', '2000-1-1', '2010-1-1', 1, 'test d');

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
(
'1',
'2'
);


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

