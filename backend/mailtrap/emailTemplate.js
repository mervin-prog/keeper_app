
export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Verify Your Email</title>
</head>
<body>
  <h1>Verify Your Email</h1>
  <p>Hello,</p>
  <p>Thank you for signing up! Your verification code is:</p>
  <h3 font-size: 24px;">{verificationCode}</h3>
  <p>Enter this code on the verification page to complete your registration.</p>
  <p>This code will expire in 15 minutes for security reasons.</p>
  <p>If you didn't create an account, please ignore this email.</p>
  <p>Best regards,<br>Anonymous</p>
  <p style="font-size: 0.8em; color: #888;">This is an automated message, please do not reply.</p>
</body>
</html>
`;


export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Password Reset</title>
</head>
<body>
  <h1>Password Reset</h1>
  <p>Hello,</p>
  <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
  <p>To reset your password, click the link below:</p>
  <p><a href="{resetURL}">Reset Password</a></p>
  <p>This link will expire in 1 hour for security reasons.</p>
  <p>Best regards,<br>Anonymous</p>
  <p style="font-size: 0.8em; color: #888;">This is an automated message, please do not reply to this email.</p>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Password Reset Successful</title>
</head>
<body>
  <h1>Password Reset Successful</h1>
  <p>Hello,</p>
  <p>We're writing to confirm that your password has been successfully reset.</p>
  <p>If you did not initiate this password reset, please contact our support team immediately.</p>
  <p>For security reasons, we recommend that you:</p>
  <ul>
    <li>Use a strong, unique password</li>
    <li>Enable two-factor authentication if available</li>
    <li>Avoid using the same password across multiple sites</li>
  </ul>
  <p>Thank you for helping us keep your account secure.</p>
  <p>Best regards,<br>Anonymous</p>
  <p style="font-size: 0.8em; color: #888;">This is an automated message, please do not reply to this email.</p>
</body>
</html>
`;

