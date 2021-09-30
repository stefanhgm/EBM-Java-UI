import pandas as pd
from datetime import datetime
from interpret.glassbox import ExplainableBoostingClassifier
from sklearn.model_selection import train_test_split

from scripts.visualization_database import store_ebm_model

seed = 1

def load_heart_data():
    # https://www.kaggle.com/ronitf/heart-disease-uci
    df = pd.read_csv(r'heart.csv')
    train_cols = df.columns[0:-1]
    label = df.columns[-1]
    X_df = df[train_cols]
    y_df = df[label]
    dataset = {
        'problem': 'classification',
        'full': {
            'X': X_df,
            'y': y_df,
        },
    }
    return dataset

# Load dataset.
dataset = load_heart_data()
X_train, X_test, y_train, y_test = train_test_split(
    dataset['full']['X'], dataset['full']['y'], test_size=0.20, random_state=seed)

# Train EBM model.
ebm = ExplainableBoostingClassifier(random_state=seed)
ebm.fit(X_train, y_train)

# Load trained EBM model into EBM-Java-UI and inspect it via http://localhost:8080/EBM-Java-UI/.
timestamp = datetime.now().strftime("%Y-%m-%d_%H:%M:%S")
store_ebm_model(ebm, timestamp, "<db-password>")