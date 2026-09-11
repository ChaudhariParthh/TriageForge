# TriageForge

SOC Alert Triage & Investigation Automation Pipeline

## Overview

TriageForge is a comprehensive security operations center (SOC) alert triage and investigation automation platform designed to streamline alert management and accelerate incident response. The platform automates the initial assessment, prioritization, and investigation of security alerts, enabling security teams to focus on high-impact threats.

## Key Features

- Automated alert triage and prioritization
- Intelligent alert classification
- Streamlined investigation workflows
- Integration with security detection tools
- Customizable triage rules and detection logic
- Workflow automation with n8n orchestration
- Comprehensive documentation and sample configurations

## Technology Stack

- **Primary Language**: JavaScript (91.7%)
- **Secondary Language**: Python (8.3%)
- **License**: MIT License
- **Workflow Automation**: n8n

## Project Structure

```
TriageForge/
├── architecture/          # System architecture documentation and diagrams
├── codes/                 # Core application code
├── demo/                  # Demonstration materials and sample data
├── detection/             # Detection rules and signatures
├── documentation/         # Project documentation
├── n8n/                   # n8n workflow configurations
├── prompts/               # AI/LLM prompts for investigation
├── screenshots/           # UI and process screenshots
├── scripts/               # Utility and automation scripts
├── TriageForge.json      # Main configuration file
└── LICENSE               # MIT License
```

## Getting Started

### Prerequisites

- Node.js (for JavaScript components)
- Python 3.x (for Python utilities)
- n8n instance (for workflow orchestration)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ChaudhariParthh/TriageForge.git
   cd TriageForge
   ```

2. Review the documentation in the `documentation/` directory

3. Configure the main configuration file `TriageForge.json`

4. Deploy n8n workflows from the `n8n/` directory

## Configuration

The main configuration is managed through `TriageForge.json`. Refer to the documentation for configuration options and customization guidelines.

## Components

### Detection Rules

Alert detection rules and signatures are located in the `detection/` directory. These define how incoming security events are classified and categorized.

### Workflows

n8n workflow definitions are maintained in the `n8n/` directory. These orchestrate the triage and investigation processes across multiple systems.

### Prompts

AI and LLM prompts used for intelligent analysis and investigation recommendations are stored in the `prompts/` directory.

### Scripts

Utility scripts for deployment, data processing, and system maintenance are available in the `scripts/` directory.

## Documentation

Comprehensive documentation is available in the `documentation/` directory, including:

- Architecture overview
- Installation and setup guides
- Configuration reference
- Workflow customization
- Integration guidelines

## Contributing

Contributions are welcome. Please refer to the documentation for contribution guidelines.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or support, please use the GitHub Issues section of this repository.

## Author

ChaudhariParthh

---

For more information about TriageForge, visit the [GitHub repository](https://github.com/ChaudhariParthh/TriageForge).
