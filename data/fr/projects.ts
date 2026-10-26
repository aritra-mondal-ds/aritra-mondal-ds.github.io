import { Project } from "@/types";

export const projectsDataFr: Project[] = [
  {
    id: "airline-demand-forecasting",
    title: "Prévision de Demande Aérienne & ML Distribué en Production",
    tagline: "Pipeline distribué d'extraction de caractéristiques et de prévision sur AWS EMR avec Spark & Scala.",
    category: "MLOps & Systems",
    liveBadge: "Production chez Amadeus",
    metrics: [
      { value: "35%", label: "Gain de performance (PySpark → Scala)" },
      { value: "Plusieurs Go/j", label: "Flux de données Parquet traité" },
      { value: "100%", label: "Automatisation CI/CD Jenkins" },
    ],
    problem:
      "La demande mondiale de vols présente une forte saisonnalité non linéaire, une cardinalité élevée des liaisons aériennes et des volumes de données considérables. L'ETL hérité sous PySpark subissait d'importants goulots d'étranglement de sérialisation JVM-Python et une surconsommation mémoire sur AWS EMR.",
    solution:
      "Ingénierie d'un pipeline robuste de prévision de la demande et d'ingénierie des caractéristiques. Migration des transformations critiques de PySpark vers Scala natif, tirant parti de l'optimiseur Catalyst et d'une exécution JVM zero-copy.",
    production:
      "Exécution sur clusters distribués AWS EMR avec lecture directe sur Data Lake Amazon S3 en Parquet compressé. Automatisation complète du build, lint, tests unitaires et déploiement via des pipelines Jenkins pilotés par scripts Bash.",
    businessImpact:
      "Réduction de 35% de la latence de traitement des batchs ETL, entraînant une diminution directe des coûts de calcul EMR et la livraison accélérée des prévisions de réservations pour les algorithmes de Yield Management.",
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
    title: "Moteur Multi-Actifs de Séries Temporelles & Deep RL",
    tagline: "Pipeline d'ingestion automatisé, 73+ caractéristiques techniques et modélisation prédictive walk-forward.",
    category: "Time-Series & Forecasting",
    liveBadge: "Open Source / Backtesté",
    metrics: [
      { value: "73+", label: "Features Alpha développées" },
      { value: "3 Modèles", label: "XGBoost, LSTM & PPO" },
      { value: "0 Biais", label: "Validation Purged Walk-Forward" },
    ],
    problem:
      "Les séries financières souffrent de forte non-stationnarité, de changements de régime et de biais d'anticipation (lookahead bias). Une validation croisée k-fold naïve génère des fuites de données critiques et des pertes massives en conditions réelles.",
    solution:
      "Développement d'un pipeline multi-sources intégrant CCXT, yfinance et MetaTrader 5 (MT5). Construction de 73+ indicateurs techniques avancés (estimateurs de volatilité, oscillateurs de momentum, flux d'ordres) et comparaison de modèles gradient boosting (XGBoost), de réseaux récurrents (LSTM) et d'agents d'apprentissage par renforcement (PPO).",
    production:
      "Validation croisée rigoureuse par walk-forward sans fuite temporelle avec simulation réaliste des frais et du slippage. Pipeline modulaire et automatisé du scraping jusqu'au backtest.",
    businessImpact:
      "Élimination totale des biais d'anticipation, établissement de métriques de risque robustes (ratios de Sharpe / Sortino) et validation d'une surperformance hors-échantillon face aux stratégies de référence.",
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
    title: "Moteur de Recommandation & Scoring Prédictif Haute Dimension",
    tagline: "Modélisation hybride d'affinité, pipeline automatisé de features, optimisation bayésienne et explicabilité SHAP.",
    category: "Applied Predictive Modeling",
    liveBadge: "Ranking & Explicabilité",
    metrics: [
      { value: "Top-K", label: "Ranking & Affinité Utilisateur" },
      { value: "Bayésien", label: "Optimisation Optuna" },
      { value: "SHAP", label: "Attribution & Explicabilité" },
    ],
    problem:
      "Les plateformes de recommandation font face à la forte cardinalité des interactions, au problème du démarrage à froid (cold-start) et à la dispersion des avis. Les heuristiques opaques réduisent l'engagement et n'offrent aucune visibilité aux équipes produit.",
    solution:
      "Conception d'un framework hybride de recommandation et de régression combinant signaux collaboratifs et plongements de contenu. Développement d'un pipeline d'extraction de variables intégrant la décroissance temporelle et les biais utilisateurs, optimisé par recherche bayésienne (Optuna) sur des architectures d'ensemble (LightGBM, Scikit-learn).",
    production:
      "Validation rigoureuse par découpage train/validation/test, étalonnée sur RMSE, MAE et métriques de ranking. Intégration de vecteurs d'explicabilité TreeSHAP pour quantifier l'attribution des variables et valider les prédictions avant mise en production.",
    businessImpact:
      "Déploiement d'un moteur de scoring transparent et haute précision qui optimise la pertinence personnalisée, réduit le churn lié au cold-start et fournit aux équipes produit des leviers décisionnels mesurables.",
    techStack: [
      "Python",
      "LightGBM",
      "Scikit-learn",
      "Optuna",
      "SHAP",
      "Feature Engineering",
      "Pandas / NumPy",
      "Interprétabilité SHAP",
    ],
    links: {
      github: "https://github.com/aritra-mondal-ds",
      demo: "https://github.com/aritra-mondal-ds",
    },
    featured: true,
  },
  {
    id: "snort-intrusion-detection",
    title: "Système de Détection d'Intrusion & Télémétrie Réseau",
    tagline: "Optimisation des règles heuristiques et classification des flux sur les protocoles TCP/IP, UDP et ICMP.",
    category: "Cybersecurity & Graph AI",
    liveBadge: "Systèmes & Sécurité Réseau",
    metrics: [
      { value: "20%", label: "Réduction des faux positifs" },
      { value: "3 Protocoles", label: "Inspection approfondie TCP/UDP/ICMP" },
      { value: "Temps réel", label: "Flux de télémétrie réseau" },
    ],
    problem:
      "Les réseaux d'entreprise génèrent des gigaoctets de paquets bruts. Les règles de signatures conventionnelles déclenchent un volume excessif de fausses alertes, saturant les analystes de sécurité et retardant la détection des vraies menaces.",
    solution:
      "Déploiement et paramétrage d'un système de détection d'intrusion SNORT IDS. Rédaction de règles de détection sur-mesure et d'heuristiques de filtrage pour les vecteurs TCP, UDP et ICMP, isolant les charges malveillantes du bruit normal.",
    production:
      "Mise en place de journaux de bord optimisés et d'agrégation télémétrique. Évaluation des seuils de détection sous simulations d'attaques volumétriques et tests de charge de capture réseau.",
    businessImpact:
      "Réduction d'environ 20% du taux d'alertes positives non pertinentes tout en maintenant une sensibilité maximale face aux scans furtifs et anomalies de charge, allégeant significativement la charge des analystes.",
    techStack: [
      "SNORT IDS",
      "Télémétrie Réseau",
      "TCP/IP / UDP / ICMP",
      "Linux / Bash",
      "Analyse de paquets",
      "Heuristiques de Sécurité",
    ],
    links: {
      github: "https://github.com/aritra-mondal-ds",
      demo: "https://github.com/aritra-mondal-ds",
    },
    featured: true,
  },
];

