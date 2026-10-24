import { Project } from "@/types";

export const projectsData: Project[] = [
  {
    id: "airline-demand-forecasting",
    title: "Production Airline Demand Forecasting & Distributed ML",
    tagline: "Large-scale Spark & Scala distributed feature and demand forecasting pipeline on AWS EMR.",
    category: "MLOps & Systems",
    liveBadge: "Production at Amadeus",
    metrics: [
      { value: "35%", label: "ETL Speedup (PySpark → Scala)" },
      { value: "Multi-GB/day", label: "Parquet Volume Processed" },
      { value: "100%", label: "Automated Jenkins CI/CD" },
    ],
    problem:
      "Global flight demand exhibits intense non-linear seasonality, high cardinality across flight routes, and massive data volume. Legacy PySpark ETL jobs experienced JVM-Python serialization bottlenecks and high cluster memory overhead on AWS EMR.",
    solution:
      "Engineered an enterprise-grade demand forecasting and feature extraction pipeline. Migrated performance-critical PySpark data transformations to native Scala, taking advantage of Catalyst optimizer passes and zero-copy JVM execution.",
    production:
      "Executed on distributed AWS EMR clusters reading from compressed S3 Parquet lakes. Automated complete build, lint, unit testing, and deployment cycles via Jenkins pipelines orchestrated with robust Bash tooling.",
    businessImpact:
      "Reduced ETL runtime latency by 35%, cutting AWS EMR cluster compute bills and delivering updated flight booking demand forecasts hours earlier for revenue management algorithms.",
    techStack: [
      "Apache Spark",
      "Scala",
      "PySpark",
      "AWS EMR",
      "AWS S3",
      "Jenkins CI/CD",
      "Parquet",
      "Python",
    ],
    links: {
      github: "https://github.com/aritra-mondal-ds",
      demo: "https://www.linkedin.com/in/aritra-mondal-66702021",
    },
    featured: true,
  },
  {
    id: "financial-time-series-forecasting",
    title: "Multi-Asset Financial Time-Series & Deep RL Engine",
    tagline: "Automated financial data pipeline, 73+ engineered technical features, and walk-forward predictive modeling.",
    category: "Time-Series & Forecasting",
    liveBadge: "Open Source / Backtested",
    metrics: [
      { value: "73+", label: "Engineered Alpha Features" },
      { value: "3 Modalities", label: "XGBoost, LSTM & PPO" },
      { value: "0 Lookahead", label: "Strict Walk-Forward CV" },
    ],
    problem:
      "Financial markets suffer from severe non-stationarity, regime shifts, and lookahead bias. Naive k-fold cross-validation results in data leakage and catastrophic live trading drawdown.",
    solution:
      "Engineered a multi-source data ingestion pipeline integrating CCXT, yfinance, and MetaTrader 5 (MT5). Constructed 73+ domain features (volatility estimators, momentum oscillators, order-flow metrics) and evaluated gradient boosted trees (XGBoost), sequential LSTMs, and Proximal Policy Optimization (PPO) reinforcement learning agents.",
    production:
      "Enforced rigorous purged walk-forward cross-validation with realistic transaction slippage and fee simulation. Modularized pipeline into repeatable data extraction, feature generation, and backtesting stages.",
    businessImpact:
      "Eliminated lookahead leakage, established robust risk-adjusted benchmark evaluation (Sharpe / Sortino ratios), and validated out-of-sample edge against baseline buy-and-hold strategies.",
    techStack: [
      "Python",
      "XGBoost",
      "PyTorch / LSTM",
      "CCXT",
      "yfinance",
      "MetaTrader 5",
      "Scikit-learn",
      "Pandas",
    ],
    links: {
      github: "https://github.com/aritra-mondal-ds",
      demo: "https://github.com/aritra-mondal-ds",
    },
    featured: true,
  },
  {
    id: "book-rating-prediction",
    title: "Predictive Recommendation & Rating Regression Engine",
    tagline: "High-dimensional regression model with automated feature engineering and hyperparameter optimization.",
    category: "Applied Predictive Modeling",
    liveBadge: "Model Evaluation Showcase",
    metrics: [
      { value: "10k+", label: "Dataset Observations" },
      { value: "Low RMSE", label: "Optimized Predictive Error" },
      { value: "SHAP", label: "Feature Importance Explainability" },
    ],
    problem:
      "Recommender platforms struggle with sparse user feedback and cold-start rating dynamics, requiring interpretable predictive models to estimate reader affinity before deployment.",
    solution:
      "Engineered an end-to-end regression framework trained on 10,000+ observations. Applied rigorous feature extraction across metadata, temporal interactions, and text attributes. Systematically tuned hyperparameters via Bayesian / grid search and benchmarked ensemble models.",
    production:
      "Evaluated across Mean Squared Error (MSE), Root Mean Squared Error (RMSE), and Mean Absolute Error (MAE). Integrated feature importance interpretability to identify the strongest latent rating drivers.",
    businessImpact:
      "Delivered a transparent, high-accuracy scoring engine providing publishers and product managers with actionable insights into reader retention and review polarity.",
    techStack: [
      "Python",
      "Scikit-learn",
      "Feature Engineering",
      "Pandas / NumPy",
      "Hyperparameter Optimization",
      "Model Interpretability",
    ],
    links: {
      github: "https://github.com/aritra-mondal-ds",
      demo: "https://github.com/aritra-mondal-ds",
    },
    featured: true,
  },
  {
    id: "snort-intrusion-detection",
    title: "High-Throughput Network IDS & Traffic Classifier",
    tagline: "Rule optimization & traffic pattern telemetry across TCP/IP, UDP, and ICMP protocols.",
    category: "Cybersecurity & Graph AI",
    liveBadge: "Systems & Security",
    metrics: [
      { value: "20%", label: "False Positive Reduction" },
      { value: "3 Protocols", label: "Deep TCP/UDP/ICMP Inspection" },
      { value: "Real-Time", label: "Packet Telemetry Stream" },
    ],
    problem:
      "Enterprise networks generate gigabytes of raw packet traffic. Traditional signature rules trigger overwhelming volumes of false positive alerts, exhausting security analysts and slowing threat response.",
    solution:
      "Deployed and calibrated a SNORT Intrusion Detection System. Designed custom packet analysis rules and traffic heuristics for TCP, UDP, and ICMP vectors, isolating malicious payloads from benign network noise.",
    production:
      "Implemented streamlined logging and telemetry aggregation, benchmarking detection rates under simulated volumetric attack scenarios and stress-testing packet capture engines.",
    businessImpact:
      "Reduced false-positive alarm rates by approximately 20% while retaining high-sensitivity detection of stealth scans and payload anomalies, substantially reducing analyst alert fatigue.",
    techStack: [
      "SNORT IDS",
      "Network Telemetry",
      "TCP/IP / UDP / ICMP",
      "Linux / Bash",
      "Packet Analysis",
      "Security Heuristics",
    ],
    links: {
      github: "https://github.com/aritra-mondal-ds",
      demo: "https://github.com/aritra-mondal-ds",
    },
    featured: true,
  },
];
