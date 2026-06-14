# 🛡️ AI-Based Phishing URL Detection System

<p align="center">
  <img src="screenshots/safe_result.png" alt="System Demo" width="700"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.8+-3776AB?style=for-the-badge&logo=python&logoColor=white"/>
  <img src="https://img.shields.io/badge/Flask-2.x-000000?style=for-the-badge&logo=flask&logoColor=white"/>
  <img src="https://img.shields.io/badge/scikit--learn-ML-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white"/>
  <img src="https://img.shields.io/badge/Status-Active-00C853?style=for-the-badge"/>
</p>

---

## 📌 About the Project

An AI-powered web application that detects **phishing URLs** in real time using a **Gradient Boosting Classifier** trained on 30 structural URL features. The system provides a threat score, risk level, and feature-based reasoning — making it both accurate and interpretable.

> *"I designed this interface to simulate a real-world cybersecurity dashboard, where users can analyze URL threats visually along with risk scores."*
> — V Devaki

---

## 🎯 Features

- ✅ Real-time phishing URL classification
- 📊 Threat score meter with percentage confidence
- 🔍 Feature-based reasoning panel (Why this result?)
- 🎨 Professional cybersecurity dashboard UI
- ⚡ One-click demo URLs for instant testing
- 🧠 Explainable AI (XAI) — transparent predictions
- 🔁 Model retraining script included

---

## 🖥️ Demo

| Safe URL | Unsafe URL |
|---|---|
| ![Safe](screenshots/safe_result.png) | ![Unsafe](screenshots/unsafe_result.png) |

**Test URLs:**
- ✅ `https://www.google.com` → **99% Safe**
- ❌ `http://paypal-security-update.com.phishing.test.ru` → **99% Unsafe**
- ✅ `https://www.github.com` → **99% Safe**

---

## 🧠 How It Works

```
User inputs URL
      ↓
Feature Extraction (feature.py)
  → 30 structural features extracted
  → HTTPS, domain length, subdomains, special chars, anchors...
      ↓
Gradient Boosting Classifier (model.pkl)
  → Predicts: Phishing (−1) or Legitimate (+1)
  → Returns probability score
      ↓
Flask renders result
  → Threat score, risk level, feature reasoning
  → Professional dashboard UI
```

---

## 🔧 Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python, Flask |
| Machine Learning | scikit-learn (Gradient Boosting Classifier) |
| Data Processing | NumPy, Pandas |
| Model Storage | Python Pickle |
| Frontend | HTML5, CSS3, JavaScript |
| Fonts | Google Fonts (Orbitron, Share Tech Mono) |

---

## 📁 Project Structure

```
phishing-url-detection/
│
├── app.py                  # Flask application — main entry point
├── feature.py              # URL feature extraction module (30 features)
├── retrain.py              # Retrain model from dataset
├── requirements.txt        # Python dependencies
├── .gitignore
│
├── templates/
│   └── index.html          # Cybersecurity dashboard UI (Jinja2 template)
│
├── static/
│   └── styles.css          # Additional styles (if any)
│
├── pickle/
│   └── model.pkl           # Trained GBC model (generate with retrain.py)
│
├── phishing.csv            # Dataset — 11,055 URLs, 30 features
│
└── screenshots/
    ├── safe_result.png
    └── unsafe_result.png
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/phishing-url-detection.git
cd phishing-url-detection
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Generate the ML model
```bash
python retrain.py
```
> This trains the Gradient Boosting Classifier on `phishing.csv` and saves `pickle/model.pkl`.
> ⏱️ Takes 1–2 minutes.

### 4. Run the application
```bash
python app.py
```

### 5. Open in browser
```
http://127.0.0.1:5000
```

---

## 📊 Dataset

| Property | Value |
|---|---|
| File | `phishing.csv` |
| Total Samples | 11,055 URLs |
| Features | 30 structural URL features |
| Labels | `1` = Legitimate, `-1` = Phishing |
| Source | UCI ML Repository / Phishing Website Dataset |

**Key Features Used:**
`UsingIP` · `LongURL` · `ShortURL` · `Symbol@` · `Redirecting//` · `HTTPS` · `DomainRegLen` · `SubDomains` · `AnchorURL` · `RequestURL` · `IframeRedirection` · `AgeofDomain` · `DNSRecording` · `WebsiteTraffic` · `PageRank` · `GoogleIndex` · and 14 more.

---

## 🤖 ML Model

| Property | Value |
|---|---|
| Algorithm | Gradient Boosting Classifier |
| Library | scikit-learn |
| Train/Test Split | 80% / 20% |
| Random State | 42 |
| Estimators | 100 |
| Serialisation | Python Pickle |

---

## ⚠️ Troubleshooting

**`ModuleNotFoundError: No module named 'sklearn.ensemble._gb_losses'`**

This means your `model.pkl` was trained on an older scikit-learn version. Fix:
```bash
python retrain.py
```
This regenerates a compatible `model.pkl` for your current environment.

---

## 🚀 Future Improvements

- [ ] Real-time WHOIS domain lookup integration
- [ ] Browser extension for inline URL scanning
- [ ] REST API endpoint for external integrations
- [ ] Model comparison dashboard (GBC vs Random Forest vs XGBoost)
- [ ] Database logging of scanned URLs

---

## 👩‍💻 Author

**V Devaki**
- 🎓 B.E. Computer Science & Engineering — JSSATEB, Bengaluru (2022–2026)
- 📧 devakisiridevaki@gmail.com
- 🔗 [LinkedIn](https://linkedin.com/in/YOUR_LINKEDIN)
- 💼 Internship: Junior Software Developer @ [Edutainer](https://internship.edutainer.in)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgements

- **Internal Guide:** Mrs. Ranjitha S R, Assistant Professor, Dept. of CSE, JSSATEB
- **External Guide:** Mr. Bunty Deb, Program Manager, Edutainer
- **Institution:** JSS Academy of Technical Education, Bengaluru
- Base project structure inspired by [Vaibhav Bichave's Phishing URL Detection](https://github.com/vaibhavbichave/Phishing-URL-Detection)

---

<p align="center">
  <b>⭐ Star this repo if you found it useful!</b>
</p>
