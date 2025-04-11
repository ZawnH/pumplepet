package mockdata

import (
	"math/rand"
	"pumplepet-server/internal/model"
	"pumplepet-server/pkg/database"
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// Seed populates the database with mock data
func Seed() error {
	// Clear existing data (optional)
	// truncateTables()

	// Create mock shelters
	shelters, err := createShelters()
	if err != nil {
		return err
	}

	// Create mock users
	users, err := createUsers()
	if err != nil {
		return err
	}

	// Create mock pets with metadata
	pets, err := createPets(shelters)
	if err != nil {
		return err
	}

	// Create mock pet likes
	err = createPetLikes(users, pets)
	if err != nil {
		return err
	}

	// Create mock messages
	err = createMessages(users)
	if err != nil {
		return err
	}

	// Adopt some pets (assign to users)
	err = adoptPets(users, pets)
	if err != nil {
		return err
	}

	return nil
}

// truncateTables clears all existing data from tables
func truncateTables() {
	database.DB.Exec("TRUNCATE TABLE pet_likes CASCADE")
	database.DB.Exec("TRUNCATE TABLE messages CASCADE")
	database.DB.Exec("TRUNCATE TABLE pet_metadata CASCADE")
	database.DB.Exec("TRUNCATE TABLE pets CASCADE")
	database.DB.Exec("TRUNCATE TABLE user_metadata CASCADE")
	database.DB.Exec("TRUNCATE TABLE users CASCADE")
	database.DB.Exec("TRUNCATE TABLE shelters CASCADE")
}

// createShelters creates mock shelter data
func createShelters() ([]model.Shelter, error) {
	shelters := []model.Shelter{
		{
			Name:        "Happy Paws Rescue",
			Address:     "123 Main St",
			City:        "New York",
			State:       "NY",
			ZipCode:     "10001",
			PhoneNumber: "212-555-1234",
			Email:       "info@happypaws.org",
			Website:     "www.happypaws.org",
			Description: "Happy Paws Rescue is dedicated to finding loving homes for dogs and cats in need.",
			Latitude:    40.7128,
			Longitude:   -74.0060,
		},
		{
			Name:        "Second Chance Animal Shelter",
			Address:     "456 Oak Ave",
			City:        "Los Angeles",
			State:       "CA",
			ZipCode:     "90001",
			PhoneNumber: "310-555-5678",
			Email:       "contact@secondchanceas.org",
			Website:     "www.secondchanceas.org",
			Description: "We believe every animal deserves a second chance at a happy life.",
			Latitude:    34.0522,
			Longitude:   -118.2437,
		},
		{
			Name:        "Furry Friends Sanctuary",
			Address:     "789 Pine Rd",
			City:        "Chicago",
			State:       "IL",
			ZipCode:     "60601",
			PhoneNumber: "312-555-9012",
			Email:       "sanctuary@furryfriends.org",
			Website:     "www.furryfriends.org",
			Description: "A no-kill sanctuary providing care for abandoned and abused animals.",
			Latitude:    41.8781,
			Longitude:   -87.6298,
		},
	}

	for i := range shelters {
		result := database.DB.Create(&shelters[i])
		if result.Error != nil {
			return nil, result.Error
		}
	}

	return shelters, nil
}

// createUsers creates mock user data
func createUsers() ([]model.User, error) {
	// Hash passwords
	password1, _ := bcrypt.GenerateFromPassword([]byte("password123"), bcrypt.DefaultCost)
	password2, _ := bcrypt.GenerateFromPassword([]byte("securepass"), bcrypt.DefaultCost)
	password3, _ := bcrypt.GenerateFromPassword([]byte("letmein"), bcrypt.DefaultCost)
	password4, _ := bcrypt.GenerateFromPassword([]byte("admin123"), bcrypt.DefaultCost)

	users := []model.User{
		{
			Username:  "johndoe",
			Email:     "john.doe@example.com",
			Password:  string(password1),
			FirstName: "John",
			LastName:  "Doe",
			Phone:     "555-123-4567",
			Role:      "user",
			IsOwner:   false,
			UserMetadata: model.UserMetadata{
				HomeEnvironment: "apartment",
				LifeStyle:       "active",
				Preferences:     "small dogs, cats",
			},
		},
		{
			Username:  "janesmith",
			Email:     "jane.smith@example.com",
			Password:  string(password2),
			FirstName: "Jane",
			LastName:  "Smith",
			Phone:     "555-234-5678",
			Role:      "user",
			IsOwner:   true,
			UserMetadata: model.UserMetadata{
				HomeEnvironment: "house with yard",
				LifeStyle:       "athletic",
				Preferences:     "large dogs",
			},
		},
		{
			Username:  "mikeross",
			Email:     "mike.ross@example.com",
			Password:  string(password3),
			FirstName: "Mike",
			LastName:  "Ross",
			Phone:     "555-345-6789",
			Role:      "user",
			IsOwner:   false,
			UserMetadata: model.UserMetadata{
				HomeEnvironment: "suburban home",
				LifeStyle:       "relaxed",
				Preferences:     "senior pets",
			},
		},
		{
			Username:  "adminuser",
			Email:     "admin@pumplepet.com",
			Password:  string(password4),
			FirstName: "Admin",
			LastName:  "User",
			Phone:     "555-987-6543",
			Role:      "admin",
			IsOwner:   false,
			UserMetadata: model.UserMetadata{
				HomeEnvironment: "office",
				LifeStyle:       "busy",
				Preferences:     "all animals",
			},
		},
	}

	for i := range users {
		result := database.DB.Create(&users[i])
		if result.Error != nil {
			return nil, result.Error
		}
	}

	return users, nil
}

// createPets creates mock pet data
func createPets(shelters []model.Shelter) ([]model.Pet, error) {
	// Ensure we have shelters
	if len(shelters) == 0 {
		return nil, nil
	}
	
	pets := []model.Pet{
		{
			Name:        "Buddy",
			Species:     "Dog",
			Breed:       "Golden Retriever",
			Age:         3.5,
			Gender:      "Male",
			Size:        "Large",
			Description: "Buddy is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks.",
			Status:      "available",
			ShelterID:   shelters[0].ID,
			LikeCount:   15,
			PetMetadata: model.PetMetadata{
				Color:          "Golden",
				Weight:         70.5,
				MedicalHistory: "Fully vaccinated, no health issues",
				Vaccinated:     true,
				Neutered:       true,
				SpecialNeeds:   "",
			},
		},
		{
			Name:        "Luna",
			Species:     "Cat",
			Breed:       "Siamese",
			Age:         2.0,
			Gender:      "Female",
			Size:        "Small",
			Description: "Luna is a gentle Siamese cat who loves to curl up in laps and play with string toys.",
			Status:      "available",
			ShelterID:   shelters[1].ID,
			LikeCount:   22,
			PetMetadata: model.PetMetadata{
				Color:          "Cream with chocolate points",
				Weight:         8.2,
				MedicalHistory: "Recent dental cleaning, all vaccinations up to date",
				Vaccinated:     true,
				Neutered:       true,
				SpecialNeeds:   "",
			},
		},
		{
			Name:        "Max",
			Species:     "Dog",
			Breed:       "German Shepherd",
			Age:         5.0,
			Gender:      "Male",
			Size:        "Large",
			Description: "Max is a well-trained German Shepherd with a calm demeanor. He's great with kids and other pets.",
			Status:      "available",
			ShelterID:   shelters[0].ID,
			LikeCount:   18,
			PetMetadata: model.PetMetadata{
				Color:          "Black and Tan",
				Weight:         85.0,
				MedicalHistory: "Mild hip dysplasia, managed with supplements",
				Vaccinated:     true,
				Neutered:       true,
				SpecialNeeds:   "Joint supplements recommended",
			},
		},
		{
			Name:        "Daisy",
			Species:     "Dog",
			Breed:       "Beagle",
			Age:         1.5,
			Gender:      "Female",
			Size:        "Medium",
			Description: "Daisy is a young and playful Beagle who loves to explore and follow her nose.",
			Status:      "available",
			ShelterID:   shelters[2].ID,
			LikeCount:   25,
			PetMetadata: model.PetMetadata{
				Color:          "Tricolor",
				Weight:         22.5,
				MedicalHistory: "Fully vaccinated, dewormed",
				Vaccinated:     true,
				Neutered:       true,
				SpecialNeeds:   "",
			},
		},
		{
			Name:        "Oliver",
			Species:     "Cat",
			Breed:       "Maine Coon",
			Age:         4.0,
			Gender:      "Male",
			Size:        "Large",
			Description: "Oliver is a majestic Maine Coon with a sweet personality. He enjoys climbing and observing from high perches.",
			Status:      "available",
			ShelterID:   shelters[1].ID,
			LikeCount:   12,
			PetMetadata: model.PetMetadata{
				Color:          "Brown Tabby",
				Weight:         18.0,
				MedicalHistory: "All vaccinations current, excellent health",
				Vaccinated:     true,
				Neutered:       true,
				SpecialNeeds:   "",
			},
		},
		{
			Name:        "Rocky",
			Species:     "Dog",
			Breed:       "Boxer",
			Age:         3.0,
			Gender:      "Male",
			Size:        "Large",
			Description: "Rocky is an energetic boxer who needs an active family. He's great with older children.",
			Status:      "available",
			ShelterID:   shelters[0].ID,
			LikeCount:   8,
			PetMetadata: model.PetMetadata{
				Color:          "Fawn with white markings",
				Weight:         65.0,
				MedicalHistory: "Fully vaccinated, healthy",
				Vaccinated:     true,
				Neutered:       false,
				SpecialNeeds:   "",
			},
		},
		{
			Name:        "Cleo",
			Species:     "Cat",
			Breed:       "Domestic Shorthair",
			Age:         7.0,
			Gender:      "Female",
			Size:        "Small",
			Description: "Cleo is a sweet senior cat who loves quiet environments and gentle affection.",
			Status:      "available",
			ShelterID:   shelters[2].ID,
			LikeCount:   5,
			PetMetadata: model.PetMetadata{
				Color:          "Black",
				Weight:         7.5,
				MedicalHistory: "Senior wellness exam completed, mild arthritis",
				Vaccinated:     true,
				Neutered:       true,
				SpecialNeeds:   "Joint supplements recommended for arthritis",
			},
		},
		{
			Name:        "Charlie",
			Species:     "Dog",
			Breed:       "Labrador Retriever",
			Age:         2.0,
			Gender:      "Male",
			Size:        "Large",
			Description: "Charlie is a playful and affectionate Labrador who loves swimming and playing fetch.",
			Status:      "available",
			ShelterID:   shelters[1].ID,
			LikeCount:   19,
			PetMetadata: model.PetMetadata{
				Color:          "Yellow",
				Weight:         75.0,
				MedicalHistory: "All vaccinations current, excellent health",
				Vaccinated:     true,
				Neutered:       true,
				SpecialNeeds:   "",
			},
		},
		{
			Name:        "Whiskers",
			Species:     "Cat",
			Breed:       "Tabby",
			Age:         1.0,
			Gender:      "Male",
			Size:        "Small",
			Description: "Whiskers is a curious and playful kitten who loves toys and climbing.",
			Status:      "available",
			ShelterID:   shelters[0].ID,
			LikeCount:   14,
			PetMetadata: model.PetMetadata{
				Color:          "Orange Tabby",
				Weight:         6.0,
				MedicalHistory: "First round of vaccinations complete",
				Vaccinated:     true,
				Neutered:       false,
				SpecialNeeds:   "",
			},
		},
		{
			Name:        "Bella",
			Species:     "Dog",
			Breed:       "Poodle",
			Age:         6.0,
			Gender:      "Female",
			Size:        "Medium",
			Description: "Bella is a well-mannered poodle who is house-trained and knows several commands.",
			Status:      "available",
			ShelterID:   shelters[2].ID,
			LikeCount:   11,
			PetMetadata: model.PetMetadata{
				Color:          "White",
				Weight:         45.0,
				MedicalHistory: "Regular check-ups, all vaccinations current",
				Vaccinated:     true,
				Neutered:       true,
				SpecialNeeds:   "",
			},
		},
	}

	for i := range pets {
		result := database.DB.Create(&pets[i])
		if result.Error != nil {
			return nil, result.Error
		}
	}

	return pets, nil
}

// createPetLikes creates mock pet like data
func createPetLikes(users []model.User, pets []model.Pet) error {
	// Ensure we have users and pets
	if len(users) == 0 || len(pets) == 0 {
		return nil
	}

	// Generate random likes
	likes := []model.PetLike{}
	
	// Each user likes some random pets
	for _, user := range users {
		// Random number of likes per user (between 1 and 5)
		numLikes := rand.Intn(5) + 1
		
		// Track which pets this user has already liked
		likedPets := make(map[uint]bool)
		
		for i := 0; i < numLikes; i++ {
			// Pick a random pet
			randomIndex := rand.Intn(len(pets))
			petID := pets[randomIndex].ID
			
			// Skip if already liked by this user
			if likedPets[petID] {
				continue
			}
			
			likedPets[petID] = true
			
			// Create the like record
			like := model.PetLike{
				UserID: user.ID,
				PetID:  petID,
				Status: true, // true for like
			}
			
			likes = append(likes, like)
		}
	}

	// Add the likes to the database
	for _, like := range likes {
		result := database.DB.Create(&like)
		if result.Error != nil {
			return result.Error
		}
		
		// Update the liked_pets array on the user
		var user model.User
		database.DB.First(&user, like.UserID)
		
		// Add this pet ID to the user's liked pets if not already there
		found := false
		for _, id := range user.LikedPets {
			if id == like.PetID {
				found = true
				break
			}
		}
		
		if !found {
			user.LikedPets = append(user.LikedPets, like.PetID)
			database.DB.Save(&user)
		}
		
		// Update the pet's like count
		database.DB.Model(&model.Pet{}).Where("id = ?", like.PetID).Update("like_count", gorm.Expr("like_count + 1"))
	}

	return nil
}

// createMessages creates mock messages between users
func createMessages(users []model.User) error {
	// Ensure we have users
	if len(users) < 2 {
		return nil
	}

	messages := []model.Message{
		{
			Content:     "Hi there! I'm interested in adopting a pet.",
			SenderID:    users[0].ID,
			RecipientID: users[3].ID, // Admin user
		},
		{
			Content:     "Hello! What kind of pet are you looking for?",
			SenderID:    users[3].ID, // Admin user
			RecipientID: users[0].ID,
		},
		{
			Content:     "I'm looking for a medium-sized dog that's good with children.",
			SenderID:    users[0].ID,
			RecipientID: users[3].ID,
		},
		{
			Content:     "We have several great options! Would you like to schedule a visit?",
			SenderID:    users[3].ID,
			RecipientID: users[0].ID,
		},
		{
			Content:     "I noticed you have a Siamese cat available. Can you tell me more about Luna?",
			SenderID:    users[2].ID,
			RecipientID: users[3].ID,
		},
		{
			Content:     "Luna is a 2-year-old Siamese who's very affectionate. Would you like to meet her?",
			SenderID:    users[3].ID,
			RecipientID: users[2].ID,
		},
	}

	for _, message := range messages {
		// Set creation time a bit in the past with some randomness
		message.CreatedAt = time.Now().Add(-time.Duration(rand.Intn(48)) * time.Hour)
		
		result := database.DB.Create(&message)
		if result.Error != nil {
			return result.Error
		}
	}

	return nil
}

// adoptPets assigns some pets to users (simulating adoption)
func adoptPets(users []model.User, pets []model.Pet) error {
	// Ensure we have users and pets
	if len(users) == 0 || len(pets) == 0 {
		return nil
	}

	// Let's have user 1 adopt pet 3 and user 2 adopt pet 7
	adoptions := []struct {
		userIndex int
		petIndex  int
	}{
		{userIndex: 1, petIndex: 2}, // Jane Smith adopts Max (German Shepherd)
		{userIndex: 1, petIndex: 6}, // Jane Smith also adopts Cleo (Senior cat)
	}

	for _, adoption := range adoptions {
		if adoption.userIndex >= len(users) || adoption.petIndex >= len(pets) {
			continue
		}

		// Set adoption time to a random point in the past (1-30 days ago)
		adoptedAt := time.Now().Add(-time.Duration(rand.Intn(30)+1) * 24 * time.Hour)
		
		// Update the pet with owner information
		result := database.DB.Model(&pets[adoption.petIndex]).Updates(map[string]interface{}{
			"user_id":    users[adoption.userIndex].ID,
			"status":     "adopted",
			"adopted_at": adoptedAt,
		})
		
		if result.Error != nil {
			return result.Error
		}
		
		// Set the user as an owner
		database.DB.Model(&users[adoption.userIndex]).Update("is_owner", true)
	}

	return nil
} 