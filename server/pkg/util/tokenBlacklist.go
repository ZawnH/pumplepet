package util

import (
	"sync"
	"time"
)

// TokenBlacklist holds tokens that have been invalidated (logged out)
type TokenBlacklist struct {
	blacklist map[string]time.Time
	mutex     sync.RWMutex
}

var (
	blacklist     *TokenBlacklist
	blacklistOnce sync.Once
)

// GetTokenBlacklist returns the singleton instance of the token blacklist
func GetTokenBlacklist() *TokenBlacklist {
	blacklistOnce.Do(func() {
		blacklist = &TokenBlacklist{
			blacklist: make(map[string]time.Time),
		}
		// Start cleanup goroutine
		go blacklist.periodicCleanup()
	})
	return blacklist
}

// AddToken adds a token to the blacklist with its expiration time
func (tb *TokenBlacklist) AddToken(token string, expiry time.Time) {
	tb.mutex.Lock()
	defer tb.mutex.Unlock()
	tb.blacklist[token] = expiry
}

// IsBlacklisted checks if a token is in the blacklist
func (tb *TokenBlacklist) IsBlacklisted(token string) bool {
	tb.mutex.RLock()
	defer tb.mutex.RUnlock()
	_, exists := tb.blacklist[token]
	return exists
}

// cleanup removes expired tokens from the blacklist
func (tb *TokenBlacklist) cleanup() {
	tb.mutex.Lock()
	defer tb.mutex.Unlock()
	now := time.Now()
	for token, expiry := range tb.blacklist {
		if now.After(expiry) {
			delete(tb.blacklist, token)
		}
	}
}

// periodicCleanup runs the cleanup function periodically
func (tb *TokenBlacklist) periodicCleanup() {
	ticker := time.NewTicker(time.Hour)
	defer ticker.Stop()
	for range ticker.C {
		tb.cleanup()
	}
} 