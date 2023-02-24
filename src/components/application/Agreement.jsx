import { useState } from "react"
import { FaTimes } from "react-icons/fa"
import ContactFooter from "../general/ContactFooter"
import { FormsStyles, TopHeaderStyle } from "../general/SectionStyles"
import agreementForms from "./agreementForms"

const Agreement = () => {
	const [activeForm, setActiveForm] = useState({ title: "", google: "" })

	return (
		<FormsStyles>

			<TopHeaderStyle>
				<div className="inner">
					<div className="inner-content">
						<div className="title bigger-c">Agreement</div>
					</div>
				</div>
			</TopHeaderStyle>

			<section className="interactive-forms">
				<div className="inner">
					{/* <div className="title">Interactive Agreement</div> */}
					<div className="form-list">
						{agreementForms.map(item => <div key={item.id} className="form-item">
							<div className="container">
								<div className="f-a">
									<div className="img-part">
										<img src={item.img} alt={item.name} />
									</div>
									<div className="txt-part">
										<h3>{item.name}</h3>
									</div>
									<div className="btn-part">
										<a href={item.url} download={item.name} target="_blank" rel="noopener noreferrer">Download</a>
										<button onClick={() => setActiveForm({ title: item.name, google: item.google })}>View</button>
									</div>
								</div>
							</div>
						</div>)}
					</div>
				</div>
			</section>

			<ContactFooter />

			<section className={"form-fill-holder " + (activeForm.google.length > 0 ? "show" : "")}>
				<div className="cancel-x" onClick={() => setActiveForm({ title: "", google: "" })}>
					<div className="cax"><FaTimes /></div>
				</div>
				<div className="frame-hol">
					{activeForm.google.length > 0 && <embed src={activeForm.google} width="100%" height="100%" />}
				</div>
			</section>

		</FormsStyles>
	)
}
export default Agreement