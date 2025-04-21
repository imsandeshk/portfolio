import emailjs from 'emailjs-com';

export const sendEmail = async (e: React.FormEvent) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;

  return emailjs.sendForm(
    'service_onqx1k9',
    'template_qju4y3q',
    form,
    'cJkElLvA6I3pUjvq2'
  );
};
