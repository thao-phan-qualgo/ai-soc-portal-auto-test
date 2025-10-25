"""
AI/ML Model Testing Examples

This module demonstrates how to test AI/ML models using the framework.
These are example tests that show the capabilities available.
"""

import pytest
import pandas as pd
import numpy as np

# Check if sklearn is available
try:
    import sklearn
    SKLEARN_AVAILABLE = True
except ImportError:
    SKLEARN_AVAILABLE = False

# Check if great_expectations is available
try:
    import great_expectations
    GE_AVAILABLE = True
except ImportError:
    GE_AVAILABLE = False


class TestMLModelValidation:
    """Test class for ML model validation examples"""
    
    @pytest.fixture
    def sample_data(self):
        """Create sample data for testing"""
        np.random.seed(42)
        n_samples = 1000
        n_features = 10
        
        # Generate synthetic data
        X = np.random.randn(n_samples, n_features)
        y = np.random.randint(0, 2, n_samples)
        
        return {
            "features": X,
            "labels": y,
            "feature_names": [f"feature_{i}" for i in range(n_features)]
        }
    
    def test_basic_data_validation(self, sample_data):
        """Test basic data validation without external dependencies"""
        # Test data shape
        assert sample_data["features"].shape[0] > 0, "No samples in dataset"
        assert sample_data["features"].shape[1] > 0, "No features in dataset"
        assert len(sample_data["labels"]) == sample_data["features"].shape[0], "Labels length mismatch"
        
        # Test data types
        assert isinstance(sample_data["features"], np.ndarray), "Features should be numpy array"
        assert isinstance(sample_data["labels"], np.ndarray), "Labels should be numpy array"
        
        # Test for missing values
        assert not np.isnan(sample_data["features"]).any(), "NaN values found in features"
        assert not np.isnan(sample_data["labels"]).any(), "NaN values found in labels"
    
    @pytest.mark.skipif(not SKLEARN_AVAILABLE, reason="scikit-learn not available")
    def test_model_accuracy(self, sample_data):
        """Test model accuracy with validation data"""
        from sklearn.ensemble import RandomForestClassifier
        from sklearn.metrics import accuracy_score
        from sklearn.model_selection import train_test_split
        
        X = sample_data["features"]
        y = sample_data["labels"]
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Train model
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X_train, y_train)
        
        # Make predictions
        predictions = model.predict(X_test)
        
        # Calculate accuracy
        accuracy = accuracy_score(y_test, predictions)
        
        # Assert minimum accuracy threshold
        assert accuracy >= 0.5, f"Model accuracy {accuracy:.3f} below threshold"
    
    @pytest.mark.skipif(not SKLEARN_AVAILABLE, reason="scikit-learn not available")
    def test_model_precision_recall(self, sample_data):
        """Test model precision and recall metrics"""
        from sklearn.ensemble import RandomForestClassifier
        from sklearn.metrics import precision_score, recall_score
        from sklearn.model_selection import train_test_split
        
        X = sample_data["features"]
        y = sample_data["labels"]
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Train model
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X_train, y_train)
        
        # Make predictions
        predictions = model.predict(X_test)
        
        # Calculate metrics
        precision = precision_score(y_test, predictions, average='weighted')
        recall = recall_score(y_test, predictions, average='weighted')
        
        # Assert minimum thresholds
        assert precision >= 0.5, f"Precision {precision:.3f} below threshold"
        assert recall >= 0.5, f"Recall {recall:.3f} below threshold"
    
    def test_basic_data_quality(self, sample_data):
        """Test basic data quality without external dependencies"""
        # Convert to DataFrame
        df = pd.DataFrame(
            sample_data["features"],
            columns=sample_data["feature_names"]
        )
        df['target'] = sample_data["labels"]
        
        # Basic data quality checks
        assert not df.isnull().any().any(), "Null values found in dataset"
        assert df.shape[0] > 0, "Empty dataset"
        assert df.shape[1] > 0, "No columns in dataset"
        
        # Check target column
        assert 'target' in df.columns, "Target column missing"
        assert df['target'].isin([0, 1]).all(), "Invalid target values"
        
        # Check feature columns
        for col in sample_data["feature_names"]:
            assert col in df.columns, f"Feature column {col} missing"
            assert not df[col].isnull().any(), f"Null values in {col}"
    
    @pytest.mark.skipif(not GE_AVAILABLE, reason="Great Expectations not available")
    def test_data_quality_validation(self, sample_data):
        """Test data quality using Great Expectations"""
        import great_expectations as ge
        
        # Convert to DataFrame
        df = pd.DataFrame(
            sample_data["features"],
            columns=sample_data["feature_names"]
        )
        df['target'] = sample_data["labels"]
        
        # Create Great Expectations dataset
        ge_df = ge.from_pandas(df)
        
        # Define data quality expectations
        ge_df.expect_column_to_exist("target")
        ge_df.expect_column_values_to_not_be_null("target")
        ge_df.expect_column_values_to_be_in_set("target", [0, 1])
        
        # Check for missing values in features
        for col in sample_data["feature_names"]:
            ge_df.expect_column_values_to_not_be_null(col)
        
        # Validate expectations
        results = ge_df.validate()
        
        # Assert data quality
        assert results.success, f"Data quality validation failed: {results.results}"
    
    @pytest.mark.skipif(not SKLEARN_AVAILABLE, reason="scikit-learn not available")
    def test_model_performance_benchmark(self, sample_data, benchmark):
        """Test model performance with benchmarking"""
        from sklearn.ensemble import RandomForestClassifier
        from sklearn.model_selection import train_test_split
        
        X = sample_data["features"]
        y = sample_data["labels"]
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        def train_and_predict():
            """Function to benchmark"""
            model = RandomForestClassifier(n_estimators=100, random_state=42)
            model.fit(X_train, y_train)
            return model.predict(X_test)
        
        # Benchmark the training and prediction
        predictions = benchmark(train_and_predict)
        
        # Assert predictions are not None
        assert predictions is not None
        assert len(predictions) == len(y_test)
    
    @pytest.mark.slow
    @pytest.mark.skipif(not SKLEARN_AVAILABLE, reason="scikit-learn not available")
    def test_model_training_time(self, sample_data):
        """Test that model training completes within acceptable time"""
        import time
        from sklearn.ensemble import RandomForestClassifier
        
        X = sample_data["features"]
        y = sample_data["labels"]
        
        start_time = time.time()
        
        # Train model
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X, y)
        
        training_time = time.time() - start_time
        
        # Assert training completes within 5 seconds
        assert training_time < 5.0, f"Training took {training_time:.2f}s, exceeds threshold"
    
    @pytest.mark.skipif(not SKLEARN_AVAILABLE, reason="scikit-learn not available")
    def test_model_feature_importance(self, sample_data):
        """Test model feature importance"""
        from sklearn.ensemble import RandomForestClassifier
        
        X = sample_data["features"]
        y = sample_data["labels"]
        
        # Train model
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        model.fit(X, y)
        
        # Get feature importance
        importance = model.feature_importances_
        
        # Assert all features have some importance
        assert len(importance) == X.shape[1], "Feature importance length mismatch"
        assert all(imp >= 0 for imp in importance), "Negative feature importance found"
        assert sum(importance) > 0, "No feature importance found"
