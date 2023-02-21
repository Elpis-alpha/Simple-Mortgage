import { v4 } from "uuid"
import { bridging365Companies, bridging365Development, personalBridging } from "./form64"

const allForms = [
	{ id: v4(), name: "Personal Bridging Loan Application", url: "/pdf/Personal_Bridging_Loan_Application.pdf", img: "/images/forms/pbla.png", google: "https://drive.google.com/file/d/1vUoSedPAl_weS9EPCSzqTPC1M6y72VHi/preview?usp=sharing", base64: personalBridging, },
	{ id: v4(), name: "Bridging 365 Companies Application", url: "/pdf/Bridging_365_Companies_Application.pdf", img: "/images/forms/b365ca.png", google: "https://drive.google.com/file/d/1gly0YFYqI6j8O8JNE-vsQCYDrxdLL0K2/preview?usp=sharing", base64: bridging365Companies, },
	{ id: v4(), name: "Bridging 365 Development Finance Application", url: "/pdf/B365 Development-finance-Application form.pdf", img: "/images/forms/b365dfa.png", google: "https://drive.google.com/file/d/1zvdW21_qhEvC0Qq-9Rj8PIrnkkozV0i2/preview?usp=sharing", base64: bridging365Development, },
]
export default allForms