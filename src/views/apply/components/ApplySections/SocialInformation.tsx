import { Row } from "react-bootstrap";
import {
	FormSectionProps,
	SocialInformationTypes,
} from "../utils/ApplicationInterfaces";
import {
	FieldFileUploadGroup,
	FieldInputGroup,
} from "../utils/InputComponents";

function SocialInformation({
	values,
	errors,
	touched,
	setFieldValue,
}: Pick<
	FormSectionProps<SocialInformationTypes>,
	"values" | "errors" | "touched" | "setFieldValue"
>) {
	return (
		<div>
			<h3>Social Information (Optional)</h3>
			<Row className="mb-3">
				<FieldInputGroup
					name="portfolio_link"
					label="Github/Portfolio Link"
					controlId="formPortfolio"
					isTouched={touched.portfolio_link}
					errorMsg={errors.portfolio_link}
					sm={6}
					lg={4}
				/>
				<FieldInputGroup
					name="linkedin_link"
					label="LinkedIn Link"
					controlId="formLinkedIn"
					isTouched={touched.linkedin_link}
					errorMsg={errors.linkedin_link}
					sm={6}
					lg={4}
				/>
				<FieldFileUploadGroup
					name="resume"
					label="Resume (*.pdf)"
					controlId="formResume"
					isTouched={values.resume !== undefined}
					errorMsg={errors.resume}
					setFieldValue={setFieldValue}
					accept=".pdf"
					sm={12}
					lg={4}
				/>
			</Row>
		</div>
	);
}

export default SocialInformation;
