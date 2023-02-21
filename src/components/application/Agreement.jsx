import { useState } from "react"
import { FaTimes } from "react-icons/fa"
import styled from "styled-components"
import { MiddleImageStyle } from "../general/SectionStyles"
import agreementForms from "./agreementForms"

const Agreement = () => {
	const [activeForm, setActiveForm] = useState({ title: "", google: "" })

	return (
		<AgreementStyles>

			<MiddleImageStyle>
				<div className="inner">
					<div className="img-part">
						<img src="/images/full-contact.png" alt="Contact Main" />
						<div className="img-ovf"></div>
					</div>
					<div className="inner-content">
						<div className="title bigger-c">Agreement</div>
					</div>
				</div>
			</MiddleImageStyle>

			<section className="interactive-forms">
				<div className="inner">
					{/* <div className="title">Interactive Agreement</div> */}
					<div className="form-list">
						{agreementForms.map(item => <div key={item.id} className="form-item">
							<div className="f-a">
								<div className="img-part">
									<img src={item.img} alt={item.name} />
								</div>
								<div className="txt-part">
									<h3>{item.name}</h3>
								</div>
								<div className="btn-part">
									<a href={item.url} download={item.name} target="_blank" rel="noopener noreferrer">Download</a>
									<button onClick={() => setActiveForm({ title: item.name, google: item.google })}>View</button>
								</div>
							</div>
						</div>)}
					</div>
				</div>
			</section>

			<section className={"form-fill-holder " + (activeForm.google.length > 0 ? "show" : "")}>
				<div className="cancel-x" onClick={() => setActiveForm({ title: "", google: "" })}>
					<div className="cax"><FaTimes /></div>
				</div>
				<div className="frame-hol">
					{activeForm.google.length > 0 && <embed src={activeForm.google} width="100%" height="100%" className="mob-o" />}
				</div>
			</section>

		</AgreementStyles>
	)
}
const AgreementStyles = styled.div`
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

				span.over {
					display: block;
					width: 100%;
					height: .01pc;
				}

				.form-item {
					cursor: pointer;
					width: 30%;
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
						border: 1px solid rgba(7, 36, 71, 0.3);
						box-shadow:  28px 28px 56px #ebebeb, -28px -28px 56px #ffffff;
						height: 100%;

						.img-part {
							width: 100%;
							display: flex;
							
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

						.btn-part {
							padding: 1.5pc 1pc;
							padding-top: 0;
							flex: 1;
							text-align: center;
							display: flex;
							align-items: center;
							justify-content: center;

							a, button {
								display: inline-flex;
								text-decoration: none;
								color: #fff;
								border: 0 none;
								outline: 0 none;
								background-color: #487cff;
								padding: .2pc 1pc;
								border-radius: .5pc;
								transition: background-color .5s;
								margin: 0 .2pc;
								
								&:hover {
									background-color: #072447;
								}
							}
							
							a {
								background-color: #41a330;
								
								&:hover {
									background-color: #1c5d11;
								}
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
			background-color: #fff;

			iframe {
				border: 0px;
			}
		}
	}

`
export default Agreement