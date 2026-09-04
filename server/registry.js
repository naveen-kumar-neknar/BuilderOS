// Generated HackWave Technology Registry (v5 - Zero Misinformation Certified)
export const TECHNOLOGY_REGISTRY = [
  {
    "name": "NumPy",
    "slug": "numpy",
    "description": "Fundamental package for scientific computing with N-dimensional arrays.",
    "version": "2.2.3",
    "latestVersion": "2.2.3",
    "category": "data",
    "domain": "integration",
    "era": "classic",
    "type": "Python Library",
    "ecosystem": "python",
    "author": "NumPy Developers",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "BSD-3-Clause",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Calculator",
    "iconBg": "#013243",
    "installMethod": "package-manager",
    "dependsOn": "python",
    "commands": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "numpy"
        ]
      },
      "macos": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "numpy"
        ]
      },
      "linux": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "numpy"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "--upgrade",
          "numpy"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "python",
        "args": [
          "-c",
          "import numpy; print(numpy.__version__)"
        ]
      },
      "macos": {
        "command": "python3",
        "args": [
          "-c",
          "import numpy; print(numpy.__version__)"
        ]
      },
      "linux": {
        "command": "python3",
        "args": [
          "-c",
          "import numpy; print(numpy.__version__)"
        ]
      }
    },
    "cmdVerify": {
      "windows": "python -m pip show numpy",
      "pip": "python -m pip show numpy"
    },
    "cli": {
      "windows": "python -m pip install numpy",
      "macos": "pip3 install numpy",
      "linux": "pip3 install numpy"
    }
  },
  {
    "name": "Pandas",
    "slug": "pandas",
    "description": "Fast Python data analysis, DataFrames, and tabular data manipulation.",
    "version": "2.2.3",
    "latestVersion": "2.2.3",
    "category": "data",
    "domain": "integration",
    "era": "classic",
    "type": "Python Library",
    "ecosystem": "python",
    "author": "pandas contributors",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "BSD-3-Clause",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Table2",
    "iconBg": "#150458",
    "installMethod": "package-manager",
    "dependsOn": "python",
    "commands": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "pandas"
        ]
      },
      "macos": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "pandas"
        ]
      },
      "linux": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "pandas"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "--upgrade",
          "pandas"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "python",
        "args": [
          "-c",
          "import pandas; print(pandas.__version__)"
        ]
      },
      "macos": {
        "command": "python3",
        "args": [
          "-c",
          "import pandas; print(pandas.__version__)"
        ]
      },
      "linux": {
        "command": "python3",
        "args": [
          "-c",
          "import pandas; print(pandas.__version__)"
        ]
      }
    },
    "cmdVerify": {
      "windows": "python -m pip show pandas",
      "pip": "python -m pip show pandas"
    },
    "cli": {
      "windows": "python -m pip install pandas",
      "macos": "pip3 install pandas",
      "linux": "pip3 install pandas"
    }
  },
  {
    "name": "Matplotlib",
    "slug": "matplotlib",
    "description": "Comprehensive library for creating static, animated, and interactive visualizations.",
    "version": "3.10.0",
    "latestVersion": "3.10.0",
    "category": "data",
    "domain": "integration",
    "era": "classic",
    "type": "Data Visualization",
    "ecosystem": "python",
    "author": "John D. Hunter / NumFOCUS",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "PSF-based",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "BarChart2",
    "iconBg": "#11557C",
    "installMethod": "package-manager",
    "dependsOn": "python",
    "commands": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "matplotlib"
        ]
      },
      "macos": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "matplotlib"
        ]
      },
      "linux": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "matplotlib"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "--upgrade",
          "matplotlib"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "python",
        "args": [
          "-c",
          "import matplotlib; print(matplotlib.__version__)"
        ]
      },
      "macos": {
        "command": "python3",
        "args": [
          "-c",
          "import matplotlib; print(matplotlib.__version__)"
        ]
      },
      "linux": {
        "command": "python3",
        "args": [
          "-c",
          "import matplotlib; print(matplotlib.__version__)"
        ]
      }
    },
    "cmdVerify": {
      "windows": "python -m pip show matplotlib",
      "pip": "python -m pip show matplotlib"
    },
    "cli": {
      "windows": "python -m pip install matplotlib",
      "macos": "pip3 install matplotlib",
      "linux": "pip3 install matplotlib"
    }
  },
  {
    "name": "Scikit-Learn",
    "slug": "scikit-learn",
    "description": "Predictive machine learning with classification, regression & TF-IDF vectorizers.",
    "version": "1.6.1",
    "latestVersion": "1.6.1",
    "category": "data",
    "domain": "integration",
    "era": "classic",
    "type": "Machine Learning",
    "ecosystem": "python",
    "author": "scikit-learn developers",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "BSD-3-Clause",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Atom",
    "iconBg": "#F7931E",
    "installMethod": "package-manager",
    "dependsOn": "python",
    "commands": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "scikit-learn"
        ]
      },
      "macos": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "scikit-learn"
        ]
      },
      "linux": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "scikit-learn"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "--upgrade",
          "scikit-learn"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "python",
        "args": [
          "-c",
          "import sklearn; print(sklearn.__version__)"
        ]
      },
      "macos": {
        "command": "python3",
        "args": [
          "-c",
          "import sklearn; print(sklearn.__version__)"
        ]
      },
      "linux": {
        "command": "python3",
        "args": [
          "-c",
          "import sklearn; print(sklearn.__version__)"
        ]
      }
    },
    "cmdVerify": {
      "windows": "python -m pip show scikit-learn",
      "pip": "python -m pip show scikit-learn"
    },
    "cli": {
      "windows": "python -m pip install scikit-learn",
      "macos": "pip3 install scikit-learn",
      "linux": "pip3 install scikit-learn"
    }
  },
  {
    "name": "Seaborn",
    "slug": "seaborn",
    "description": "Statistical data visualization built on Matplotlib with modern aesthetics.",
    "version": "0.13.2",
    "latestVersion": "0.13.2",
    "category": "data",
    "domain": "integration",
    "era": "current",
    "type": "Data Visualization",
    "ecosystem": "python",
    "author": "Michael Waskom",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "BSD-3-Clause",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "PieChart",
    "iconBg": "#4C72B0",
    "installMethod": "package-manager",
    "dependsOn": "python",
    "commands": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "seaborn"
        ]
      },
      "macos": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "seaborn"
        ]
      },
      "linux": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "seaborn"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "--upgrade",
          "seaborn"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "python",
        "args": [
          "-c",
          "import seaborn; print(seaborn.__version__)"
        ]
      },
      "macos": {
        "command": "python3",
        "args": [
          "-c",
          "import seaborn; print(seaborn.__version__)"
        ]
      },
      "linux": {
        "command": "python3",
        "args": [
          "-c",
          "import seaborn; print(seaborn.__version__)"
        ]
      }
    },
    "cmdVerify": {
      "windows": "python -m pip show seaborn",
      "pip": "python -m pip show seaborn"
    },
    "cli": {
      "windows": "python -m pip install seaborn",
      "macos": "pip3 install seaborn",
      "linux": "pip3 install seaborn"
    }
  },
  {
    "name": "SciPy",
    "slug": "scipy",
    "description": "Fundamental algorithms for scientific computing, optimization, linear algebra & statistics.",
    "version": "1.15.2",
    "latestVersion": "1.15.2",
    "category": "data",
    "domain": "integration",
    "era": "classic",
    "type": "Scientific Computing",
    "ecosystem": "python",
    "author": "SciPy Developers",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "BSD-3-Clause",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Cpu",
    "iconBg": "#00549F",
    "installMethod": "package-manager",
    "dependsOn": "python",
    "commands": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "scipy"
        ]
      },
      "macos": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "scipy"
        ]
      },
      "linux": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "scipy"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "--upgrade",
          "scipy"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "python",
        "args": [
          "-c",
          "import scipy; print(scipy.__version__)"
        ]
      },
      "macos": {
        "command": "python3",
        "args": [
          "-c",
          "import scipy; print(scipy.__version__)"
        ]
      },
      "linux": {
        "command": "python3",
        "args": [
          "-c",
          "import scipy; print(scipy.__version__)"
        ]
      }
    },
    "cmdVerify": {
      "windows": "python -m pip show scipy",
      "pip": "python -m pip show scipy"
    },
    "cli": {
      "windows": "python -m pip install scipy",
      "macos": "pip3 install scipy",
      "linux": "pip3 install scipy"
    }
  },
  {
    "name": "Polars",
    "slug": "polars",
    "description": "Blazingly fast DataFrame library written in Rust with parallel execution.",
    "version": "1.24.0",
    "latestVersion": "1.24.0",
    "category": "data",
    "domain": "integration",
    "era": "new",
    "type": "Fast DataFrame Engine",
    "ecosystem": "python",
    "author": "Ritchie Vink",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "MIT",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Zap",
    "iconBg": "#CD792C",
    "installMethod": "package-manager",
    "dependsOn": "python",
    "commands": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "polars"
        ]
      },
      "macos": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "polars"
        ]
      },
      "linux": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "polars"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "--upgrade",
          "polars"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "python",
        "args": [
          "-c",
          "import polars; print(polars.__version__)"
        ]
      },
      "macos": {
        "command": "python3",
        "args": [
          "-c",
          "import polars; print(polars.__version__)"
        ]
      },
      "linux": {
        "command": "python3",
        "args": [
          "-c",
          "import polars; print(polars.__version__)"
        ]
      }
    },
    "cmdVerify": {
      "windows": "python -m pip show polars",
      "pip": "python -m pip show polars"
    },
    "cli": {
      "windows": "python -m pip install polars",
      "macos": "pip3 install polars",
      "linux": "pip3 install polars"
    }
  },
  {
    "name": "DuckDB",
    "slug": "duckdb",
    "description": "Fast in-process analytical SQL OLAP database management system for data science.",
    "version": "1.5.5",
    "latestVersion": "1.5.5",
    "category": "data",
    "domain": "integration",
    "era": "new",
    "type": "Analytical Database",
    "ecosystem": "python",
    "author": "DuckDB Foundation",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "MIT",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Database",
    "iconBg": "#FFF000",
    "installMethod": "package-manager",
    "dependsOn": "python",
    "commands": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "duckdb"
        ]
      },
      "macos": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "duckdb"
        ]
      },
      "linux": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "duckdb"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "--upgrade",
          "duckdb"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "python",
        "args": [
          "-c",
          "import duckdb; print(duckdb.__version__)"
        ]
      },
      "macos": {
        "command": "python3",
        "args": [
          "-c",
          "import duckdb; print(duckdb.__version__)"
        ]
      },
      "linux": {
        "command": "python3",
        "args": [
          "-c",
          "import duckdb; print(duckdb.__version__)"
        ]
      }
    },
    "cmdVerify": {
      "windows": "python -m pip show duckdb",
      "pip": "python -m pip show duckdb"
    },
    "cli": {
      "windows": "python -m pip install duckdb",
      "macos": "pip3 install duckdb",
      "linux": "pip3 install duckdb"
    }
  },
  {
    "name": "XGBoost",
    "slug": "xgboost",
    "description": "Optimized distributed gradient boosting library designed to be highly efficient and flexible.",
    "version": "2.1.4",
    "latestVersion": "2.1.4",
    "category": "data",
    "domain": "integration",
    "era": "current",
    "type": "Gradient Boosting",
    "ecosystem": "python",
    "author": "DMLC",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "Apache-2.0",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Cpu",
    "iconBg": "#1B823D",
    "installMethod": "package-manager",
    "dependsOn": "python",
    "commands": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "xgboost"
        ]
      },
      "macos": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "xgboost"
        ]
      },
      "linux": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "xgboost"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "--upgrade",
          "xgboost"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "python",
        "args": [
          "-c",
          "import xgboost; print(xgboost.__version__)"
        ]
      },
      "macos": {
        "command": "python3",
        "args": [
          "-c",
          "import xgboost; print(xgboost.__version__)"
        ]
      },
      "linux": {
        "command": "python3",
        "args": [
          "-c",
          "import xgboost; print(xgboost.__version__)"
        ]
      }
    },
    "cmdVerify": {
      "windows": "python -m pip show xgboost",
      "pip": "python -m pip show xgboost"
    },
    "cli": {
      "windows": "python -m pip install xgboost",
      "macos": "pip3 install xgboost",
      "linux": "pip3 install xgboost"
    }
  },
  {
    "name": "JupyterLab",
    "slug": "jupyter",
    "description": "Next-generation web-based interactive development environment for notebooks & code.",
    "version": "4.3.5",
    "latestVersion": "4.3.5",
    "category": "data",
    "domain": "integration",
    "era": "current",
    "type": "Notebook Environment",
    "ecosystem": "python",
    "author": "Project Jupyter",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "BSD-3-Clause",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Layers",
    "iconBg": "#F37626",
    "installMethod": "package-manager",
    "dependsOn": "python",
    "commands": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "jupyterlab"
        ]
      },
      "macos": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "jupyterlab"
        ]
      },
      "linux": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "jupyterlab"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "--upgrade",
          "jupyterlab"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "jupyter",
        "args": [
          "--version"
        ]
      },
      "macos": {
        "command": "jupyter",
        "args": [
          "--version"
        ]
      },
      "linux": {
        "command": "jupyter",
        "args": [
          "--version"
        ]
      }
    },
    "cmdVerify": {
      "windows": "python -m pip show jupyter",
      "pip": "python -m pip show jupyter",
      "cli": "jupyter lab"
    },
    "cli": {
      "windows": "jupyter lab",
      "macos": "jupyter lab",
      "linux": "jupyter lab"
    }
  },
  {
    "name": "Ollama",
    "slug": "ollama",
    "description": "Run large language models locally on your machine with zero cloud dependencies.",
    "version": "0.5.11",
    "latestVersion": "0.5.11",
    "category": "ai",
    "domain": "backend",
    "era": "new",
    "type": "Local LLM Runner",
    "ecosystem": "system",
    "author": "Ollama Inc.",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "MIT",
    "costDescription": "100% Free & Open Source; Runs offline on your local GPU",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Terminal",
    "iconBg": "#111111",
    "installMethod": "package-manager",
    "commands": {
      "windows": {
        "command": "winget",
        "args": [
          "install",
          "--id",
          "Ollama.Ollama",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      },
      "macos": {
        "command": "brew",
        "args": [
          "install",
          "ollama"
        ]
      },
      "linux": {
        "command": "curl",
        "args": [
          "-fsSL",
          "https://ollama.com/install.sh",
          "|",
          "sh"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "winget",
        "args": [
          "upgrade",
          "--id",
          "Ollama.Ollama",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "ollama",
        "args": [
          "--version"
        ]
      },
      "macos": {
        "command": "ollama",
        "args": [
          "--version"
        ]
      },
      "linux": {
        "command": "ollama",
        "args": [
          "--version"
        ]
      }
    },
    "cmdVerify": {
      "windows": "ollama --version",
      "cli": "ollama run llama3.2"
    },
    "cli": {
      "windows": "ollama run llama3.2",
      "macos": "ollama run llama3.2",
      "linux": "ollama run llama3.2"
    }
  },
  {
    "name": "PyTorch",
    "slug": "pytorch",
    "description": "Deep learning platform with dynamic computational graphs and native GPU acceleration.",
    "version": "2.6.0",
    "latestVersion": "2.6.0",
    "category": "ai",
    "domain": "integration",
    "era": "classic",
    "type": "Deep Learning Framework",
    "ecosystem": "python",
    "author": "PyTorch Foundation",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "BSD-3-Clause",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Cpu",
    "iconBg": "#EE4C2C",
    "installMethod": "package-manager",
    "dependsOn": "python",
    "commands": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "torch"
        ]
      },
      "macos": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "torch"
        ]
      },
      "linux": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "torch"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "--upgrade",
          "torch"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "python",
        "args": [
          "-c",
          "import torch; print(torch.__version__)"
        ]
      },
      "macos": {
        "command": "python3",
        "args": [
          "-c",
          "import torch; print(torch.__version__)"
        ]
      },
      "linux": {
        "command": "python3",
        "args": [
          "-c",
          "import torch; print(torch.__version__)"
        ]
      }
    },
    "cmdVerify": {
      "windows": "python -m pip show pytorch",
      "pip": "python -m pip show pytorch"
    },
    "cli": {
      "windows": "python -m pip install torch",
      "macos": "pip3 install torch",
      "linux": "pip3 install torch"
    }
  },
  {
    "name": "TensorFlow",
    "slug": "tensorflow",
    "description": "End-to-end open source platform for machine learning & neural network training.",
    "version": "2.18.0",
    "latestVersion": "2.18.0",
    "category": "ai",
    "domain": "integration",
    "era": "classic",
    "type": "ML Framework",
    "ecosystem": "python",
    "author": "Google Brain",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "Apache-2.0",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Cpu",
    "iconBg": "#FF6F00",
    "installMethod": "package-manager",
    "dependsOn": "python",
    "commands": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "tensorflow"
        ]
      },
      "macos": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "tensorflow"
        ]
      },
      "linux": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "tensorflow"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "--upgrade",
          "tensorflow"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "python",
        "args": [
          "-c",
          "import tensorflow; print(tensorflow.__version__)"
        ]
      },
      "macos": {
        "command": "python3",
        "args": [
          "-c",
          "import tensorflow; print(tensorflow.__version__)"
        ]
      },
      "linux": {
        "command": "python3",
        "args": [
          "-c",
          "import tensorflow; print(tensorflow.__version__)"
        ]
      }
    },
    "cmdVerify": {
      "windows": "python -m pip show tensorflow",
      "pip": "python -m pip show tensorflow"
    },
    "cli": {
      "windows": "python -m pip install tensorflow",
      "macos": "pip3 install tensorflow",
      "linux": "pip3 install tensorflow"
    }
  },
  {
    "name": "vLLM",
    "slug": "vllm",
    "description": "High-throughput, memory-efficient LLM serving engine with PagedAttention.",
    "version": "0.7.3",
    "latestVersion": "0.7.3",
    "category": "ai",
    "domain": "backend",
    "era": "new",
    "type": "LLM Inference Engine",
    "ecosystem": "python",
    "author": "vLLM Team / UC Berkeley",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "Apache-2.0",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Zap",
    "iconBg": "#7C3AED",
    "installMethod": "package-manager",
    "dependsOn": "python",
    "commands": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "vllm"
        ]
      },
      "macos": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "vllm"
        ]
      },
      "linux": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "vllm"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "--upgrade",
          "vllm"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "python",
        "args": [
          "-c",
          "import vllm; print(vllm.__version__)"
        ]
      },
      "macos": {
        "command": "python3",
        "args": [
          "-c",
          "import vllm; print(vllm.__version__)"
        ]
      },
      "linux": {
        "command": "python3",
        "args": [
          "-c",
          "import vllm; print(vllm.__version__)"
        ]
      }
    },
    "cmdVerify": {
      "windows": "python -m pip show vllm",
      "pip": "python -m pip show vllm"
    },
    "cli": {
      "windows": "python -m pip install vllm",
      "macos": "pip3 install vllm",
      "linux": "pip3 install vllm"
    }
  },
  {
    "name": "ChromaDB",
    "slug": "chromadb",
    "description": "AI-native open-source embedding database for retrieval-augmented generation (RAG).",
    "version": "1.5.9",
    "latestVersion": "1.5.9",
    "category": "ai",
    "domain": "backend",
    "era": "new",
    "type": "Vector Database",
    "ecosystem": "python",
    "author": "Chroma Inc.",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "Apache-2.0",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Boxes",
    "iconBg": "#F59E0B",
    "installMethod": "package-manager",
    "dependsOn": "python",
    "commands": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "chromadb"
        ]
      },
      "macos": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "chromadb"
        ]
      },
      "linux": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "chromadb"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "--upgrade",
          "chromadb"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "python",
        "args": [
          "-c",
          "import chromadb; print(chromadb.__version__)"
        ]
      },
      "macos": {
        "command": "python3",
        "args": [
          "-c",
          "import chromadb; print(chromadb.__version__)"
        ]
      },
      "linux": {
        "command": "python3",
        "args": [
          "-c",
          "import chromadb; print(chromadb.__version__)"
        ]
      }
    },
    "cmdVerify": {
      "windows": "python -m pip show chromadb",
      "pip": "python -m pip show chromadb",
      "cli": "chromadb -V"
    },
    "cli": {
      "windows": "chromadb run",
      "macos": "chromadb run",
      "linux": "chromadb run"
    }
  },
  {
    "name": "Qdrant",
    "slug": "qdrant",
    "description": "Production-ready vector similarity search engine and vector database written in Rust.",
    "version": "1.13.2",
    "latestVersion": "1.13.2",
    "category": "ai",
    "domain": "backend",
    "era": "new",
    "type": "Vector Database",
    "ecosystem": "python",
    "author": "Qdrant Solutions",
    "verified": true,
    "pricing": "freemium",
    "pricingTier": "Freemium",
    "license": "Apache-2.0",
    "costDescription": "Free self-hosted engine; Optional paid managed cloud",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Boxes",
    "iconBg": "#DC2626",
    "installMethod": "package-manager",
    "dependsOn": "python",
    "commands": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "qdrant-client"
        ]
      },
      "macos": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "qdrant-client"
        ]
      },
      "linux": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "qdrant-client"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "--upgrade",
          "qdrant-client"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "python",
        "args": [
          "-c",
          "import qdrant_client; print(qdrant_client.__version__)"
        ]
      },
      "macos": {
        "command": "python3",
        "args": [
          "-c",
          "import qdrant_client; print(qdrant_client.__version__)"
        ]
      },
      "linux": {
        "command": "python3",
        "args": [
          "-c",
          "import qdrant_client; print(qdrant_client.__version__)"
        ]
      }
    },
    "cmdVerify": {
      "windows": "python -m pip show qdrant",
      "pip": "python -m pip show qdrant"
    },
    "cli": {
      "windows": "python -m pip install qdrant-client",
      "macos": "pip3 install qdrant-client",
      "linux": "pip3 install qdrant-client"
    }
  },
  {
    "name": "LangChain",
    "slug": "langchain",
    "description": "Framework for developing context-aware reasoning applications powered by LLMs.",
    "version": "1.3.2",
    "latestVersion": "1.3.2",
    "category": "ai",
    "domain": "integration",
    "era": "current",
    "type": "LLM Orchestration",
    "ecosystem": "python",
    "author": "Harrison Chase / LangChain AI",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "MIT",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Layers",
    "iconBg": "#2563EB",
    "installMethod": "package-manager",
    "dependsOn": "python",
    "commands": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "langchain"
        ]
      },
      "macos": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "langchain"
        ]
      },
      "linux": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "langchain"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "--upgrade",
          "langchain"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "python",
        "args": [
          "-c",
          "import langchain; print(langchain.__version__)"
        ]
      },
      "macos": {
        "command": "python3",
        "args": [
          "-c",
          "import langchain; print(langchain.__version__)"
        ]
      },
      "linux": {
        "command": "python3",
        "args": [
          "-c",
          "import langchain; print(langchain.__version__)"
        ]
      }
    },
    "cmdVerify": {
      "windows": "python -m pip show langchain",
      "pip": "python -m pip show langchain"
    },
    "cli": {
      "windows": "python -m pip install langchain",
      "macos": "pip3 install langchain",
      "linux": "pip3 install langchain"
    }
  },
  {
    "name": "LlamaIndex",
    "slug": "llamaindex",
    "description": "Data framework for LLM applications to ingest, structure, and query private data.",
    "version": "0.14.24",
    "latestVersion": "0.14.24",
    "category": "ai",
    "domain": "integration",
    "era": "new",
    "type": "Data Orchestration",
    "ecosystem": "python",
    "author": "Jerry Liu / LlamaIndex",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "MIT",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Layers",
    "iconBg": "#059669",
    "installMethod": "package-manager",
    "dependsOn": "python",
    "commands": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "llama-index"
        ]
      },
      "macos": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "llama-index"
        ]
      },
      "linux": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "llama-index"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "--upgrade",
          "llama-index"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "python",
        "args": [
          "-c",
          "import llama_index.core; print(llama_index.core.__version__)"
        ]
      },
      "macos": {
        "command": "python3",
        "args": [
          "-c",
          "import llama_index.core; print(llama_index.core.__version__)"
        ]
      },
      "linux": {
        "command": "python3",
        "args": [
          "-c",
          "import llama_index.core; print(llama_index.core.__version__)"
        ]
      }
    },
    "cmdVerify": {
      "windows": "python -m pip show llamaindex",
      "pip": "python -m pip show llamaindex"
    },
    "cli": {
      "windows": "python -m pip install llama-index",
      "macos": "pip3 install llama-index",
      "linux": "pip3 install llama-index"
    }
  },
  {
    "name": "Hugging Face CLI",
    "slug": "huggingface-hub",
    "description": "Interact with Hugging Face Hub to download models, datasets, and push repositories.",
    "version": "0.36.2",
    "latestVersion": "0.36.2",
    "category": "ai",
    "domain": "integration",
    "era": "current",
    "type": "Model Hub CLI",
    "ecosystem": "system",
    "author": "Hugging Face Inc.",
    "verified": true,
    "pricing": "freemium",
    "pricingTier": "Freemium",
    "license": "Apache-2.0",
    "costDescription": "Free community models; paid enterprise endpoints",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Terminal",
    "iconBg": "#FFD21E",
    "installMethod": "package-manager",
    "dependsOn": "python",
    "commands": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "--upgrade",
          "huggingface_hub[cli]"
        ]
      },
      "macos": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "huggingface-hub"
        ]
      },
      "linux": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "huggingface-hub"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "--upgrade",
          "huggingface_hub[cli]"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "huggingface-cli",
        "args": [
          "--version"
        ]
      },
      "macos": {
        "command": "huggingface-cli",
        "args": [
          "--version"
        ]
      },
      "linux": {
        "command": "huggingface-cli",
        "args": [
          "--version"
        ]
      }
    },
    "cmdVerify": {
      "windows": "huggingface-cli --version",
      "cli": "huggingface-cli --version"
    },
    "cli": {
      "windows": "huggingface-cli login",
      "macos": "huggingface-cli login",
      "linux": "huggingface-cli login"
    }
  },
  {
    "name": "OpenAI SDK",
    "slug": "openai",
    "description": "Official client library for GPT-4o, o1 reasoning models, and embeddings.",
    "version": "2.26.0",
    "latestVersion": "2.26.0",
    "category": "ai",
    "domain": "integration",
    "era": "current",
    "type": "Cloud AI SDK",
    "ecosystem": "python",
    "author": "OpenAI",
    "verified": true,
    "pricing": "paid",
    "pricingTier": "Commercial API",
    "license": "Apache-2.0",
    "costDescription": "Pay-per-token API; free initial credits on signup",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Sparkles",
    "iconBg": "#10A37F",
    "installMethod": "package-manager",
    "dependsOn": "python",
    "commands": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "openai"
        ]
      },
      "macos": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "openai"
        ]
      },
      "linux": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "openai"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "--upgrade",
          "openai"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "python",
        "args": [
          "-c",
          "import openai; print(openai.__version__)"
        ]
      },
      "macos": {
        "command": "python3",
        "args": [
          "-c",
          "import openai; print(openai.__version__)"
        ]
      },
      "linux": {
        "command": "python3",
        "args": [
          "-c",
          "import openai; print(openai.__version__)"
        ]
      }
    },
    "cmdVerify": {
      "windows": "python -m pip show openai",
      "pip": "python -m pip show openai"
    },
    "cli": {
      "windows": "python -m pip install openai",
      "macos": "pip3 install openai",
      "linux": "pip3 install openai"
    }
  },
  {
    "name": "Anthropic SDK",
    "slug": "anthropic",
    "description": "Official Python library for Claude 3.5 and 3.7 reasoning models.",
    "version": "0.45.2",
    "latestVersion": "0.45.2",
    "category": "ai",
    "domain": "integration",
    "era": "new",
    "type": "Cloud AI SDK",
    "ecosystem": "python",
    "author": "Anthropic",
    "verified": true,
    "pricing": "paid",
    "pricingTier": "Commercial API",
    "license": "MIT",
    "costDescription": "Pay-per-token API with free trial credits",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Sparkles",
    "iconBg": "#D97706",
    "installMethod": "package-manager",
    "dependsOn": "python",
    "commands": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "anthropic"
        ]
      },
      "macos": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "anthropic"
        ]
      },
      "linux": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "anthropic"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "--upgrade",
          "anthropic"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "python",
        "args": [
          "-c",
          "import anthropic; print(anthropic.__version__)"
        ]
      },
      "macos": {
        "command": "python3",
        "args": [
          "-c",
          "import anthropic; print(anthropic.__version__)"
        ]
      },
      "linux": {
        "command": "python3",
        "args": [
          "-c",
          "import anthropic; print(anthropic.__version__)"
        ]
      }
    },
    "cmdVerify": {
      "windows": "python -m pip show anthropic",
      "pip": "python -m pip show anthropic"
    },
    "cli": {
      "windows": "python -m pip install anthropic",
      "macos": "pip3 install anthropic",
      "linux": "pip3 install anthropic"
    }
  },
  {
    "name": "React",
    "slug": "react",
    "description": "Component-based UI library with hooks and concurrent rendering.",
    "version": "19.0.0",
    "latestVersion": "19.0.0",
    "category": "frontend",
    "domain": "frontend",
    "era": "current",
    "type": "UI Library",
    "ecosystem": "javascript",
    "npmPackage": "react",
    "author": "Meta Open Source",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "MIT",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Atom",
    "iconBg": "#61DAFB",
    "installMethod": "package-manager",
    "dependsOn": "nodejs",
    "commands": {
      "windows": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "--force",
          "react@latest"
        ]
      },
      "macos": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "react@latest"
        ]
      },
      "linux": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "react@latest"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "--force",
          "react@latest"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "npm",
        "args": [
          "list",
          "-g",
          "--depth=0",
          "react",
          "--json"
        ]
      },
      "macos": {
        "command": "npm",
        "args": [
          "list",
          "-g",
          "--depth=0",
          "react",
          "--json"
        ]
      },
      "linux": {
        "command": "npm",
        "args": [
          "list",
          "-g",
          "--depth=0",
          "react",
          "--json"
        ]
      }
    },
    "cmdVerify": {
      "windows": "npm list -g react"
    },
    "cli": {
      "windows": "npm list -g react",
      "macos": "npm list -g react",
      "linux": "npm list -g react"
    }
  },
  {
    "name": "Next.js",
    "slug": "nextjs",
    "description": "React framework for production full-stack web applications with server components.",
    "version": "15.1.0",
    "latestVersion": "15.1.0",
    "category": "framework",
    "domain": "frontend",
    "era": "current",
    "type": "Full-Stack Framework",
    "ecosystem": "javascript",
    "npmPackage": "next",
    "author": "Vercel",
    "verified": true,
    "pricing": "freemium",
    "pricingTier": "Freemium",
    "license": "MIT",
    "costDescription": "Free open-source framework; Optional paid Vercel hosting",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Globe",
    "iconBg": "#111111",
    "installMethod": "package-manager",
    "dependsOn": "nodejs",
    "commands": {
      "windows": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "--force",
          "next@latest"
        ]
      },
      "macos": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "next@latest"
        ]
      },
      "linux": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "next@latest"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "--force",
          "create-next-app@latest"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "npm",
        "args": [
          "list",
          "-g",
          "--depth=0",
          "next",
          "--json"
        ]
      },
      "macos": {
        "command": "npm",
        "args": [
          "list",
          "-g",
          "--depth=0",
          "next",
          "--json"
        ]
      },
      "linux": {
        "command": "npm",
        "args": [
          "list",
          "-g",
          "--depth=0",
          "next",
          "--json"
        ]
      }
    },
    "cmdVerify": {
      "windows": "npm list -g next"
    },
    "cli": {
      "windows": "npm list -g next",
      "macos": "npm list -g next",
      "linux": "npm list -g next"
    }
  },
  {
    "name": "Vue.js",
    "slug": "vue",
    "description": "The progressive, approachable and versatile JavaScript framework for single-file UI components.",
    "version": "3.5.13",
    "latestVersion": "3.5.13",
    "category": "frontend",
    "domain": "frontend",
    "era": "current",
    "type": "Frontend Framework",
    "ecosystem": "javascript",
    "npmPackage": "vue",
    "author": "Evan You",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "MIT",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Code",
    "iconBg": "#42B883",
    "installMethod": "package-manager",
    "dependsOn": "nodejs",
    "commands": {
      "windows": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "--force",
          "vue@latest"
        ]
      },
      "macos": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "vue@latest"
        ]
      },
      "linux": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "vue@latest"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "--force",
          "@vue/cli@latest"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "npm",
        "args": [
          "list",
          "-g",
          "--depth=0",
          "vue",
          "--json"
        ]
      },
      "macos": {
        "command": "npm",
        "args": [
          "list",
          "-g",
          "--depth=0",
          "vue",
          "--json"
        ]
      },
      "linux": {
        "command": "npm",
        "args": [
          "list",
          "-g",
          "--depth=0",
          "vue",
          "--json"
        ]
      }
    },
    "cmdVerify": {
      "windows": "npm list -g vue"
    },
    "cli": {
      "windows": "npm list -g vue",
      "macos": "npm list -g vue",
      "linux": "npm list -g vue"
    }
  },
  {
    "name": "Svelte",
    "slug": "svelte",
    "description": "Cybernetically enhanced web apps with zero-runtime compiler.",
    "version": "5.25.0",
    "latestVersion": "5.25.0",
    "category": "frontend",
    "domain": "frontend",
    "era": "new",
    "type": "UI Compiler",
    "ecosystem": "javascript",
    "npmPackage": "svelte",
    "author": "Rich Harris / Vercel",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "MIT",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Zap",
    "iconBg": "#FF3E00",
    "installMethod": "package-manager",
    "dependsOn": "nodejs",
    "commands": {
      "windows": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "--force",
          "svelte@latest"
        ]
      },
      "macos": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "svelte@latest"
        ]
      },
      "linux": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "svelte@latest"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "--force",
          "sv@latest"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "npm",
        "args": [
          "list",
          "-g",
          "--depth=0",
          "svelte",
          "--json"
        ]
      },
      "macos": {
        "command": "npm",
        "args": [
          "list",
          "-g",
          "--depth=0",
          "svelte",
          "--json"
        ]
      },
      "linux": {
        "command": "npm",
        "args": [
          "list",
          "-g",
          "--depth=0",
          "svelte",
          "--json"
        ]
      }
    },
    "cmdVerify": {
      "windows": "npm list -g svelte"
    },
    "cli": {
      "windows": "npm list -g svelte",
      "macos": "npm list -g svelte",
      "linux": "npm list -g svelte"
    }
  },
  {
    "name": "Tailwind CSS",
    "slug": "tailwindcss",
    "description": "Utility-first CSS framework for rapidly building responsive web interfaces.",
    "version": "4.0.9",
    "latestVersion": "4.0.9",
    "category": "frontend",
    "domain": "frontend",
    "era": "current",
    "type": "CSS Framework",
    "ecosystem": "system",
    "npmPackage": "tailwindcss",
    "author": "Tailwind Labs",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "MIT",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Code",
    "iconBg": "#38BDF8",
    "installMethod": "package-manager",
    "dependsOn": "nodejs",
    "commands": {
      "windows": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "--force",
          "@tailwindcss/cli@latest"
        ]
      },
      "macos": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "@tailwindcss/cli@latest"
        ]
      },
      "linux": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "@tailwindcss/cli@latest"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "--force",
          "tailwindcss@latest"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "tailwindcss",
        "args": [
          "--help"
        ]
      },
      "macos": {
        "command": "tailwindcss",
        "args": [
          "--help"
        ]
      },
      "linux": {
        "command": "tailwindcss",
        "args": [
          "--help"
        ]
      }
    },
    "cmdVerify": {
      "windows": "tailwindcss --help"
    },
    "cli": {
      "windows": "tailwindcss -i input.css -o output.css"
    }
  },
  {
    "name": "Vite",
    "slug": "vite",
    "description": "Next-generation frontend tooling with instant server start and lightning fast HMR.",
    "version": "6.2.0",
    "latestVersion": "6.2.0",
    "category": "frontend",
    "domain": "frontend",
    "era": "new",
    "type": "Build Tool / Dev Server",
    "ecosystem": "javascript",
    "npmPackage": "vite",
    "author": "Evan You & Vite Contributors",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "MIT",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Zap",
    "iconBg": "#646CFF",
    "installMethod": "package-manager",
    "dependsOn": "nodejs",
    "commands": {
      "windows": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "--force",
          "vite"
        ]
      },
      "macos": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "vite"
        ]
      },
      "linux": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "vite"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "--force",
          "vite@latest"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "npm",
        "args": [
          "list",
          "-g",
          "--depth=0",
          "vite",
          "--json"
        ]
      },
      "macos": {
        "command": "npm",
        "args": [
          "list",
          "-g",
          "--depth=0",
          "vite",
          "--json"
        ]
      },
      "linux": {
        "command": "npm",
        "args": [
          "list",
          "-g",
          "--depth=0",
          "vite",
          "--json"
        ]
      }
    },
    "cmdVerify": {
      "windows": "npm list -g vite"
    },
    "cli": {
      "windows": "npm create vite@latest",
      "macos": "npm create vite@latest",
      "linux": "npm create vite@latest"
    }
  },
  {
    "name": "jQuery",
    "slug": "jquery",
    "description": "Fast, small, and feature-rich JavaScript library for DOM manipulation and events.",
    "version": "3.7.1",
    "latestVersion": "3.7.1",
    "category": "frontend",
    "domain": "frontend",
    "era": "classic",
    "type": "DOM Library",
    "ecosystem": "javascript",
    "npmPackage": "jquery",
    "author": "OpenJS Foundation",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "MIT",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Code",
    "iconBg": "#0769AD",
    "installMethod": "package-manager",
    "dependsOn": "nodejs",
    "commands": {
      "windows": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "--force",
          "jquery"
        ]
      },
      "macos": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "jquery"
        ]
      },
      "linux": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "jquery"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "--force",
          "jquery@latest"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "npm",
        "args": [
          "list",
          "-g",
          "--depth=0",
          "jquery",
          "--json"
        ]
      },
      "macos": {
        "command": "npm",
        "args": [
          "list",
          "-g",
          "--depth=0",
          "jquery",
          "--json"
        ]
      },
      "linux": {
        "command": "npm",
        "args": [
          "list",
          "-g",
          "--depth=0",
          "jquery",
          "--json"
        ]
      }
    },
    "cmdVerify": {
      "windows": "npm list -g jquery"
    },
    "cli": {
      "windows": "npm install jquery",
      "macos": "npm install jquery",
      "linux": "npm install jquery"
    }
  },
  {
    "name": "Node.js",
    "slug": "nodejs",
    "description": "JavaScript runtime built on Chrome V8 JavaScript engine for backend server development.",
    "version": "24.19.0",
    "latestVersion": "24.19.0",
    "category": "backend",
    "domain": "backend",
    "era": "classic",
    "type": "JavaScript Runtime",
    "ecosystem": "system",
    "author": "OpenJS Foundation",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "MIT",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Server",
    "iconBg": "#339933",
    "installMethod": "package-manager",
    "commands": {
      "windows": {
        "command": "winget",
        "args": [
          "install",
          "--id",
          "OpenJS.NodeJS",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      },
      "macos": {
        "command": "brew",
        "args": [
          "install",
          "node"
        ]
      },
      "linux": {
        "command": "apt-get",
        "args": [
          "install",
          "-y",
          "nodejs"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "winget",
        "args": [
          "upgrade",
          "--id",
          "OpenJS.NodeJS",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "node",
        "args": [
          "--version"
        ]
      },
      "macos": {
        "command": "node",
        "args": [
          "--version"
        ]
      },
      "linux": {
        "command": "node",
        "args": [
          "--version"
        ]
      }
    },
    "cmdVerify": {
      "windows": "node --version",
      "cli": "node -e \"console.log(process.version)\""
    },
    "cli": {
      "windows": "node -v",
      "macos": "node -v",
      "linux": "node -v"
    }
  },
  {
    "name": "Bun",
    "slug": "bun",
    "description": "Fast all-in-one JavaScript runtime, bundler, test runner, and package manager.",
    "version": "1.2.4",
    "latestVersion": "1.2.4",
    "category": "backend",
    "domain": "backend",
    "era": "new",
    "type": "JS Runtime & Toolkit",
    "ecosystem": "system",
    "author": "Oven",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "MIT",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Zap",
    "iconBg": "#FBF0DF",
    "installMethod": "package-manager",
    "commands": {
      "windows": {
        "command": "powershell",
        "args": [
          "-NoProfile",
          "-ExecutionPolicy",
          "Bypass",
          "-Command",
          "irm bun.sh/install.ps1 | iex"
        ]
      },
      "macos": {
        "command": "curl",
        "args": [
          "-fsSL",
          "https://bun.sh/install",
          "|",
          "bash"
        ]
      },
      "linux": {
        "command": "curl",
        "args": [
          "-fsSL",
          "https://bun.sh/install",
          "|",
          "bash"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "bun",
        "args": [
          "upgrade"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "bun",
        "args": [
          "--version"
        ]
      },
      "macos": {
        "command": "bun",
        "args": [
          "--version"
        ]
      },
      "linux": {
        "command": "bun",
        "args": [
          "--version"
        ]
      }
    },
    "cmdVerify": {
      "windows": "bun --version",
      "cli": "bun init"
    },
    "cli": {
      "windows": "bun init",
      "macos": "bun init",
      "linux": "bun init"
    }
  },
  {
    "name": "Deno",
    "slug": "deno",
    "description": "Next-generation JavaScript and TypeScript runtime with secure defaults and zero config.",
    "version": "2.2.2",
    "latestVersion": "2.2.2",
    "category": "backend",
    "domain": "backend",
    "era": "new",
    "type": "Secure TS/JS Runtime",
    "ecosystem": "system",
    "author": "Deno Land Inc.",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "MIT",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Terminal",
    "iconBg": "#000000",
    "installMethod": "package-manager",
    "commands": {
      "windows": {
        "command": "powershell",
        "args": [
          "-NoProfile",
          "-ExecutionPolicy",
          "Bypass",
          "-Command",
          "irm https://deno.land/install.ps1 | iex"
        ]
      },
      "macos": {
        "command": "brew",
        "args": [
          "install",
          "deno"
        ]
      },
      "linux": {
        "command": "curl",
        "args": [
          "-fsSL",
          "https://deno.land/install.sh",
          "|",
          "sh"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "deno",
        "args": [
          "upgrade"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "deno",
        "args": [
          "--version"
        ]
      },
      "macos": {
        "command": "deno",
        "args": [
          "--version"
        ]
      },
      "linux": {
        "command": "deno",
        "args": [
          "--version"
        ]
      }
    },
    "cmdVerify": {
      "windows": "deno --version",
      "cli": "deno run"
    },
    "cli": {
      "windows": "deno run",
      "macos": "deno run",
      "linux": "deno run"
    }
  },
  {
    "name": "Python",
    "slug": "python",
    "description": "High-level programming language with dynamic semantics for AI, web, and automation.",
    "version": "3.12.6",
    "latestVersion": "3.12.6",
    "category": "backend",
    "domain": "backend",
    "era": "classic",
    "type": "Programming Language",
    "ecosystem": "system",
    "author": "Python Software Foundation",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "PSF-2.0",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Terminal",
    "iconBg": "#3776AB",
    "installMethod": "package-manager",
    "commands": {
      "windows": {
        "command": "winget",
        "args": [
          "install",
          "--id",
          "Python.Python.3.12",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      },
      "macos": {
        "command": "brew",
        "args": [
          "install",
          "python@3.12"
        ]
      },
      "linux": {
        "command": "apt-get",
        "args": [
          "install",
          "-y",
          "python3"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "winget",
        "args": [
          "upgrade",
          "--id",
          "Python.Python.3.12",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "python",
        "args": [
          "--version"
        ]
      },
      "macos": {
        "command": "python3",
        "args": [
          "--version"
        ]
      },
      "linux": {
        "command": "python3",
        "args": [
          "--version"
        ]
      }
    },
    "cmdVerify": {
      "windows": "python --version",
      "cli": "python -c \"print(1+1)\""
    },
    "cli": {
      "windows": "python -V",
      "macos": "python3 -V",
      "linux": "python3 -V"
    }
  },
  {
    "name": "FastAPI",
    "slug": "fastapi",
    "description": "Modern, fast web framework for building APIs with Python based on standard type hints.",
    "version": "0.141.1",
    "latestVersion": "0.141.1",
    "category": "backend",
    "domain": "backend",
    "era": "current",
    "type": "Python Web Framework",
    "ecosystem": "python",
    "author": "Sebastián Ramírez (tiangolo)",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "MIT",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Zap",
    "iconBg": "#009688",
    "installMethod": "package-manager",
    "dependsOn": "python",
    "commands": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "fastapi[standard]"
        ]
      },
      "macos": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "fastapi[standard]"
        ]
      },
      "linux": {
        "command": "pip3",
        "args": [
          "install",
          "--user",
          "fastapi[standard]"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "python",
        "args": [
          "-m",
          "pip",
          "install",
          "--user",
          "--upgrade",
          "fastapi[standard]"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "python",
        "args": [
          "-c",
          "import fastapi; print(fastapi.__version__)"
        ]
      },
      "macos": {
        "command": "python3",
        "args": [
          "-c",
          "import fastapi; print(fastapi.__version__)"
        ]
      },
      "linux": {
        "command": "python3",
        "args": [
          "-c",
          "import fastapi; print(fastapi.__version__)"
        ]
      }
    },
    "cmdVerify": {
      "windows": "python -m pip show fastapi",
      "pip": "python -m pip show fastapi",
      "cli": "fastapi --version"
    },
    "cli": {
      "windows": "fastapi dev",
      "macos": "fastapi dev",
      "linux": "fastapi dev"
    }
  },
  {
    "name": "Express",
    "slug": "express",
    "description": "Fast, unopinionated, minimalist web framework for Node.js backends and REST APIs.",
    "version": "4.21.2",
    "latestVersion": "4.21.2",
    "category": "backend",
    "domain": "backend",
    "era": "classic",
    "type": "Node.js Web Framework",
    "ecosystem": "javascript",
    "npmPackage": "express",
    "author": "Express Contributors",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "MIT",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Server",
    "iconBg": "#000000",
    "installMethod": "package-manager",
    "dependsOn": "nodejs",
    "commands": {
      "windows": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "--force",
          "express@latest"
        ]
      },
      "macos": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "express@latest"
        ]
      },
      "linux": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "express@latest"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "--force",
          "express-generator@latest"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "npm",
        "args": [
          "list",
          "-g",
          "--depth=0",
          "express",
          "--json"
        ]
      },
      "macos": {
        "command": "npm",
        "args": [
          "list",
          "-g",
          "--depth=0",
          "express",
          "--json"
        ]
      },
      "linux": {
        "command": "npm",
        "args": [
          "list",
          "-g",
          "--depth=0",
          "express",
          "--json"
        ]
      }
    },
    "cmdVerify": {
      "windows": "npm list -g express"
    },
    "cli": {
      "windows": "npm list -g express",
      "macos": "npm list -g express",
      "linux": "npm list -g express"
    }
  },
  {
    "name": "Go (Golang)",
    "slug": "golang",
    "description": "Open-source programming language supported by Google for building scalable software.",
    "version": "1.24.0",
    "latestVersion": "1.24.0",
    "category": "backend",
    "domain": "backend",
    "era": "current",
    "type": "Compiled Language",
    "ecosystem": "system",
    "author": "Google",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "BSD-3-Clause",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Terminal",
    "iconBg": "#00ADD8",
    "installMethod": "package-manager",
    "commands": {
      "windows": {
        "command": "winget",
        "args": [
          "install",
          "--id",
          "GoLang.Go",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      },
      "macos": {
        "command": "brew",
        "args": [
          "install",
          "go"
        ]
      },
      "linux": {
        "command": "apt-get",
        "args": [
          "install",
          "-y",
          "golang"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "winget",
        "args": [
          "upgrade",
          "--id",
          "GoLang.Go",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "go",
        "args": [
          "version"
        ]
      },
      "macos": {
        "command": "go",
        "args": [
          "version"
        ]
      },
      "linux": {
        "command": "go",
        "args": [
          "version"
        ]
      }
    },
    "cmdVerify": {
      "windows": "go version",
      "cli": "go env"
    },
    "cli": {
      "windows": "go version",
      "macos": "go version",
      "linux": "go version"
    }
  },
  {
    "name": "Rust & Cargo",
    "slug": "rust",
    "description": "Systems programming language empowering everyone to build reliable and efficient software.",
    "version": "1.85.0",
    "latestVersion": "1.85.0",
    "category": "backend",
    "domain": "backend",
    "era": "current",
    "type": "Systems Language",
    "ecosystem": "system",
    "author": "Rust Foundation",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "MIT or Apache-2.0",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Cpu",
    "iconBg": "#000000",
    "installMethod": "package-manager",
    "commands": {
      "windows": {
        "command": "winget",
        "args": [
          "install",
          "--id",
          "Rustlang.Rustup",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      },
      "macos": {
        "command": "curl",
        "args": [
          "--proto",
          "=https",
          "--tlsv1.2",
          "-sSf",
          "https://sh.rustup.rs",
          "|",
          "sh",
          "-s",
          "--",
          "-y"
        ]
      },
      "linux": {
        "command": "curl",
        "args": [
          "--proto",
          "=https",
          "--tlsv1.2",
          "-sSf",
          "https://sh.rustup.rs",
          "|",
          "sh",
          "-s",
          "--",
          "-y"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "rustup",
        "args": [
          "update"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "rustc",
        "args": [
          "--version"
        ]
      },
      "macos": {
        "command": "rustc",
        "args": [
          "--version"
        ]
      },
      "linux": {
        "command": "rustc",
        "args": [
          "--version"
        ]
      }
    },
    "cmdVerify": {
      "windows": "rustc --version",
      "cli": "cargo new hello"
    },
    "cli": {
      "windows": "cargo --version",
      "macos": "cargo --version",
      "linux": "cargo --version"
    }
  },
  {
    "name": "npm",
    "slug": "npm",
    "description": "The default package manager for the Node.js JavaScript runtime environment.",
    "version": "12.0.2",
    "latestVersion": "12.0.2",
    "category": "backend",
    "domain": "integration",
    "era": "classic",
    "type": "Package Manager",
    "ecosystem": "system",
    "author": "npm Inc. / GitHub",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "Artistic-2.0",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Boxes",
    "iconBg": "#CB3837",
    "installMethod": "package-manager",
    "dependsOn": "nodejs",
    "commands": {
      "windows": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "--force",
          "npm@latest"
        ]
      },
      "macos": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "npm@latest"
        ]
      },
      "linux": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "npm@latest"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "npm",
        "args": [
          "install",
          "-g",
          "--force",
          "npm@latest"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "npm",
        "args": [
          "--version"
        ]
      },
      "macos": {
        "command": "npm",
        "args": [
          "--version"
        ]
      },
      "linux": {
        "command": "npm",
        "args": [
          "--version"
        ]
      }
    },
    "cmdVerify": {
      "windows": "npm --version",
      "cli": "npm list -g --depth=0"
    },
    "cli": {
      "windows": "npm -v",
      "macos": "npm -v",
      "linux": "npm -v"
    }
  },
  {
    "name": "PHP",
    "slug": "php",
    "description": "Popular general-purpose scripting language that is especially suited to web development.",
    "version": "8.4.4",
    "latestVersion": "8.4.4",
    "category": "backend",
    "domain": "backend",
    "era": "classic",
    "type": "Server Language",
    "ecosystem": "system",
    "author": "The PHP Group",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "PHP-3.01",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Server",
    "iconBg": "#777BB4",
    "installMethod": "package-manager",
    "commands": {
      "windows": {
        "command": "winget",
        "args": [
          "install",
          "--id",
          "PHP.PHP.8.4",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      },
      "macos": {
        "command": "brew",
        "args": [
          "install",
          "php"
        ]
      },
      "linux": {
        "command": "apt-get",
        "args": [
          "install",
          "-y",
          "php"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "winget",
        "args": [
          "upgrade",
          "--id",
          "PHP.PHP.8.4",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "php",
        "args": [
          "--version"
        ]
      },
      "macos": {
        "command": "php",
        "args": [
          "--version"
        ]
      },
      "linux": {
        "command": "php",
        "args": [
          "--version"
        ]
      }
    },
    "cmdVerify": {
      "windows": "php --version",
      "cli": "php -v"
    },
    "cli": {
      "windows": "php -v",
      "macos": "php -v",
      "linux": "php -v"
    }
  },
  {
    "name": "PostgreSQL",
    "slug": "postgresql",
    "description": "Powerful, open-source object-relational database system with strong reliability.",
    "version": "17.2",
    "latestVersion": "17.2",
    "category": "database",
    "domain": "backend",
    "era": "classic",
    "type": "Relational Database",
    "ecosystem": "system",
    "author": "PostgreSQL Global Development Group",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "PostgreSQL",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Database",
    "iconBg": "#4169E1",
    "installMethod": "package-manager",
    "commands": {
      "windows": {
        "command": "winget",
        "args": [
          "install",
          "--id",
          "PostgreSQL.PostgreSQL.17",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      },
      "macos": {
        "command": "brew",
        "args": [
          "install",
          "postgresql@17"
        ]
      },
      "linux": {
        "command": "apt-get",
        "args": [
          "install",
          "-y",
          "postgresql"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "winget",
        "args": [
          "upgrade",
          "--id",
          "PostgreSQL.PostgreSQL.17",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "psql",
        "args": [
          "--version"
        ]
      },
      "macos": {
        "command": "psql",
        "args": [
          "--version"
        ]
      },
      "linux": {
        "command": "psql",
        "args": [
          "--version"
        ]
      }
    },
    "cmdVerify": {
      "windows": "psql --version",
      "cli": "psql -U postgres"
    },
    "cli": {
      "windows": "psql -V",
      "macos": "psql -V",
      "linux": "psql -V"
    }
  },
  {
    "name": "MySQL",
    "slug": "mysql",
    "description": "Open-source relational database management system developed and supported by Oracle.",
    "version": "9.2.0",
    "latestVersion": "9.2.0",
    "category": "database",
    "domain": "backend",
    "era": "classic",
    "type": "Relational Database",
    "ecosystem": "system",
    "author": "Oracle Corporation",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "GPL-2.0",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Database",
    "iconBg": "#4479A1",
    "installMethod": "package-manager",
    "commands": {
      "windows": {
        "command": "winget",
        "args": [
          "install",
          "--id",
          "Oracle.MySQL",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      },
      "macos": {
        "command": "brew",
        "args": [
          "install",
          "mysql"
        ]
      },
      "linux": {
        "command": "apt-get",
        "args": [
          "install",
          "-y",
          "mysql-server"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "winget",
        "args": [
          "upgrade",
          "--id",
          "Oracle.MySQL",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "mysql",
        "args": [
          "--version"
        ]
      },
      "macos": {
        "command": "mysql",
        "args": [
          "--version"
        ]
      },
      "linux": {
        "command": "mysql",
        "args": [
          "--version"
        ]
      }
    },
    "cmdVerify": {
      "windows": "mysql --version",
      "cli": "mysql -u root"
    },
    "cli": {
      "windows": "mysql -V",
      "macos": "mysql -V",
      "linux": "mysql -V"
    }
  },
  {
    "name": "SQLite CLI",
    "slug": "sqlite",
    "description": "C-language library that implements a small, fast, self-contained, high-reliability SQL database engine.",
    "version": "3.45.3",
    "latestVersion": "3.45.3",
    "category": "database",
    "domain": "integration",
    "era": "classic",
    "type": "Embedded SQL Engine",
    "ecosystem": "system",
    "author": "D. Richard Hipp",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "Public Domain",
    "costDescription": "100% Free & Open Source (Public Domain)",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Database",
    "iconBg": "#003B57",
    "installMethod": "package-manager",
    "commands": {
      "windows": {
        "command": "winget",
        "args": [
          "install",
          "--id",
          "SQLite.SQLite",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      },
      "macos": {
        "command": "brew",
        "args": [
          "install",
          "sqlite"
        ]
      },
      "linux": {
        "command": "apt-get",
        "args": [
          "install",
          "-y",
          "sqlite3"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "winget",
        "args": [
          "upgrade",
          "--id",
          "SQLite.SQLite",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "sqlite3",
        "args": [
          "--version"
        ]
      },
      "macos": {
        "command": "sqlite3",
        "args": [
          "--version"
        ]
      },
      "linux": {
        "command": "sqlite3",
        "args": [
          "--version"
        ]
      }
    },
    "cmdVerify": {
      "windows": "sqlite3 --version",
      "cli": "sqlite3 mydatabase.db"
    },
    "cli": {
      "windows": "sqlite3 --version",
      "macos": "sqlite3 --version",
      "linux": "sqlite3 --version"
    }
  },
  {
    "name": "MongoDB Server",
    "slug": "mongodb",
    "description": "Source-available, cross-platform, document-oriented database with flexible JSON-like schemas.",
    "version": "8.0.4",
    "latestVersion": "8.0.4",
    "category": "database",
    "domain": "backend",
    "era": "current",
    "type": "Document Database",
    "ecosystem": "system",
    "author": "MongoDB Inc.",
    "verified": true,
    "pricing": "freemium",
    "pricingTier": "Freemium",
    "license": "SSPL",
    "costDescription": "Free community edition; optional managed Atlas cloud",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Database",
    "iconBg": "#47A248",
    "installMethod": "package-manager",
    "commands": {
      "windows": {
        "command": "winget",
        "args": [
          "install",
          "--id",
          "MongoDB.Server",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      },
      "macos": {
        "command": "brew",
        "args": [
          "install",
          "mongodb-community"
        ]
      },
      "linux": {
        "command": "apt-get",
        "args": [
          "install",
          "-y",
          "mongodb-org"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "winget",
        "args": [
          "upgrade",
          "--id",
          "MongoDB.Server",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "mongod",
        "args": [
          "--version"
        ]
      },
      "macos": {
        "command": "mongod",
        "args": [
          "--version"
        ]
      },
      "linux": {
        "command": "mongod",
        "args": [
          "--version"
        ]
      }
    },
    "cmdVerify": {
      "windows": "mongod --version",
      "cli": "mongod --version"
    },
    "cli": {
      "windows": "mongosh",
      "macos": "mongosh",
      "linux": "mongosh"
    }
  },
  {
    "name": "Redis",
    "slug": "redis",
    "description": "In-memory data structure store used as a database, cache, streaming engine, and message broker.",
    "version": "7.4.2",
    "latestVersion": "7.4.2",
    "category": "database",
    "domain": "backend",
    "era": "classic",
    "type": "In-Memory Cache & DB",
    "ecosystem": "system",
    "author": "Redis Ltd.",
    "verified": true,
    "pricing": "freemium",
    "pricingTier": "Freemium",
    "license": "RSALv2 / SSPLv1",
    "costDescription": "Free source-available software; optional cloud plans",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Database",
    "iconBg": "#DC382D",
    "installMethod": "package-manager",
    "commands": {
      "windows": {
        "command": "winget",
        "args": [
          "install",
          "--id",
          "Redis.Redis",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      },
      "macos": {
        "command": "brew",
        "args": [
          "install",
          "redis"
        ]
      },
      "linux": {
        "command": "apt-get",
        "args": [
          "install",
          "-y",
          "redis-server"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "winget",
        "args": [
          "upgrade",
          "--id",
          "Redis.Redis",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "redis-server",
        "args": [
          "--version"
        ]
      },
      "macos": {
        "command": "redis-server",
        "args": [
          "--version"
        ]
      },
      "linux": {
        "command": "redis-server",
        "args": [
          "--version"
        ]
      }
    },
    "cmdVerify": {
      "windows": "redis-cli --version",
      "cli": "redis-cli ping"
    },
    "cli": {
      "windows": "redis-cli ping",
      "macos": "redis-cli ping",
      "linux": "redis-cli ping"
    }
  },
  {
    "name": "Git",
    "slug": "git",
    "description": "Fast, scalable, distributed revision control system with rich branch workflows.",
    "version": "2.55.0",
    "latestVersion": "2.55.0",
    "category": "tools",
    "domain": "integration",
    "era": "classic",
    "type": "Version Control",
    "ecosystem": "system",
    "author": "Linus Torvalds / Software Freedom Conservancy",
    "verified": true,
    "pricing": "free",
    "pricingTier": "Free & Open Source",
    "license": "GPL-2.0",
    "costDescription": "100% Free & Open Source",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Code",
    "iconBg": "#F05032",
    "installMethod": "package-manager",
    "commands": {
      "windows": {
        "command": "winget",
        "args": [
          "install",
          "--id",
          "Git.Git",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      },
      "macos": {
        "command": "brew",
        "args": [
          "install",
          "git"
        ]
      },
      "linux": {
        "command": "apt-get",
        "args": [
          "install",
          "-y",
          "git"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "winget",
        "args": [
          "upgrade",
          "--id",
          "Git.Git",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "git",
        "args": [
          "--version"
        ]
      },
      "macos": {
        "command": "git",
        "args": [
          "--version"
        ]
      },
      "linux": {
        "command": "git",
        "args": [
          "--version"
        ]
      }
    },
    "cmdVerify": {
      "windows": "git --version",
      "cli": "git status"
    },
    "cli": {
      "windows": "git --version",
      "macos": "git --version",
      "linux": "git --version"
    }
  },
  {
    "name": "Docker",
    "slug": "docker",
    "description": "Containerization platform to build, share, and run modern applications anywhere.",
    "version": "28.2.2",
    "latestVersion": "28.2.2",
    "category": "tools",
    "domain": "backend",
    "era": "current",
    "type": "Container Platform",
    "ecosystem": "system",
    "author": "Docker Inc.",
    "verified": true,
    "pricing": "freemium",
    "pricingTier": "Freemium",
    "license": "Apache-2.0 / Commercial",
    "costDescription": "Free for personal/open-source; Paid subscription for large enterprise",
    "platforms": [
      "windows",
      "macos",
      "linux"
    ],
    "iconName": "Server",
    "iconBg": "#2496ED",
    "installMethod": "package-manager",
    "commands": {
      "windows": {
        "command": "winget",
        "args": [
          "install",
          "--id",
          "Docker.DockerDesktop",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      },
      "macos": {
        "command": "brew",
        "args": [
          "install",
          "--cask",
          "docker"
        ]
      },
      "linux": {
        "command": "apt-get",
        "args": [
          "install",
          "-y",
          "docker.io"
        ]
      }
    },
    "updateCommand": {
      "windows": {
        "command": "winget",
        "args": [
          "upgrade",
          "--id",
          "Docker.DockerDesktop",
          "-e",
          "--accept-source-agreements",
          "--accept-package-agreements",
          "--disable-interactivity"
        ]
      }
    },
    "verify": {
      "windows": {
        "command": "docker",
        "args": [
          "--version"
        ]
      },
      "macos": {
        "command": "docker",
        "args": [
          "--version"
        ]
      },
      "linux": {
        "command": "docker",
        "args": [
          "--version"
        ]
      }
    },
    "cmdVerify": {
      "windows": "docker --version",
      "cli": "docker ps"
    },
    "cli": {
      "windows": "docker --version",
      "macos": "docker --version",
      "linux": "docker --version"
    }
  }
];
