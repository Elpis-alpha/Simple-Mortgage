import styled from "styled-components"
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTiktok, FaLinkedin } from "react-icons/fa"
import { address, email, telephone, facebook, instagram, linkedin, tiktok, twitter, youtube } from "../../utils"
import { ContactBlocks, MiddleImageStyle } from "../general/SectionStyles"

const Contact = () => {
	return (
		<ContactStyle>

			<MiddleImageStyle>
				<div className="inner">
					<div className="img-part">
						<img src="/images/full-contact.png" alt="Contact Main" />
						<div className="img-ovf"></div>
					</div>
					<div className="inner-content">
						<div className="title bigger-c">Contact us</div>
					</div>
				</div>
			</MiddleImageStyle>

			<ContactBlocks>
				<div className="inner">
					<div className="inner-content">
						<div className="listed-parts">
							<div className="list-item">
								<div className="tit">Place a call</div>
								<div className="nom">Our fully trained support team are ready to answer any of your questions.</div>
								<div className="imp">
									Monday to Friday: 9am - 5pm <br />
									Saturday and Sunday: Closed
								</div>
								<div className="button"><a title="place a call" href={`tel:${telephone}`}>Call us</a></div>
							</div>
							<div className="list-item">
								<div className="tit">Send a mail</div>
								<div className="nom">Reach out to us by sending a mail to {email} and we'll get back to you within 48 hours.</div>
								<div className="imp">
									Always available
								</div>
								<div className="button"><a title="place a call" href={`mailto:${email}`}>Mail us</a></div>
							</div>
							<div className="list-item">
								<div className="tit">Come to our office</div>
								<div className="nom">You can pay us a visit in our office at</div>
								<div className="imp">
									{address}
								</div>
								<div className="imp">
									Monday to Friday: 9am - 2pm <br />
									Saturday and Sunday: Closed
								</div>
							</div>
							<div className="list-item">
								<div className="tit">Social Media</div>
								<div className="nom">You can contact us through any of these social media</div>
								<div className="soc">
									<a target="_blank" rel="noopener noreferrer" href={facebook}><FaFacebook /></a>
									<a target="_blank" rel="noopener noreferrer" href={instagram}><FaInstagram /></a>
									<a target="_blank" rel="noopener noreferrer" href={youtube}><FaYoutube /></a>
									<a target="_blank" rel="noopener noreferrer" href={twitter}><FaTwitter /></a>
									<a target="_blank" rel="noopener noreferrer" href={tiktok}><FaTiktok /></a>
									<a target="_blank" rel="noopener noreferrer" href={linkedin}><FaLinkedin /></a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ContactBlocks>
		</ContactStyle>
	)
}
const ContactStyle = styled.div`
	width: 100%;
	flex: 1;
`
export default Contact