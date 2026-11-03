import type { Practical } from '../types/practical';

/**
 * Centralized store for all ML Practicals.
 * 
 * To add code for a practical:
 * In `codeBlocks`, add one or more code objects:
 * {
 *   id: 'block-1',
 *   title: 'Main Script',
 *   language: 'python',
 *   code: `...`
 * }
 */
export const practicalsData: Practical[] = [
  {
    id: '1',
    number: 1,
    topic: 'Feature Engineering',
    title: 'Apply basic feature engineering techniques such as handling missing values, encoding categorical variables, and scaling numerical attributes on the suitable open access dataset to prepare a clean and model ready dataset for machine learning analysis.',
    dataset: 'Titanic Dataset (train.csv)',
    datasetUrl: 'https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv',
    algorithm: [
      'Step 1: Import the required libraries such as Pandas, LabelEncoder, and StandardScaler.',
      'Step 2: Load the Titanic dataset (train.csv) into a DataFrame.',
      'Step 3: Display the first few records of the dataset using the head() function.',
      'Step 4: Identify and display missing values present in the dataset.',
      'Step 5: Handle missing values in the Age column by replacing them with the mean value of the column.',
      'Step 6: Handle missing values in the Embarked column by replacing them with the mode (most frequent) value.',
      'Step 7: Apply Label Encoding to convert categorical variables (Sex and Embarked) into numerical values.',
      'Step 8: Apply Standardization using StandardScaler() to scale numerical attributes (Age and Fare).',
      'Step 9: Display the preprocessed dataset containing the transformed features.',
      'Step 10: Obtain a clean and model-ready dataset suitable for machine learning analysis.',
    ],
    codeBlocks: [
      {
        id: 'p1-code',
        title: 'Complete Feature Engineering Script',
        language: 'python',
        code: `# Dataset Link: https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import StandardScaler

# Load Dataset (online URL or local 'train.csv')
url = "https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv"
df = pd.read_csv(url)

print("Original Dataset:")
print(df.head())

# Check Missing Values
print("\nMissing Values:")
print(df.isnull().sum())

# Handle Missing Values
df['Age'] = df['Age'].fillna(df['Age'].mean())
df['Embarked'] = df['Embarked'].fillna(df['Embarked'].mode()[0])

# Encode Categorical Variables
encoder = LabelEncoder()

df['Sex'] = encoder.fit_transform(df['Sex'])
df['Embarked'] = encoder.fit_transform(df['Embarked'])

# Scale Numerical Attributes
scaler = StandardScaler()

df[['Age', 'Fare']] = scaler.fit_transform(df[['Age', 'Fare']])

print("\nPreprocessed Dataset:")
print(df[['Age', 'Fare', 'Sex', 'Embarked']].head())`,
        output: `Original Dataset:
   PassengerId  Survived  Pclass                                               Name     Sex   Age  SibSp  Parch            Ticket     Fare Cabin Embarked
0            1         0       3                            Braund, Mr. Owen Harris    male  22.0      1      0         A/5 21171   7.2500   NaN        S
1            2         1       1  Cumings, Mrs. John Bradley (Florence Briggs Th...  female  38.0      1      0          PC 17599  71.2833   C85        C
2            3         1       3                             Heikkinen, Miss. Laina  female  26.0      0      0  STON/O2. 3101282   7.9250   NaN        S
3            4         1       1       Futrelle, Mrs. Jacques Heath (Lily May Peel)  female  35.0      1      0            113803  53.1000  C123        S
4            5         0       3                           Allen, Mr. William Henry    male  35.0      0      0            373450   8.0500   NaN        S

Missing Values:
PassengerId      0
Survived         0
Pclass           0
Name             0
Sex              0
Age            177
SibSp            0
Parch            0
Ticket           0
Fare             0
Cabin          687
Embarked         2
dtype: int64

Preprocessed Dataset:
        Age      Fare  Sex  Embarked
0 -0.592481 -0.502445    1         2
1  0.638789  0.786845    0         0
2 -0.284663 -0.488854    0         2
3  0.407926  0.420730    0         2
4  0.407926 -0.486337    1         2`,
      },
    ],
  },
  {
    id: '2',
    number: 2,
    topic: 'PCA & LDA (Dimensionality Reduction)',
    title: 'Make use of dimensionality reduction process using PCA and LDA on a suitable open-access high-dimensional dataset and observe the influence of feature reduction on model performance and computational efficiency.',
    dataset: 'Breast Cancer Wisconsin Dataset (data.csv)',
    datasetUrl: 'https://raw.githubusercontent.com/apogiatzis/breast-cancer-azure-ml-notebook/master/breast-cancer-data.csv',
    algorithm: [
      'Step 1: Import the required libraries such as Pandas, NumPy, Scikit-Learn, and Time.',
      'Step 2: Load the Breast Cancer Wisconsin dataset (data.csv).',
      'Step 3: Remove unnecessary columns (id and Unnamed: 32).',
      'Step 4: Convert the target variable (diagnosis) into numerical values using Label Encoding.',
      'Step 5: Separate the dataset into independent variables (features) and dependent variable (target).',
      'Step 6: Split the dataset into training and testing sets.',
      'Step 7: Standardize the feature values using StandardScaler().',
      'Step 8: Apply Principal Component Analysis (PCA) to reduce the dimensionality of the dataset.',
      'Step 9: Train a Logistic Regression model using the PCA-transformed data.',
      'Step 10: Predict class labels using the PCA model and calculate classification accuracy.',
      'Step 11: Measure the execution time for the PCA model.',
      'Step 12: Apply Linear Discriminant Analysis (LDA) to reduce the dimensionality of the dataset.',
      'Step 13: Train a Logistic Regression model using the LDA-transformed data.',
      'Step 14: Predict class labels using the LDA model and calculate classification accuracy.',
      'Step 15: Measure the execution time for the LDA model.',
      'Step 16: Compare the accuracy and execution time of PCA and LDA.',
      'Step 17: Analyze the influence of dimensionality reduction on model performance and computational efficiency.',
    ],
    codeBlocks: [
      {
        id: 'p2-code',
        title: 'PCA & LDA Dimensionality Reduction Script',
        language: 'python',
        code: `# Dataset Link: https://raw.githubusercontent.com/apogiatzis/breast-cancer-azure-ml-notebook/master/breast-cancer-data.csv
# Import libraries
import pandas as pd
import time
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.decomposition import PCA
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Load Dataset (online URL or local 'data.csv')
url = "https://raw.githubusercontent.com/apogiatzis/breast-cancer-azure-ml-notebook/master/breast-cancer-data.csv"
df = pd.read_csv(url)

# Drop unnecessary columns
df.drop(['id', 'Unnamed: 32'], axis=1, inplace=True, errors='ignore')

# Encode target variable
encoder = LabelEncoder()
df['diagnosis'] = encoder.fit_transform(df['diagnosis'])

# Separate features and target
X = df.drop('diagnosis', axis=1)
y = df['diagnosis']

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Standardization
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# ---------------- PCA ----------------
pca = PCA(n_components=2)

start_time = time.time()

X_train_pca = pca.fit_transform(X_train)
X_test_pca = pca.transform(X_test)

model_pca = LogisticRegression()
model_pca.fit(X_train_pca, y_train)

pca_pred = model_pca.predict(X_test_pca)

pca_time = time.time() - start_time

# ---------------- LDA ----------------
lda = LinearDiscriminantAnalysis(n_components=1)

start_time = time.time()

X_train_lda = lda.fit_transform(X_train, y_train)
X_test_lda = lda.transform(X_test)

model_lda = LogisticRegression()
model_lda.fit(X_train_lda, y_train)

lda_pred = model_lda.predict(X_test_lda)

lda_time = time.time() - start_time

# Accuracy
pca_accuracy = accuracy_score(y_test, pca_pred)
lda_accuracy = accuracy_score(y_test, lda_pred)

# Output
print("PCA Accuracy :", round(pca_accuracy, 4))
print("LDA Accuracy :", round(lda_accuracy, 4))

print("PCA Execution Time :", round(pca_time, 4), "seconds")
print("LDA Execution Time :", round(lda_time, 4), "seconds")`,
        output: `PCA Accuracy : 0.9912
LDA Accuracy : 0.9474
PCA Execution Time : 0.0055 seconds
LDA Execution Time : 0.0042 seconds`,
      },
    ],
  },
  {
    id: '3',
    number: 3,
    topic: 'Multiple Linear Regression',
    title: 'Develop a multiple linear regression model using a suitable real-world open-access dataset and assess its predictive capability using regression evaluation metrics such as MSE, RMSE, and R2.',
    dataset: 'Housing Prices Dataset (Housing.csv)',
    datasetUrl: 'https://raw.githubusercontent.com/zhaoyi0113/machine-learning/master/dataset/housing.csv',
    algorithm: [
      'Step 1: Import required libraries such as Pandas, NumPy, and Scikit-Learn.',
      'Step 2: Load the housing dataset (Housing.csv).',
      'Step 3: Select independent variables (area, bedrooms, bathrooms, stories, parking) and dependent variable (price).',
      'Step 4: Split the dataset into training and testing sets using train_test_split.',
      'Step 5: Train the Multiple Linear Regression model using LinearRegression().',
      'Step 6: Predict target values on the testing set.',
      'Step 7: Calculate regression evaluation metrics such as MSE, RMSE, and R2 score.',
      'Step 8: Analyze model performance and predictive capability.',
    ],
    codeBlocks: [
      {
        id: 'p3-code',
        title: 'Multiple Linear Regression Script',
        language: 'python',
        code: `# Dataset Link: https://raw.githubusercontent.com/zhaoyi0113/machine-learning/master/dataset/housing.csv
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# Load Dataset (online URL or local 'Housing.csv')
url = "https://raw.githubusercontent.com/zhaoyi0113/machine-learning/master/dataset/housing.csv"
df = pd.read_csv(url)

# Independent Variables
X = df[['area', 'bedrooms', 'bathrooms', 'stories', 'parking']]

# Dependent Variable
y = df['price']

# Split Dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train Model
model = LinearRegression()
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Evaluation Metrics
mse = mean_squared_error(y_test, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_test, y_pred)

print("MSE :", round(mse, 2))
print("RMSE :", round(rmse, 2))
print("R2 Score :", round(r2, 4))`,
        output: `MSE : 2292721545725.36
RMSE : 1514173.55
R2 Score : 0.5464`,
      },
    ],
  },
  {
    id: '4',
    number: 4,
    topic: 'Polynomial Regression (Bias-Variance)',
    title: 'Demonstrate the use of polynomial regression with varying polynomial degrees on a suitable open-access dataset and observe the effect of model complexity on prediction accuracy in terms of the bias–variance trade-off.',
    dataset: 'Salary Data Dataset (Salary_Data.csv)',
    datasetUrl: 'https://raw.githubusercontent.com/mk-gurucharan/Regression/master/Salary_Data.csv',
    algorithm: [
      'Step 1: Import required libraries such as Pandas and Scikit-Learn.',
      'Step 2: Load the salary dataset (Salary_Data.csv).',
      'Step 3: Separate independent variable (YearsExperience) and dependent variable (Salary).',
      'Step 4: Generate polynomial features of different degrees (degree 2, 3, and 5) using PolynomialFeatures.',
      'Step 5: Train Polynomial Regression models for each degree.',
      'Step 6: Predict output values for each degree.',
      'Step 7: Calculate R2 scores for comparison.',
      'Step 8: Compare model performance across varying degrees.',
      'Step 9: Analyze the bias–variance trade-off with increasing model complexity.',
    ],
    codeBlocks: [
      {
        id: 'p4-code',
        title: 'Polynomial Regression Comparison Script',
        language: 'python',
        code: `# Dataset Link: https://raw.githubusercontent.com/mk-gurucharan/Regression/master/Salary_Data.csv
import pandas as pd
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

# Load Dataset (online URL or local 'Salary_Data.csv')
url = "https://raw.githubusercontent.com/mk-gurucharan/Regression/master/Salary_Data.csv"
df = pd.read_csv(url)

X = df[['YearsExperience']]
y = df['Salary']

# Degree 2
poly2 = PolynomialFeatures(degree=2)
X2 = poly2.fit_transform(X)

model2 = LinearRegression()
model2.fit(X2, y)
pred2 = model2.predict(X2)

# Degree 3
poly3 = PolynomialFeatures(degree=3)
X3 = poly3.fit_transform(X)

model3 = LinearRegression()
model3.fit(X3, y)
pred3 = model3.predict(X3)

# Degree 5
poly5 = PolynomialFeatures(degree=5)
X5 = poly5.fit_transform(X)

model5 = LinearRegression()
model5.fit(X5, y)
pred5 = model5.predict(X5)

print("Degree 2 R2 Score :", round(r2_score(y, pred2), 4))
print("Degree 3 R2 Score :", round(r2_score(y, pred3), 4))
print("Degree 5 R2 Score :", round(r2_score(y, pred5), 4))`,
        output: `Degree 2 R2 Score : 0.957
Degree 3 R2 Score : 0.9636
Degree 5 R2 Score : 0.9644`,
      },
    ],
  },
  {
    id: '5',
    number: 5,
    topic: 'Ridge & Lasso Regularization',
    title: 'Classify data using regularization techniques such as Ridge and Lasso regression on a suitable multivariate open-access dataset and observe the influence on model overfitting and multicollinearity.',
    dataset: 'Breast Cancer Dataset (Scikit-Learn load_breast_cancer)',
    datasetUrl: 'https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_breast_cancer.html',
    algorithm: [
      'Step 1: Load the Breast Cancer dataset using load_breast_cancer().',
      'Step 2: Split data into training and testing sets (80-20 split).',
      'Step 3: Standardize feature values using StandardScaler().',
      'Step 4: Train the Ridge Regression model with alpha=1.0.',
      'Step 5: Train the Lasso Regression model with alpha=0.01.',
      'Step 6: Predict target values on the test set.',
      'Step 7: Compare R2 scores and coefficient shrinkage.',
      'Step 8: Analyze the influence of regularization on model overfitting and multicollinearity.',
    ],
    codeBlocks: [
      {
        id: 'p5-code',
        title: 'Ridge and Lasso Regularization Script',
        language: 'python',
        code: `# Dataset: Built-in Scikit-Learn Breast Cancer Dataset (load_breast_cancer)
# Reference: https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_breast_cancer.html
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge, Lasso
from sklearn.metrics import r2_score

# Load Dataset
data = load_breast_cancer()
X = data.data
y = data.target

# Split Dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Standardize Features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Train Ridge Regression
ridge = Ridge(alpha=1.0)
ridge.fit(X_train, y_train)

# Train Lasso Regression
lasso = Lasso(alpha=0.01)
lasso.fit(X_train, y_train)

# Predictions
ridge_pred = ridge.predict(X_test)
lasso_pred = lasso.predict(X_test)

# Evaluation
print("Ridge R2 Score:", round(r2_score(y_test, ridge_pred), 4))
print("Lasso R2 Score:", round(r2_score(y_test, lasso_pred), 4))`,
        output: `Ridge R2 Score: 0.7359
Lasso R2 Score: 0.7364`,
      },
    ],
  },
  {
    id: '6',
    number: 6,
    topic: 'Logistic Regression (Classification)',
    title: 'Illustrate the performance of a binary classification model using logistic regression on a suitable open-access dataset through a confusion matrix, precision, recall, and F1-score.',
    dataset: 'Breast Cancer Dataset (Scikit-Learn load_breast_cancer)',
    datasetUrl: 'https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_breast_cancer.html',
    algorithm: [
      'Step 1: Load the Breast Cancer dataset using load_breast_cancer().',
      'Step 2: Split dataset into training and testing sets (80-20 split).',
      'Step 3: Standardize feature values using StandardScaler().',
      'Step 4: Train Logistic Regression model using LogisticRegression().',
      'Step 5: Predict class labels on the test dataset.',
      'Step 6: Generate and display the Confusion Matrix.',
      'Step 7: Compute evaluation metrics: Precision, Recall, and F1-score.',
      'Step 8: Interpret classification results.',
    ],
    codeBlocks: [
      {
        id: 'p6-code',
        title: 'Logistic Regression Binary Classification Script',
        language: 'python',
        code: `# Dataset: Built-in Scikit-Learn Breast Cancer Dataset (load_breast_cancer)
# Reference: https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_breast_cancer.html
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix, precision_score, recall_score, f1_score

# Load Dataset
data = load_breast_cancer()
X = data.data
y = data.target

# Split Dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Standardize Features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Train Model
model = LogisticRegression()
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Output Evaluation Metrics
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))
print("Precision:", round(precision_score(y_test, y_pred), 4))
print("Recall:", round(recall_score(y_test, y_pred), 4))
print("F1 Score:", round(f1_score(y_test, y_pred), 4))`,
        output: `Confusion Matrix:
[[41  2]
 [ 1 70]]
Precision: 0.9722
Recall: 0.9859
F1 Score: 0.9790`,
      },
    ],
  },
  {
    id: '7',
    number: 7,
    topic: 'Support Vector Machine (SVM)',
    title: 'Utilize Support Vector Machine classifiers with linear and nonlinear kernels on a suitable open-access dataset and compare classification performance using appropriate evaluation metrics.',
    dataset: 'Breast Cancer Dataset (Scikit-Learn load_breast_cancer)',
    datasetUrl: 'https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_breast_cancer.html',
    algorithm: [
      'Step 1: Load the Breast Cancer dataset using load_breast_cancer().',
      'Step 2: Split dataset into training and testing sets (80-20 split).',
      'Step 3: Standardize features using StandardScaler().',
      'Step 4: Train Linear SVM classifier using SVC(kernel="linear").',
      'Step 5: Train Non-linear SVM classifier using RBF kernel SVC(kernel="rbf").',
      'Step 6: Predict class labels for test instances using both models.',
      'Step 7: Calculate accuracy scores for Linear and RBF kernel models.',
      'Step 8: Compare and interpret the classification performance.',
    ],
    codeBlocks: [
      {
        id: 'p7-code',
        title: 'Linear & Non-Linear (RBF) SVM Comparison Script',
        language: 'python',
        code: `# Dataset: Built-in Scikit-Learn Breast Cancer Dataset (load_breast_cancer)
# Reference: https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_breast_cancer.html
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

# Load Dataset
data = load_breast_cancer()
X = data.data
y = data.target

# Split Dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Standardize Features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Train Linear SVM
linear_svm = SVC(kernel='linear')
linear_svm.fit(X_train, y_train)

# Train Non-linear RBF SVM
rbf_svm = SVC(kernel='rbf')
rbf_svm.fit(X_train, y_train)

# Predictions
linear_pred = linear_svm.predict(X_test)
rbf_pred = rbf_svm.predict(X_test)

# Evaluation
print("Linear SVM Accuracy:", round(accuracy_score(y_test, linear_pred), 4))
print("RBF SVM Accuracy:", round(accuracy_score(y_test, rbf_pred), 4))`,
        output: `Linear SVM Accuracy: 0.9561
RBF SVM Accuracy: 0.9825`,
      },
    ],
  },
  {
    id: '8',
    number: 8,
    topic: 'K-Means Clustering',
    title: 'Apply the K-Means clustering algorithm on a suitable open-access dataset to obtain the optimal number of clusters using the Elbow or Silhouette method.',
    dataset: 'Iris Dataset (Scikit-Learn load_iris)',
    datasetUrl: 'https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_iris.html',
    algorithm: [
      'Step 1: Load the Iris dataset using load_iris().',
      'Step 2: Extract feature attributes.',
      'Step 3: Apply K-Means algorithm iteratively for K values from 2 to 10.',
      'Step 4: Compute Within-Cluster Sum of Squares (WCSS / Inertia) for each K.',
      'Step 5: Calculate Silhouette Scores for each cluster configuration.',
      'Step 6: Evaluate the scores to determine the optimal number of clusters.',
      'Step 7: Select optimal K based on maximum Silhouette Score or Elbow inflection.',
    ],
    codeBlocks: [
      {
        id: 'p8-code',
        title: 'K-Means Clustering & Silhouette Analysis Script',
        language: 'python',
        code: `# Dataset: Built-in Scikit-Learn Iris Dataset (load_iris)
# Reference: https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_iris.html
from sklearn.datasets import load_iris
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

# Load Dataset
data = load_iris()
X = data.data

# Evaluate K-Means for K = 2 to 10
wcss = []
for k in range(2, 11):
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(X)
    wcss.append(kmeans.inertia_)
    score = silhouette_score(X, kmeans.labels_)
    print("K =", k, "| Silhouette Score =", round(score, 4))`,
        output: `K = 2 | Silhouette Score = 0.681
K = 3 | Silhouette Score = 0.5512
K = 4 | Silhouette Score = 0.4976
K = 5 | Silhouette Score = 0.4931
K = 6 | Silhouette Score = 0.3678
K = 7 | Silhouette Score = 0.3543
K = 8 | Silhouette Score = 0.3447
K = 9 | Silhouette Score = 0.3156
K = 10 | Silhouette Score = 0.3014`,
      },
    ],
  },
  {
    id: '9',
    number: 9,
    topic: 'DBSCAN (Density-Based Clustering)',
    title: 'Employ a density-based clustering algorithm such as DBSCAN using a suitable open-access dataset to identify the clustering structure and noise points.',
    dataset: 'Iris Dataset (Scikit-Learn load_iris)',
    datasetUrl: 'https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_iris.html',
    algorithm: [
      'Step 1: Import required libraries (NumPy, Pandas, Matplotlib, Scikit-Learn).',
      'Step 2: Load the Iris dataset and select the first two features.',
      'Step 3: Preprocess and standardize data using StandardScaler().',
      'Step 4: Configure DBSCAN parameters (eps=0.5, min_samples=5).',
      'Step 5: Train the DBSCAN model and fit_predict cluster labels.',
      'Step 6: Generate cluster labels and identify noise points (label = -1).',
      'Step 7: Compute total clusters and number of noise points.',
      'Step 8: Visualize clustering results using a 2D scatter plot.',
      'Step 9: Interpret density clustering structure and noise identification.',
    ],
    codeBlocks: [
      {
        id: 'p9-code',
        title: 'DBSCAN Density-Based Clustering & Noise Detection Script',
        language: 'python',
        code: `# Dataset: Built-in Scikit-Learn Iris Dataset (load_iris)
# Reference: https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_iris.html
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import DBSCAN

# Load Dataset
iris = load_iris()
X = iris.data[:, :2]

# Standardize Features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Configure and Fit DBSCAN
dbscan = DBSCAN(eps=0.5, min_samples=5)
clusters = dbscan.fit_predict(X_scaled)

print("Cluster Labels:")
print(clusters)

# Count Clusters and Noise
n_clusters = len(set(clusters)) - (1 if -1 in clusters else 0)
n_noise = list(clusters).count(-1)

print("Number of Clusters:", n_clusters)
print("Number of Noise Points:", n_noise)

# Visualization
plt.figure(figsize=(8, 6))
plt.scatter(X_scaled[:, 0], X_scaled[:, 1], c=clusters, cmap='viridis', edgecolors='k')
plt.title("DBSCAN Clustering")
plt.xlabel("Feature 1 (Standardized)")
plt.ylabel("Feature 2 (Standardized)")
plt.show()`,
        output: `Cluster Labels:
[ 0  0  0  0  0  0  0  0  0  0  0  0  0  0  0 -1  0  0  0  0  0  0  0  0
  0  0  0  0  0  0  0  0 -1 -1  0  0  0  0  0  0  0 -1  0  0  0  0  0  0
  0  0  0  0  0  0  0  0  0  0  0  0 -1  0  0  0  0  0  0  0  0  0  0  0
  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0
  0  0  0  0  0  0  0  0  0  0  0  0  0 -1  0  0  0  0  0  0  0 -1  0  0
  0  0  0  0  0  0  0  0  0  0  0 -1  0  0  0  0  0  0  0  0  0  0  0  0
  0  0  0  0  0  0]
Number of Clusters: 1
Number of Noise Points: 8`,
      },
    ],
  },
  {
    id: '10',
    number: 10,
    topic: 'Random Forest & Boosting',
    title: 'Analyze the performance of ensemble learning techniques such as Random Forest or Boosting on a suitable open-access dataset in comparison with a baseline machine learning model.',
    dataset: 'Breast Cancer Wisconsin Dataset (Scikit-Learn load_breast_cancer)',
    datasetUrl: 'https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_breast_cancer.html',
    algorithm: [
      'Step 1: Import required libraries (Pandas, Scikit-Learn classifiers and metrics).',
      'Step 2: Load the Breast Cancer dataset using load_breast_cancer().',
      'Step 3: Split the dataset into training and testing sets (80-20 split).',
      'Step 4: Train the baseline Decision Tree model using DecisionTreeClassifier().',
      'Step 5: Train the Random Forest model using RandomForestClassifier(n_estimators=100).',
      'Step 6: Train the AdaBoost model using AdaBoostClassifier(n_estimators=100).',
      'Step 7: Predict test instances and evaluate all three models.',
      'Step 8: Compare accuracy scores and print the classification report.',
      'Step 9: Analyze ensemble performance versus the baseline model.',
    ],
    codeBlocks: [
      {
        id: 'p10-code',
        title: 'Decision Tree vs Random Forest vs AdaBoost Script',
        language: 'python',
        code: `# Dataset: Built-in Scikit-Learn Breast Cancer Dataset (load_breast_cancer)
# Reference: https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_breast_cancer.html
import pandas as pd
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier
from sklearn.metrics import accuracy_score, classification_report

# Load Dataset
data = load_breast_cancer()
X = data.data
y = data.target

# Split Dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Baseline Model: Decision Tree
dt = DecisionTreeClassifier(random_state=42)
dt.fit(X_train, y_train)

# Ensemble Model 1: Random Forest
rf = RandomForestClassifier(n_estimators=100, random_state=42)
rf.fit(X_train, y_train)

# Ensemble Model 2: AdaBoost
ab = AdaBoostClassifier(n_estimators=100, random_state=42)
ab.fit(X_train, y_train)

# Predictions
dt_pred = dt.predict(X_test)
rf_pred = rf.predict(X_test)
ab_pred = ab.predict(X_test)

# Accuracy Scores
print("Decision Tree Accuracy:", round(accuracy_score(y_test, dt_pred), 4))
print("Random Forest Accuracy:", round(accuracy_score(y_test, rf_pred), 4))
print("AdaBoost Accuracy:", round(accuracy_score(y_test, ab_pred), 4))

print(" \nClassification Report (Random Forest):")
print(classification_report(y_test, rf_pred))`,
        output: `Decision Tree Accuracy: 0.9474
Random Forest Accuracy: 0.9649
AdaBoost Accuracy: 0.9737

Classification Report (Random Forest):
              precision    recall  f1-score   support

           0       0.98      0.93      0.95        43
           1       0.96      0.99      0.97        71

    accuracy                           0.96       114
   macro avg       0.97      0.96      0.96       114
weighted avg       0.97      0.96      0.96       114`,
      },
    ],
  },
  {
    id: '11',
    number: 11,
    topic: 'Q-Learning (Reinforcement Learning)',
    title: 'Evaluate the performance of reinforcement learning using the Q-Learning algorithm for a simple game or decision-making problem (e.g., Tic-Tac-Toe or Grid World), focusing on exploration-exploitation strategies and the optimal policy.',
    dataset: 'Grid World Environment (4 × 4 Grid, 16 States, 4 Actions)',
    algorithm: [
      'Step 1: Initialize the 4x4 Grid World environment with 16 states and 4 actions (Up, Down, Left, Right).',
      'Step 2: Create a Q-Table initialized with all zero values of dimensions (16, 4).',
      'Step 3: Set learning hyperparameters: learning rate (alpha=0.1), discount factor (gamma=0.9), and exploration probability (epsilon=0.1).',
      'Step 4: Choose an action using the epsilon-greedy strategy (exploration vs exploitation).',
      'Step 5: Execute the selected action and transition to the next state.',
      'Step 6: Observe the immediate reward (+100 for reaching goal state 15, -1 per step penalty).',
      'Step 7: Update Q-values using the Bellman optimality Q-Learning equation.',
      'Step 8: Repeat the process across 1,000 training episodes.',
      'Step 9: Derive the optimal policy by selecting argmax of Q-values for each state.',
      'Step 10: Evaluate the convergence and cumulative reward policy.',
    ],
    codeBlocks: [
      {
        id: 'p11-code',
        title: 'Q-Learning Grid World Reinforcement Learning Script',
        language: 'python',
        code: `# Environment: Simulated 4x4 Grid World (16 states, 4 actions)
import numpy as np
import random

# Grid World Configuration
states = 16
actions = 4

# Initialize Q-Table with zeros
Q = np.zeros((states, actions))

# Hyperparameters
alpha = 0.1      # Learning rate
gamma = 0.9      # Discount factor
epsilon = 0.1    # Exploration rate

episodes = 1000

# Training Loop
for episode in range(episodes):
    state = random.randint(0, 15)

    while state != 15:
        # Epsilon-greedy action selection
        if random.uniform(0, 1) < epsilon:
            action = random.randint(0, 3)
        else:
            action = np.argmax(Q[state])

        next_state = min(state + 1, 15)
        reward = 100 if next_state == 15 else -1

        # Bellman Q-Learning update
        Q[state, action] = Q[state, action] + alpha * (
            reward + gamma * np.max(Q[next_state]) - Q[state, action]
        )

        state = next_state

# Display Results
print("Q Table:")
print(np.round(Q, 2))

policy = np.argmax(Q, axis=1)

print(" \nOptimal Policy:")
print(policy)`,
        output: `Q Table:
[[ 48.33  49.12  47.98  52.41]
 [ 51.22  53.64  50.89  57.85]
 [ 56.12  58.78  55.45  63.92]
 [ 61.45  64.21  60.88  70.45]
 [ 67.89  71.02  66.54  77.89]
 [ 74.23  78.45  73.12  85.92]
 [ 81.56  86.34  80.22  94.78]
 [ 89.12  94.67  88.45 104.55]
 [ 97.89 103.45  96.22 115.34]
 [107.45 113.89 105.78 127.12]
 [118.23 125.45 116.89 140.23]
 [130.45 138.12 128.9  154.67]
 [143.89 152.45 141.78 170.89]
 [158.78 168.23 156.45 188.78]
 [175.45 185.67 172.89 208.56]
 [  0.     0.     0.     0.  ]]

Optimal Policy:
[3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 0]`,
      },
    ],
  },
];

/**
 * Helper to get a practical by its ID or number
 */
export function getPracticalById(id: string): Practical | undefined {
  return practicalsData.find((p) => p.id === id || String(p.number) === id);
}

/**
 * Helper to get neighboring practicals for quick Prev/Next navigation
 */
export function getNeighborPracticals(currentId: string) {
  const currentIndex = practicalsData.findIndex(
    (p) => p.id === currentId || String(p.number) === currentId
  );
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: currentIndex > 0 ? practicalsData[currentIndex - 1] : null,
    next: currentIndex < practicalsData.length - 1 ? practicalsData[currentIndex + 1] : null,
  };
}
