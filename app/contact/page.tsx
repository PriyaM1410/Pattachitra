'use client';

import { ChangeEvent, FormEvent, useState } from 'react';


const WA_MESSAGE = encodeURIComponent(
  'Vanakkam! I would like to inquire about your Pattachitra paintings.'
);
const WA_LINK = `https://wa.me/916374781871?text=${WA_MESSAGE}`;

const COMMISSION_STEPS = [
  'Initialize discussion detailing your preferred narrative theme & scale sizes via form or WhatsApp.',
  'Receive pricing metrics, raw materials assessment, and visual concept alignment.',
  'Secure packaging and global architectural shipping setup.',
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const EMPTY_FORM: FormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Phone: allow digits only, cap at 10
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: digitsOnly }));
  };

  const validate = (): string | null => {
    const { name, email, phone, subject, message } = formData;

    if (!name.trim() || !email.trim() || !phone.trim() || !subject.trim() || !message.trim()) {
      return 'Please fill in all fields before submitting.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return 'Please enter a valid email address.';
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone.trim())) {
      return 'Please enter a valid 10-digit WhatsApp number.';
    }

    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      alert(validationError);
      return;
    }

    setIsSubmitting(true);
    setStatus('Sending your inquiry...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to send inquiry.');
      }

      setStatus('Success! Your inquiry has been sent.');
      setFormData(EMPTY_FORM);
    } catch (error) {
      console.error(error);

      setStatus(
        'Something went wrong. Please try again or reach out via WhatsApp.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page">
      <div className="inner">
        {/* ── Header ── */}
        <header className="header">
          <span className="eyebrow">Connect with the Artist</span>
          <h1 className="heading">Get in Touch</h1>
           <div className="head-line">
              <span /> <span className="head-dot">✦</span> <span />
            </div>
      
        </header>

        {/* ── Two-column layout ── */}
        <div className="grid">
          {/* LEFT — supporting info */}
          <div className="leftCol">
            {/* Studio contact card */}
            <div className="studioCard">
              <h2 className="cardTitle">Studio Contact</h2>

              <ul className="contactList">
                <li className="contactItem">
                  <span className="iconBubble" aria-hidden="true">📍</span>
                  <div>
                    <h4 className="contactLabel">Heritage Studio Location</h4>
                    <p className="contactValue">
                      Raghurajpur Crafts Village, Puri District, Odisha,
                      India — 752012
                    </p>
                  </div>
                </li>

                <li className="contactItem">
                  <span className="iconBubble" aria-hidden="true">✉</span>
                  <div>
                    <h4 className="contactLabel">Email Address</h4>
                    <p className="contactValue">
                      <a href="mailto:pattachitraa@gmail.com">
                        pattachitraa@gmail.com
                      </a>
                    </p>
                  </div>
                </li>

                <li className="contactItem">
                  <span className="iconBubble" aria-hidden="true">📞</span>
                  <div>
                    <h4 className="contactLabel">Direct Line</h4>
                    <p className="contactValue">
                      <a href="tel:+916372633342">+91 6372633342</a>
                    </p>
                  </div>
                </li>

                <li className="contactItem">
                  <span className="iconBubble" aria-hidden="true">🕐</span>
                  <div>
                    <h4 className="contactLabel">Studio Hours</h4>
                    <p className="contactValue">
                      Sunday – Saturday
                      <br />
                      9:00 AM – 6:00 PM IST
                    </p>
                  </div>
                </li>
              </ul>

              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="waBtn"
              >
                <span aria-hidden="true">💬</span> Instant Order via WhatsApp
              </a>
            </div>

            {/* Commission workflow card */}
            <div className="workflowCard">
              <h3 className="workflowTitle">From Idea to Art</h3>
              <p className="workflowIntro">
                Every custom Pattachitra painting is treated with traditional
                rigour — handmade canvas structures and authentic mineral
                stone colour processes. Custom timelines take between 1 to 8
                weeks.
              </p>

              <div className="workflowSteps">
                <div className="workflowLine" />
                {COMMISSION_STEPS.map((step, i) => (
                  <div key={i} className="workflowStep">
                    <span className="stepNumber">{i + 1}</span>
                    <p className="stepText">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — enquiry form */}
          <div className="rightCol">
            <div className="formCard">
              <div className="formHeader">
                <h3 className="formTitle">Discuss Your Artwork</h3>
                <p className="formDesc">
                  Share your artwork requirements with us, and we’ll get back to you personally.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="form" noValidate>
                <div className="fieldGrid">
                  <div className="fieldGroup">
                    <label htmlFor="name" className="label">
                      Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input"
                      autoComplete="name"
                    />
                  </div>

                  <div className="fieldGroup">
                    <label htmlFor="email" className="label">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="fieldGrid">
                  <div className="fieldGroup">
                    <label htmlFor="phone" className="label">
                      WhatsApp Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      required
                      inputMode="numeric"
                      maxLength={10}
                      className="input"
                      autoComplete="tel"
                    />
                  </div>

                  <div className="fieldGroup">
                    <label htmlFor="subject" className="label">
                      Category *
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input"
                    />
                  </div>
                </div>

                <div className="fieldGroup">
                  <label htmlFor="message" className="label">
                    Description *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="input textarea"
                    placeholder="Describe dimensions, desired configurations, deities, or historical epics..."
                  />
                </div>

                <button type="submit" disabled={isSubmitting} className="submitBtn">
                  {isSubmitting ? 'Sending…' : 'Send Enquiry'}
                </button>

                {status && (
                  <div
                    role="alert"
                    className={
                      status.includes('Success') ? 'statusSuccess' : 'statusError'
                    }
                  >
                    {status}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      
    </main>
  );
}