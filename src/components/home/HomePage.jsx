import React from 'react'
import styled from 'styled-components'
import { MiddleImageStyle, SideImageStyle, WhyUSStyle } from '../general/SectionStyles'
import { Link } from "react-router-dom"
import { FaHome, FaTools } from "react-icons/fa"
import { RiCupLine } from "react-icons/ri"
import { siteName } from '../../utils'

const HomePage = () => {
  return (
    <HomePageStyle>

      <MiddleImageStyle>
        <div className="inner">
          <div className="img-part">
            <img src="/images/home.png" className='home-ssd only-desk' alt="Mortgage" />
            <img src="/images/home-mobile.png" className='home-ssd only-mobi' alt="Mortgage" />
            {/* <div className="img-ovf"></div> */}
          </div>
          <div className="inner-content duo-cont">
            <div className="duo">
              <div className="title">On your mortgage, we seamlessly provide excellent assistance.</div>
              <div className="content">We don't think that's right. Over 50,000 people have benefited from our expert advice.</div>
              <div className="button"><Link to="/calculator" className='btn-8'>Get Started</Link></div>
            </div>
            <div className="duo pic">
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/mortgage-4495947-3811071.png?f=webp" alt="Home Main" />
            </div>
          </div>
        </div>
      </MiddleImageStyle>

      <SideImageStyle>
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
                We provide a vast array of rates and services from which you can choose one which suits
                your capacity.
              </div>
              <div className="button"><Link to="/calculator" className='btn-8'>Get Started</Link></div>
            </div>
            <div className="side immg">
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/mortgage-loan-5329704-4465458.png?f=avif" alt="Customized Rates" />
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
            <div className="title">Why Choose {siteName}?</div>
            <div className="listed-parts">
              <div className="list-item">
                <div className="l-side"><FaHome /></div>
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
                {siteName} provide a trusted professional service. Our mortgage advisers love what they do.
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
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/mortgage-loan-6440849-5331752.png?f=avif" alt="Customized Rates" />
            </div>
          </div>
        </div>
      </SideImageStyle>

    </HomePageStyle>
  )
}

const HomePageStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export default HomePage