import { useState } from "react"
import styled from "styled-components"
import { MiddleImageStyle } from "../general/SectionStyles"

const PersonalBridgingLoanApplication = () => {
	const [isCustomerFacingBroker, setIsCustomerFacingBroker] = useState(false)
	const submitHandler = e => {
		e.preventDefault()
		const form = e.target
		console.log(form)
	}
	return (
		<PersonalBridgingLoanApplicationStyle>

			<MiddleImageStyle>
				<div className="inner">
					<div className="img-part">
						<img src="/images/full-contact.png" alt="Contact Main" />
						<div className="img-ovf"></div>
					</div>
					<div className="inner-content">
						<div className="title">Bridging Loan Application Form for Individuals</div>
					</div>
				</div>
			</MiddleImageStyle>

			<div className="inner-s">
				<form onSubmit={submitHandler}>
					<section className="form-sec">

						<div className="form-pack">
							<label htmlFor="vxv-ap1aa-Submitted-by">Submitted by</label>
							<input type="text" id="vxv-ap1aa-Submitted-by" name="vxv-ap1aa-Submitted-by" />
						</div>

						<div className="form-pack">
							<label htmlFor="vxv-ap1aa-Name-by">Name</label>
							<input type="text" id="vxv-ap1aa-Name-by" name="vxv-ap1aa-Name-by" />
						</div>

						<div className="form-pack">
							<label htmlFor="vxv-ap1aa-Firm-by">Firm</label>
							<input type="text" id="vxv-ap1aa-Firm-by" name="vxv-ap1aa-Firm-by" />
						</div>

						<div className="form-pack">
							<label htmlFor="vxv-ap1aa-FCA-by">FCA no</label>
							<input type="text" id="vxv-ap1aa-FCA-by" name="vxv-ap1aa-FCA-by" />
						</div>

						<div className="form-pack">
							<label htmlFor="vxv-ap1aa-Telephone-by">Telephone</label>
							<input type="text" id="vxv-ap1aa-Telephone-by" name="vxv-ap1aa-Telephone-by" />
						</div>

						<div className="form-pack">
							<label htmlFor="vxv-ap1aa-Email-by">Email</label>
							<input type="email" id="vxv-ap1aa-Email-by" name="vxv-ap1aa-Email-by" />
						</div>

						<div className="form-pack">
							<label>Authorisation</label>
							<div className="radio">
								<input type="radio" id="vxv-ap1aa-Authorisation-by-DA" name="vxv-Authorisation-das" />
								<label htmlFor="vxv-ap1aa-Authorisation-by-DA">DA</label>
							</div>
							<div className="radio">
								<input type="radio" id="vxv-ap1aa-Authorisation-by-AR" name="vxv-Authorisation-das" />
								<label htmlFor="vxv-ap1aa-Authorisation-by-AR">AR</label>
							</div>
							<div className="radio">
								<input type="radio" id="vxv-ap1aa-Authorisation-by-UN" name="vxv-Authorisation-das" />
								<label htmlFor="vxv-ap1aa-Authorisation-by-UN">UN</label>
							</div>
						</div>

						<div className="form-pack">
							<label htmlFor="vxv-ap1aa-Network-mortgageclub-by">Network/mortgage club</label>
							<input type="text" id="vxv-ap1aa-Network-mortgageclub-by" name="vxv-ap1aa-Network-mortgageclub-by" />
						</div>

						<div className="form-pack">
							<label>Are you the customer-facing broker?</label>
							<div className="radio">
								<input type="radio" id="vxv-ap1aa-customer-facing-broker-by-yes" name="vxv-customer-facing-broker-das" onInput={e => setIsCustomerFacingBroker(!e.target.checked)} />
								<label htmlFor="vxv-ap1aa-customer-facing-broker-by-yes">Yes</label>
							</div>
							<div className="radio">
								<input type="radio" id="vxv-ap1aa-customer-facing-broker-by-no" name="vxv-customer-facing-broker-das" onInput={e => setIsCustomerFacingBroker(e.target.checked)} />
								<label htmlFor="vxv-ap1aa-customer-facing-broker-by-no">No</label>
							</div>
						</div>

						{isCustomerFacingBroker && <>
							<div className="random-title">Please provide customer-facing broker's details below</div>

							<div className="form-pack">
								<label htmlFor="cfbb-vxv-ap1aa-Submitted-by">Submitted by</label>
								<input type="text" id="cfbb-vxv-ap1aa-Submitted-by" name="cfbb-vxv-ap1aa-Submitted-by" />
							</div>

							<div className="form-pack">
								<label htmlFor="cfbb-vxv-ap1aa-Name-by">Name</label>
								<input type="text" id="cfbb-vxv-ap1aa-Name-by" name="cfbb-vxv-ap1aa-Name-by" />
							</div>

							<div className="form-pack">
								<label htmlFor="cfbb-vxv-ap1aa-Firm-by">Firm</label>
								<input type="text" id="cfbb-vxv-ap1aa-Firm-by" name="cfbb-vxv-ap1aa-Firm-by" />
							</div>

							<div className="form-pack">
								<label htmlFor="cfbb-vxv-ap1aa-FCA-by">FCA no</label>
								<input type="text" id="cfbb-vxv-ap1aa-FCA-by" name="cfbb-vxv-ap1aa-FCA-by" />
							</div>

							<div className="form-pack">
								<label htmlFor="cfbb-vxv-ap1aa-Telephone-by">Telephone</label>
								<input type="text" id="cfbb-vxv-ap1aa-Telephone-by" name="cfbb-vxv-ap1aa-Telephone-by" />
							</div>

							<div className="form-pack">
								<label htmlFor="cfbb-vxv-ap1aa-Email-by">Email</label>
								<input type="email" id="cfbb-vxv-ap1aa-Email-by" name="cfbb-vxv-ap1aa-Email-by" />
							</div>

							<div className="form-pack">
								<label>Authorisation</label>
								<div className="radio">
									<input type="radio" id="cfbb-vxv-ap1aa-Authorisation-by-DA" name="cfbb-vxv-Authorisation-das" />
									<label htmlFor="cfbb-vxv-ap1aa-Authorisation-by-DA">DA</label>
								</div>
								<div className="radio">
									<input type="radio" id="cfbb-vxv-ap1aa-Authorisation-by-AR" name="cfbb-vxv-Authorisation-das" />
									<label htmlFor="cfbb-vxv-ap1aa-Authorisation-by-AR">AR</label>
								</div>
								<div className="radio">
									<input type="radio" id="cfbb-vxv-ap1aa-Authorisation-by-UN" name="cfbb-vxv-Authorisation-das" />
									<label htmlFor="cfbb-vxv-ap1aa-Authorisation-by-UN">UN</label>
								</div>
							</div>

							<div className="form-pack">
								<label htmlFor="cfbb-vxv-ap1aa-Network-mortgageclub-by">Network/mortgage club</label>
								<input type="text" id="cfbb-vxv-ap1aa-Network-mortgageclub-by" name="cfbb-vxv-ap1aa-Network-mortgageclub-by" />
							</div>

						</>}

					</section>
					<section className="form-sec">

						<div className="random-title bb">About the Applicant</div>

						<div className="random-title b">Applicant Details (if more than two applicants, please enter the information clearly on an additional sheet)</div>
						<div>

							<div>

								<div className="random-title">Applicant 1</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a1-ap1aa-title">Title</label>
									<input type="text" id="apaa-sdcv-a1-ap1aa-title" name="apaa-sdcv-a1-ap1aa-title" />
								</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a1-ap1aa-Full-Name">Full Name</label>
									<input type="text" id="apaa-sdcv-a1-ap1aa-Full-Name" name="apaa-sdcv-a1-ap1aa-Full-Name" />
								</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a1-ap1aa-Date-of-Birth">Date of Birth</label>
									<input type="text" id="apaa-sdcv-a1-ap1aa-Date-of-Birth" name="apaa-sdcv-a1-ap1aa-Date-of-Birth" />
								</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a1-ap1aa-Residential-address">Residential address</label>
									<input type="text" id="apaa-sdcv-a1-ap1aa-Residential-address" name="apaa-sdcv-a1-ap1aa-Residential-address" />
								</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a1-ap1aa-Postcode">Postcode</label>
									<input type="text" id="apaa-sdcv-a1-ap1aa-Postcode" name="apaa-sdcv-a1-ap1aa-Postcode" />
								</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a1-ap1aa-Country-of-residence">Country of residence</label>
									<input type="text" id="apaa-sdcv-a1-ap1aa-Country-of-residence" name="apaa-sdcv-a1-ap1aa-Country-of-residence" />
								</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a1-ap1aa-Nationality">Nationality</label>
									<input type="text" id="apaa-sdcv-a1-ap1aa-Nationality" name="apaa-sdcv-a1-ap1aa-Nationality" />
								</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a1-ap1aa-Telelephone">Telelephone</label>
									<input type="text" id="apaa-sdcv-a1-ap1aa-Telelephone" name="apaa-sdcv-a1-ap1aa-Telelephone" />
								</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a1-ap1aa-Mobile">Mobile</label>
									<input type="text" id="apaa-sdcv-a1-ap1aa-Mobile" name="apaa-sdcv-a1-ap1aa-Mobile" />
								</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a1-ap1aa-Email">Email</label>
									<input type="text" id="apaa-sdcv-a1-ap1aa-Email" name="apaa-sdcv-a1-ap1aa-Email" />
								</div>

								<div className="form-pack">
									<label>Does the applicant own his/her own residence</label>
									<div className="radio">
										<input type="radio" id="apaa-sdcv-a1-ap1aa-Does-the-applicant-own-his/her-own-residence-Yes" name="apaa-sdcv-a1-ap1aa-Does-the-applicant-own-his/her-own-residence" />
										<label htmlFor="apaa-sdcv-a1-ap1aa-Does-the-applicant-own-his/her-own-residence-Yes">Yes</label>
									</div>
									<div className="radio">
										<input type="radio" id="apaa-sdcv-a1-ap1aa-Does-the-applicant-own-his/her-own-residence-No" name="apaa-sdcv-a1-ap1aa-Does-the-applicant-own-his/her-own-residence" />
										<label htmlFor="apaa-sdcv-a1-ap1aa-Does-the-applicant-own-his/her-own-residence-No">No</label>
									</div>
								</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a1-ap1aa-Value-of-residence">Value of residence</label>
									<input type="text" id="apaa-sdcv-a1-ap1aa-Value-of-residence" name="apaa-sdcv-a1-ap1aa-Value-of-residence" />
								</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a1-ap1aa-Outstanding-charge">Outstanding charge</label>
									<input type="text" id="apaa-sdcv-a1-ap1aa-Outstanding-charge" name="apaa-sdcv-a1-ap1aa-Outstanding-charge" />
								</div>

							</div>

							<div>
								<div className="random-title pt-3">Applicant 2 (or Guarantor)</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a2-ap1aa-title">Title</label>
									<input type="text" id="apaa-sdcv-a2-ap1aa-title" name="apaa-sdcv-a2-ap1aa-title" />
								</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a2-ap1aa-Full-Name">Full Name</label>
									<input type="text" id="apaa-sdcv-a2-ap1aa-Full-Name" name="apaa-sdcv-a2-ap1aa-Full-Name" />
								</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a2-ap1aa-Date-of-Birth">Date of Birth</label>
									<input type="text" id="apaa-sdcv-a2-ap1aa-Date-of-Birth" name="apaa-sdcv-a2-ap1aa-Date-of-Birth" />
								</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a2-ap1aa-Residential-address">Residential address</label>
									<input type="text" id="apaa-sdcv-a2-ap1aa-Residential-address" name="apaa-sdcv-a2-ap1aa-Residential-address" />
								</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a2-ap1aa-Postcode">Postcode</label>
									<input type="text" id="apaa-sdcv-a2-ap1aa-Postcode" name="apaa-sdcv-a2-ap1aa-Postcode" />
								</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a2-ap1aa-Country-of-residence">Country of residence</label>
									<input type="text" id="apaa-sdcv-a2-ap1aa-Country-of-residence" name="apaa-sdcv-a2-ap1aa-Country-of-residence" />
								</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a2-ap1aa-Nationality">Nationality</label>
									<input type="text" id="apaa-sdcv-a2-ap1aa-Nationality" name="apaa-sdcv-a2-ap1aa-Nationality" />
								</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a2-ap1aa-Telelephone">Telelephone</label>
									<input type="text" id="apaa-sdcv-a2-ap1aa-Telelephone" name="apaa-sdcv-a2-ap1aa-Telelephone" />
								</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a2-ap1aa-Mobile">Mobile</label>
									<input type="text" id="apaa-sdcv-a2-ap1aa-Mobile" name="apaa-sdcv-a2-ap1aa-Mobile" />
								</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a2-ap1aa-Email">Email</label>
									<input type="text" id="apaa-sdcv-a2-ap1aa-Email" name="apaa-sdcv-a2-ap1aa-Email" />
								</div>

								<div className="form-pack">
									<label>Does the applicant own his/her own residence</label>
									<div className="radio">
										<input type="radio" id="apaa-sdcv-a2-ap1aa-Does-the-applicant-own-his/her-own-residence-Yes" name="apaa-sdcv-a2-ap1aa-Does-the-applicant-own-his/her-own-residence" />
										<label htmlFor="apaa-sdcv-a2-ap1aa-Does-the-applicant-own-his/her-own-residence-Yes">Yes</label>
									</div>
									<div className="radio">
										<input type="radio" id="apaa-sdcv-a2-ap1aa-Does-the-applicant-own-his/her-own-residence-No" name="apaa-sdcv-a2-ap1aa-Does-the-applicant-own-his/her-own-residence" />
										<label htmlFor="apaa-sdcv-a2-ap1aa-Does-the-applicant-own-his/her-own-residence-No">No</label>
									</div>
								</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a2-ap1aa-Value-of-residence">Value of residence</label>
									<input type="text" id="apaa-sdcv-a2-ap1aa-Value-of-residence" name="apaa-sdcv-a2-ap1aa-Value-of-residence" />
								</div>

								<div className="form-pack">
									<label htmlFor="apaa-sdcv-a2-ap1aa-Outstanding-charge">Outstanding charge</label>
									<input type="text" id="apaa-sdcv-a2-ap1aa-Outstanding-charge" name="apaa-sdcv-a2-ap1aa-Outstanding-charge" />
								</div>

							</div>

						</div>

						<div className="random-title b">Employment details</div>
						<div>

							<div>

								<div className="random-title">Applicant 1</div>

								<div className="form-pack">
									<label>Employment Status</label>
									<div className="radio">
										<input type="radio" id="edspaa-sdcv-a1-ap1aa-Employment-Status-Self-Employed" name="edspaa-sdcv-a1-ap1aa-Employment-Status" />
										<label htmlFor="edspaa-sdcv-a1-ap1aa-Employment-Status-Self-Employed">Self Employed</label>
									</div>
									<div className="radio">
										<input type="radio" id="edspaa-sdcv-a1-ap1aa-Employment-Status-Employed" name="edspaa-sdcv-a1-ap1aa-Employment-Status" />
										<label htmlFor="edspaa-sdcv-a1-ap1aa-Employment-Status-Employed">Employed</label>
									</div>
									<div className="radio">
										<input type="radio" id="edspaa-sdcv-a1-ap1aa-Employment-Status-Not-Employed" name="edspaa-sdcv-a1-ap1aa-Employment-Status" />
										<label htmlFor="edspaa-sdcv-a1-ap1aa-Employment-Status-Not-Employed">Not Employed</label>
									</div>
									<div className="radio">
										<input type="radio" id="edspaa-sdcv-a1-ap1aa-Employment-Status-Retired" name="edspaa-sdcv-a1-ap1aa-Employment-Status" />
										<label htmlFor="edspaa-sdcv-a1-ap1aa-Employment-Status-Retired">Retired</label>
									</div>
								</div>

								<div className="form-pack">
									<label htmlFor="edspaa-sdcv-a1-ap1aa-Name-of-employer/business">Name of employer/business</label>
									<input type="text" id="edspaa-sdcv-a1-ap1aa-Name-of-employer/business" name="edspaa-sdcv-a1-ap1aa-Name-of-employer/business" />
								</div>

								<div className="form-pack">
									<label htmlFor="edspaa-sdcv-a1-ap1aa-Full-address-of-employer/business">Full address of employer/business</label>
									<textarea id="edspaa-sdcv-a1-ap1aa-Full-address-of-employer/business" name="edspaa-sdcv-a1-ap1aa-Full-address-of-employer/business"></textarea>
								</div>

								<div className="form-pack">
									<label htmlFor="edspaa-sdcv-a1-ap1aa-Postcode">Postcode</label>
									<input type="text" id="edspaa-sdcv-a1-ap1aa-Postcode" name="edspaa-sdcv-a1-ap1aa-Postcode" />
								</div>

								<div className="form-pack">
									<label htmlFor="edspaa-sdcv-a1-ap1aa-Telephone">Telephone</label>
									<input type="text" id="edspaa-sdcv-a1-ap1aa-Telephone" name="edspaa-sdcv-a1-ap1aa-Telephone" />
								</div>

								<div className="form-pack">
									<label htmlFor="edspaa-sdcv-a1-ap1aa-Website">Website</label>
									<input type="text" id="edspaa-sdcv-a1-ap1aa-Website" name="edspaa-sdcv-a1-ap1aa-Website" />
								</div>

								<div className="form-pack">
									<label htmlFor="edspaa-sdcv-a1-ap1aa-What-is-the-nature-of-employer/your-business">What is the nature of employer/your business</label>
									<textarea id="edspaa-sdcv-a1-ap1aa-What-is-the-nature-of-employer/your-business" name="edspaa-sdcv-a1-ap1aa-What-is-the-nature-of-employer/your-business"></textarea>
								</div>

								<div className="form-pack">
									<label htmlFor="edspaa-sdcv-a1-ap1aa-Position-held">Position held</label>
									<input type="text" id="edspaa-sdcv-a1-ap1aa-Position-held" name="edspaa-sdcv-a1-ap1aa-Position-held" />
								</div>

								<div className="form-pack">
									<label>If employed, is this job permanent</label>
									<div className="radio">
										<input type="radio" id="edspaa-sdcv-a1-ap1aa-If-employed,-is-this-job-permanent-Yes" name="edspaa-sdcv-a1-ap1aa-If-employed,-is-this-job-permanent" />
										<label htmlFor="edspaa-sdcv-a1-ap1aa-If-employed,-is-this-job-permanent-Yes">Yes</label>
									</div>
									<div className="radio">
										<input type="radio" id="edspaa-sdcv-a1-ap1aa-If-employed,-is-this-job-permanent-No" name="edspaa-sdcv-a1-ap1aa-If-employed,-is-this-job-permanent" />
										<label htmlFor="edspaa-sdcv-a1-ap1aa-If-employed,-is-this-job-permanent-No">No</label>
									</div>
								</div>

								<div className="form-pack">
									<label htmlFor="edspaa-sdcv-a1-ap1aa-How-long-with-your-employer">How long with your employer (if self-employed how long have you been in business)?</label>
									<textarea id="edspaa-sdcv-a1-ap1aa-How-long-with-your-employer" name="edspaa-sdcv-a1-ap1aa-How-long-with-your-employer"></textarea>
								</div>

								<div className="form-pack">
									<label htmlFor="edspaa-sdcv-a1-ap1aa-National-Insurance-Number">National Insurance Number</label>
									<input type="text" id="edspaa-sdcv-a1-ap1aa-National-Insurance-Number" name="edspaa-sdcv-a1-ap1aa-National-Insurance-Number" />
								</div>

							</div>

							<div>

								<div className="random-title pt-3">Applicant 2 (or Guarantor)</div>

								<div className="form-pack">
									<label>Employment Status</label>
									<div className="radio">
										<input type="radio" id="edspaa-sdcv-a2-ap1aa-Employment-Status-Self-Employed" name="edspaa-sdcv-a2-ap1aa-Employment-Status" />
										<label htmlFor="edspaa-sdcv-a2-ap1aa-Employment-Status-Self-Employed">Self Employed</label>
									</div>
									<div className="radio">
										<input type="radio" id="edspaa-sdcv-a2-ap1aa-Employment-Status-Employed" name="edspaa-sdcv-a2-ap1aa-Employment-Status" />
										<label htmlFor="edspaa-sdcv-a2-ap1aa-Employment-Status-Employed">Employed</label>
									</div>
									<div className="radio">
										<input type="radio" id="edspaa-sdcv-a2-ap1aa-Employment-Status-Not-Employed" name="edspaa-sdcv-a2-ap1aa-Employment-Status" />
										<label htmlFor="edspaa-sdcv-a2-ap1aa-Employment-Status-Not-Employed">Not Employed</label>
									</div>
									<div className="radio">
										<input type="radio" id="edspaa-sdcv-a2-ap1aa-Employment-Status-Retired" name="edspaa-sdcv-a2-ap1aa-Employment-Status" />
										<label htmlFor="edspaa-sdcv-a2-ap1aa-Employment-Status-Retired">Retired</label>
									</div>
								</div>

								<div className="form-pack">
									<label htmlFor="edspaa-sdcv-a2-ap1aa-Name-of-employer/business">Name of employer/business</label>
									<input type="text" id="edspaa-sdcv-a2-ap1aa-Name-of-employer/business" name="edspaa-sdcv-a2-ap1aa-Name-of-employer/business" />
								</div>

								<div className="form-pack">
									<label htmlFor="edspaa-sdcv-a2-ap1aa-Full-address-of-employer/business">Full address of employer/business</label>
									<textarea id="edspaa-sdcv-a2-ap1aa-Full-address-of-employer/business" name="edspaa-sdcv-a2-ap1aa-Full-address-of-employer/business"></textarea>
								</div>

								<div className="form-pack">
									<label htmlFor="edspaa-sdcv-a2-ap1aa-Postcode">Postcode</label>
									<input type="text" id="edspaa-sdcv-a2-ap1aa-Postcode" name="edspaa-sdcv-a2-ap1aa-Postcode" />
								</div>

								<div className="form-pack">
									<label htmlFor="edspaa-sdcv-a2-ap1aa-Telephone">Telephone</label>
									<input type="text" id="edspaa-sdcv-a2-ap1aa-Telephone" name="edspaa-sdcv-a2-ap1aa-Telephone" />
								</div>

								<div className="form-pack">
									<label htmlFor="edspaa-sdcv-a2-ap1aa-Website">Website</label>
									<input type="text" id="edspaa-sdcv-a2-ap1aa-Website" name="edspaa-sdcv-a2-ap1aa-Website" />
								</div>

								<div className="form-pack">
									<label htmlFor="edspaa-sdcv-a2-ap1aa-What-is-the-nature-of-employer/your-business">What is the nature of employer/your business</label>
									<textarea id="edspaa-sdcv-a2-ap1aa-What-is-the-nature-of-employer/your-business" name="edspaa-sdcv-a2-ap1aa-What-is-the-nature-of-employer/your-business"></textarea>
								</div>

								<div className="form-pack">
									<label htmlFor="edspaa-sdcv-a2-ap1aa-Position-held">Position held</label>
									<input type="text" id="edspaa-sdcv-a2-ap1aa-Position-held" name="edspaa-sdcv-a2-ap1aa-Position-held" />
								</div>

								<div className="form-pack">
									<label>If employed, is this job permanent</label>
									<div className="radio">
										<input type="radio" id="edspaa-sdcv-a2-ap1aa-If-employed,-is-this-job-permanent-Yes" name="edspaa-sdcv-a2-ap1aa-If-employed,-is-this-job-permanent" />
										<label htmlFor="edspaa-sdcv-a2-ap1aa-If-employed,-is-this-job-permanent-Yes">Yes</label>
									</div>
									<div className="radio">
										<input type="radio" id="edspaa-sdcv-a2-ap1aa-If-employed,-is-this-job-permanent-No" name="edspaa-sdcv-a2-ap1aa-If-employed,-is-this-job-permanent" />
										<label htmlFor="edspaa-sdcv-a2-ap1aa-If-employed,-is-this-job-permanent-No">No</label>
									</div>
								</div>

								<div className="form-pack">
									<label htmlFor="edspaa-sdcv-a2-ap1aa-How-long-with-your-employer">How long with your employer (if self-employed how long have you been in business)?</label>
									<textarea id="edspaa-sdcv-a2-ap1aa-How-long-with-your-employer" name="edspaa-sdcv-a2-ap1aa-How-long-with-your-employer"></textarea>
								</div>

								<div className="form-pack">
									<label htmlFor="edspaa-sdcv-a2-ap1aa-National-Insurance-Number">National Insurance Number</label>
									<input type="text" id="edspaa-sdcv-a2-ap1aa-National-Insurance-Number" name="edspaa-sdcv-a2-ap1aa-National-Insurance-Number" />
								</div>

							</div>

						</div>

					</section>
					<section className="form-sec">

						<div className="random-title bb">About the Security Properties</div>

						<div>

							<div className="random-title b">Primary property being used as security for the loan</div>

							<div className="form-pack">
								<label htmlFor="atra-spp-primary-ap1aa-Full-address-of-property">Full address of property</label>
								<textarea id="atra-spp-primary-ap1aa-Full-address-of-property" name="atra-spp-primary-ap1aa-Full-address-of-property"></textarea>
							</div>

							<div className="form-pack">
								<label htmlFor="atra-spp-primary-ap1aa-Postcode">Postcode</label>
								<input type="text" id="atra-spp-primary-ap1aa-Postcode" name="atra-spp-primary-ap1aa-Postcode" />
							</div>

							<div className="form-pack">
								<label>Is the property</label>
								<div className="radio">
									<input type="radio" id="atra-spp-primary-ap1aa-Is-the-property-Freehold" name="atra-spp-primary-ap1aa-Is-the-property" />
									<label htmlFor="atra-spp-primary-ap1aa-Is-the-property-Freehold">Freehold</label>
								</div>
								<div className="radio">
									<input type="radio" id="atra-spp-primary-ap1aa-Is-the-property-Leasehold" name="atra-spp-primary-ap1aa-Is-the-property" />
									<label htmlFor="atra-spp-primary-ap1aa-Is-the-property-Leasehold">Leasehold</label>
								</div>
							</div>

							<div className="form-pack">
								<label htmlFor="atra-spp-primary-ap1aa-If-Leasehold,-how-many-years-remain-on-the-lease">If Leasehold, how many years remain on the lease</label>
								<input type="text" id="atra-spp-primary-ap1aa-If-Leasehold,-how-many-years-remain-on-the-lease" name="atra-spp-primary-ap1aa-If-Leasehold,-how-many-years-remain-on-the-lease" />
							</div>

							<div className="form-pack">
								<label>Ownership Status</label>
								<div className="radio">
									<input type="radio" id="atra-spp-primary-ap1aa-Ownership-Status-Already-Owned" name="atra-spp-primary-ap1aa-Ownership-Status" />
									<label htmlFor="atra-spp-primary-ap1aa-Ownership-Status-Already-Owned">Already Owned</label>
									<input type="text" id="atra-spp-primary-ap1aa-Ownership-Status-Already-Owned-DP" name="atra-spp-primary-ap1aa-Ownership-Status-Already-Owned-DP" placeholder="Date Purchased" />
								</div>
								<div className="radio">
									<input type="radio" id="atra-spp-primary-ap1aa-Ownership-Status-Being-purchased" name="atra-spp-primary-ap1aa-Ownership-Status" />
									<label htmlFor="atra-spp-primary-ap1aa-Ownership-Status-Being-purchased">Being purchased</label>
								</div>
								<div className="radio">
									<input type="radio" id="atra-spp-primary-ap1aa-Ownership-Status-Owned-by-another" name="atra-spp-primary-ap1aa-Ownership-Status" />
									<label htmlFor="atra-spp-primary-ap1aa-Ownership-Status-Owned-by-another">Owned by another</label>
								</div>
							</div>

							<div className="form-pack">
								<label htmlFor="atra-spp-primary-ap1aa-Purchase-price/price-paid-(£)">Purchase price/price paid (£)</label>
								<input type="text" id="atra-spp-primary-ap1aa-Purchase-price/price-paid-(£)" name="atra-spp-primary-ap1aa-Purchase-price/price-paid-(£)" />
							</div>

							<div className="form-pack">
								<label htmlFor="atra-spp-primary-ap1aa-Estimated-value-(£)">Estimated value (£)</label>
								<input type="text" id="atra-spp-primary-ap1aa-Estimated-value-(£)" name="atra-spp-primary-ap1aa-Estimated-value-(£)" />
							</div>

							<div className="form-pack">
								<label htmlFor="atra-spp-primary-ap1aa-Monthly-rental-income-(if-tenanted)-(£)">Monthly rental income (if tenanted) (£)</label>
								<input type="text" id="atra-spp-primary-ap1aa-Monthly-rental-income-(if-tenanted)-(£)" name="atra-spp-primary-ap1aa-Monthly-rental-income-(if-tenanted)-(£)" />
							</div>

							<div className="form-pack">
								<label htmlFor="atra-spp-primary-ap1aa-Total-amount-currently-owed-on-outstanding-mortgage(s)-(if-already-owned)-(£)">Total amount currently owed on outstanding mortgage(s) (if already owned) (£)</label>
								<input type="text" id="atra-spp-primary-ap1aa-Total-amount-currently-owed-on-outstanding-mortgage(s)-(if-already-owned)-(£)" name="atra-spp-primary-ap1aa-Total-amount-currently-owed-on-outstanding-mortgage(s)-(if-already-owned)-(£)" />
							</div>

							<div className="form-pack">
								<label>Security Offered:</label>
								<div className="radio">
									<input type="radio" id="atra-spp-primary-ap1aa-Security-Offered:-First-Charge" name="atra-spp-primary-ap1aa-Security-Offered:" />
									<label htmlFor="atra-spp-primary-ap1aa-Security-Offered:-First-Charge">First Charge</label>
								</div>
								<div className="radio">
									<input type="radio" id="atra-spp-primary-ap1aa-Security-Offered:-Second-Charge" name="atra-spp-primary-ap1aa-Security-Offered:" />
									<label htmlFor="atra-spp-primary-ap1aa-Security-Offered:-Second-Charge">Second Charge</label>
								</div>
							</div>

							<div className="form-pack">
								<label>Property Description</label>
								<div className="radio">
									<input type="radio" id="atra-spp-primary-ap1aa-Property-Description-House" name="atra-spp-primary-ap1aa-Property-Description" />
									<label htmlFor="atra-spp-primary-ap1aa-Property-Description-House">House</label>
								</div>
								<div className="radio">
									<input type="radio" id="atra-spp-primary-ap1aa-Property-Description-Bungalow" name="atra-spp-primary-ap1aa-Property-Description" />
									<label htmlFor="atra-spp-primary-ap1aa-Property-Description-Bungalow">Bungalow</label>
								</div>
								<div className="radio">
									<input type="radio" id="atra-spp-primary-ap1aa-Property-Description-Flat" name="atra-spp-primary-ap1aa-Property-Description" />
									<label htmlFor="atra-spp-primary-ap1aa-Property-Description-Flat">Flat</label>
								</div>
								<div className="radio">
									<input type="radio" id="atra-spp-primary-ap1aa-Property-Description-Maisonette" name="atra-spp-primary-ap1aa-Property-Description" />
									<label htmlFor="atra-spp-primary-ap1aa-Property-Description-Maisonette">Maisonette</label>
								</div>
								<div className="radio">
									<input type="radio" id="atra-spp-primary-ap1aa-Property-Description-Others" name="atra-spp-primary-ap1aa-Property-Description" />
									<label htmlFor="atra-spp-primary-ap1aa-Property-Description-Others">Others</label>
									<input type="text" id="atra-spp-primary-ap1aa-Property-Description-D" name="atra-spp-primary-ap1aa-Property-Description-D" placeholder="Describe" />
								</div>
							</div>

							<div className="form-pack">
								<label htmlFor="atra-spp-primary-ap1aa-Floor-Number">Floor Number</label>
								<input type="text" id="atra-spp-primary-ap1aa-Floor-Number" name="atra-spp-primary-ap1aa-Floor-Number" />
							</div>

							<div className="form-pack">
								<label htmlFor="atra-spp-primary-ap1aa-Number-of-Storeys">Number of Storeys</label>
								<input type="text" id="atra-spp-primary-ap1aa-Number-of-Storeys" name="atra-spp-primary-ap1aa-Number-of-Storeys" />
							</div>

							<div className="form-pack">
								<label htmlFor="atra-spp-primary-ap1aa-Number-of-Bedrooms">Number of Bedrooms</label>
								<input type="text" id="atra-spp-primary-ap1aa-Number-of-Bedrooms" name="atra-spp-primary-ap1aa-Number-of-Bedrooms" />
							</div>

							<div className="form-pack">
								<label htmlFor="atra-spp-primary-ap1aa-Year-Built">Year Built</label>
								<input type="text" id="atra-spp-primary-ap1aa-Year-Built" name="atra-spp-primary-ap1aa-Year-Built" />
							</div>

							<div className="form-pack">
								<label>Type of Building</label>
								<div className="checkbox">
									<input type="checkbox" id="atra-spp-primary-ap1aa-Type-of-Building-Ex-Local-Authority" name="atra-spp-primary-ap1aa-Type-of-Building" />
									<label htmlFor="atra-spp-primary-ap1aa-Type-of-Building-Ex-Local-Authority">Ex-Local Authority</label>
								</div>
								<div className="checkbox">
									<input type="checkbox" id="atra-spp-primary-ap1aa-Type-of-Building-Non-Standard-Construction" name="atra-spp-primary-ap1aa-Type-of-Building" />
									<label htmlFor="atra-spp-primary-ap1aa-Type-of-Building-Non-Standard-Construction">Non-Standard Construction</label>
								</div>
							</div>

							<div className="form-pack">
								<label htmlFor="atra-spp-primary-ap1aa-Are-there-any-intended-works-or-improvements-during-the-term-of-the-loan">Are there any intended works or improvements during the term of the loan</label>
								<input type="text" id="atra-spp-primary-ap1aa-Are-there-any-intended-works-or-improvements-during-the-term-of-the-loan" name="atra-spp-primary-ap1aa-Are-there-any-intended-works-or-improvements-during-the-term-of-the-loan" />
							</div>

							<div className="form-pack">
								<label htmlFor="atra-spp-primary-ap1aa-Current-condition-of-property">Current condition of property</label>
								<input type="text" id="atra-spp-primary-ap1aa-Current-condition-of-property" name="atra-spp-primary-ap1aa-Current-condition-of-property" />
							</div>

							<div className="form-pack">
								<label htmlFor="atra-spp-primary-ap1aa-Who-will-live-in-the-property-and-their-respective-ages">Who will live in the property and their respective ages</label>
								<input type="text" id="atra-spp-primary-ap1aa-Who-will-live-in-the-property-and-their-respective-ages" name="atra-spp-primary-ap1aa-Who-will-live-in-the-property-and-their-respective-ages" />
							</div>

							<div className="form-pack">
								<label htmlFor="atra-spp-primary-ap1aa-What-is-their-relationship-to-the-Applicant(s)">What is their relationship to the Applicant(s)</label>
								<input type="text" id="atra-spp-primary-ap1aa-What-is-their-relationship-to-the-Applicant(s)" name="atra-spp-primary-ap1aa-What-is-their-relationship-to-the-Applicant(s)" />
							</div>

						</div>

						<div>

							<div className="random-title b pt-3">Other property being used as security for the loan</div>

							<div className="form-pack">
								<label htmlFor="atra-opbus-primary-ap1aa-Full-address-of-property">Full address of property</label>
								<textarea id="atra-opbus-primary-ap1aa-Full-address-of-property" name="atra-opbus-primary-ap1aa-Full-address-of-property"></textarea>
							</div>

							<div className="form-pack">
								<label htmlFor="atra-opbus-primary-ap1aa-Postcode">Postcode</label>
								<input type="text" id="atra-opbus-primary-ap1aa-Postcode" name="atra-opbus-primary-ap1aa-Postcode" />
							</div>

							<div className="form-pack">
								<label>Is the property</label>
								<div className="radio">
									<input type="radio" id="atra-opbus-primary-ap1aa-Is-the-property-Freehold" name="atra-opbus-primary-ap1aa-Is-the-property" />
									<label htmlFor="atra-opbus-primary-ap1aa-Is-the-property-Freehold">Freehold</label>
								</div>
								<div className="radio">
									<input type="radio" id="atra-opbus-primary-ap1aa-Is-the-property-Leasehold" name="atra-opbus-primary-ap1aa-Is-the-property" />
									<label htmlFor="atra-opbus-primary-ap1aa-Is-the-property-Leasehold">Leasehold</label>
								</div>
							</div>

							<div className="form-pack">
								<label htmlFor="atra-opbus-primary-ap1aa-If-Leasehold,-how-many-years-remain-on-the-lease">If Leasehold, how many years remain on the lease</label>
								<input type="text" id="atra-opbus-primary-ap1aa-If-Leasehold,-how-many-years-remain-on-the-lease" name="atra-opbus-primary-ap1aa-If-Leasehold,-how-many-years-remain-on-the-lease" />
							</div>

							<div className="form-pack">
								<label>Ownership Status</label>
								<div className="radio">
									<input type="radio" id="atra-opbus-primary-ap1aa-Ownership-Status-Already-Owned" name="atra-opbus-primary-ap1aa-Ownership-Status" />
									<label htmlFor="atra-opbus-primary-ap1aa-Ownership-Status-Already-Owned">Already Owned</label>
									<input type="text" id="atra-opbus-primary-ap1aa-Ownership-Status-Already-Owned-DP" name="atra-opbus-primary-ap1aa-Ownership-Status-Already-Owned-DP" placeholder="Date Purchased" />
								</div>
								<div className="radio">
									<input type="radio" id="atra-opbus-primary-ap1aa-Ownership-Status-Being-purchased" name="atra-opbus-primary-ap1aa-Ownership-Status" />
									<label htmlFor="atra-opbus-primary-ap1aa-Ownership-Status-Being-purchased">Being purchased</label>
								</div>
								<div className="radio">
									<input type="radio" id="atra-opbus-primary-ap1aa-Ownership-Status-Owned-by-another" name="atra-opbus-primary-ap1aa-Ownership-Status" />
									<label htmlFor="atra-opbus-primary-ap1aa-Ownership-Status-Owned-by-another">Owned by another</label>
								</div>
							</div>

							<div className="form-pack">
								<label htmlFor="atra-opbus-primary-ap1aa-Purchase-price/price-paid-(£)">Purchase price/price paid (£)</label>
								<input type="text" id="atra-opbus-primary-ap1aa-Purchase-price/price-paid-(£)" name="atra-opbus-primary-ap1aa-Purchase-price/price-paid-(£)" />
							</div>

							<div className="form-pack">
								<label htmlFor="atra-opbus-primary-ap1aa-Estimated-value-(£)">Estimated value (£)</label>
								<input type="text" id="atra-opbus-primary-ap1aa-Estimated-value-(£)" name="atra-opbus-primary-ap1aa-Estimated-value-(£)" />
							</div>

							<div className="form-pack">
								<label htmlFor="atra-opbus-primary-ap1aa-Monthly-rental-income-(if-tenanted)-(£)">Monthly rental income (if tenanted) (£)</label>
								<input type="text" id="atra-opbus-primary-ap1aa-Monthly-rental-income-(if-tenanted)-(£)" name="atra-opbus-primary-ap1aa-Monthly-rental-income-(if-tenanted)-(£)" />
							</div>

							<div className="form-pack">
								<label htmlFor="atra-opbus-primary-ap1aa-Total-amount-currently-owed-on-outstanding-mortgage(s)-(if-already-owned)-(£)">Total amount currently owed on outstanding mortgage(s) (if already owned) (£)</label>
								<input type="text" id="atra-opbus-primary-ap1aa-Total-amount-currently-owed-on-outstanding-mortgage(s)-(if-already-owned)-(£)" name="atra-opbus-primary-ap1aa-Total-amount-currently-owed-on-outstanding-mortgage(s)-(if-already-owned)-(£)" />
							</div>

							<div className="form-pack">
								<label>Security Offered:</label>
								<div className="radio">
									<input type="radio" id="atra-opbus-primary-ap1aa-Security-Offered:-First-Charge" name="atra-opbus-primary-ap1aa-Security-Offered:" />
									<label htmlFor="atra-opbus-primary-ap1aa-Security-Offered:-First-Charge">First Charge</label>
								</div>
								<div className="radio">
									<input type="radio" id="atra-opbus-primary-ap1aa-Security-Offered:-Second-Charge" name="atra-opbus-primary-ap1aa-Security-Offered:" />
									<label htmlFor="atra-opbus-primary-ap1aa-Security-Offered:-Second-Charge">Second Charge</label>
								</div>
							</div>

							<div className="form-pack">
								<label>Property Description</label>
								<div className="radio">
									<input type="radio" id="atra-opbus-primary-ap1aa-Property-Description-House" name="atra-opbus-primary-ap1aa-Property-Description" />
									<label htmlFor="atra-opbus-primary-ap1aa-Property-Description-House">House</label>
								</div>
								<div className="radio">
									<input type="radio" id="atra-opbus-primary-ap1aa-Property-Description-Bungalow" name="atra-opbus-primary-ap1aa-Property-Description" />
									<label htmlFor="atra-opbus-primary-ap1aa-Property-Description-Bungalow">Bungalow</label>
								</div>
								<div className="radio">
									<input type="radio" id="atra-opbus-primary-ap1aa-Property-Description-Flat" name="atra-opbus-primary-ap1aa-Property-Description" />
									<label htmlFor="atra-opbus-primary-ap1aa-Property-Description-Flat">Flat</label>
								</div>
								<div className="radio">
									<input type="radio" id="atra-opbus-primary-ap1aa-Property-Description-Maisonette" name="atra-opbus-primary-ap1aa-Property-Description" />
									<label htmlFor="atra-opbus-primary-ap1aa-Property-Description-Maisonette">Maisonette</label>
								</div>
								<div className="radio">
									<input type="radio" id="atra-opbus-primary-ap1aa-Property-Description-Others" name="atra-opbus-primary-ap1aa-Property-Description" />
									<label htmlFor="atra-opbus-primary-ap1aa-Property-Description-Others">Others</label>
									<input type="text" id="atra-opbus-primary-ap1aa-Property-Description-D" name="atra-opbus-primary-ap1aa-Property-Description-D" placeholder="Describe" />
								</div>
							</div>

							<div className="form-pack">
								<label htmlFor="atra-opbus-primary-ap1aa-Floor-Number">Floor Number</label>
								<input type="text" id="atra-opbus-primary-ap1aa-Floor-Number" name="atra-opbus-primary-ap1aa-Floor-Number" />
							</div>

							<div className="form-pack">
								<label htmlFor="atra-opbus-primary-ap1aa-Number-of-Storeys">Number of Storeys</label>
								<input type="text" id="atra-opbus-primary-ap1aa-Number-of-Storeys" name="atra-opbus-primary-ap1aa-Number-of-Storeys" />
							</div>

							<div className="form-pack">
								<label htmlFor="atra-opbus-primary-ap1aa-Number-of-Bedrooms">Number of Bedrooms</label>
								<input type="text" id="atra-opbus-primary-ap1aa-Number-of-Bedrooms" name="atra-opbus-primary-ap1aa-Number-of-Bedrooms" />
							</div>

							<div className="form-pack">
								<label htmlFor="atra-opbus-primary-ap1aa-Year-Built">Year Built</label>
								<input type="text" id="atra-opbus-primary-ap1aa-Year-Built" name="atra-opbus-primary-ap1aa-Year-Built" />
							</div>

							<div className="form-pack">
								<label>Type of Building</label>
								<div className="checkbox">
									<input type="checkbox" id="atra-opbus-primary-ap1aa-Type-of-Building-Ex-Local-Authority" name="atra-opbus-primary-ap1aa-Type-of-Building" />
									<label htmlFor="atra-opbus-primary-ap1aa-Type-of-Building-Ex-Local-Authority">Ex-Local Authority</label>
								</div>
								<div className="checkbox">
									<input type="checkbox" id="atra-opbus-primary-ap1aa-Type-of-Building-Non-Standard-Construction" name="atra-opbus-primary-ap1aa-Type-of-Building" />
									<label htmlFor="atra-opbus-primary-ap1aa-Type-of-Building-Non-Standard-Construction">Non-Standard Construction</label>
								</div>
							</div>

							<div className="form-pack">
								<label htmlFor="atra-opbus-primary-ap1aa-Are-there-any-intended-works-or-improvements-during-the-term-of-the-loan">Are there any intended works or improvements during the term of the loan</label>
								<input type="text" id="atra-opbus-primary-ap1aa-Are-there-any-intended-works-or-improvements-during-the-term-of-the-loan" name="atra-opbus-primary-ap1aa-Are-there-any-intended-works-or-improvements-during-the-term-of-the-loan" />
							</div>

							<div className="form-pack">
								<label htmlFor="atra-opbus-primary-ap1aa-Current-condition-of-property">Current condition of property</label>
								<input type="text" id="atra-opbus-primary-ap1aa-Current-condition-of-property" name="atra-opbus-primary-ap1aa-Current-condition-of-property" />
							</div>

							<div className="form-pack">
								<label htmlFor="atra-opbus-primary-ap1aa-Who-will-live-in-the-property-and-their-respective-ages">Who will live in the property and their respective ages</label>
								<input type="text" id="atra-opbus-primary-ap1aa-Who-will-live-in-the-property-and-their-respective-ages" name="atra-opbus-primary-ap1aa-Who-will-live-in-the-property-and-their-respective-ages" />
							</div>

							<div className="form-pack">
								<label htmlFor="atra-opbus-primary-ap1aa-What-is-their-relationship-to-the-Applicant(s)">What is their relationship to the Applicant(s)</label>
								<input type="text" id="atra-opbus-primary-ap1aa-What-is-their-relationship-to-the-Applicant(s)" name="atra-opbus-primary-ap1aa-What-is-their-relationship-to-the-Applicant(s)" />
							</div>

						</div>

					</section>
					<section className="form-sec">

						<div className="random-title bb">Security Properties</div>

						<div>

							<div className="random-title b">Primary property being used as security for the loan</div>

							<div className="form-pack">
								<label htmlFor="scyppie-spp-primary-ap1aa-Full-address-of-property">Full address of property</label>
								<textarea id="scyppie-spp-primary-ap1aa-Full-address-of-property" name="scyppie-spp-primary-ap1aa-Full-address-of-property"></textarea>
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-spp-primary-ap1aa-Postcode">Postcode</label>
								<input type="text" id="scyppie-spp-primary-ap1aa-Postcode" name="scyppie-spp-primary-ap1aa-Postcode" />
							</div>

							<div className="form-pack">
								<label>Is the property</label>
								<div className="radio">
									<input type="radio" id="scyppie-spp-primary-ap1aa-Is-the-property-Freehold" name="scyppie-spp-primary-ap1aa-Is-the-property" />
									<label htmlFor="scyppie-spp-primary-ap1aa-Is-the-property-Freehold">Freehold</label>
								</div>
								<div className="radio">
									<input type="radio" id="scyppie-spp-primary-ap1aa-Is-the-property-Leasehold" name="scyppie-spp-primary-ap1aa-Is-the-property" />
									<label htmlFor="scyppie-spp-primary-ap1aa-Is-the-property-Leasehold">Leasehold</label>
								</div>
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-spp-primary-ap1aa-If-Leasehold,-how-many-years-remain-on-the-lease">If Leasehold, how many years remain on the lease</label>
								<input type="text" id="scyppie-spp-primary-ap1aa-If-Leasehold,-how-many-years-remain-on-the-lease" name="scyppie-spp-primary-ap1aa-If-Leasehold,-how-many-years-remain-on-the-lease" />
							</div>

							<div className="form-pack">
								<label>Ownership Status</label>
								<div className="radio">
									<input type="radio" id="scyppie-spp-primary-ap1aa-Ownership-Status-Already-Owned" name="scyppie-spp-primary-ap1aa-Ownership-Status" />
									<label htmlFor="scyppie-spp-primary-ap1aa-Ownership-Status-Already-Owned">Already Owned</label>
									<input type="text" id="scyppie-spp-primary-ap1aa-Ownership-Status-Already-Owned-DP" name="scyppie-spp-primary-ap1aa-Ownership-Status-Already-Owned-DP" placeholder="Date Purchased" />
								</div>
								<div className="radio">
									<input type="radio" id="scyppie-spp-primary-ap1aa-Ownership-Status-Being-purchased" name="scyppie-spp-primary-ap1aa-Ownership-Status" />
									<label htmlFor="scyppie-spp-primary-ap1aa-Ownership-Status-Being-purchased">Being purchased</label>
								</div>
								<div className="radio">
									<input type="radio" id="scyppie-spp-primary-ap1aa-Ownership-Status-Owned-by-another" name="scyppie-spp-primary-ap1aa-Ownership-Status" />
									<label htmlFor="scyppie-spp-primary-ap1aa-Ownership-Status-Owned-by-another">Owned by another</label>
								</div>
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-spp-primary-ap1aa-Purchase-price/price-paid-(£)">Purchase price/price paid (£)</label>
								<input type="text" id="scyppie-spp-primary-ap1aa-Purchase-price/price-paid-(£)" name="scyppie-spp-primary-ap1aa-Purchase-price/price-paid-(£)" />
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-spp-primary-ap1aa-Estimated-value-(£)">Estimated value (£)</label>
								<input type="text" id="scyppie-spp-primary-ap1aa-Estimated-value-(£)" name="scyppie-spp-primary-ap1aa-Estimated-value-(£)" />
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-spp-primary-ap1aa-Monthly-rental-income-(if-tenanted)-(£)">Monthly rental income (if tenanted) (£)</label>
								<input type="text" id="scyppie-spp-primary-ap1aa-Monthly-rental-income-(if-tenanted)-(£)" name="scyppie-spp-primary-ap1aa-Monthly-rental-income-(if-tenanted)-(£)" />
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-spp-primary-ap1aa-Total-amount-currently-owed-on-outstanding-mortgage(s)-(if-already-owned)-(£)">Total amount currently owed on outstanding mortgage(s) (if already owned) (£)</label>
								<input type="text" id="scyppie-spp-primary-ap1aa-Total-amount-currently-owed-on-outstanding-mortgage(s)-(if-already-owned)-(£)" name="scyppie-spp-primary-ap1aa-Total-amount-currently-owed-on-outstanding-mortgage(s)-(if-already-owned)-(£)" />
							</div>

							<div className="form-pack">
								<label>Security Offered:</label>
								<div className="radio">
									<input type="radio" id="scyppie-spp-primary-ap1aa-Security-Offered:-First-Charge" name="scyppie-spp-primary-ap1aa-Security-Offered:" />
									<label htmlFor="scyppie-spp-primary-ap1aa-Security-Offered:-First-Charge">First Charge</label>
								</div>
								<div className="radio">
									<input type="radio" id="scyppie-spp-primary-ap1aa-Security-Offered:-Second-Charge" name="scyppie-spp-primary-ap1aa-Security-Offered:" />
									<label htmlFor="scyppie-spp-primary-ap1aa-Security-Offered:-Second-Charge">Second Charge</label>
								</div>
							</div>

							<div className="form-pack">
								<label>Property Description</label>
								<div className="radio">
									<input type="radio" id="scyppie-spp-primary-ap1aa-Property-Description-House" name="scyppie-spp-primary-ap1aa-Property-Description" />
									<label htmlFor="scyppie-spp-primary-ap1aa-Property-Description-House">House</label>
								</div>
								<div className="radio">
									<input type="radio" id="scyppie-spp-primary-ap1aa-Property-Description-Bungalow" name="scyppie-spp-primary-ap1aa-Property-Description" />
									<label htmlFor="scyppie-spp-primary-ap1aa-Property-Description-Bungalow">Bungalow</label>
								</div>
								<div className="radio">
									<input type="radio" id="scyppie-spp-primary-ap1aa-Property-Description-Flat" name="scyppie-spp-primary-ap1aa-Property-Description" />
									<label htmlFor="scyppie-spp-primary-ap1aa-Property-Description-Flat">Flat</label>
								</div>
								<div className="radio">
									<input type="radio" id="scyppie-spp-primary-ap1aa-Property-Description-Maisonette" name="scyppie-spp-primary-ap1aa-Property-Description" />
									<label htmlFor="scyppie-spp-primary-ap1aa-Property-Description-Maisonette">Maisonette</label>
								</div>
								<div className="radio">
									<input type="radio" id="scyppie-spp-primary-ap1aa-Property-Description-Others" name="scyppie-spp-primary-ap1aa-Property-Description" />
									<label htmlFor="scyppie-spp-primary-ap1aa-Property-Description-Others">Others</label>
									<input type="text" id="scyppie-spp-primary-ap1aa-Property-Description-D" name="scyppie-spp-primary-ap1aa-Property-Description-D" placeholder="Describe" />
								</div>
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-spp-primary-ap1aa-Floor-Number">Floor Number</label>
								<input type="text" id="scyppie-spp-primary-ap1aa-Floor-Number" name="scyppie-spp-primary-ap1aa-Floor-Number" />
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-spp-primary-ap1aa-Number-of-Storeys">Number of Storeys</label>
								<input type="text" id="scyppie-spp-primary-ap1aa-Number-of-Storeys" name="scyppie-spp-primary-ap1aa-Number-of-Storeys" />
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-spp-primary-ap1aa-Number-of-Bedrooms">Number of Bedrooms</label>
								<input type="text" id="scyppie-spp-primary-ap1aa-Number-of-Bedrooms" name="scyppie-spp-primary-ap1aa-Number-of-Bedrooms" />
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-spp-primary-ap1aa-Year-Built">Year Built</label>
								<input type="text" id="scyppie-spp-primary-ap1aa-Year-Built" name="scyppie-spp-primary-ap1aa-Year-Built" />
							</div>

							<div className="form-pack">
								<label>Type of Building</label>
								<div className="checkbox">
									<input type="checkbox" id="scyppie-spp-primary-ap1aa-Type-of-Building-Ex-Local-Authority" name="scyppie-spp-primary-ap1aa-Type-of-Building" />
									<label htmlFor="scyppie-spp-primary-ap1aa-Type-of-Building-Ex-Local-Authority">Ex-Local Authority</label>
								</div>
								<div className="checkbox">
									<input type="checkbox" id="scyppie-spp-primary-ap1aa-Type-of-Building-Non-Standard-Construction" name="scyppie-spp-primary-ap1aa-Type-of-Building" />
									<label htmlFor="scyppie-spp-primary-ap1aa-Type-of-Building-Non-Standard-Construction">Non-Standard Construction</label>
								</div>
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-spp-primary-ap1aa-Are-there-any-intended-works-or-improvements-during-the-term-of-the-loan">Are there any intended works or improvements during the term of the loan</label>
								<input type="text" id="scyppie-spp-primary-ap1aa-Are-there-any-intended-works-or-improvements-during-the-term-of-the-loan" name="scyppie-spp-primary-ap1aa-Are-there-any-intended-works-or-improvements-during-the-term-of-the-loan" />
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-spp-primary-ap1aa-Current-condition-of-property">Current condition of property</label>
								<input type="text" id="scyppie-spp-primary-ap1aa-Current-condition-of-property" name="scyppie-spp-primary-ap1aa-Current-condition-of-property" />
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-spp-primary-ap1aa-Who-will-live-in-the-property-and-their-respective-ages">Who will live in the property and their respective ages</label>
								<input type="text" id="scyppie-spp-primary-ap1aa-Who-will-live-in-the-property-and-their-respective-ages" name="scyppie-spp-primary-ap1aa-Who-will-live-in-the-property-and-their-respective-ages" />
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-spp-primary-ap1aa-What-is-their-relationship-to-the-Applicant(s)">What is their relationship to the Applicant(s)</label>
								<input type="text" id="scyppie-spp-primary-ap1aa-What-is-their-relationship-to-the-Applicant(s)" name="scyppie-spp-primary-ap1aa-What-is-their-relationship-to-the-Applicant(s)" />
							</div>

						</div>

						<div>

							<div className="random-title b pt-3">Other property being used as security for the loan</div>

							<div className="form-pack">
								<label htmlFor="scyppie-opbus-primary-ap1aa-Full-address-of-property">Full address of property</label>
								<textarea id="scyppie-opbus-primary-ap1aa-Full-address-of-property" name="scyppie-opbus-primary-ap1aa-Full-address-of-property"></textarea>
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-opbus-primary-ap1aa-Postcode">Postcode</label>
								<input type="text" id="scyppie-opbus-primary-ap1aa-Postcode" name="scyppie-opbus-primary-ap1aa-Postcode" />
							</div>

							<div className="form-pack">
								<label>Is the property</label>
								<div className="radio">
									<input type="radio" id="scyppie-opbus-primary-ap1aa-Is-the-property-Freehold" name="scyppie-opbus-primary-ap1aa-Is-the-property" />
									<label htmlFor="scyppie-opbus-primary-ap1aa-Is-the-property-Freehold">Freehold</label>
								</div>
								<div className="radio">
									<input type="radio" id="scyppie-opbus-primary-ap1aa-Is-the-property-Leasehold" name="scyppie-opbus-primary-ap1aa-Is-the-property" />
									<label htmlFor="scyppie-opbus-primary-ap1aa-Is-the-property-Leasehold">Leasehold</label>
								</div>
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-opbus-primary-ap1aa-If-Leasehold,-how-many-years-remain-on-the-lease">If Leasehold, how many years remain on the lease</label>
								<input type="text" id="scyppie-opbus-primary-ap1aa-If-Leasehold,-how-many-years-remain-on-the-lease" name="scyppie-opbus-primary-ap1aa-If-Leasehold,-how-many-years-remain-on-the-lease" />
							</div>

							<div className="form-pack">
								<label>Ownership Status</label>
								<div className="radio">
									<input type="radio" id="scyppie-opbus-primary-ap1aa-Ownership-Status-Already-Owned" name="scyppie-opbus-primary-ap1aa-Ownership-Status" />
									<label htmlFor="scyppie-opbus-primary-ap1aa-Ownership-Status-Already-Owned">Already Owned</label>
									<input type="text" id="scyppie-opbus-primary-ap1aa-Ownership-Status-Already-Owned-DP" name="scyppie-opbus-primary-ap1aa-Ownership-Status-Already-Owned-DP" placeholder="Date Purchased" />
								</div>
								<div className="radio">
									<input type="radio" id="scyppie-opbus-primary-ap1aa-Ownership-Status-Being-purchased" name="scyppie-opbus-primary-ap1aa-Ownership-Status" />
									<label htmlFor="scyppie-opbus-primary-ap1aa-Ownership-Status-Being-purchased">Being purchased</label>
								</div>
								<div className="radio">
									<input type="radio" id="scyppie-opbus-primary-ap1aa-Ownership-Status-Owned-by-another" name="scyppie-opbus-primary-ap1aa-Ownership-Status" />
									<label htmlFor="scyppie-opbus-primary-ap1aa-Ownership-Status-Owned-by-another">Owned by another</label>
								</div>
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-opbus-primary-ap1aa-Purchase-price/price-paid-(£)">Purchase price/price paid (£)</label>
								<input type="text" id="scyppie-opbus-primary-ap1aa-Purchase-price/price-paid-(£)" name="scyppie-opbus-primary-ap1aa-Purchase-price/price-paid-(£)" />
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-opbus-primary-ap1aa-Estimated-value-(£)">Estimated value (£)</label>
								<input type="text" id="scyppie-opbus-primary-ap1aa-Estimated-value-(£)" name="scyppie-opbus-primary-ap1aa-Estimated-value-(£)" />
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-opbus-primary-ap1aa-Monthly-rental-income-(if-tenanted)-(£)">Monthly rental income (if tenanted) (£)</label>
								<input type="text" id="scyppie-opbus-primary-ap1aa-Monthly-rental-income-(if-tenanted)-(£)" name="scyppie-opbus-primary-ap1aa-Monthly-rental-income-(if-tenanted)-(£)" />
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-opbus-primary-ap1aa-Total-amount-currently-owed-on-outstanding-mortgage(s)-(if-already-owned)-(£)">Total amount currently owed on outstanding mortgage(s) (if already owned) (£)</label>
								<input type="text" id="scyppie-opbus-primary-ap1aa-Total-amount-currently-owed-on-outstanding-mortgage(s)-(if-already-owned)-(£)" name="scyppie-opbus-primary-ap1aa-Total-amount-currently-owed-on-outstanding-mortgage(s)-(if-already-owned)-(£)" />
							</div>

							<div className="form-pack">
								<label>Security Offered:</label>
								<div className="radio">
									<input type="radio" id="scyppie-opbus-primary-ap1aa-Security-Offered:-First-Charge" name="scyppie-opbus-primary-ap1aa-Security-Offered:" />
									<label htmlFor="scyppie-opbus-primary-ap1aa-Security-Offered:-First-Charge">First Charge</label>
								</div>
								<div className="radio">
									<input type="radio" id="scyppie-opbus-primary-ap1aa-Security-Offered:-Second-Charge" name="scyppie-opbus-primary-ap1aa-Security-Offered:" />
									<label htmlFor="scyppie-opbus-primary-ap1aa-Security-Offered:-Second-Charge">Second Charge</label>
								</div>
							</div>

							<div className="form-pack">
								<label>Property Description</label>
								<div className="radio">
									<input type="radio" id="scyppie-opbus-primary-ap1aa-Property-Description-House" name="scyppie-opbus-primary-ap1aa-Property-Description" />
									<label htmlFor="scyppie-opbus-primary-ap1aa-Property-Description-House">House</label>
								</div>
								<div className="radio">
									<input type="radio" id="scyppie-opbus-primary-ap1aa-Property-Description-Bungalow" name="scyppie-opbus-primary-ap1aa-Property-Description" />
									<label htmlFor="scyppie-opbus-primary-ap1aa-Property-Description-Bungalow">Bungalow</label>
								</div>
								<div className="radio">
									<input type="radio" id="scyppie-opbus-primary-ap1aa-Property-Description-Flat" name="scyppie-opbus-primary-ap1aa-Property-Description" />
									<label htmlFor="scyppie-opbus-primary-ap1aa-Property-Description-Flat">Flat</label>
								</div>
								<div className="radio">
									<input type="radio" id="scyppie-opbus-primary-ap1aa-Property-Description-Maisonette" name="scyppie-opbus-primary-ap1aa-Property-Description" />
									<label htmlFor="scyppie-opbus-primary-ap1aa-Property-Description-Maisonette">Maisonette</label>
								</div>
								<div className="radio">
									<input type="radio" id="scyppie-opbus-primary-ap1aa-Property-Description-Others" name="scyppie-opbus-primary-ap1aa-Property-Description" />
									<label htmlFor="scyppie-opbus-primary-ap1aa-Property-Description-Others">Others</label>
									<input type="text" id="scyppie-opbus-primary-ap1aa-Property-Description-D" name="scyppie-opbus-primary-ap1aa-Property-Description-D" placeholder="Describe" />
								</div>
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-opbus-primary-ap1aa-Floor-Number">Floor Number</label>
								<input type="text" id="scyppie-opbus-primary-ap1aa-Floor-Number" name="scyppie-opbus-primary-ap1aa-Floor-Number" />
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-opbus-primary-ap1aa-Number-of-Storeys">Number of Storeys</label>
								<input type="text" id="scyppie-opbus-primary-ap1aa-Number-of-Storeys" name="scyppie-opbus-primary-ap1aa-Number-of-Storeys" />
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-opbus-primary-ap1aa-Number-of-Bedrooms">Number of Bedrooms</label>
								<input type="text" id="scyppie-opbus-primary-ap1aa-Number-of-Bedrooms" name="scyppie-opbus-primary-ap1aa-Number-of-Bedrooms" />
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-opbus-primary-ap1aa-Year-Built">Year Built</label>
								<input type="text" id="scyppie-opbus-primary-ap1aa-Year-Built" name="scyppie-opbus-primary-ap1aa-Year-Built" />
							</div>

							<div className="form-pack">
								<label>Type of Building</label>
								<div className="checkbox">
									<input type="checkbox" id="scyppie-opbus-primary-ap1aa-Type-of-Building-Ex-Local-Authority" name="scyppie-opbus-primary-ap1aa-Type-of-Building" />
									<label htmlFor="scyppie-opbus-primary-ap1aa-Type-of-Building-Ex-Local-Authority">Ex-Local Authority</label>
								</div>
								<div className="checkbox">
									<input type="checkbox" id="scyppie-opbus-primary-ap1aa-Type-of-Building-Non-Standard-Construction" name="scyppie-opbus-primary-ap1aa-Type-of-Building" />
									<label htmlFor="scyppie-opbus-primary-ap1aa-Type-of-Building-Non-Standard-Construction">Non-Standard Construction</label>
								</div>
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-opbus-primary-ap1aa-Are-there-any-intended-works-or-improvements-during-the-term-of-the-loan">Are there any intended works or improvements during the term of the loan</label>
								<input type="text" id="scyppie-opbus-primary-ap1aa-Are-there-any-intended-works-or-improvements-during-the-term-of-the-loan" name="scyppie-opbus-primary-ap1aa-Are-there-any-intended-works-or-improvements-during-the-term-of-the-loan" />
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-opbus-primary-ap1aa-Current-condition-of-property">Current condition of property</label>
								<input type="text" id="scyppie-opbus-primary-ap1aa-Current-condition-of-property" name="scyppie-opbus-primary-ap1aa-Current-condition-of-property" />
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-opbus-primary-ap1aa-Who-will-live-in-the-property-and-their-respective-ages">Who will live in the property and their respective ages</label>
								<input type="text" id="scyppie-opbus-primary-ap1aa-Who-will-live-in-the-property-and-their-respective-ages" name="scyppie-opbus-primary-ap1aa-Who-will-live-in-the-property-and-their-respective-ages" />
							</div>

							<div className="form-pack">
								<label htmlFor="scyppie-opbus-primary-ap1aa-What-is-their-relationship-to-the-Applicant(s)">What is their relationship to the Applicant(s)</label>
								<input type="text" id="scyppie-opbus-primary-ap1aa-What-is-their-relationship-to-the-Applicant(s)" name="scyppie-opbus-primary-ap1aa-What-is-their-relationship-to-the-Applicant(s)" />
							</div>

						</div>

					</section>
					<section className="form-sec">

						<div className="random-title bb">About The Loan</div>

						<div>
							<div className="random-title">Net Amount and Term</div>

							<div className="form-pack">
								<label htmlFor="auttln-natt-primary-ap1aa-Net-Amount-Required-(£)">Net Amount Required (£)</label>
								<input type="text" id="auttln-natt-primary-ap1aa-Net-Amount-Required-(£)" name="auttln-natt-primary-ap1aa-Net-Amount-Required-(£)" />
							</div>

							<div className="form-pack">
								<label htmlFor="auttln-natt-primary-ap1aa-Term-of-the-Loan">Term of the Loan</label>
								<input type="text" id="auttln-natt-primary-ap1aa-Term-of-the-Loan" name="auttln-natt-primary-ap1aa-Term-of-the-Loan" />
							</div>

						</div>

						<div>
							<div className="random-title">Payment Options</div>

							<div className="form-pack">
								<label>Payment Options</label>
								<div className="radio">
									<input type="radio" id="auttln-natt-primary-ap1aa-Payment-Options-entire-approved-term-of-the-loan" name="auttln-natt-primary-ap1aa-Payment-Options" />
									<label htmlFor="auttln-natt-primary-ap1aa-Payment-Options-entire-approved-term-of-the-loan">Interest payments to be rolled-up for the entire approved term of the loan</label>
								</div>
								<div className="radio">
									<input type="radio" id="auttln-natt-primary-ap1aa-in-arrears-(N.B.-For-non-regulated-loans-only)" name="auttln-natt-primary-ap1aa-Payment-Options" />
									<label htmlFor="auttln-natt-primary-ap1aa-in-arrears-(N.B.-For-non-regulated-loans-only)">Payments to be collected by direct debit monthly in arrears (N.B. For non-regulated loans only)</label>
								</div>
							</div>

							<div className="form-pack">
								<label>Please tick as appropriate to confirm which of these fees you wish to be added to your loan (Please refer to our Fee Tariff):</label>
								<div className="checkbox">
									<input type="checkbox" id="auttln-natt-primary-ap1aa-wish-to-be-added-to-your-loan-(Please-refer-to-our-Fee-Tariff):-Broker-Fee" name="auttln-natt-primary-ap1aa-wish-to-be-added-to-your-loan-(Please-refer-to-our-Fee-Tariff):" />
									<label htmlFor="auttln-natt-primary-ap1aa-wish-to-be-added-to-your-loan-(Please-refer-to-our-Fee-Tariff):-Broker-Fee">Broker Fee</label>
									<input type="text" id="auttln-natt-primary-ap1aa-wish-to-be-added-to-your-loan-(Please-refer-to-our-Fee-Tariff):-Broker-Fee-££" name="auttln-natt-primary-ap1aa-wish-to-be-added-to-your-loan-(Please-refer-to-our-Fee-Tariff):-Broker-Fee-££" placeholder="£" />
								</div>
								<div className="checkbox">
									<input type="checkbox" id="auttln-natt-primary-ap1aa-wish-to-be-added-to-your-loan-(Please-refer-to-our-Fee-Tariff):-Sub-Broker-Fee" name="auttln-natt-primary-ap1aa-wish-to-be-added-to-your-loan-(Please-refer-to-our-Fee-Tariff):" />
									<label htmlFor="auttln-natt-primary-ap1aa-wish-to-be-added-to-your-loan-(Please-refer-to-our-Fee-Tariff):-Sub-Broker-Fee">Sub Broker Fee</label>
									<input type="text" id="auttln-natt-primary-ap1aa-wish-to-be-added-to-your-loan-(Please-refer-to-our-Fee-Tariff):-Sub-Broker-Fee-££" name="auttln-natt-primary-ap1aa-wish-to-be-added-to-your-loan-(Please-refer-to-our-Fee-Tariff):-Sub-Broker-Fee-££" placeholder="£" />
								</div>
								<div className="checkbox">
									<input type="checkbox" id="auttln-natt-primary-ap1aa-wish-to-be-added-to-your-loan-(Please-refer-to-our-Fee-Tariff):-Administration-Fee" name="auttln-natt-primary-ap1aa-wish-to-be-added-to-your-loan-(Please-refer-to-our-Fee-Tariff):" />
									<label htmlFor="auttln-natt-primary-ap1aa-wish-to-be-added-to-your-loan-(Please-refer-to-our-Fee-Tariff):-Administration-Fee">Administration Fee</label>
								</div>
								<div className="checkbox">
									<input type="checkbox" id="auttln-natt-primary-ap1aa-wish-to-be-added-to-your-loan-(Please-refer-to-our-Fee-Tariff):-Completion-Fee" name="auttln-natt-primary-ap1aa-wish-to-be-added-to-your-loan-(Please-refer-to-our-Fee-Tariff):" />
									<label htmlFor="auttln-natt-primary-ap1aa-wish-to-be-added-to-your-loan-(Please-refer-to-our-Fee-Tariff):-Completion-Fee">Completion Fee</label>
								</div>
								<div className="checkbox">
									<input type="checkbox" id="auttln-natt-primary-ap1aa-wish-to-be-added-to-your-loan-(Please-refer-to-our-Fee-Tariff):-Lender-Legal-Fees" name="auttln-natt-primary-ap1aa-wish-to-be-added-to-your-loan-(Please-refer-to-our-Fee-Tariff):" />
									<label htmlFor="auttln-natt-primary-ap1aa-wish-to-be-added-to-your-loan-(Please-refer-to-our-Fee-Tariff):-Lender-Legal-Fees">Lender Legal Fees</label>
								</div>
								<div className="checkbox">
									<input type="checkbox" id="auttln-natt-primary-ap1aa-wish-to-be-added-to-your-loan-(Please-refer-to-our-Fee-Tariff):-CHAPS-Fee" name="auttln-natt-primary-ap1aa-wish-to-be-added-to-your-loan-(Please-refer-to-our-Fee-Tariff):" />
									<label htmlFor="auttln-natt-primary-ap1aa-wish-to-be-added-to-your-loan-(Please-refer-to-our-Fee-Tariff):-CHAPS-Fee">CHAPS Fee</label>
								</div>
							</div>

						</div>

						<div>
							<div className="random-title">Purpose of Loan</div>

							<div className="form-pack">
								<div className="radio">
									<input type="radio" id="auttln-phorp-primary-ap1aa-Purpose-Of-Loan-Purchase" name="auttln-phorp-primary-ap1aa-Purpose-Of-Loan" />
									<label htmlFor="auttln-phorp-primary-ap1aa-Purpose-Of-Loan-Purchase">Purchase</label>
								</div>
								<div className="radio">
									<input type="radio" id="auttln-phorp-primary-ap1aa-Purpose-Of-Loan-Refinance" name="auttln-phorp-primary-ap1aa-Purpose-Of-Loan" />
									<label htmlFor="auttln-phorp-primary-ap1aa-Purpose-Of-Loan-Refinance">Refinance</label>
								</div>
								<div className="radio">
									<input type="radio" id="auttln-phorp-primary-ap1aa-Purpose-Of-Loan-Purchase-Refinance" name="auttln-phorp-primary-ap1aa-Purpose-Of-Loan" />
									<label htmlFor="auttln-phorp-primary-ap1aa-Purpose-Of-Loan-Purchase-Refinance">Purchase Refinance</label>
								</div>
								<div className="radio">
									<input type="radio" id="auttln-phorp-primary-ap1aa-Purpose-Of-Loan-Capital-Raise---Home-Improvements" name="auttln-phorp-primary-ap1aa-Purpose-Of-Loan" />
									<label htmlFor="auttln-phorp-primary-ap1aa-Purpose-Of-Loan-Capital-Raise---Home-Improvements">Capital Raise - Home Improvements</label>
								</div>
								<div className="radio">
									<input type="radio" id="auttln-phorp-primary-ap1aa-Purpose-Of-Loan-Capital-Raise---Other-purpose" name="auttln-phorp-primary-ap1aa-Purpose-Of-Loan" />
									<label htmlFor="auttln-phorp-primary-ap1aa-Purpose-Of-Loan-Capital-Raise---Other-purpose">Capital Raise - Other purpose</label>
								</div>
							</div>

							<div className="form-pack">
								<label htmlFor="auttln-phorp-primary-ap1aa-Please-Provide-Details">Please Provide Details</label>
								<textarea id="auttln-phorp-primary-ap1aa-Please-Provide-Details" name="auttln-phorp-primary-ap1aa-Please-Provide-Details"></textarea>
							</div>


						</div>

						<div>
							<div className="random-title">About the security property being offered</div>

							<div className="form-pack">
								<div className="radio">
									<input type="radio" id="auttln-atspbo-primary-ap1aa-About-The-Security-Main-Residence" name="auttln-atspbo-primary-ap1aa-About-The-Security" />
									<label htmlFor="auttln-atspbo-primary-ap1aa-About-The-Security-Main-Residence">Main Residence</label>
								</div>
								<div className="radio">
									<input type="radio" id="auttln-atspbo-primary-ap1aa-About-The-Security-Semi-Commercial-i.e.-shop-with-flat-above" name="auttln-atspbo-primary-ap1aa-About-The-Security" />
									<label htmlFor="auttln-atspbo-primary-ap1aa-About-The-Security-Semi-Commercial-i.e.-shop-with-flat-above">Semi Commercial i.e. shop with flat above</label>
								</div>
								<div className="radio">
									<input type="radio" id="auttln-atspbo-primary-ap1aa-About-The-Security-Buy-to-let-property" name="auttln-atspbo-primary-ap1aa-About-The-Security" />
									<label htmlFor="auttln-atspbo-primary-ap1aa-About-The-Security-Buy-to-let-property">Buy to let property</label>
								</div>
								<div className="radio">
									<input type="radio" id="auttln-atspbo-primary-ap1aa-About-The-Security-Investment-property" name="auttln-atspbo-primary-ap1aa-About-The-Security" />
									<label htmlFor="auttln-atspbo-primary-ap1aa-About-The-Security-Investment-property">Investment property</label>
								</div>
								<div className="radio">
									<input type="radio" id="auttln-atspbo-primary-ap1aa-About-The-Security-Commercial-property" name="auttln-atspbo-primary-ap1aa-About-The-Security" />
									<label htmlFor="auttln-atspbo-primary-ap1aa-About-The-Security-Commercial-property">Commercial property</label>
								</div>
								<div className="radio">
									<input type="radio" id="auttln-atspbo-primary-ap1aa-About-The-Security-Other" name="auttln-atspbo-primary-ap1aa-About-The-Security" />
									<label htmlFor="auttln-atspbo-primary-ap1aa-About-The-Security-Other">Other</label>
								</div>
							</div>

							<div className="form-pack">
								<label htmlFor="auttln-atspbo-primary-ap1aa-Please-Provide-Details">Please Provide Details</label>
								<textarea id="auttln-atspbo-primary-ap1aa-Please-Provide-Details" name="auttln-atspbo-primary-ap1aa-Please-Provide-Details"></textarea>
							</div>

							<div className="form-pack">
								<label htmlFor="auttln-atspbo-primary-ap1aa-Who-resides-at-or-occupies-the-primary-security-property">Who resides at or occupies the primary security property</label>
								<textarea id="auttln-atspbo-primary-ap1aa-Who-resides-at-or-occupies-the-primary-security-property" name="auttln-atspbo-primary-ap1aa-Who-resides-at-or-occupies-the-primary-security-property"></textarea>
							</div>

							<div className="form-pack">
								<label>If a tenant, are they related to you</label>
								<div className="radio">
									<input type="radio" id="auttln-atspbo-primary-ap1aa-If-a-tenant,-are-they-related-to-you-Yes" name="auttln-atspbo-primary-ap1aa-If-a-tenant,-are-they-related-to-you" />
									<label htmlFor="auttln-atspbo-primary-ap1aa-If-a-tenant,-are-they-related-to-you-Yes">Yes</label>
								</div>
								<div className="radio">
									<input type="radio" id="auttln-atspbo-primary-ap1aa-If-a-tenant,-are-they-related-to-you-No" name="auttln-atspbo-primary-ap1aa-If-a-tenant,-are-they-related-to-you" />
									<label htmlFor="auttln-atspbo-primary-ap1aa-If-a-tenant,-are-they-related-to-you-No">No</label>
								</div>
							</div>

						</div>

						<div>
							<div className="random-title">If the security is or includes a Buy to let property</div>

							<div className="form-pack">
								<label>Have you or a relative ever lived in that property, or intend to live there in the future</label>
								<div className="radio">
									<input type="radio" id="auttln-sitbtre-primary-ap1aa-Have-you-or-a-r-Yes" name="auttln-sitbtre-primary-ap1aa-Have-you-or-a-r" />
									<label htmlFor="auttln-sitbtre-primary-ap1aa-Have-you-or-a-r-Yes">Yes</label>
								</div>
								<div className="radio">
									<input type="radio" id="auttln-sitbtre-primary-ap1aa-Have-you-or-a-r-No" name="auttln-sitbtre-primary-ap1aa-Have-you-or-a-r" />
									<label htmlFor="auttln-sitbtre-primary-ap1aa-Have-you-or-a-r-No">No</label>
								</div>
							</div>

							<div className="form-pack">
								<label>Do you currently/intend to operate this Buy to let for business purposes via a rental agreement</label>
								<div className="radio">
									<input type="radio" id="auttln-sitbtre-primary-ap1aa-Do-you-currentl-Yes" name="auttln-sitbtre-primary-ap1aa-Do-you-currentl" />
									<label htmlFor="auttln-sitbtre-primary-ap1aa-Do-you-currentl-Yes">Yes</label>
								</div>
								<div className="radio">
									<input type="radio" id="auttln-sitbtre-primary-ap1aa-Do-you-currentl-No" name="auttln-sitbtre-primary-ap1aa-Do-you-currentl" />
									<label htmlFor="auttln-sitbtre-primary-ap1aa-Do-you-currentl-No">No</label>
								</div>
							</div>

							<div className="form-pack">
								<label> Other than this application - do you have other Buy to let properties</label>
								<div className="radio">
									<input type="radio" id="auttln-sitbtre-primary-ap1aa--Other-than-thi-Yes" name="auttln-sitbtre-primary-ap1aa--Other-than-thi" />
									<label htmlFor="auttln-sitbtre-primary-ap1aa--Other-than-thi-Yes">Yes</label>
								</div>
								<div className="radio">
									<input type="radio" id="auttln-sitbtre-primary-ap1aa--Other-than-thi-No" name="auttln-sitbtre-primary-ap1aa--Other-than-thi" />
									<label htmlFor="auttln-sitbtre-primary-ap1aa--Other-than-thi-No">No</label>
								</div>
							</div>

						</div>

						<div>
							<div className="random-title">Repayment of the loan</div>

							<div className="form-pack">
								<label>Does repayment involve the sale of non UK property or non-UK assets</label>
								<div className="radio">
									<input type="radio" id="auttln-rotln-primary-ap1aa-Does-repayment-involve-the-sal-Yes" name="auttln-rotln-primary-ap1aa-Does-repayment-involve-the-sal" />
									<label htmlFor="auttln-rotln-primary-ap1aa-Does-repayment-involve-the-sal-Yes">Yes</label>
								</div>
								<div className="radio">
									<input type="radio" id="auttln-rotln-primary-ap1aa-Does-repayment-involve-the-sal-No" name="auttln-rotln-primary-ap1aa-Does-repayment-involve-the-sal" />
									<label htmlFor="auttln-rotln-primary-ap1aa-Does-repayment-involve-the-sal-No">No</label>
								</div>
							</div>

							<div className="form-pack">
								<label>Does repayment involve using income generated in a currency other than GBPs or by way of a mortgage to be arranged outside of the UK</label>
								<div className="radio">
									<input type="radio" id="auttln-rotln-primary-ap1aa-Does-repayment-involve-using-i-Yes" name="auttln-rotln-primary-ap1aa-Does-repayment-involve-using-i" />
									<label htmlFor="auttln-rotln-primary-ap1aa-Does-repayment-involve-using-i-Yes">Yes</label>
								</div>
								<div className="radio">
									<input type="radio" id="auttln-rotln-primary-ap1aa-Does-repayment-involve-using-i-No" name="auttln-rotln-primary-ap1aa-Does-repayment-involve-using-i" />
									<label htmlFor="auttln-rotln-primary-ap1aa-Does-repayment-involve-using-i-No">No</label>
								</div>
							</div>

							<div className="form-pack">
								<label htmlFor="auttln-rotln-primary-ap1aa-Details-of-how-the-loan-will-b">Details of how the loan will be repaid</label>
								<textarea id="auttln-rotln-primary-ap1aa-Details-of-how-the-loan-will-b" name="auttln-rotln-primary-ap1aa-Details-of-how-the-loan-will-b"></textarea>
							</div>

						</div>

					</section>
				</form>
			</div>
		</PersonalBridgingLoanApplicationStyle>
	)
}
const PersonalBridgingLoanApplicationStyle = styled.div`
	width: 100%;
	flex: 1;

	.inner-s {
		padding: 6pc 2pc;

		section.form-sec {
			padding-bottom: 1pc;
			margin-bottom: 1.5pc;
			border-bottom: 1px solid #ccc;
		}
	}

	.form-pack {
		padding-bottom: 1pc;
	}

	.random-title {
		font-weight: bold;
		font-size: 1.1pc;
		line-height: 2.4pc;
		
		&.b {
			font-size: 1.3pc;
			line-height: 2.6pc;
		}
		
		&.bb {
			font-size: 1.5pc;
			line-height: 3pc;
		}
	}

	label {
		display: block;
		font-weight: bold;
	}

	input[type="text"], input[type="email"] {
		width: 100%;
		padding: 10px 15px;
		border: 2px solid #ccc;
		border-radius: 5px;
		font-size: 16px;
		color: #555;
		background-color: #f5f5f5;
		box-shadow: 0 2px 5px rgba(0,0,0,0.1);
		transition: border-color 0.3s ease-in-out;
		
		&:focus {
			outline: none;
			border-color: #6bb1ff;
			box-shadow: 0 2px 5px rgba(0,0,0,0.2);
		}
	}

	textarea {
		width: 100%;
		padding: 10px 15px;
		border: 2px solid #ccc;
		border-radius: 5px;
		font-size: 16px;
		color: #555;
		background-color: #f5f5f5;
		height: 8pc;
		box-shadow: 0 2px 5px rgba(0,0,0,0.1);
		transition: border-color 0.3s ease-in-out;
		
		&:focus {
			outline: none;
			border-color: #6bb1ff;
			box-shadow: 0 2px 5px rgba(0,0,0,0.2);
		}
	}

	input[type="text"]:focus {
		outline: none;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	}

	.checkbox {
		padding-bottom: .5pc;

		input[type="checkbox"] {
			position: absolute;
			opacity: 0;
			height: 0;
			width: 0;
		}

		input[type="text"] {
			width: 12pc;
			margin-left: 2pc;
			border: 0 none;
			padding: 5px 15px;
		}

		label {
			position: relative;
			display: inline-block;
			padding-left: 25px;
			/* margin-bottom: 10px; */
			cursor: pointer;
			font-size: 14px;
			font-weight: 500;
			color: #333;
			line-height: 20px;

			&:before {
				content: "";
				display: inline-block;
				position: absolute;
				left: 0;
				top: 1px;
				width: 17px;
				height: 17px;
				border: 1px solid #bbb;
				background-color: #fff;
				border-radius: 3px;
			}
		}

		input:checked + label:before {
			content: "\\2713";
			font-family: Arial, Helvetica, sans-serif;
			font-size: 16px;
			text-align: center;
			line-height: 17px;
			color: #fff;
			background-color: #2196F3;
			border-color: #2196F3;
		}
	}

	.radio {
		padding-bottom: .5pc;

		input[type="radio"] {
			position: absolute;
			opacity: 0;
			height: 0;
			width: 0;
		}

		input[type="text"] {
			width: 12pc;
			margin-left: 2pc;
			border: 0 none;
			padding: 5px 15px;
		}

		label {
			position: relative;
			display: inline-block;
			padding-left: 25px;
			cursor: pointer;
			font-size: 14px;
			font-weight: 500;
			color: #333;
			line-height: 25px;
		}

		label:before {
			content: "";
			display: inline-block;
			position: absolute;
			left: 0;
			top: 2px;
			width: 16px;
			height: 16px;
			border: 2px solid #bbb;
			background-color: #fff;
			border-radius: 50%;
		}

		input:checked + label:before {
			content: "";
			background-color: #2196F3;
			border-color: #2196F3;
		}

		label:after {
			content: "";
			display: inline-block;
			position: absolute;
			left: 5px;
			top: 7px;
			width: 6px;
			height: 6px;
			background-color: #fff;
			border-radius: 50%;
			transition: all 0.2s ease;
		}

		input:checked + label:after {
			transform: scale(1);
			background-color: #2196F3;
		}

	}

	.pt-1 {padding-top: .5pc}
	.pt-2 {padding-top: 1pc}
	.pt-3 {padding-top: 1.5pc}
	.pt-4 {padding-top: 2pc}
	.pt-5 {padding-top: 2.5pc}

	.pb-1 {padding-bottom: .5pc}
	.pb-2 {padding-bottom: 1pc}
	.pb-3 {padding-bottom: 1.5pc}
	.pb-4 {padding-bottom: 2pc}
	.pb-5 {padding-bottom: 2.5pc}
`
export default PersonalBridgingLoanApplication