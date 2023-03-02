import { FaCalculator, FaInfo, FaAddressBook, FaHome, FaUserPlus, FaUserShield, FaSignOutAlt } from "react-icons/fa"
import { Sling as Hamburger } from "hamburger-react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { siteName, tokenCookieName } from "../../utils"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { postApiJson } from "../../controllers/APICtrl"
import { logoutUser } from "../../api"
import Cookies from 'universal-cookie'
import { removeUserData } from "../../store/slice/userSlice"
import { Oval } from "react-loader-spinner"

const NavBar = ({ light }) => {
	const cookie = new Cookies()
	const dispatch = useDispatch()
	const [isNavOpened, setIsNavOpened] = useState(false)
	const navChildrenRef = useRef(null)
	const { available, tested } = useSelector(store => store.user)

	useEffect(() => {

		if (isNavOpened) { navChildrenRef.current.style.right = "0vw" }

		else { navChildrenRef.current.style.right = "105vw" }

	}, [isNavOpened])

	const logoutThisUser = async () => {

		setIsNavOpened(false)

		toast.info("Logging Out")

		const logoutData = await postApiJson(logoutUser())

		if (logoutData.error) toast.error("Logout failed")

		else {

			toast.success("Logged out successfully")

			cookie.remove(tokenCookieName, { path: '/' })

			dispatch(removeUserData())

		}

	}

	return (
		<NavBarStyle className={light ? "light-theme" : "dark-theme"}>
			<div className="heading">
				<Link to="/">{siteName}</Link>
			</div>

			<div className="ham-holder">
				<Hamburger size={35} toggled={isNavOpened} toggle={setIsNavOpened} duration={1} distance="sm" rounded />
			</div>

			<div className="children" ref={navChildrenRef}>
				<div className="ham-spe-hol">
					<Hamburger size={35} toggled={isNavOpened} toggle={setIsNavOpened} duration={1} distance="sm" rounded />
				</div>

				<ul>
					<li className="only-mobile" onClick={() => setIsNavOpened(false)}><Link to={`/`}>
						<FaHome /> Home
					</Link></li>

					{(available && tested) && <li onClick={() => setIsNavOpened(false)}><Link to={`/application`}>
						<FaUserPlus /> Application
					</Link></li>}

					<li onClick={() => setIsNavOpened(false)}><Link to={`/calculator`}>
						<FaCalculator /> Calculator
					</Link></li>

					<li onClick={() => setIsNavOpened(false)}><Link to={`/about`}>
						<FaInfo /> About Us
					</Link></li>

					<li onClick={() => setIsNavOpened(false)}><Link to={`/contact`}>
						<FaAddressBook /> Contact Us
					</Link></li>

					{(!available && tested) && <li onClick={() => setIsNavOpened(false)}><Link to={`/login`}>
						<FaUserShield /> Log in
					</Link></li>}

					{(!available && tested) && <li onClick={() => setIsNavOpened(false)}><Link to={`/signup`}>
						<FaUserPlus /> Sign up
					</Link></li>}

					{(available && tested) && <li onClick={logoutThisUser}><span className="like-a">
						<FaSignOutAlt /> Log out
					</span></li>}

					{(!tested) && <li className="no-load"><Oval width="1.5pc" height="1.5pc" color="#fff" secondaryColor="aaa" /></li>}

				</ul>

			</div>
		</NavBarStyle>
	)
}
const NavBarStyle = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	/* border-bottom: 1px solid rgba(128, 128, 128, 0.3); */
	z-index: 100;
	width: 100%;
	background-color: #fff;
	transition: background-color .5s;
	padding: 0 1pc;
	font-weight: 600;
	&.hide-nav{
		/* display: none; */
		height: 0;
		& > div{
			opacity: 0;
			visibility: hidden;
			z-index: -1;
		}
		& > div.search-form{
			opacity: 1;
			visibility: visible;
			z-index: 5;
			form{
				box-shadow: 8px 8px 16px #b9b9b9;
			}
		}
	}
	.heading {
		font-family: Header;
		a{
			padding: 2rem;
			line-height: 3pc;
			display: block;
			font-size: 1.8pc;
			color: black;
			text-decoration: none;
			font-weight: bold;
			transition: color .5s, background-color .5s;
			&:hover{color: #4c7bff}

			@media screen and (max-width: 1000px) {font-size: 2pc}
			@media screen and (max-width: 600px) {font-size: 1.5pc}
			@media screen and (max-width: 470px) {font-size: 1.2pc; line-height: 2pc}
		}
		
	}
	.ham-holder{
		display: none;
	}
	.children{
		display: flex;
		position: static;
		right: 105vw;
		ul{
			display: flex;
			list-style-type: none;
			padding-right: 1pc;
			li{
				display: flex;
				align-items: center;
				justify-content: center;
				transition: color .5s, background-color .5s;
				padding: .5pc 1pc;
				font-size: 1.3pc;
				line-height: 2pc;
				color: black;
				cursor: pointer;
				&.only-mobile {
					display: none;
				}
				span.like-a{
					color: black;
					text-decoration: none;
					display: flex;
					align-items: center;
					justify-content: center;
					transition: color .5s, background-color .5s;
					&:hover{
						color: #4c7bff;
						svg{color: #4c7bff;}
					}
					svg{margin-right: .3pc; transition: color .5s;}
				}
				a{
					color: black;
					text-decoration: none;
					display: flex;
					align-items: center;
					justify-content: center;
					transition: color .5s, background-color .5s;
					&:hover{
						color: #4c7bff;
						svg{color: #4c7bff;}
					}
					svg{margin-right: .3pc; transition: color .5s;}
				}
			}
		}
		.ham-spe-hol{
			display: none;
		}
	}
	@media screen and (max-width: 1300px) {
		.ham-holder{
			display: flex;
		}    
		.children{
			position: fixed;
			align-items: center;
			justify-content: center;
			width: 100vw;
			top: 0; bottom: 0;
			background-color: #fff;
			box-shadow: 0 0 3px 0 black;
			z-index: 15;
			transition: right 1s;
			.ham-spe-hol{
				display: flex;
				position: absolute;
				top: 1pc; right: 1pc;
				z-index: 3;
			}
			ul{
				flex-direction: column;
				width: 100%;
				li{
					padding: 0;
					font-size: 1.1pc;
					line-height: 1.1pc;
					&.only-mobile {
						display: flex;
					}
					a{
						text-align: left;
						padding: 1.5pc 15%;
						width: 100%;
						justify-content: flex-start;
						line-height: .4pc;
						svg{margin-right: .5pc; transition: color .5s;}

						&::after {
							content: " ";
							position: absolute;
							top: calc(100% - .8pc);
							height: 1px;
							left: 15%;
							right: 15%;
							background-color: #eee;
						}
					}
					
					a:hover{
						/* background-color: rgba(0, 0, 0, 0.15); */
						color: #4c7bff;
						svg{color: #4c7bff;}
					}
					span.like-a{
						text-align: left;
						padding: 1.5pc 15%;
						width: 100%;
						justify-content: flex-start;
						line-height: .4pc;
						svg{margin-right: .5pc; transition: color .5s;}

						&::after {
							content: " ";
							position: absolute;
							top: calc(100% - .8pc);
							height: 1px;
							left: 15%;
							right: 15%;
							background-color: #eee;
						}
					}
				}
			}
		}
	}
	@keyframes show-below {
		from{top: 50%; opacity: 0;}
		to{top: 90%; opacity: 1;}
	}

	&.dark-theme {
		background-color: #4c7bff;
		color: #fff;
		.heading a, .heading span.like-a {
			color: #fff;
			&:hover{color: #072447}
		}
		
		.children ul li a, .children ul li span.like-a {
			color: #fff;
			&:hover{
				color: #072447;
				svg{color: #072447;}
			}
		}
		
		@media screen and (max-width: 1300px) {
			.children ul li a, .children ul li span.like-a {
				color: #072447;
				&:hover{
					color: #4c7bff;
					svg{color: #4c7bff;}
				}
			}

			.ham-spe-hol{
				color: #072447;
			}
		}
	}

	.children ul li.no-load {
		padding: 0;
	}
`
export default NavBar