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
            <img src="/images/home.jpg" alt="Mortgage" />
            <div className="img-ovf"></div>
          </div>
          <div className="inner-content center">
            <div className="title">We give quality advice on your mortgage</div>
            <div className="content">We don't think that's right. Over 50,000 people have benefited from our expert advice.</div>
            <div className="button"><Link to="/calculator" className='btn-8'>Get Started</Link></div>
          </div>
        </div>
      </MiddleImageStyle>

      <SideImageStyle>
        <div className="inner">
          <div className="inner-content">
            <div className="side immg">
              <img src="/images/scale-balance.jpg" alt="Scale Balance" />
            </div>
            <div className="side text">
              <div className="title">Extensive Deals</div>
              <div className="content">
                Whether you're curious about new mortgage deals, rising interest rates or if remortgaging is an option for you,
                your remortgage adviser will be happy to answer any questions and offer advice.
                Speak to your expert adviser for free during your remortgaging journey.
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
              <img src="/images/coin-house.jpg" alt="Customized Rates" />
            </div>
          </div>
        </div>
      </SideImageStyle>

      <WhyUSStyle>
        <div className="inner">
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
              </div>
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
              <img src="/images/insurance.jpg" alt="Scale Balance" />
            </div>
            <div className="side text">
              <div className="title">Insurance</div>
              <div className="content">
                When you buy insurance through {siteName}, the value added to your mortgage purchase really is priceless.
                Our protection insurance advice makes all the difference, particularly if you need to claim against
                critical illness during your mortgage term. Our mortgage and protection advisers will shop around for
                competitive insurance products, saving you money and protecting the roof over your head too.
              </div>
              <div className="button"><Link to="/contact" className='btn-8'>Get Started</Link></div>
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
              <img src="/images/key-house.jpg" alt="Customized Rates" />
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