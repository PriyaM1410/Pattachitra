"use client";

const WA_MESSAGE = encodeURIComponent(
  "Hi! I'm interested in your Pattachitra paintings. Could you please get in touch with me? Thank you.",
);
const WA_LINK = `https://wa.me/916372633342?text=${WA_MESSAGE}`;

const EMAIL_SUBJECT = encodeURIComponent("Pattachitra Artwork Inquiry");
const EMAIL_BODY = encodeURIComponent(
  "Hi! I'm interested in your Pattachitra paintings. Could you please get in touch with me? Thank you.",
);
const EMAIL_LINK = `https://mail.google.com/mail/?view=cm&fs=1&to=pattachitraa@gmail.com&su=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`;

const COMMISSION_STEPS = [
  "Initialize discussion detailing your preferred narrative theme & scale sizes via WhatsApp or Email.",
  "Receive pricing metrics, raw materials assessment, and visual concept alignment.",
  "Secure packaging and global architectural shipping setup.",
];

export default function ContactPage() {
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
                  <span className="iconBubble" aria-hidden="true">
                    📍
                  </span>
                  <div>
                    <h4 className="contactLabel">Heritage Studio Location</h4>
                    <p className="contactValue">
                      Raghurajpur Crafts Village, Puri District, Odisha, India —
                      752012
                    </p>
                  </div>
                </li>

                <li className="contactItem">
                  <span className="iconBubble" aria-hidden="true">
                    ✉
                  </span>
                  <div>
                    <h4 className="contactLabel">Email Address</h4>
                    <p className="contactValue">
                      <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=pattachitraa@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        pattachitraa@gmail.com
                      </a>
                    </p>
                  </div>
                </li>

                <li className="contactItem">
                  <span className="iconBubble" aria-hidden="true">
                    📞
                  </span>
                  <div>
                    <h4 className="contactLabel">Direct Line</h4>
                    <p className="contactValue">
                      <a href="tel:+916372633342">+91 6372633342</a>
                    </p>
                  </div>
                </li>

                <li className="contactItem">
                  <span className="iconBubble" aria-hidden="true">
                    🕐
                  </span>
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

              <div className="enquiryBtns">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="waBtn"
                >
                  <span aria-hidden="true">💬</span> Enquiry via WhatsApp
                </a>

                <a href={EMAIL_LINK} className="emailBtn">
                  <span aria-hidden="true">✉</span> Enquiry via Email
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — workflow */}
          <div className="rightCol">
            {/* Commission workflow card */}
            <div className="workflowCard">
              <h3 className="workflowTitle">From Idea to Art</h3>
              <p className="workflowIntro">
                Every custom Pattachitra painting is treated with traditional
                rigour — handmade canvas structures and authentic mineral stone
                colour processes. Custom timelines take between 1 to 8 weeks.
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
        </div>
      </div>
    </main>
  );
}
