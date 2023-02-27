import Cookies from 'universal-cookie'
import { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaKey, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components"
import isEmail from "validator/lib/isEmail";
import { createUser, userExistence } from "../../api";
import { getApiJson, postApiJson } from "../../controllers/APICtrl";
import ContactFooter from "../general/ContactFooter";
import { TopHeaderStyle } from "../general/SectionStyles"
import { setUserData } from '../../store/slice/userSlice';
import { tokenCookieName } from '../../utils';

const Signup = () => {

  const cookie = new Cookies()
  const dispatch = useDispatch()
  const navigate = useNavigate()

	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [showPassword, setShowPassword] = useState(false)
	const [creatingAccount, setCreatingAccount] = useState(false)

	const submitHandler = async e => {

		e.preventDefault()

		if (creatingAccount) return false

		if (name.trim().length < 1 || email.trim().length < 1 || password.trim().length < 1) return toast.error("Provide valid credentials")

		if (password.trim().length < 5) return toast.error("Password is too short")

		if (!isEmail(email)) return toast.error("Invalid Email")

		setCreatingAccount(true)

		toast.info("Creating Account")

		// User email check
		const emailCheck = await getApiJson(userExistence(email))
		if (emailCheck.message !== 'user does not exist') { setCreatingAccount(false); return toast.error("Email is taken") }

		// user creation
    const userCreationData = await postApiJson(createUser(), { name, email, password })

    if (userCreationData.error) {

			toast.error("Account creation failed")

			setCreatingAccount(false);

    } else {

      dispatch(setUserData({ ...userCreationData.user, token: userCreationData.token }))

      cookie.set(tokenCookieName, userCreationData.token, { path: '/', expires: new Date(90 ** 7) })

			setCreatingAccount(false);

			toast.success("Account created")

      navigate('/application')

    }


		setCreatingAccount(false)

	}

	return (
		<SignupStyle>

			<TopHeaderStyle>
				<div className="inner">
					<div className="inner-content">
						<div className="title bigger-c">Sign up</div>
					</div>
				</div>
			</TopHeaderStyle>

			<section className="signup-container">
				<form onSubmit={submitHandler}>

					<div className="form-part">
						<div className="form-pack">
							<label htmlFor="mm-name">Name</label>
							<div className="inp-pack">
								<input required type="text" id="mm-name" placeholder="Your Name" value={name} onInput={e => setName(e.target.value)} autoComplete="name" />
								<div className="ic"><FaUser /></div>
							</div>
						</div>
						<div className="form-pack">
							<label htmlFor="mm-email">Email</label>
							<div className="inp-pack">
								<input required type="email" id="mm-email" placeholder="Your Email" value={email} onInput={e => setEmail(e.target.value)} autoComplete="email" />
								<div className="ic"><FaEnvelope /></div>
							</div>
						</div>
						<div className="form-pack">
							<label htmlFor="mm-pass">Password</label>
							<div className="inp-pack">
								<input required className="end-ic" type={showPassword ? "text" : "password"} id="mm-pass" autoComplete="new-password"
									placeholder="●●●●●●●●" value={password} onInput={e => setPassword(e.target.value)} />
								<div className="ic"><FaKey /></div>
								<div className="eic" onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</div>
							</div>
						</div>
						<div className="form-end">
							<button disabled={creatingAccount}>{creatingAccount ? "Creating Account..." : "Create Account"}</button>
						</div>
					</div>

					<div className="immg-part">
						<div className="inner">
							<img src="/images/signup.png" alt="Mortgage Calculator" title="Mortgage Calculator" />
						</div>
					</div>
				</form>

			</section>

			<ContactFooter />

		</SignupStyle>
	)
}
const SignupStyle = styled.div`
	flex: 1;
	width: 100%;

	.signup-container {
		padding: 3pc;

		@media screen and (max-width: 600px) {
			padding: 3pc 2pc;
		}

		form {
			display: flex;
			align-items: center;
			justify-content: space-around;

			.form-part {
				width: calc(50% - 2pc);
				z-index: 30;
				max-width: 450px;
				@media screen and (max-width: 800px) {
					width: 100%;
					max-width: initial;
				}
			}

			.immg-part {
				z-index: 15;
				width: calc(50% - 2pc);
				@media screen and (max-width: 800px) {
					display: none;
				}

				img {
					left: 0;
					top: 0;
					bottom: 5pc;
					right: 0;
					width: 100%;
					object-fit: contain;
				}
			}
			
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
						background-color: rgba(245, 245, 245, 0.5);
						box-shadow: 0 2px 5px rgba(0,0,0,0.1);
						transition: border-color 0.3s ease-in-out;
						padding-left: 2.6pc;
						
						&.end-ic {
							padding-right: 2.6pc;
						}

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

					.eic {
						position: absolute;
						top: 0;
						right: 0;
						bottom: 0;
						z-index: 5;
						height: 100%;
						padding: 0 1pc;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 1.3pc;
						cursor: pointer;
					}
				}
			}

			.form-end {
				padding-top: .5pc;
				padding-bottom: .5pc;

				button {
					outline: 0 none;
					border: 0 none;
					display: inline-flex;
					text-decoration: none;
					color: #fff;
					background-color: #487cff;
					padding: .6pc 2pc;
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
	}
`
export default Signup