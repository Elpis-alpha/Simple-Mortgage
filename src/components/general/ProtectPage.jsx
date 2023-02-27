import { Oval } from "react-loader-spinner"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"

const ProtectPage = ({ ...props }) => {

	const { available, tested } = useSelector(store => store.user)

	if (available && tested) return props.children

	if (!available && tested) return (
		<ProtectPageStyle>
			<div className="failed-screen">
				<h3>You are not signed in</h3>
				<div className="btts">
					<Link to="/signup">Sign up</Link>
					<span>or</span>
					<Link to="/login">Log in</Link>
				</div>
			</div>
		</ProtectPageStyle>
	)

	return (
		<ProtectPageStyle>
			<div className="loading-screen">
				<Oval color="#487cff" secondaryColor="#9bb4f6" width="8pc" height="8pc" />
				<span>Please wait</span>
			</div>
		</ProtectPageStyle>
	)
}
const ProtectPageStyle = styled.div`
	flex: 1;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	
	.loading-screen {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 3pc;
		min-height: 60vh;
		flex-direction: column;

		span {
			display: flex;
			font-weight: bold;
			padding-top: 1pc;
			font-size: 1.5pc;
		}
	}
	
	.failed-screen {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 3pc;
		min-height: 60vh;
		flex-direction: column;

		h3 {
			display: flex;
			font-weight: bold;
			font-size: 1.5pc;
		}

		.btts {
			display: flex;
			align-items: center;
			justify-content: center;
			padding-top: 0.5pc;

			@media screen and (max-width: 400px) {
				flex-direction: column;
			}

			span {
				display: inline-block;
				padding: .3pc 1pc;
			}

			a {
				outline: 0 none;
				border: 0 none;
				display: inline-flex;
				text-decoration: none;
				color: #fff;
				background-color: #487cff;
				padding: .4pc 2pc;
				border-radius: .5pc;
				transition: background-color .5s;

				&:disabled {
					opacity: .5;
					cursor: not-allowed;
					&:hover {
						background-color: #487cff;
					}
				}
				
				&:hover {
					background-color: #072447;
				}
			}
		}
	}
`
export default ProtectPage