import styled from "styled-components"
import { address, email, telephone, adminEmail, contactEmail, otherEmail } from "../../utils"
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
								<div className="tit">Contact our Admin</div>
								<div className="nom">Contact our administrative team by sending a mail to {adminEmail} and we'll get back to you within 48 hours.</div>
								<div className="imp">
									Always available
								</div>
								<div className="button"><a title="place a call" href={`mailto:${adminEmail}`}>Mail us</a></div>
							</div>
							<div className="list-item">
								<div className="tit">Contact us</div>
								<div className="nom">Contact us by sending a mail to {otherEmail} and we'll get back to you within 48 hours.</div>
								<div className="imp">
									Always available
								</div>
								<div className="button"><a title="place a call" href={`mailto:${otherEmail}`}>Mail us</a></div>
							</div>
							<div className="list-item">
								<div className="tit">Get Support</div>
								<div className="nom">Contact our support team by sending a mail to {contactEmail} and we'll get back to you within 48 hours.</div>
								<div className="imp">
									Always available
								</div>
								<div className="button"><a title="place a call" href={`mailto:${contactEmail}`}>Mail us</a></div>
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