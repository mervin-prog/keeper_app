import { mailtrapClient,sender } from "./mailtrap.config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE , PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE} from "./emailTemplate.js";


export const sendVerificationEmail = async (email,verificationToken) =>{
	const recipient = [{email}];

	try{
		const response = await mailtrapClient.send({
			from:sender,
			to:recipient,
			subject: "Email Verification",
			html : VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
			category: "Verify Email"
		});
		return response;
	}
	catch(error){
		throw new Error(`Error sending verification email : ${error}`);
	}
}

export const sendPasswordResetEmail = async (email,resetURL) =>{
    const recipient = [{email}]; //Mailtrap expects an array of recipients.

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Reset your password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
			category: "Password Reset",
		});
		return response;
	} 
    catch (error) {
		console.error(`Error sending password reset email`, error);
		throw new Error(`Error sending password reset email: ${error}`);
	}
}

export const sendResetSuccessEmail = async (email) =>{
	const recipient = [{email}]
	try{
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Password reset success",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset"
		});
		return response;
	}
	catch (error) {
		console.error(`Error sending password reset email`, error);
		throw new Error(`Error sending password reset email: ${error}`);
	}
}