import { FaCalculator, FaInfo, FaAddressBook } from "react-icons/fa"
import { Sling as Hamburger } from "hamburger-react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { siteName } from "../../utils"
import { useEffect, useRef, useState } from "react"

const NavBar = () => {
	const [isNavOpened, setIsNavOpened] = useState(false)
	const navChildrenRef = useRef(null)

	useEffect(() => {

		if (isNavOpened) { navChildrenRef.current.style.right = "0vw" }

		else { navChildrenRef.current.style.right = "105vw" }

	}, [isNavOpened])

	return (
		<NavBarStyle>
			<div className="heading">
				<Link to="/">{siteName}</Link>
			</div>

			<div className="ham-holder">
				<Hamburger color="black" size={20} toggled={isNavOpened} toggle={setIsNavOpened} duration={1} distance="sm" rounded />
			</div>

			<div className="children" ref={navChildrenRef}>
				<div className="ham-spe-hol">
					<Hamburger color="black" size={20} toggled={isNavOpened} toggle={setIsNavOpened} duration={1} distance="sm" rounded />
				</div>

				<ul>
					<li onClick={() => setIsNavOpened(false)}><Link to={`/calculator`}>
						Mortgage Calculator <FaCalculator />
					</Link></li>

					<li onClick={() => setIsNavOpened(false)}><Link to={`/about`}>
						About Us <FaInfo />
					</Link></li>

					<li onClick={() => setIsNavOpened(false)}><Link to={`/contact`}>
						Contact Us <FaAddressBook />
					</Link></li>
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
	a{
		padding: 1.8rem;
		line-height: 2pc;
		display: block;
		font-size: 1.2pc;
		color: black;
		text-decoration: none;
		font-weight: bold;
		transition: color .5s, background-color .5s;
		&:hover{color: #072447;}
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
		li{
			display: flex;
			align-items: center;
			justify-content: center;
			transition: color .5s, background-color .5s;
			padding: .5pc 1pc;
			font-size: .9pc;
			line-height: .9pc;
			color: black;
			cursor: pointer;
			&.like-a{
				color: black;
				text-decoration: none;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: color .5s, background-color .5s;
				&:hover{
					color: #072447;
					svg{color: #072447;}
				}
				svg{margin-left: .3pc; transition: color .5s;}
			}
			a{
				color: black;
				text-decoration: none;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: color .5s, background-color .5s;
				&:hover{
					color: #072447;
					svg{color: #072447;}
				}
				svg{margin-left: .3pc; transition: color .5s;}
			}
			&.click-x{
				cursor: pointer;
				
				&:hover{
					color: #072447;
					svg{color: #072447;}
				}
				svg{margin-left: .3pc; transition: color .5s;}
			}
		}
	}
	.ham-spe-hol{
		display: none;
	}
}
@media screen and (max-width: 760px) {
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
				a{
					padding: 1.5pc 2pc;
					width: 100%;
				}
				
				a:hover{
					background-color: rgba(0, 0, 0, 0.15);
					color: black;
					svg{color: black;}
				}
				&.like-a{
					font-size: 1.2pc;
					line-height: 1.2pc;
					padding: 1.5pc;
					&:hover{
						color: #072447;
						svg{color: #072447;}
					}
					svg{margin-left: .3pc; transition: color .5s;}
				}
				&.click-x{
					padding: 1.5pc;
					
					&:hover{
						background-color: rgba(0, 0, 0, 0.15);
						color: black;
						svg{color: black;}
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
`
export default NavBar