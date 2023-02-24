import styled from "styled-components"
import { FaEnvelope, FaMap, FaPhone } from "react-icons/fa"
import { addressLink, email, telephone, address } from "../../utils"

const ContactFooter = () => {
	return (
		<ContactFooterStyle>
			<a href={`tel:${telephone}`} target="_blank" rel="noopener noreferrer" title="place a call" className="contact-item">
				<div className="ic-pt"><FaPhone /></div>
				<div className="txt">{telephone}</div>
			</a>
			<a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer" title="send a mail" className="contact-item">
				<div className="ic-pt"><FaEnvelope /></div>
				<div className="txt">{email}</div>
			</a>
			<a href={addressLink} target="_blank" rel="noopener noreferrer" title="our address" className="contact-item">
				<div className="ic-pt"><FaMap /></div>
				<div className="txt">{address}</div>
			</a>
		</ContactFooterStyle>
	)
}
const ContactFooterStyle = styled.div`
	width: 100%;
	padding: 1pc 3pc;
	display: flex;
	/* align-items: center; */
	align-items: stretch;
	justify-content: space-between;
	padding-top: 0;
	padding-bottom: 1.5pc;
	flex-wrap: wrap;

	@media screen and (max-width: 600px) {
		padding: 1pc 2pc;
	}

	.contact-item {
		width: 30%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		text-align: center;
		background-color: rgba(72, 124, 255, 0.1);
		color: #072447;
		text-decoration: none;
		line-height: 2pc;
		padding: 1pc 2pc;
		border-radius: .8pc;
		transition: background-color .5s;

		@media screen and (max-width: 850px) {
			width: 100%;
			margin-bottom: 1pc;

			&:last-of-type {
				margin-bottom: 0;
			}
		}

		&:hover {
			background-color: rgba(72, 124, 255, 0.3);
		}

		.txt {
			/* text-overflow: ellipsis; */
			/* overflow: hidden; */
			/* white-space: pre; */
			width: 100%;
		}
	}
`
export default ContactFooter