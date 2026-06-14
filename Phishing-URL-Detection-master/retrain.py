import pandas as pd
import pickle
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split

print("Loading dataset...")
df = pd.read_csv("phishing.csv")

print("Columns found:", df.columns.tolist())
print("Shape:", df.shape)

# Drop 'Index' (row number) and use 'class' as label
X = df.drop(["Index", "class"], axis=1)
y = df["class"]

print(f"Features: {X.shape[1]} | Samples: {X.shape[0]}")

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print("Training model... (this may take 1-2 mins)")
gbc = GradientBoostingClassifier(n_estimators=100, random_state=42)
gbc.fit(X_train, y_train)

acc = gbc.score(X_test, y_test)
print(f"Accuracy: {acc*100:.2f}%")

with open("pickle/model.pkl", "wb") as f:
    pickle.dump(gbc, f)

print("Model saved to pickle/model.pkl")
print("Now run: python app.py")
