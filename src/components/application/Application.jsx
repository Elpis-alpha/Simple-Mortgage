import { Link } from "react-router-dom"
import styled from "styled-components"
import ContactFooter from "../general/ContactFooter"
import { ApplicationBlocks, TopHeaderStyle } from "../general/SectionStyles"

const Application = () => {
	return (
		<ApplicationStyle>

			<TopHeaderStyle>
				<div className="inner">
					<div className="inner-content">
						<div className="title bigger-c">Application</div>
					</div>
				</div>
			</TopHeaderStyle>

			<ApplicationBlocks>
				<div className="inner">
					<div className="inner-content">
						<div className="listed-parts">
							<div className="list-item">
								<div className="tit">Application Agreements</div>
								<div className="nom">A collection of all relevant forms to the mortgaging process.</div>
								<div className="button">
									<Link to="/application/forms">View Forms</Link>
								</div>
							</div>
							<div className="list-item">
								<div className="tit">Application Agreements</div>
								<div className="nom">A collection of all agreement documents to the mortgaging process.</div>
								<div className="button">
									<Link to="/application/agreement">View Agreements</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ApplicationBlocks>

			<ContactFooter />

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