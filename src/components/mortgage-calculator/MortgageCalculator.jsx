import { useEffect, useRef, useState } from "react"
import { FaCalendar, FaDollarSign, FaPercent } from "react-icons/fa"
import styled from "styled-components"
import { MiddleImageStyle } from "../general/SectionStyles"

const MortgageDeals = () => {
	const resultRef = useRef(null)
	const [loanAmount, setLoanAmount] = useState(0)
	const [downPayment, setDownPayment] = useState(0)
	const [interest, setInterest] = useState(0)
	const [numberOfYears, setNumberOfYears] = useState(0)
	const [calculate, setCalculate] = useState(false)
	const [result, setResult] = useState(0)
	const [errorText, setErrorText] = useState("")
	const [calcculated, setCalcculated] = useState(false)

	useEffect(() => {
		let errorTextCancler
		if (errorText.length > 0) errorTextCancler = setTimeout(() => setErrorText(""), 1500)
		return () => { clearTimeout(errorTextCancler) }
	}, [errorText])


	useEffect(() => {
		const calculateEverything = () => {
			setCalculate(false)
			const yearsToMonths = year => year * 12;
			const percentToDecimal = percent => (percent / 12) / 100;
			const calculateMortgage = (p, r, n) => {
				r = percentToDecimal(r);
				n = yearsToMonths(n);
				var pmt = (r * p) / (1 - (Math.pow((1 + r), (-n))));
				return pmt.toFixed(2);
			}

			const cost = loanAmount;
			const term = numberOfYears;

			if (cost === "" && downPayment === "" && interest === "" && term === "") {
				setErrorText("Please fill out all fields.");
				return false;
			}
			if (cost < 0 || cost === "" || isNaN(cost)) {
				setErrorText("Please enter a valid loan amount.");
				return false;
			}
			if (downPayment < 0 || downPayment === "" || isNaN(downPayment)) {
				setErrorText("Please enter a valid down payment.");
				return false;
			}
			if (interest < 0 || interest === "" || isNaN(interest)) {
				setErrorText("Please enter a valid interest rate.");
				return false;
			}
			if (term < 0 || term === "" || isNaN(term)) {
				setErrorText("Please enter a valid length of loan.");
				return false;
			}
			if (downPayment > cost) {
				setErrorText("You have more than you need");
				return false;
			}

			const amountBorrowed = cost - downPayment;
			const pmt = calculateMortgage(amountBorrowed, interest, term);
			setResult(pmt)
			setCalcculated(true)
		}
		if (calculate) calculateEverything()
	}, [loanAmount, downPayment, interest, numberOfYears, calculate, result])
	// console.log({ loanAmount, downPayment, interest, numberOfYears, calculate, result })

	return (
		<MortgageDealsStyle>

			<MiddleImageStyle>
				<div className="inner">
					<div className="img-part">
						<img src="/images/full-contact.png" alt="Contact Main" />
						<div className="img-ovf"></div>
					</div>
					<div className="inner-content">
						<div className="title bigger-c">Mortgage Calculator</div>
					</div>
				</div>
			</MiddleImageStyle>

			<section className="mor-calc">

				<form onSubmit={e => { e.preventDefault(); setCalculate(true); resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' }) }}>
					<div className="form-pack">
						<label htmlFor="mm-loan-am-Amount">Amount you wish to borrow</label>
						<div className="inp-pack">
							<input required type="number" id="mm-loan-am-Amount" onInput={e => setLoanAmount(parseFloat(e.target.value))} placeholder="500.00" min="0.01" step="any" />
							<div className="ic"><FaDollarSign /></div>
						</div>
					</div>
					<div className="form-pack">
						<label htmlFor="mm-loan-am-Down">Down Payment</label>
						<div className="inp-pack">
							<input required type="number" id="mm-loan-am-Down" onInput={e => setDownPayment(parseFloat(e.target.value))} placeholder="10.00" min="0.01" step="any" />
							<div className="ic"><FaDollarSign /></div>
						</div>
					</div>
					<div className="form-pack">
						<label htmlFor="mm-loan-am-Interest">Interest Rate (APR)</label>
						<div className="inp-pack">
							<input required type="number" id="mm-loan-am-Interest" onInput={e => setInterest(parseFloat(e.target.value))} placeholder="2.25" min="0.01" step="any" />
							<div className="ic"><FaPercent /></div>
						</div>
					</div>
					<div className="form-pack">
						<label htmlFor="mm-loan-am-Length">Length of mortgage</label>
						<div className="inp-pack">
							<input required type="number" id="mm-loan-am-Length" onInput={e => setNumberOfYears(parseInt(e.target.value))} placeholder="5" min="1" step="1" />
							<div className="ic"><FaCalendar /></div>
						</div>
					</div>
					<div className="form-end">
						<button>Calculate Monthly Payment</button>
					</div>
				</form>

				{errorText.length > 0 && <div className="error">
					<p>{errorText}</p>
				</div>}

				<div className={"success " + (calcculated ? "show" : "")} ref={resultRef}>
					You will have to make a monthly payment of <span>${result}</span>
				</div>

			</section>

		</MortgageDealsStyle>
	)
}
const MortgageDealsStyle = styled.div`
	flex: 1;
	width: 100%;

	.mor-calc {
		color: #072447;
		padding: 6pc 2pc;

		form {
			
			.form-pack {
				padding-bottom: 1pc;

				label {
					display: block;
					font-weight: bold;
				}

				.inp-pack {

					input {
						width: 100%;
						padding: 10px 15px;
						border: 2px solid #ccc;
						border-radius: 5px;
						font-size: 16px;
						color: #555;
						background-color: #f5f5f5;
						box-shadow: 0 2px 5px rgba(0,0,0,0.1);
						transition: border-color 0.3s ease-in-out;
						padding-left: 2.6pc;

						&:focus {
							outline: none;
							border-color: #6bb1ff;
							box-shadow: 0 2px 5px rgba(0,0,0,0.2);
						}
					}

					.ic {
						position: absolute;
						top: 0;
						left: 0;
						bottom: 0;
						z-index: 5;
						height: 100%;
						padding: 0 1pc;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 1.1pc;
					}
				}
			}

			.form-end {
				padding-bottom: .5pc;

				button {
					padding: 10px 20px;
					border: none;
					border-radius: 5px;
					font-size: 16px;
					color: #fff;
					background-color: #6bb1ff;
					box-shadow: 0 2px 5px rgba(0,0,0,0.1);
					cursor: pointer;
					transition: background-color 0.3s ease-in-out;
	
					&:hover {
						background-color: #3e8ee0;
					}
	
					&:focus {
						outline: none;
						box-shadow: 0 2px 5px rgba(0,0,0,0.2);
					}
				}
			}
		}

		.error {
			position: fixed;
			top: 20px;
			right: 20px;
			padding: 10px 20px;
			border-radius: 5px;
			font-size: 16px;
			color: #fff;
			background-color: #f44336;
			box-shadow: 0 2px 5px rgba(0,0,0,0.1);
			z-index: 9999;
			animation: opacity-in .5s 1;
		}

		.success {
			font-weight: bold;
			font-size: 1.5pc;
			line-height: 2.3pc;
			padding-top: 1pc;
			text-align: center;
			opacity: 0;
			transition: opacity .4s;

			&.show {
				opacity: 1;
			}
			
			span {
				color: green;
			}
		}
	}
`
export default MortgageDeals