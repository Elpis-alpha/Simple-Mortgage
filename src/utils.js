// Site Vars
export const siteName = "MASTER YOUR MORTGAGE"

// Social Links
export const twitter = "https://twitter.com/"
export const linkedin = "https://linkedin.com/"
export const telephone = "+02081469888"
export const email = "info@masteryourmortgage.com"
export const adminEmail = "admin@masteryourmortgage.com"
export const contactEmail = "contact@masteryourmortgage.com"
export const otherEmail = "other@masteryourmortgage.com"
export const address = "30 Churchill Place, Canary Wharf London, E14 5EU"

export const clientID = () => {
	switch (window.location.host) {
		case "localhost:3000": return "6a3ba60893904e6792efbaa7bef2da72"
		case "masteryourmortgage.com":
		case "www.masteryourmortgage.com": return "6a3ba60893904e6792efbaa7bef2da72"
		default: return "6a3ba60893904e6792efbaa7bef2da72"
	}
}