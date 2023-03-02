import styled from "styled-components";

export const MiddleImageStyle = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	
	.inner {
		width: 100%;

		.inner-content {
			z-index: 20;
			padding: 3pc 2pc;
			color: #fff;
			
			@media screen and (max-width: 600px) {
				padding: 4pc 2pc;
			}

			&.center {
				text-align: center;
			}

			.title {
				font-size: 1.8pc;
				line-height: 2.6pc;
				font-weight: bold;
				padding-bottom: .7pc;
				
				&.bigger-c {
					font-size: 2.5pc;
					line-height: 4pc;
				}
			}

			.button {
				padding-top: 1pc;

				a {
					text-decoration: none;
					color: #4c7bff;
					font-weight: bold;
					background-color: #fff;
					border: 4px solid #fff;
					padding: .4pc 2pc;
					border-radius: .2pc;
					transition: background-color .5s, color .5s;
					display: inline-block;
					box-shadow: 1px 2px 17px #4c7bff;

					&:hover {
						background-color: transparent;
						color: #fff;
					}
				}
			}

			&.duo-cont {
				display: flex;
				justify-content: center;
				padding: 0 3pc;
				padding-top: 2pc;
				padding-bottom: 3pc;
				flex-wrap: wrap;
				/* max-width: 1000px; */
				/* margin: auto; */
				.sxc {
					white-space: pre;
				}

				@media screen and (max-width: 950px) {
					padding: 1pc 2pc;
					padding-bottom: 3pc;
				}
			}

			.duo {
				width: 52%;
				justify-content: center;
				display: flex;
				flex-direction: column;
				/* padding-right: 2pc; */

				&.pic {
					width: 38%;
					/* width: 50%; */
					display: flex;
					align-items: flex-start;
					justify-content: flex-start;

					img {
						width: 100%;
						object-fit: contain;
					}
				}

				@media screen and (max-width: 1000px) {
					width: 100%;
					
					&.pic {
						/* padding-top: 2pc; */
						width: 100%;
						align-items: center;
						justify-content: center;

						img {max-width: 480px}
					}
				}			

				.title {
					font-size: 47px;
					line-height: 62px;
					font-weight: 700;
					
					@media screen and (max-width: 1000px) {
						font-size: 58px;
						line-height: 72px;
					}
					@media screen and (min-width: 1100px) {
						font-size: 51px;
						line-height: 68px;
					}
					@media screen and (min-width: 1300px) {
						font-size: 58px;
						line-height: 72px;
					}
					@media screen and (min-width: 1400px) {
						font-size: 66px;
						line-height: 80px;
					}
				}

				.content {
					font-size: 22px;
					line-height: 32px;
					padding-top: 1.5pc;
					padding-bottom: 1pc;
					max-width: 500px;
					width: 90%;

					@media screen and (max-width: 950px) {
						width: 70%;
					}
				}
				
				@media screen and (max-width: 760px) {
					padding-bottom: 3pc;
					
					.title {
						font-size: 48px;
						line-height: 56px;
					}
				}
				
				@media screen and (max-width: 600px) {
					
					.title {
						font-size: 32px;
						line-height: 46px;
						@media screen and (max-width: 400px) {
							font-size: 28px;
							line-height: 36px;
						}
						@media screen and (max-width: 350px) {
							font-size: 22px;
							line-height: 32px;
						}
					}

					.content {
						font-size: 16px;
						line-height: 25px;
						padding-top: 1pc;
						padding-bottom: .5pc;
					}
				}
			}
		}

		.img-part {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 5;
			width: 100%;
			height: 100%;

			.img-ovf {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 5;
				width: 100%;
				height: 100%;
				opacity: 0;
				background-color: #000;
			}
			
			img {
				z-index: 4;
				width: 100%;
				height: 100%;
				object-fit: cover;

				&.home-ssd {
					object-fit: fill;
				}
				
				&.only-mobi {
					display: none;
				}
				&.only-desk {
					display: initial;
				}

				@media screen and (max-width: 1000px) {
					&.only-mobi {
						display: initial;
					}
					&.only-desk {
						display: none;
					}
				}
			}
		}
	}
`

export const TopHeaderStyle = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	
	.inner {
		width: 100%;
		background-color: #4c7bff;

		.inner-content {
			z-index: 20;
			padding: 1.5pc 3pc;
			color: #fff;
			padding-top: 0;

			@media screen and (max-width: 600px) {
				padding: 2pc 2pc;
				padding-top: 1pc;
			}

			.title {
				font-size: 3pc;
				line-height: 4pc;
				font-weight: bold;
				padding-bottom: .7pc;
			}
		}
	}
`

export const SideImageStyle = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	
	.inner {
		width: 100%;

		.inner-content {
			padding: 1pc 5pc;
			color: #072447;
			display: flex;
			align-items: center;
			justify-content: center;
			/* max-width: 1200px; */
			margin: auto;

			.side {
				width: 50%;
				margin: 0 1pc;

				img {
					width: 100%;
				}
			}

			.title {
				font-size: 4pc;
				line-height: 4.5pc;
				font-weight: bold;
				padding-bottom: .7pc;
				
				@media screen and (max-width: 1200px) {
					font-size: 3.5pc;
					line-height: 4.5pc;
				}
				
				@media screen and (max-width: 600px) {
					font-size: 2.5pc;
					line-height: 3.5pc;
				}
			}

			.button {
				padding-top: 1pc;

				a {
					display: inline-flex;
					text-decoration: none;
					color: #fff;
					background-color: #487cff;
					padding: .6pc 2pc;
					border-radius: .5pc;
					transition: background-color .5s;
					
					&:hover {
						background-color: #072447;
					}
				}
			}
			
			@media screen and (max-width: 1000px) {
				flex-direction: column;
				padding: 2pc 3pc;
				@media screen and (max-width: 600px) {
					padding: 3pc 2pc;
				}

				.side {
					width: 100%;

					&.immg {
						display: none;
					}
				}
			}
		}
	}
`

export const WhyUSStyle = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;

	.inner {
		width: 100%;

		.inner-content {
			z-index: 20;
			padding: 2pc 3pc;
			color: #072447;
			text-align: center;

			@media screen and (max-width: 600px) {
				padding: 2pc;
			}

			.title {
				font-size: 3pc;
				line-height: 4.5pc;
				font-weight: bold;
				padding-bottom: 1.5pc;
				
				@media screen and (max-width: 1200px) {
					font-size: 3.5pc;
					line-height: 4.5pc;
				}
				@media screen and (max-width: 1000px) {
					text-align: left;
				}
				
				@media screen and (max-width: 500px) {
					text-align: center;
				}
				@media screen and (max-width: 600px) {
					font-size: 2.5pc;
					line-height: 3.5pc;
				}
			}

			.listed-parts {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				max-width: 1400px;
				margin: auto;

				span.over {
					display: block;
					width: 100%;
					height: .01pc;
				}

				.list-item {
					text-align: left;
					display: flex;
					align-items: flex-start;
					width: 50%;
					max-width: 650px;
					padding: 1pc 2pc;

					@media screen and (max-width: 1000px) {
						width: 100%;
						max-width: initial;
					}
					
					.l-side {
						width: 64px;
						height: 64px;
						background-color: #eaf6f9;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #072447;
						font-size: 2pc;
						flex-shrink: 0;
						border-radius: 1pc;
					}

					.r-side {
						padding-left: 2pc;

						.tit {
							font-size: 1.8pc;
							line-height: 2.8pc;
							padding-top: .4pc;
							padding-bottom: .4pc;
							font-weight: bold;
						}
					}

					@media screen and (max-width: 500px) {
						flex-direction: column;
						padding: 1pc 0;
						text-align: center;
						align-items: center;

						.r-side {
							padding-top: .3pc;
							padding-left: 0;
						}
					}
				}

				&.tri {

					.list-item {
						justify-content: space-around;
						width: 33%;
						padding: 1pc .3pc;

						@media screen and (max-width: 1000px) {
							width: 100%;
						}
						
						.l-side {
							width: 32px;
							height: 32px;
							background-color: #89ffba;
							color: #1d8e4c;
							font-size: 1pc;
							border-radius: 50%;
							margin-top: .5pc;
						}

						.r-side {
							padding-left: 1pc;

							.tit {
								font-size: 1.2pc;
								padding-top: 0;
							}
						}

						@media screen and (max-width: 500px) {
							padding: 1pc 0;
							text-align: center;
							align-items: center;

							.r-side {
								padding-top: .3pc;
								padding-left: 0;
							}
						}
					}
				}
			}
		}
		
		.img-part {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 5;
			width: 100%;
			height: 100%;

			.img-ovf {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 5;
				width: 100%;
				height: 100%;
				opacity: .6;
				background-color: #000;
			}
			
			img {
				z-index: 4;
				width: 100%;
				height: 100%;
				object-fit: cover;

				&.home-ssd {
					object-fit: fill;
				}
				
				&.only-mobi {
					display: none;
				}
				&.only-desk {
					display: initial;
				}

				@media screen and (max-width: 950px) {
					&.only-mobi {
						display: initial;
					}
					&.only-desk {
						display: none;
					}
				}
			}
		}
	}
`

export const ContactBlocks = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	
	.inner {
		width: 100%;

		.inner-content {
			z-index: 20;
			padding: 3pc;
			color: #072447;
			text-align: center;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;

			@media screen and (max-width: 600px) {
				padding: 3pc 2pc;
			}

			.email-part {
				width: calc(50% - 2pc);
				text-align: left;

				@media screen and (max-width: 1000px) {
					width: 100%;
				}
				.title {
					text-align: left;
					font-weight: bold;
					font-size: 2pc;
					padding-top: .5pc;
					padding-bottom: .5pc;
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
					margin: 1pc 0;
					
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
					height: 10pc;
					box-shadow: 0 2px 5px rgba(0,0,0,0.1);
					transition: border-color 0.3s ease-in-out;
					margin: 1pc 0;
					
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

				button {
					display: inline-flex;
					text-decoration: none;
					color: #fff;
					background-color: #487cff;
					padding: .6pc 2pc;
					border-radius: .5pc;
					transition: background-color .5s;
					margin-right: auto;
					text-align: left;
					border: 0 none;
					outline: 0 none;
					
					&:hover {
						background-color: #072447;
					}
					
					&:disabled {
						opacity: 0.5;
						cursor: not-allowed;
					}
				}
			}

			.listed-parts {
				width: calc(50% - 2pc);
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;

				@media screen and (max-width: 1000px) {
					width: 100%;
					padding-top: 3pc;
				}

				.list-item {
					text-align: left;
					display: flex;
					align-items: flex-start;
					flex-direction: column;
					width: 100%;
					margin: 0;
					margin-bottom: 2pc;
					padding: 2pc 2.5pc;
					border-radius: 50px;
					border: 1px solid #0724471f;
					/* background: #ffffff; */
					box-shadow:  27px 27px 54px #ededed, -27px -27px 54px #ffffff;

					@media screen and (max-width: 500px) {
						padding: 1.5pc;
						border-radius: 30px;
					}
					.tit {
						font-size: 1.5pc;
						padding-bottom: .6pc;
						font-weight: bold;
					}

					.imp {
						padding: 0.5pc 0;
						font-weight: bold;
					}

					.nom {
						flex: 1;
					}

					.soc {
						display: flex;
						flex-wrap: wrap;
						max-width: 12pc;
						flex: 2;

						a {
							font-size: 1.5pc;
							color: inherit;
							padding: 1pc;
							display: flex;
							transition: 0.5s;

							&:hover {
								opacity: .5;
							}
						}
					}
					
					.button {
						padding-top: 1pc;

						a {
							display: inline-flex;
							text-decoration: none;
							color: #fff;
							background-color: #487cff;
							padding: .6pc 2pc;
							border-radius: .5pc;
							transition: background-color .5s;
							
							&:hover {
								background-color: #072447;
							}
						}
					}

					@media screen and (max-width: 1000px) {
						width: 100%;
						flex-direction: column;
					}
				}
			}

			.office-box {
				width: 100%;
				padding-top: 2pc;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				
				iframe {
					width: 100%;
					height: 400px;
					border: 0 none;
				}

				.title {
					font-weight: 700;
					text-align: center;
					width: 100%;
					font-size: 1.8pc;
					padding-bottom: .5pc;
					line-height: 2.5pc;
				}
			}
		}
	}
`

export const ApplicationBlocks = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	
	.inner {
		width: 100%;

		.inner-content {
			z-index: 20;
			padding: 2pc 3pc;
			color: #072447;
			text-align: center;

			@media screen and (max-width: 500px) {
				padding: 3pc 2pc;
			}

			.listed-parts {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.list-item {
					text-align: left;
					display: flex;
					align-items: flex-start;
					flex-direction: column;
					width: calc(50% - 2pc);
					margin: 2pc 0;
					padding: 2pc 2.5pc;
					border-radius: 50px;
					border: 1px solid #0724471f;
					/* background: #ffffff; */
					box-shadow:  27px 27px 54px #ededed, -27px -27px 54px #ffffff;

					@media screen and (max-width: 500px) {
						padding: 1.5pc;
						border-radius: 30px;
					}
					.tit {
						font-size: 1.5pc;
						padding-bottom: .6pc;
						font-weight: bold;
					}

					.imp {
						padding: 0.5pc 0;
						font-weight: bold;
					}

					.nom {
						flex: 1;
					}

					.soc {
						display: flex;
						flex-wrap: wrap;
						max-width: 12pc;
						flex: 2;

						a {
							font-size: 1.5pc;
							color: inherit;
							padding: 1pc;
							display: flex;
							transition: 0.5s;

							&:hover {
								opacity: .5;
							}
						}
					}
					
					.button {
						padding-top: 5pc;

						a {
							display: inline-flex;
							text-decoration: none;
							color: #fff;
							background-color: #487cff;
							padding: .6pc 2pc;
							border-radius: .5pc;
							transition: background-color .5s;
							
							&:hover {
								background-color: #072447;
							}
						}
					}

					@media screen and (max-width: 1000px) {
						width: 100%;
						flex-direction: column;
					}
				}
			}
		}
	}
`

export const FormsStyles = styled.div`
	width: 100%;
	flex: 1;

	.interactive-forms {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		padding: 2pc 0;
		
		.inner {
			padding: 0 3pc;
			color: #072447;
			text-align: center;
			width: 100%;
			
			@media screen and (max-width: 600px) {
				padding: 0 2pc;
			}
			.title {
				font-size: 2.5pc;
				line-height: 3.5pc;
				font-weight: bold;
				padding-bottom: 1.5pc;
			}

			.form-list {
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
				width: 100%;

				span.over {
					display: block;
					width: 100%;
					height: .01pc;
				}

				.form-item {
					/* cursor: pointer; */
					width: 30%;
					padding: 1pc;

					@media screen and (max-width: 1000px) {
						width: 50%;
					}

					@media screen and (max-width: 800px) {
						width: 100%;
					}

					.container {
						width: 100%;
						padding-top: 141%; /* 1:1 Aspect Ratio */
						position: relative; /* If you want text inside of it */
					}

					.f-a {
						position: absolute;
						top: 0;
						left: 0;
						bottom: 0;
						right: 0;
						width: 100%;
						height: 100%;
						text-decoration: none;
						color: inherit;
						border-radius: 30px;
						overflow: hidden;
						background: #ffffff;
						border: 1px solid rgba(7, 36, 71, 0.3);
						box-shadow:  28px 28px 56px #ebebeb, -28px -28px 56px #ffffff;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						flex-direction: column;

						.img-part {
							width: 100%;
							display: flex;
							flex: 1;
							overflow: hidden;
							
							img {
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
								width: 100%;
							}
						}

						.txt-part {
							padding: 1pc;
							text-align: center;
							display: flex;
							align-items: center;
							justify-content: center;
							@media screen and (max-width: 600px) {
								font-size: .8pc;
								line-height: 1.5pc;
							}
						}

						.btn-part {
							padding: 1.5pc 1pc;
							padding-top: 0;
							text-align: center;
							display: flex;
							align-items: center;
							justify-content: center;

							a, button {
								display: inline-flex;
								text-decoration: none;
								color: #fff;
								border: 0 none;
								outline: 0 none;
								background-color: #487cff;
								padding: .2pc 1pc;
								border-radius: .5pc;
								transition: background-color .5s;
								margin: 0 .2pc;
								
								&:hover {
									background-color: #072447;
								}
							}
							
							a {
								background-color: #41a330;
								
								&:hover {
									background-color: #1c5d11;
								}
							}
						}
					}
				}
			}
		}
	}

	.form-fill-holder {

		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		z-index: 200;
		top: 0;
		bottom: 0;
		right: -105vw;
		width: 100%;
		display: flex;
		opacity: 0;
		transition: opacity .5s, right .5s;
		
		&.show {
			right: 0;
			opacity: 1;
		}

		.cancel-x {
			width: 5pc;
			height: 100%;
			cursor: pointer;

			.cax {
				position: absolute;
				top: 0;
				left: 0;
				color: red;
				font-size: 2pc;
				padding: 1pc;
				transition: transform .5s;

				&:hover {
					transform: scale(1.1);
				}
			}
		}
		
		.frame-hol {
			display: flex;
			width: calc(100% - 5pc);
			height: 100%;
			background-color: #fff;

			iframe {
				border: 0px;
			}
		}
	}

	.mob-o {display: none;}
	.desk-o {display: initial;}
	@media (hover:none), (hover:on-demand) { 
		.mob-o {display: initial;}
		.desk-o {display: none;}
	}
`