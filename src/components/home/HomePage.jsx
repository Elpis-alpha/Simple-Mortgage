import React from 'react'
import styled from 'styled-components'
import { MiddleImageStyle, SideImageStyle, WhyUSStyle } from '../general/SectionStyles'
import { Link } from "react-router-dom"
import { FaDollarSign, FaHome, FaTools } from "react-icons/fa"
import { RiCupLine } from "react-icons/ri"
import ContactFooter from '../general/ContactFooter'

const HomePage = () => {
  return (
    <HomePageStyle>

      <MiddleImageStyle>
        <div className="inner">
          <div className="img-part">
            <img src="/images/home.png" className='home-ssd only-desk' alt="Mortgage" style={{ objectFit: "cover", overflow: "visible" }} />
            <img src="/images/home-mobile.png" className='home-ssd only-mobi' alt="Mortgage" />
            {/* <div className="img-ovf"></div> */}
          </div>
          <div className="inner-content duo-cont">
            <div className="duo" style={{ zIndex: 20 }}>
              <div className="title"><div className="sxc">On your mortgage,</div><div className="sxc">we seamlessly provide</div><div className="sxc">excellent assistance.</div></div>
              <div className="content">We don't think that's right. Over 50,000 people have benefited from our expert advice.</div>
              <div className="button"><Link to="/calculator" className='btn-8'>Get Started</Link></div>
            </div>
            <div className="duo pic">
              {/* <img src="https://cdni.iconscout.com/illustration/premium/thumb/mortgage-4495947-3811071.png?f=webp" alt="Home Main" /> */}
              <img src="/images/home-hero.png" alt="Home Main" />
            </div>
          </div>
        </div>
      </MiddleImageStyle>

      <SideImageStyle style={{ zIndex: 50 }}>
        <div className="inner">
          <div className="inner-content">
            <div className="side immg">
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/mortgage-loan-6430742-5307605.png?f=avif" alt="Scale Balance" />
            </div>
            <div className="side text">
              <div className="title">Find your perfect mortgage</div>
              <div className="content">
                Mortgage Scout have been matching buyers with mortgages for over 20 years. Combining attention
                to detail with industry knowledge, we'll track down the deal that suits you best.
              </div>
              <div className="button"><Link to="/calculator" className='btn-8'>Get Started</Link></div>
            </div>
          </div>
        </div>
      </SideImageStyle>

      <SideImageStyle>
        <div className="inner">
          <div className="inner-content">
            <div className="side text">
              <div className="title">Customized Rates</div>
              <div className="content">
                You can choose from a wide range of mortgage rates and services that we offer to find one that fits your budget.
                Select the mortgage rate and service that best meets your needs.
              </div>
              <div className="button"><Link to="/calculator" className='btn-8'>Get Started</Link></div>
            </div>
            <div className="side immg">
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/mortgage-analysis-5763808-4818470.png?f=avif" alt="Customized Rates" />
            </div>
          </div>
        </div>
      </SideImageStyle>

      <WhyUSStyle>
        <div className="inner">
          {/* <div className="img-part">
            <img src="/images/whyus.png" className='home-ssd only-desk' alt="Mortgage" />
            <img src="/images/whyus-mobile.png" className='home-ssd only-mobi' alt="Mortgage" />
          </div> */}
          <div className="inner-content">
            <div className="title">Why Choose Us</div>
            <div className="listed-parts">
              <div className="list-item">
                <div className="l-side"><FaDollarSign /></div>
                <div className="r-side">
                  <div className="tit">Rising cost of living</div>
                  <div className="con">As interest and inflation rates increase, you can fix your rate to keep your repayments secure to help with bills and expenses.</div>
                </div>
              </div>
              <div className="list-item">
                <div className="l-side"><FaTools /></div>
                <div className="r-side">
                  <div className="tit">Home improvements</div>
                  <div className="con">Improving your home with renovations or extensions can be made easier by releasing money through a remortgage.</div>
                </div>
              </div> <span className="over"></span>
              <div className="list-item">
                <div className="l-side"><RiCupLine /></div>
                <div className="r-side">
                  <div className="tit">Financial comfort</div>
                  <div className="con">Remortgaging can help you become more financially comfortable by consolidating debts or reducing your monthly mortgage repayments.</div>
                </div>
              </div>
              <div className="list-item">
                <div className="l-side"><FaHome /></div>
                <div className="r-side">
                  <div className="tit">Purchasing a second home</div>
                  <div className="con">Remortgaging your current home can help you get the extra money you need for a deposit on a second home.</div>
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
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/real-estate-mortgage-calculation-4521318-3757069.png?f=avif" alt="Scale Balance" />
            </div>
            <div className="side text">
              <div className="title">Why people choose us?</div>
              <div className="content">
                A reliable professional service is offered by MASTER YOUR MORTGAGE. Our mortgage consultants love what they do, and their devotion to finding money saving mortgages allows our clients live the life they've always desired.
              </div>
              <div className="button"><Link to="/about" className='btn-8'>Learn more</Link></div>
            </div>
          </div>
        </div>
      </SideImageStyle>

      <SideImageStyle>
        <div className="inner">
          <div className="inner-content">
            <div className="side text">
              <div className="title">Our Brand</div>
              <div className="content">
                Our varieties of mortgage and banking products are the driving force to
                offering the best products for your new home, second home, or investment property.
              </div>
              <div className="button"><Link to="/about" className='btn-8'>Get Started</Link></div>
            </div>
            <div className="side immg">
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/brand-designer-working-for-footwear-brand-7154212-5805814.png?f=avif" alt="Customized Rates" />
            </div>
          </div>
        </div>
      </SideImageStyle>

      <ContactFooter />

    </HomePageStyle>
  )
}

const HomePageStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  width: 100%;
`

export default HomePage