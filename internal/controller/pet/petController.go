package pet

import (
	"net/http"
	"pumplepet-server/internal/model"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// GetPets retrieves all pets from the database
func GetPets(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	var pets []model.Pet

	result := db.Preload("PetMetadata").Preload("Owner").Find(&pets)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch pets"})
		return
	}

	c.JSON(http.StatusOK, pets)
}

// GetPetById retrieves a specific pet by ID
func GetPetById(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")
	var pet model.Pet

	result := db.Preload("PetMetadata").Preload("Owner").First(&pet, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pet not found"})
		return
	}

	c.JSON(http.StatusOK, pet)
}

// LikePet increments the like count for a pet
func LikePet(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

	// Update the like count
	result := db.Model(&model.Pet{}).Where("id = ?", id).Update("like_count", gorm.Expr("like_count + 1"))
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update like count"})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pet not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Pet liked successfully"})
}

// DislikePet decrements the like count for a pet
func DislikePet(c *gin.Context) {
	db := c.MustGet("db").(*gorm.DB)
	id := c.Param("id")

	// Update the like count, but don't let it go below 0
	result := db.Model(&model.Pet{}).Where("id = ? AND like_count > 0", id).Update("like_count", gorm.Expr("like_count - 1"))
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update like count"})
		return
	}
	if result.RowsAffected == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pet not found or like count already at 0"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Pet disliked successfully"})
}
