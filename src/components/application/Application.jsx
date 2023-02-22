import { Link } from "react-router-dom"
import styled from "styled-components"
import { MiddleImageStyle } from "../general/SectionStyles"

const Application = () => {
	return (
		<ApplicationStyle>

			<MiddleImageStyle>
				<div className="inner">
					<div className="img-part">
						<img src="/images/full-contact.png" alt="Contact Main" />
						<div className="img-ovf"></div>
					</div>
					<div className="inner-content">
						<div className="title bigger-c">Application</div>
					</div>
				</div>
			</MiddleImageStyle>

			<section className="apl-options">

				<div className="inner">


					<div className="in-j">
						<div className="title">Application Forms</div>
						<div className="desc">
							Phosfluorescently productivate mission-critical materials after integrated functionalities. Seamlessly reconceptualize client-focused methodologies with an expanded array.
						</div>
						<Link to="/application/forms">View Forms</Link>
					</div>

					<div className="in-j">
						<div className="title">Application Agreements</div>
						<div className="desc">
							Phosfluorescently productivate mission-critical materials after integrated functionalities. Seamlessly reconceptualize client-focused methodologies with an expanded array.
						</div>
						<Link to="/application/agreement">View Agreements</Link>
					</div>

				</div>

			</section>

		</ApplicationStyle>
	)
}
const ApplicationStyle = styled.div`
	width: 100%;
	flex: 1;

	.apl-options {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 6pc 2pc;
		color: #072447;
	
		.inner {

			.in-j {
				padding-bottom: 3pc;

				.title {
					font-size: 1.5pc;
					font-weight: bold;
					line-height: 2pc;
					padding-bottom: .7pc;
				}

				.desc {
					padding-bottom: .7pc;
				}

				a {
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
			}
		}
	}
`
export default Application