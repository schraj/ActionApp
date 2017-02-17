INSERT INTO `actionapp`.`issue`
(
`IssueName`,
`IssueDescription`)
VALUES
('test issue', 'test desc');

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
