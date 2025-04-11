package main

import (
	"flag"
	"log"
	"os"

	"pumplepet-server/internal/routes"
	"pumplepet-server/internal/websocket"
	"pumplepet-server/pkg/database"
	"pumplepet-server/pkg/mockdata"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Parse command line flags
	seed := flag.Bool("seed", false, "Seed the database with mock data")
	flag.Parse()

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Connect to database
	database.ConnectDB()

	// Seed database if requested
	if *seed {
		log.Println("Seeding database with mock data...")
		if err := mockdata.Seed(); err != nil {
			log.Fatal("Error seeding database:", err)
		}
		log.Println("Database seeding completed successfully")
		
		// Exit after seeding if no other flags were set
		// If you want to continue and run the server, remove this line
		// os.Exit(0)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	router := gin.New()
	router.Use(gin.Logger())

	// Add CORS middleware
	router.Use(cors.Default())

	// Initialize WebSocket manager
	wsManager := websocket.NewManager()
	go wsManager.Run()

	// Routes
	routes.AuthRoutes(router)
	routes.ChatRoutes(router, wsManager)

	log.Printf("Server starting on port %s...", port)
	router.Run(":" + port)
}
