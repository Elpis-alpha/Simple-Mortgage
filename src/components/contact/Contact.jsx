import { useEffect, useState } from "react"
import styled from "styled-components"
import { email, telephone } from "../../utils"
import { ContactBlocks, TopHeaderStyle } from "../general/SectionStyles"

const Contact = () => {
	const [errorText, setErrorText] = useState("")
	const [successText, setSuccessText] = useState("")
	const [sendingMail, setSendingMail] = useState(false)

	useEffect(() => {
		let errorTextCancler
		if (errorText.length > 0) errorTextCancler = setTimeout(() => setErrorText(""), 1500)
		return () => { clearTimeout(errorTextCancler) }
	}, [errorText])

	useEffect(() => {
		let succTextCancler
		if (successText.length > 0) succTextCancler = setTimeout(() => setSuccessText(""), 1500)
		return () => { clearTimeout(succTextCancler) }
	}, [successText])

	const submitHandler = e => {
		e.preventDefault();
		const form = e.target
		if (sendingMail) return setErrorText("Please be patient")
		if (!window?.emailjs) return setErrorText("Try again later")
		setSendingMail(true)
		window.emailjs.sendForm('service_flcxz8i', 'template_vgfmuq5', form)
			.then((result) => {
				setSendingMail(false)
				setSuccessText("Email sent")
				form.reset()
			}, (error) => {
				setSendingMail(false)
				setErrorText("Email failed to send")
			}).catch(err => {
				setErrorText("Email failed to send")
				setSendingMail(false)
			}).finally(() => {
				setSendingMail(false)
			});
	}

	return (
		<ContactStyle>
			<TopHeaderStyle>
				<div className="inner">
					<div className="inner-content">
						<div className="title bigger-c">Contact us</div>
					</div>
				</div>
			</TopHeaderStyle>

			<ContactBlocks>
				<div className="inner">
					<div className="inner-content">
						<div className="email-part">
							<form className="text-container" onSubmit={submitHandler}>
								<div className="title">Send a mail</div>
								<input required type="text" name="user_name" id='user_name' placeholder="Name" /><br />
								<input required type="email" name="user_email" id='user_email' placeholder="Email" /><br />
								<textarea required type="text" name="message" id='message' placeholder="Message"></textarea><br />
								<button id="submit" type="submit" disabled={sendingMail}>{sendingMail ? "Sending mail..." : "Send"}</button>
							</form>
						</div>
						<div className="listed-parts">
							<div className="list-item">
								<div className="tit">Place a call</div>
								<div className="nom">Our fully trained support team are ready to answer any of your questions.</div>
								<div className="button"><a title="place a call" href={`tel:${telephone}`}>Call us</a></div>
							</div>
							<div className="list-item">
								<div className="tit">Send a mail</div>
								<div className="nom">Reach out to us at {email}.</div>
								<div className="button"><a title="Send a mail" href={`mailto:${email}`}>Mail us</a></div>
							</div>
						</div>
						<div className="office-box">
							<div className="title">Our Office</div>
							<iframe title="Google Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.5025084016143!2d-0.014956599999999995!3d51.5039963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487602b07f609f1f%3A0xba1bf1aadad8462!2s30%20Churchill%20Pl%2C%20London%20E14%205EU%2C%20UK!5e0!3m2!1sen!2sng!4v1677275394279!5m2!1sen!2sng" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
						</div>
					</div>
				</div>
			</ContactBlocks>

			{errorText.length > 0 && <div className="error"><p>{errorText}</p></div>}

			{successText.length > 0 && <div className="success"><p>{successText}</p></div>}

		</ContactStyle>
	)
}
const ContactStyle = styled.div`
	width: 100%;
	flex: 1;

	.error {
		position: fixed;
		top: 20px;
		right: 20px;
		padding: 10px 20px;
		border-radius: 5px;
		font-size: 16px;
		color: #fff;
		background-color: #f44336;
		box-shadow: 0 2px 5px rgba(0,0,0,0.1);
		z-index: 9999;
		animation: opacity-in .5s 1;
	}

	.success {
		position: fixed;
		top: 20px;
		right: 20px;
		padding: 10px 20px;
		border-radius: 5px;
		font-size: 16px;
		color: #fff;
		background-color: #2c8d1d;
		box-shadow: 0 2px 5px rgba(0,0,0,0.1);
		z-index: 9999;
		animation: opacity-in .5s 1;
	}
`
export default Contact