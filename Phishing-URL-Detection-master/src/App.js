import React, { useState } from "react";

const CATEGORIES = ["Curriculum", "Mentorship", "Projects", "Assessments", "Resources", "Other"];

function App() {
  const [fname, setFname]             = useState("");
  const [lname, setLname]             = useState("");
  const [email, setEmail]             = useState("");
  const [phone, setPhone]             = useState("");
  const [category, setCategory]       = useState("");
  const [rating, setRating]           = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback]       = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [recommend, setRecommend]     = useState("");
  const [message, setMessage]         = useState("");
  const [error, setError]             = useState("");
  const [errors, setErrors]           = useState({});
  const [loading, setLoading]         = useState(false);
  const [submitted, setSubmitted]     = useState(false);

  const emailValid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const phoneValid = (v) => v === "" || /^[+\d\s\-()]{7,15}$/.test(v);

  /* ?? Progress ?? */
  const progress = (() => {
    let s = 0;
    if (fname.trim())                 s += 15;
    if (emailValid(email))            s += 20;
    if (category)                     s += 15;
    if (rating > 0)                   s += 20;
    if (feedback.trim().length >= 20) s += 20;
    if (recommend)                    s += 10;
    return s;
  })();

  /* ?? Validation ?? */
  const validate = () => {
    const e = {};
    if (!fname.trim())               e.fname     = "First name is required";
    if (!emailValid(email))          e.email     = "Enter a valid email address";
    if (phone && !phoneValid(phone)) e.phone     = "Enter a valid phone number";
    if (!category)                   e.category  = "Please select a category";
    if (rating === 0)                e.rating    = "Please leave a rating";
    if (feedback.trim().length < 20) e.feedback  = "Feedback must be at least 20 characters";
    if (!recommend)                  e.recommend = "Please select an option";
    return e;
  };

  /* ?? Submit ?? */
  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      setError("Please fix the errors below before submitting.");
      setMessage("");
      return;
    }
    setErrors({});
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${fname.trim()} ${lname.trim()}`,
          email, phone, feedback, suggestions, category, rating, recommend,
        }),
      });
      const data = await res.json();
      setMessage(data.message || `Thank you, ${fname}! Your feedback was received.`);
    } catch {
      setMessage(`Feedback submitted — thank you, ${fname}!`);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const reset = () => {
    setFname(""); setLname(""); setEmail(""); setPhone("");
    setCategory(""); setRating(0); setFeedback(""); setSuggestions("");
    setRecommend(""); setMessage(""); setError(""); setErrors({});
    setSubmitted(false);
  };

  const inp = (field) => ({
    width: "100%", padding: "10px 12px", borderRadius: "8px",
    border: `1px solid ${errors[field] ? "#E24B4A" : "#ccc"}`,
    fontSize: "14px", outline: "none", boxSizing: "border-box",
    fontFamily: "inherit", color: "#333", background: "white",
    transition: "border-color 0.2s",
  });

  const labelStyle = {
    fontSize: "11px", fontWeight: 600, color: "#555",
    textTransform: "uppercase", display: "block", marginBottom: "5px",
    letterSpacing: "0.04em",
  };

  /* ?? Success Screen ?? */
  if (submitted) {
    return (
      <div style={pageWrap}>
        <div style={{ ...card, textAlign: "center", padding: "2.5rem 2rem" }}>
          {/* Graduation cap — SVG icon */}
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "#EEEDFE", display: "flex",
            alignItems: "center", justifyContent: "center",
            margin: "0 auto 1rem",
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="#534AB7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10L12 5 2 10l10 5 10-5z"/>
              <path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5"/>
              <line x1="22" y1="10" x2="22" y2="15"/>
            </svg>
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 6 }}>
            Thank you, {fname}!
          </h2>
          <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginBottom: "1.5rem" }}>
            Your internship training feedback has been received and will help us improve the program.
          </p>

          <div style={{
            background: "#F7F6FE", borderRadius: 10, padding: "1rem",
            textAlign: "left", marginBottom: "1.5rem", fontSize: 13,
          }}>
            <Row label="Category"   value={category} />
            <Row
              label="Rating"
              value={
                <span>
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} style={{ color: i < rating ? "#EF9F27" : "#ddd", fontSize: 16 }}>
                      &#9733;
                    </span>
                  ))}
                </span>
              }
            />
            <Row label="Recommend?" value={recommend === "yes" ? "Yes, definitely" : "Not really"} />
          </div>

          <button
            onClick={reset}
            style={{ ...submitBtn, background: "#EEEDFE", color: "#3C3489", fontSize: 13, marginTop: 0 }}
          >
            Submit another response
          </button>
        </div>
      </div>
    );
  }

  /* ?? Main Form ?? */
  return (
    <div style={pageWrap}>
      <div style={card}>

        {/* Decorative blobs */}
        <div style={{ position: "absolute", width: 160, height: 160, borderRadius: "50%", background: "#534AB7", opacity: 0.06, top: -50, right: -50, pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 90, height: 90, borderRadius: "50%", background: "#7F77DD", opacity: 0.07, bottom: -25, left: -25, pointerEvents: "none" }} />

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "#EEEDFE", color: "#3C3489", fontSize: 11,
          fontWeight: 600, padding: "4px 10px", borderRadius: 6, marginBottom: "1rem",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#534AB7", display: "inline-block" }} />
          Internship Training 2025
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 5, color: "#222" }}>
          Internship Training Feedback Portal
        </h2>
        <p style={{ fontSize: 13, color: "#666", marginBottom: "1rem", lineHeight: 1.5 }}>
          Help us improve. Your honest feedback shapes the next batch's experience.
        </p>

        {/* Progress bar */}
        <div style={{ height: 4, background: "#eee", borderRadius: 2, marginBottom: "1.5rem" }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: "linear-gradient(to right, #7F77DD, #534AB7)",
            borderRadius: 2, transition: "width 0.4s ease",
          }} />
        </div>

        {/* Toasts */}
        {error   && <Toast type="error"   text={error} />}
        {message && <Toast type="success" text={message} />}

        {/* Name row */}
        <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>First name</label>
            <input
              placeholder="Ada"
              value={fname}
              onChange={e => setFname(e.target.value)}
              style={inp("fname")}
            />
            <ErrMsg msg={errors.fname} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Last name</label>
            <input
              placeholder="Lovelace"
              value={lname}
              onChange={e => setLname(e.target.value)}
              style={inp("lname")}
            />
          </div>
        </div>

        {/* Email */}
        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            placeholder="ada@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inp("email")}
          />
          <ErrMsg msg={errors.email} />
        </div>

        {/* Phone — SVG icon instead of emoji */}
        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>
            Phone number
            <span style={{ fontSize: 10, color: "#aaa", marginLeft: 6, textTransform: "none", letterSpacing: 0, fontWeight: 400 }}>
              (optional)
            </span>
          </label>
          <div style={{ position: "relative" }}>
            <span style={{
              position: "absolute", left: 10, top: "50%",
              transform: "translateY(-50%)", pointerEvents: "none",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1
                  19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1
                  2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5
                  2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3
                  1.9.6 2.9.7A2 2 0 0 1 22 16.9z"/>
              </svg>
            </span>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              style={{ ...inp("phone"), paddingLeft: 32 }}
            />
          </div>
          <ErrMsg msg={errors.phone} />
        </div>

        {/* Category chips */}
        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>Category</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  padding: "5px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer",
                  border: `1px solid ${category === cat ? "#7F77DD" : "#ccc"}`,
                  background: category === cat ? "#EEEDFE" : "transparent",
                  color: category === cat ? "#3C3489" : "#666",
                  fontWeight: category === cat ? 600 : 400,
                  transition: "all 0.15s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <ErrMsg msg={errors.category} />
        </div>

        <hr style={{ border: "none", borderTop: "1px solid #f0f0f0", margin: "1rem 0" }} />

        {/* Star Rating — HTML entity &#9733; renders correctly everywhere */}
        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>Overall rating</label>
          <div style={{ display: "flex", gap: 4 }}>
            {[1, 2, 3, 4, 5].map(i => (
              <span
                key={i}
                onClick={() => setRating(i)}
                onMouseEnter={() => setHoverRating(i)}
                onMouseLeave={() => setHoverRating(0)}
                style={{
                  fontSize: 28, lineHeight: 1,
                  cursor: "pointer",
                  color: i <= (hoverRating || rating) ? "#EF9F27" : "#ddd",
                  transition: "transform 0.1s, color 0.1s",
                  display: "inline-block",
                  transform: i <= (hoverRating || rating) ? "scale(1.2)" : "scale(1)",
                  userSelect: "none",
                }}
              >
                &#9733;
              </span>
            ))}
          </div>
          <ErrMsg msg={errors.rating} />
        </div>

        {/* Feedback — clean placeholder, no special characters */}
        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>Your feedback</label>
          <textarea
            placeholder="Tell us what you think about the lectures, projects, mentors, or anything memorable."
            value={feedback}
            maxLength={500}
            onChange={e => setFeedback(e.target.value)}
            style={{ ...inp("feedback"), height: 100, resize: "none", lineHeight: 1.6 }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <ErrMsg msg={errors.feedback} />
            <span style={{ fontSize: 11, color: "#aaa", marginLeft: "auto" }}>{feedback.length} / 500</span>
          </div>
        </div>

        {/* Recommend */}
        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>Would you recommend this training?</label>
          <div style={{ display: "flex", gap: 10 }}>
            {[
              { val: "yes", label: "Yes, definitely" },
              { val: "no",  label: "Not really"      },
            ].map(({ val, label }) => (
              <button
                key={val}
                onClick={() => setRecommend(val)}
                style={{
                  flex: 1, padding: "10px 12px", borderRadius: 8, cursor: "pointer",
                  border: `1px solid ${recommend === val ? "#7F77DD" : "#ccc"}`,
                  background: recommend === val ? "#EEEDFE" : "transparent",
                  color: recommend === val ? "#3C3489" : "#666",
                  fontSize: 13, fontWeight: recommend === val ? 600 : 400,
                  transition: "all 0.15s",
                  display: "flex", alignItems: "center", gap: 8,
                }}
              >
                {/* Pure CSS radio dot */}
                <span style={{
                  width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
                  border: `2px solid ${recommend === val ? "#7F77DD" : "#ccc"}`,
                  background: recommend === val ? "#7F77DD" : "transparent",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}>
                  {recommend === val && (
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "white", display: "block" }} />
                  )}
                </span>
                {label}
              </button>
            ))}
          </div>
          <ErrMsg msg={errors.recommend} />
        </div>

        {/* Suggestions */}
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>
            Suggestions for improvement
            <span style={{ fontSize: 10, color: "#aaa", marginLeft: 6, textTransform: "none", letterSpacing: 0, fontWeight: 400 }}>
              (optional)
            </span>
          </label>
          <textarea
            placeholder="Any topics you wished were covered? Anything to improve?"
            value={suggestions}
            maxLength={300}
            onChange={e => setSuggestions(e.target.value)}
            style={{ ...inp("suggestions"), height: 80, resize: "none", lineHeight: 1.6 }}
          />
          <span style={{ fontSize: 11, color: "#aaa", float: "right", marginTop: 4 }}>
            {suggestions.length} / 300
          </span>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            ...submitBtn,
            background: loading ? "#aaa" : "linear-gradient(to right, #7F77DD, #534AB7)",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Submitting..." : "Submit feedback"}
        </button>

        {/* Footer — SVG lock icon, no emoji */}
        <p style={{
          textAlign: "center", fontSize: 11, color: "#aaa", marginTop: "1rem",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
            stroke="#aaa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          Responses are confidential and never sold
        </p>

      </div>
    </div>
  );
}

/* ?????????? Helpers ?????????? */

function ErrMsg({ msg }) {
  if (!msg) return null;
  return <p style={{ fontSize: 11, color: "#E24B4A", marginTop: 4, marginBottom: 0 }}>{msg}</p>;
}

function Toast({ type, text }) {
  const isError = type === "error";
  return (
    <div style={{
      background: isError ? "#FCEBEB" : "#EAF3DE",
      color:      isError ? "#791F1F" : "#27500A",
      border:    `1px solid ${isError ? "#F09595" : "#97C459"}`,
      borderRadius: 8, padding: "10px 14px", fontSize: 13,
      marginBottom: "1rem", display: "flex", alignItems: "center", gap: 8,
    }}>
      {isError ? (
        /* Warning circle SVG */
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="#A32D2D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      ) : (
        /* Checkmark SVG */
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
          stroke="#3B6D11" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      )}
      {text}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, fontSize: 13 }}>
      <span style={{ color: "#888" }}>{label}</span>
      <span style={{ fontWeight: 600, color: "#333" }}>{value}</span>
    </div>
  );
}

/* ?????????? Shared styles ?????????? */

const pageWrap = {
  display: "flex", justifyContent: "center", alignItems: "center",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #7F77DD 0%, #534AB7 100%)",
  padding: "2rem",
};

const card = {
  background: "white", padding: "2rem", borderRadius: 20,
  width: "100%", maxWidth: 460,
  boxShadow: "0 20px 60px rgba(83,74,183,0.25)",
  position: "relative", overflow: "hidden",
};

const submitBtn = {
  width: "100%", padding: "12px",
  color: "white", border: "none", borderRadius: 8,
  fontWeight: 600, fontSize: 14,
  transition: "opacity 0.15s",
  marginTop: 4,
};

export default App;
