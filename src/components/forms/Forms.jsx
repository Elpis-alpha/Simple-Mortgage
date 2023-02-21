import { useState } from "react"
import { FaTimes } from "react-icons/fa"
import styled from "styled-components"
import { MiddleImageStyle } from "../general/SectionStyles"
import { bridging365Companies, bridging365Development, personalBridging } from "./form64"

const Forms = () => {
	const [activeForm, setActiveForm] = useState({ title: "", url: "" })

	return (
		<FormsStyles>

			<MiddleImageStyle>
				<div className="inner">
					<div className="img-part">
						<img src="/images/full-contact.png" alt="Contact Main" />
						<div className="img-ovf"></div>
					</div>
					<div className="inner-content">
						<div className="title bigger-c">Forms</div>
					</div>
				</div>
			</MiddleImageStyle>

			<section className="interactive-forms">
				<div className="inner">
					{/* <div className="title">Interactive Forms</div> */}
					<div className="form-list">
						<div className="form-item">
							<div className="f-a" onClick={() => setActiveForm({ url: personalBridging, title: "Personal Bridging Loan Application" })}>
								<div className="img-part">
									<img src="/images/forms/pbla.png" alt="Personal Bridging Loan Application" />
								</div>
								<div className="txt-part">
									<h3>Personal Bridging Loan Application</h3>
								</div>
							</div>
						</div>
						<div className="form-item">
							<div className="f-a" onClick={() => setActiveForm({ url: bridging365Companies, title: "Bridging 365 Companies Application" })}>
								<div className="img-part">
									<img src="/images/forms/b365ca.png" alt="Bridging 365 Companies Application" />
								</div>
								<div className="txt-part">
									<h3>Bridging 365 Companies Application</h3>
								</div>
							</div>
						</div>
						<div className="form-item">
							<div className="f-a" onClick={() => setActiveForm({ url: bridging365Development, title: "Bridging 365 Development Finance Application" })}>
								<div className="img-part">
									<img src="/images/forms/b365dfa.png" alt="Bridging 365 Development Finance Application" />
								</div>
								<div className="txt-part">
									<h3>Bridging 365 Development Finance Application</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className={"form-fill-holder " + (activeForm.url.length > 0 ? "show" : "")}>
				<div className="cancel-x" onClick={() => setActiveForm({ title: "", url: "" })}>
					<div className="cax"><FaTimes /></div>
				</div>
				<div className="frame-hol">
					{activeForm.url.length > 0 && <iframe title={activeForm.title} type='application/pdf' height="100%" width="100%" src={activeForm.url} />}
				</div>
			</section>

		</FormsStyles>
	)
}
const FormsStyles = styled.div`
	width: 100%;
	flex: 1;

	.interactive-forms {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;

		.inner {
			padding: 6pc 2pc;
			color: #072447;
			text-align: center;
			
			@media screen and (max-width: 500px) {
				padding: 6pc 1pc;
			}
			.title {
				font-size: 2.5pc;
				line-height: 3.5pc;
				font-weight: bold;
				padding-bottom: 1.5pc;
			}

			.form-list {
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;

				.form-item {
					width: 33%;
					padding: 1pc;

					@media screen and (max-width: 1000px) {
						width: 50%;
					}

					@media screen and (max-width: 800px) {
						width: 100%;
					}

					.f-a {
						text-decoration: none;
						color: inherit;
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;
						border-radius: 30px;
						overflow: hidden;
						background: #ffffff;
						border: 1px solid rgba(7, 36, 71, 0.1);
						box-shadow:  28px 28px 56px #ebebeb, -28px -28px 56px #ffffff;
						height: 100%;
						transition: transform .5s;

						&:hover {
							transform: scale(1.05);
						}

						.img-part {
							width: 100%;
							
							img {
								width: 100%;
							}
						}

						.txt-part {
							padding: 1pc;
							flex: 1;
							text-align: center;
							display: flex;
							align-items: center;
							justify-content: center;
							@media screen and (max-width: 600px) {
								font-size: .8pc;
								line-height: 1.5pc;
							}
						}
					}
				}
			}
		}
	}

	.form-fill-holder {

		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		z-index: 200;
		top: 0;
		bottom: 0;
		right: -105vw;
		width: 100%;
		display: flex;
		opacity: 0;
		transition: opacity .5s, right .5s;
		
		&.show {
			right: 0;
			opacity: 1;
		}

		.cancel-x {
			width: 5pc;
			height: 100%;
			cursor: pointer;

			.cax {
				position: absolute;
				top: 0;
				left: 0;
				color: red;
				font-size: 2pc;
				padding: 1pc;
				transition: transform .5s;

				&:hover {
					transform: scale(1.1);
				}
			}
		}
		
		.frame-hol {
			display: flex;
			width: calc(100% - 5pc);
			height: 100%;

			iframe {
				border: 0px;
			}
		}
	}

`
export default Forms