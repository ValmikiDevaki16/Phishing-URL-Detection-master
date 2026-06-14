# ─────────────────────────────────────────────
#  V DEVAKI 2026 — Phishing URL Detection
#  app.py
# ─────────────────────────────────────────────

from flask import Flask, request, render_template
import numpy as np
import pickle
import warnings
warnings.filterwarnings('ignore')

from feature import FeatureExtraction

# Load the trained model
file = open("pickle/model.pkl", "rb")
gbc = pickle.load(file)
file.close()

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        url = request.form["url"]

        # Extract features from the URL
        obj = FeatureExtraction(url)
        x = np.array(obj.getFeaturesList()).reshape(1, 30)

        # Predict
        y_pro_phishing     = gbc.predict_proba(x)[0, 0]   # probability → phishing
        y_pro_non_phishing = gbc.predict_proba(x)[0, 1]   # probability → safe

        # Pass the safe-probability score (xx) to the template
        # xx >= 0.5  →  safe
        # xx <  0.5  →  unsafe
        return render_template(
            "index.html",
            xx=round(y_pro_non_phishing, 2),
            url=url
        )

    # GET request — show blank form
    return render_template("index.html", xx=-1, url="")


if __name__ == "__main__":
    app.run(debug=True)

if __name__ == "__main__":
    app.run(debug=True)