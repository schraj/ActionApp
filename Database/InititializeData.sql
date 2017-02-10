USE ActionApp
GO

INSERT INTO CodeSets.CodeSetCategory
			(DisplayName,
			CategoryDescription)			
VALUES      ('Geography')

INSERT INTO CodeSets.CodeSet (CodeSetCategoryId, Name, DisplayName, CodeSetDescription)
VALUES
(1,'GovernmentLevel', 'Government Level', ''),
(1,'EventType', 'Event Type', ''),
(1,'MemberType', 'Member Type', 'For an action, is it for your own member, a specific member, all members'),
(1,'EventType', 'Event Type', '')

INSERT INTO CodeSets.Code (CodeSetId, Name, DisplayName, CodeDescription)
VALUES
(1,'FedPresident', 'Federal President', ''),
(1,'FedHouse', 'Federal House of Representatives', ''),
(1,'FedSen', 'Federal Senate', ''),
(1,'StateGov', 'State Governor', ''),
(1,'StateHouse', 'State House of Representatives', ''),
(1,'StateSen', 'State Senate', '')

INSERT INTO 

 
