import styled from "styled-components"
import { FaCheck } from "react-icons/fa"
import { siteName } from "../../utils"
import { MiddleImageStyle, SideImageStyle, WhyUSStyle } from "../general/SectionStyles"

const About = () => {
	return (
		<AboutStyle>

			<MiddleImageStyle>
				<div className="inner">
					<div className="img-part">
						<img src="/images/full-contact.png" alt="About us" />
						<div className="img-ovf"></div>
					</div>
					<div className="inner-content">
						<div className="title bigger-c">About us</div>
						<div className="content">Who we are and what we do</div>
					</div>
				</div>
			</MiddleImageStyle>

			<SideImageStyle>
				<div className="inner">
					<div className="inner-content">
						<div className="side immg">
							<img src="https://cdni.iconscout.com/illustration/premium/thumb/real-estate-mortgage-calculation-4521318-3757069.png?f=avif" alt="Advancement" />
						</div>
						<div className="side text">
							<div className="title">Who we are</div>
							<div className="content">
								We are {siteName}, our history dates back to the 1900s just after the cold war ended.
								We started a revitilization plan for the community.
							</div>
						</div>
					</div>
				</div>
			</SideImageStyle>

			<SideImageStyle>
				<div className="inner">
					<div className="inner-content">
						<div className="side text">
							<div className="title">Our Patnership</div>
							<div className="content">
								We acquired Phantom Bank in the year 2013 and expended our reach to the far ends of the European Continent.
							</div>
						</div>
						<div className="side immg">
							<img src="https://cdni.iconscout.com/illustration/premium/thumb/partnership-handshake-5984440-4969869.png?f=avif" alt="Customized Rates" />
						</div>
					</div>
				</div>
			</SideImageStyle>

			<WhyUSStyle>
				<div className="inner">
					<div className="inner-content">
						<div className="title">Our Core Values</div>
						<div className="listed-parts tri">
							<div className="list-item">
								<div className="l-side"><FaCheck /></div>
								<div className="r-side">
									<div className="tit">People first</div>
									<div className="con">People that need financial advice the most can't access it. We believe that everyone deserves financial advice, and we're backing that up with free advice and low fees.</div>
								</div>
							</div>
							<div className="list-item">
								<div className="l-side"><FaCheck /></div>
								<div className="r-side">
									<div className="tit">Empowering not intimidating</div>
									<div className="con">Financial advice is often packed full of jargon. We'd rather put things simply and clearly, so that you're empowered to make the best decisions for you.</div>
								</div>
							</div>
							<div className="list-item">
								<div className="l-side"><FaCheck /></div>
								<div className="r-side">
									<div className="tit">Campaigning for better</div>
									<div className="con">OpenMoney are determined to bring about positive change in the financial industries. We're not afraid to shake things up to make a difference, just ask Klarna.</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</WhyUSStyle>

			<SideImageStyle>
				<div className="inner">
					<div className="inner-content">
						<div className="side immg">
							<img src="https://cdni.iconscout.com/illustration/premium/thumb/priorities-organize-6301254-5230241.png?f=avif" alt="Advancement" />
						</div>
						<div className="side text">
							<div className="title">Our Priorites</div>
							<div className="content">
								{siteName} priotizes it's clients needs there by integrating a 24/7 support team that are ready to answer all your queries.
							</div>
						</div>
					</div>
				</div>
			</SideImageStyle>

			<SideImageStyle>
				<div className="inner">
					<div className="inner-content">
						<div className="side text">
							<div className="title">Awards</div>
							<div className="content">
								We are always delighted to be recognised for all of the hard work that goes into wowing our clients with our service
								and making life easier and better for everyone. Our awards demonstrate our commitment to ensuring our customers
								receive a first-class service at each stage of the mortgage journey.
							</div>
						</div>
						<div className="side immg">
							<img src="https://cdni.iconscout.com/illustration/premium/thumb/doctor-getting-award-in-covid-4788307-3988918.png?f=avif" alt="Customized Rates" />
						</div>
					</div>
				</div>
			</SideImageStyle>

		</AboutStyle>
	)
}

const AboutStyle = styled.div`
	width: 100%;
	flex: 1;
`
export default About