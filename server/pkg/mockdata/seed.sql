-- Clear existing data
TRUNCATE TABLE pet_likes CASCADE;
TRUNCATE TABLE messages CASCADE;
TRUNCATE TABLE pet_metadata CASCADE;
TRUNCATE TABLE pets CASCADE;
TRUNCATE TABLE user_metadata CASCADE;
TRUNCATE TABLE users CASCADE;
TRUNCATE TABLE shelters CASCADE;

-- Reset sequences
ALTER SEQUENCE shelters_id_seq RESTART WITH 1;
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE pets_id_seq RESTART WITH 1;

-- Insert shelters
INSERT INTO shelters (name, address, city, state, zip_code, phone_number, email, website, description, latitude, longitude, created_at, updated_at)
VALUES
  ('Happy Paws Rescue', '123 Main St', 'New York', 'NY', '10001', '212-555-1234', 'info@happypaws.org', 'www.happypaws.org', 'Happy Paws Rescue is dedicated to finding loving homes for dogs and cats in need.', 40.7128, -74.0060, NOW(), NOW()),
  ('Second Chance Animal Shelter', '456 Oak Ave', 'Los Angeles', 'CA', '90001', '310-555-5678', 'contact@secondchanceas.org', 'www.secondchanceas.org', 'We believe every animal deserves a second chance at a happy life.', 34.0522, -118.2437, NOW(), NOW()),
  ('Furry Friends Sanctuary', '789 Pine Rd', 'Chicago', 'IL', '60601', '312-555-9012', 'sanctuary@furryfriends.org', 'www.furryfriends.org', 'A no-kill sanctuary providing care for abandoned and abused animals.', 41.8781, -87.6298, NOW(), NOW());

-- Insert users
-- Note: In a real deployment, passwords would be properly hashed
-- For demonstration, we're using placeholder hashed passwords
INSERT INTO users (username, email, password, is_owner, created_at, updated_at, first_name, last_name, phone, role, liked_pets)
VALUES
  ('johndoe', 'john.doe@example.com', '$2a$10$dV7wm0VL9hvMWevrTJP9kOh/J2uUxP0OKJ7zdkEGmFYyxVrwUaq.m', FALSE, NOW(), NOW(), 'John', 'Doe', '555-123-4567', 'user', '[]'::jsonb),
  ('janesmith', 'jane.smith@example.com', '$2a$10$ND9woETF9LBAwGy4Ts4DJuXEQ5KcYESgpnA9nqJrrY3FtcYpfoAoO', TRUE, NOW(), NOW(), 'Jane', 'Smith', '555-234-5678', 'user', '[]'::jsonb),
  ('mikeross', 'mike.ross@example.com', '$2a$10$1nB8BRRwUZdXDJuS8oYp0eFnQP8Mmo9ZJ/GBvGj9U8.d5AK2f0HaG', FALSE, NOW(), NOW(), 'Mike', 'Ross', '555-345-6789', 'user', '[]'::jsonb),
  ('adminuser', 'admin@pumplepet.com', '$2a$10$YJTvKiXZ4vAdSKKMCeqgHe1mYi54wQ3suvOWjz.Xs8GY8AiLwqOHq', FALSE, NOW(), NOW(), 'Admin', 'User', '555-987-6543', 'admin', '[]'::jsonb);

-- Insert user metadata
INSERT INTO user_metadata (user_id, home_environment, life_style, preferences, created_at, updated_at)
VALUES
  (1, 'apartment', 'active', 'small dogs, cats', NOW(), NOW()),
  (2, 'house with yard', 'athletic', 'large dogs', NOW(), NOW()),
  (3, 'suburban home', 'relaxed', 'senior pets', NOW(), NOW()),
  (4, 'office', 'busy', 'all animals', NOW(), NOW());

-- Insert pets
INSERT INTO pets (name, species, breed, age, gender, size, description, status, shelter_id, user_id, like_count, created_at, updated_at)
VALUES
  ('Buddy', 'Dog', 'Golden Retriever', 3.5, 'Male', 'Large', 'Buddy is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks.', 'available', 1, NULL, 15, NOW(), NOW()),
  ('Luna', 'Cat', 'Siamese', 2.0, 'Female', 'Small', 'Luna is a gentle Siamese cat who loves to curl up in laps and play with string toys.', 'available', 2, NULL, 22, NOW(), NOW()),
  ('Max', 'Dog', 'German Shepherd', 5.0, 'Male', 'Large', 'Max is a well-trained German Shepherd with a calm demeanor. He''s great with kids and other pets.', 'adopted', 1, 2, 18, NOW(), NOW()),
  ('Daisy', 'Dog', 'Beagle', 1.5, 'Female', 'Medium', 'Daisy is a young and playful Beagle who loves to explore and follow her nose.', 'available', 3, NULL, 25, NOW(), NOW()),
  ('Oliver', 'Cat', 'Maine Coon', 4.0, 'Male', 'Large', 'Oliver is a majestic Maine Coon with a sweet personality. He enjoys climbing and observing from high perches.', 'available', 2, NULL, 12, NOW(), NOW()),
  ('Rocky', 'Dog', 'Boxer', 3.0, 'Male', 'Large', 'Rocky is an energetic boxer who needs an active family. He''s great with older children.', 'available', 1, NULL, 8, NOW(), NOW()),
  ('Cleo', 'Cat', 'Domestic Shorthair', 7.0, 'Female', 'Small', 'Cleo is a sweet senior cat who loves quiet environments and gentle affection.', 'adopted', 3, 2, 5, NOW(), NOW()),
  ('Charlie', 'Dog', 'Labrador Retriever', 2.0, 'Male', 'Large', 'Charlie is a playful and affectionate Labrador who loves swimming and playing fetch.', 'available', 2, NULL, 19, NOW(), NOW()),
  ('Whiskers', 'Cat', 'Tabby', 1.0, 'Male', 'Small', 'Whiskers is a curious and playful kitten who loves toys and climbing.', 'available', 1, NULL, 14, NOW(), NOW()),
  ('Bella', 'Dog', 'Poodle', 6.0, 'Female', 'Medium', 'Bella is a well-mannered poodle who is house-trained and knows several commands.', 'available', 3, NULL, 11, NOW(), NOW());

-- Insert pet metadata
INSERT INTO pet_metadata (pet_id, color, weight, medical_history, vaccinated, neutered, special_needs)
VALUES
  (1, 'Golden', 70.5, 'Fully vaccinated, no health issues', TRUE, TRUE, ''),
  (2, 'Cream with chocolate points', 8.2, 'Recent dental cleaning, all vaccinations up to date', TRUE, TRUE, ''),
  (3, 'Black and Tan', 85.0, 'Mild hip dysplasia, managed with supplements', TRUE, TRUE, 'Joint supplements recommended'),
  (4, 'Tricolor', 22.5, 'Fully vaccinated, dewormed', TRUE, TRUE, ''),
  (5, 'Brown Tabby', 18.0, 'All vaccinations current, excellent health', TRUE, TRUE, ''),
  (6, 'Fawn with white markings', 65.0, 'Fully vaccinated, healthy', TRUE, FALSE, ''),
  (7, 'Black', 7.5, 'Senior wellness exam completed, mild arthritis', TRUE, TRUE, 'Joint supplements recommended for arthritis'),
  (8, 'Yellow', 75.0, 'All vaccinations current, excellent health', TRUE, TRUE, ''),
  (9, 'Orange Tabby', 6.0, 'First round of vaccinations complete', TRUE, FALSE, ''),
  (10, 'White', 45.0, 'Regular check-ups, all vaccinations current', TRUE, TRUE, '');

-- Insert pet likes (each user likes some pets)
INSERT INTO pet_likes (pet_id, user_id, status, created_at, updated_at)
VALUES
  (1, 1, TRUE, NOW(), NOW()),
  (2, 1, TRUE, NOW(), NOW()),
  (4, 1, TRUE, NOW(), NOW()),
  (3, 2, TRUE, NOW(), NOW()),
  (7, 2, TRUE, NOW(), NOW()),
  (8, 2, TRUE, NOW(), NOW()),
  (2, 3, TRUE, NOW(), NOW()),
  (5, 3, TRUE, NOW(), NOW()),
  (1, 4, TRUE, NOW(), NOW()),
  (6, 4, TRUE, NOW(), NOW());

-- Update user liked_pets arrays based on pet_likes
UPDATE users 
SET liked_pets = jsonb_build_array(1, 2, 4)
WHERE id = 1;

UPDATE users 
SET liked_pets = jsonb_build_array(3, 7, 8)
WHERE id = 2;

UPDATE users 
SET liked_pets = jsonb_build_array(2, 5)
WHERE id = 3;

UPDATE users 
SET liked_pets = jsonb_build_array(1, 6)
WHERE id = 4;

-- Insert messages
INSERT INTO messages (content, sender_id, recipient_id, created_at)
VALUES
  ('Hi there! I''m interested in adopting a pet.', 1, 4, NOW() - INTERVAL '2 days'),
  ('Hello! What kind of pet are you looking for?', 4, 1, NOW() - INTERVAL '2 days' + INTERVAL '1 hour'),
  ('I''m looking for a medium-sized dog that''s good with children.', 1, 4, NOW() - INTERVAL '2 days' + INTERVAL '2 hours'),
  ('We have several great options! Would you like to schedule a visit?', 4, 1, NOW() - INTERVAL '2 days' + INTERVAL '3 hours'),
  ('I noticed you have a Siamese cat available. Can you tell me more about Luna?', 3, 4, NOW() - INTERVAL '1 day'),
  ('Luna is a 2-year-old Siamese who''s very affectionate. Would you like to meet her?', 4, 3, NOW() - INTERVAL '1 day' + INTERVAL '30 minutes');

-- Mark pets as adopted and set adoption date
UPDATE pets
SET 
  adopted_at = NOW() - INTERVAL '15 days',
  status = 'adopted'
WHERE id IN (3, 7); 