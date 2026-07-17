-- University data recovered from the previous branch history.
-- Safe to run repeatedly: existing university names are not duplicated.
INSERT INTO universities (name, location, website)
SELECT seed.name, seed.location, seed.website
FROM (VALUES
  ('Cambodia Academy of Digital Technology', 'Phnom Penh', 'https://www.cadt.edu.kh'),
  ('Institute of Technology of Cambodia', 'Phnom Penh', 'https://itc.edu.kh'),
  ('Royal University of Phnom Penh', 'Phnom Penh', 'https://rupp.edu.kh')
) AS seed(name, location, website)
WHERE NOT EXISTS (
  SELECT 1 FROM universities existing WHERE existing.name = seed.name
);
