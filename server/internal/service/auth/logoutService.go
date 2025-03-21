package auth

import (
	"pumplepet-server/pkg/util"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
)

// LogoutUser invalidates a user's token by adding it to the blacklist
func LogoutUser(tokenString string) error {
	// Remove "Bearer " prefix if present
	tokenString = strings.TrimPrefix(tokenString, "Bearer ")

	// Parse the token (without validation) to get the expiration time
	token, _, err := new(jwt.Parser).ParseUnverified(tokenString, jwt.MapClaims{})
	if err != nil {
		return err
	}

	// Get claims and extract expiration time
	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		// Get expiration time from token
		var expTime time.Time
		if exp, ok := claims["exp"].(float64); ok {
			expTime = time.Unix(int64(exp), 0)
		} else {
			// If no expiration in token, set a default (e.g., 24 hours from now)
			expTime = time.Now().Add(24 * time.Hour)
		}

		// Add token to blacklist
		util.GetTokenBlacklist().AddToken(tokenString, expTime)
		return nil
	}

	return nil
} 