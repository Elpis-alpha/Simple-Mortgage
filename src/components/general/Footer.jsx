import { Link } from "react-router-dom"
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTiktok, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa"
import styled from "styled-components"
import { email, facebook, instagram, linkedin, siteName, telephone, tiktok, twitter, youtube } from "../../utils"

const Footer = () => {
	return (
		<FooterStyles>
			<div className="footer">
				<div className="row ic">
					<a target="_blank" rel="noopener noreferrer" href={`tel:${telephone}`}><FaPhone /></a>
					<a target="_blank" rel="noopener noreferrer" href={`mailto:${email}`}><FaEnvelope /></a>
					<a target="_blank" rel="noopener noreferrer" href={facebook}><FaFacebook /></a>
					<a target="_blank" rel="noopener noreferrer" href={instagram}><FaInstagram /></a>
					<a target="_blank" rel="noopener noreferrer" href={youtube}><FaYoutube /></a>
					<a target="_blank" rel="noopener noreferrer" href={twitter}><FaTwitter /></a>
					<a target="_blank" rel="noopener noreferrer" href={tiktok}><FaTiktok /></a>
					<a target="_blank" rel="noopener noreferrer" href={linkedin}><FaLinkedin /></a>
				</div>

				<div className="row">
					<ul>
						<li><Link to="/">{siteName}</Link></li>
						<li><Link to="/calculator">Mortgage Calculator</Link></li>
						<li><Link to="/contact">Contact Us</Link></li>
						<li><Link to="/about">About Us</Link></li>
						<li><Link to="/privacy-policy">Privacy Policy</Link></li>
					</ul>
				</div>

				<div className="row">
					{siteName} Copyright © {new Date().getFullYear()} Mortgage Platform - All rights reserved
				</div>
			</div>
		</FooterStyles>
	)
}
const FooterStyles = styled.footer`
width: 100%;
.footer {
	background: #072447;
	padding: 30px 0px;
	text-align: center;

	.row.ic {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		@media (max-width:720px) {
			justify-content: flex-start;
		}

		a {
			padding: 1pc;
			font-size: 1.5pc;
			display: flex;
		}
	} 
}

.footer .row {
	width: 100%;
	margin: 1% 0%;
	padding: 0.6% 0%;
	color: #fff;
	font-size: 0.8em;
}

.footer .row a {
	text-decoration: none;
	color: #fff;
	transition: 0.5s;
}

.footer .row a:hover {
	color: #00377a;
}

.footer .row ul {
	width: 100%;
}

.footer .row ul li {
	display: inline-block;
	margin: 0px 30px;
}

.footer .row a i {
	font-size: 2em;
	margin: 0% 1%;
}

@media (max-width:720px) {
	.footer {
		text-align: left;
		padding: 5%;
	}

	.footer .row ul li {
		display: block;
		margin: 10px 0px;
		text-align: left;
	}

	.footer .row a i {
		margin: 0% 3%;
	}
}
`
export default Footer