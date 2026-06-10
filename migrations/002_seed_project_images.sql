-- Seed existing project images into portfolio_images table
DELETE FROM portfolio_images;

INSERT INTO portfolio_images (project_id, filename, sort_order) VALUES
  ('bigscreen', 'portfolio/bigscreen-bigscreen.svg', 0),
  ('bigscreen', 'portfolio/bigscreen-bigscreen1.jpg', 1),
  ('bigscreen', 'portfolio/bigscreen-bigscreen2.jpg', 2);

INSERT INTO portfolio_images (project_id, filename, sort_order) VALUES
  ('economy-platform', 'portfolio/economy-platform-economy-platform.svg', 0),
  ('economy-platform', 'portfolio/economy-platform-economy-platform1.jpg', 1),
  ('economy-platform', 'portfolio/economy-platform-economy-platform2.jpg', 2);

INSERT INTO portfolio_images (project_id, filename, sort_order) VALUES
  ('building', 'portfolio/building-building.svg', 0),
  ('building', 'portfolio/building-building1.jpeg', 1),
  ('building', 'portfolio/building-building2.jpeg', 2),
  ('building', 'portfolio/building-building3.jpeg', 3),
  ('building', 'portfolio/building-building4.jpeg', 4),
  ('building', 'portfolio/building-building5.jpeg', 5);

INSERT INTO portfolio_images (project_id, filename, sort_order) VALUES
  ('smart-community', 'portfolio/smart-community-smart-community.svg', 0),
  ('smart-community', 'portfolio/smart-community-smart-community1.jpg', 1),
  ('smart-community', 'portfolio/smart-community-smart-community2.jpg', 2),
  ('smart-community', 'portfolio/smart-community-smart-community3.jpg', 3),
  ('smart-community', 'portfolio/smart-community-smart-community4.jpg', 4),
  ('smart-community', 'portfolio/smart-community-smart-community5.jpg', 5);

INSERT INTO portfolio_images (project_id, filename, sort_order) VALUES
  ('river-chief', 'portfolio/river-chief-river-chief.svg', 0),
  ('river-chief', 'portfolio/river-chief-river-chief1.jpg', 1),
  ('river-chief', 'portfolio/river-chief-river-chief2.jpg', 2),
  ('river-chief', 'portfolio/river-chief-river-chief3.jpg', 3),
  ('river-chief', 'portfolio/river-chief-river-chief4.jpg', 4);

INSERT INTO portfolio_images (project_id, filename, sort_order) VALUES
  ('invest-learn', 'portfolio/invest-learn-invest-learn.svg', 0),
  ('invest-learn', 'portfolio/invest-learn-invest-learn1.jpg', 1),
  ('invest-learn', 'portfolio/invest-learn-invest-learn2.jpg', 2),
  ('invest-learn', 'portfolio/invest-learn-invest-learn3.jpg', 3),
  ('invest-learn', 'portfolio/invest-learn-invest-learn4.jpg', 4);
