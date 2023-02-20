import { Link } from "react-router-dom"
import styled from "styled-components"
import { MiddleImageStyle } from "../general/SectionStyles"

const Forms = () => {
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
							<Link to="/forms/personal-bridging-loan-application">
								<div className="img-part">
									<img src="/images/forms/pbla.png" alt="Personal Bridging Loan Application" />
								</div>
								<div className="txt-part">
									<h3>Personal Bridging Loan Application</h3>
								</div>
							</Link>
						</div>
						<div className="form-item">
							<Link to="/forms/bridging-365-companies-application">
								<div className="img-part">
									<img src="/images/forms/b365ca.png" alt="Bridging 365 Companies Application" />
								</div>
								<div className="txt-part">
									<h3>Bridging 365 Companies Application</h3>
								</div>
							</Link>
						</div>
						<div className="form-item">
							<Link to="/forms/bridging-365-development-finance-application">
								<div className="img-part">
									<img src="/images/forms/b365dfa.png" alt="Bridging 365 Development Finance Application" />
								</div>
								<div className="txt-part">
									<h3>Bridging 365 Development Finance Application</h3>
								</div>
							</Link>
						</div>
					</div>
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

					a {
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
`
export default Forms