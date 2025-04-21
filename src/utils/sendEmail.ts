import emailjs from 'emailjs-com';

export const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  return emailjs.sendForm(
    process.env.REACT_APP_EMAILJS_SERVICE_ID!,
    process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
    e.target as HTMLFormElement,
    process.env.REACT_APP_EMAILJS_USER_ID!
  );
};
