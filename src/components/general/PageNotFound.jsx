import styled from "styled-components"

const PageNotFound = () => {
	return (
		<PageNotFoundStyle>
			This page does not exist
		</PageNotFoundStyle>
	)
}
const PageNotFoundStyle = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	font-weight: bold;
	font-size: 2pc;
	padding: 2pc;
`
export default PageNotFound