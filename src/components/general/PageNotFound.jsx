import styled from "styled-components"
import ContactFooter from "./ContactFooter"
import { TopHeaderStyle } from "./SectionStyles"

const PageNotFound = () => {
	return (
		<PageNotFoundStyle>
			<TopHeaderStyle>
				<div className="inner">
					<div className="inner-content">
						<div className="title bigger-c">Page not found</div>
					</div>
				</div>
			</TopHeaderStyle>

			<div className="connt">
				404 | This page does not exist.
			</div>
			<ContactFooter />
		</PageNotFoundStyle>
	)
}
const PageNotFoundStyle = styled.div`
	flex: 1;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	.connt {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		font-weight: bold;
		font-size: 2pc;
		padding: 5pc 3pc;
		flex: 1;
		
		@media screen and (max-width: 600px) {
			padding: 5pc 2pc;
		}
	}
`
export default PageNotFound