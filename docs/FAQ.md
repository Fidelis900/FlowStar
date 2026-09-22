# Frequently Asked Questions

This document collects the most common questions that new contributors ask when working on FlowStar.  
If you can’t find the answer here, feel free to open an issue or check the
[CONTRIBUTING guide](CONTRIBUTING.md) and the
[Troubleshooting guide](docs/TROUBLESHOOTING.md).

---

## 1. What is the difference between **mock mode** and **live mode**?

| Feature | Mock Mode | Live Mode |
|---------|-----------|-----------|
| **Purpose** | Quick UI testing without real blockchain interactions. | Real interactions with Flow blockchain. |
| **Data** | Uses in‑memory data and deterministic responses. | Reads/writes to the actual Flow testnet or mainnet. |
| **Setup** | No external dependencies. | Requires a Flow wallet, testnet faucet, and network configuration. |
| **When to use** | During UI development or when you don’t want to spend testnet tokens. | When you want to validate real contract calls or submit PRs that touch the blockchain. |

> **Tip:** The `mock-mode` flag is toggled in the app’s settings. See the
> [CONTRIBUTING guide](CONTRIBUTING.md) for details on enabling it.

---

## 2. Which network should I test against?

| Network | Use case | How to switch |
|---------|----------|---------------|
| **Testnet** | Development, CI, and most PRs. | Set `REACT_APP_FLOW_NETWORK=testnet` in your `.env` file. |
| **Mainnet** | Production releases only. | Set `REACT_APP_FLOW_NETWORK=mainnet` and ensure you have a funded wallet. |

> **Note:** The CI pipeline automatically runs tests against the testnet.  
> If you need to run against mainnet locally, make sure you have a valid
> Flow wallet and enough FLOW tokens.

---

## 3. How does issue assignment work?

1. **Labeling** – Issues are labeled with `good first issue`, `help wanted`, etc.  
2. **Self‑assignment** – You can assign yourself to an issue by clicking the
   “Assign yourself” button.  
3. **Review** – Maintainers review the PR and may reassign if necessary.

If you’re unsure whether an issue is ready for you, open a comment or
contact the maintainers. See the
[CONTRIBUTING guide](CONTRIBUTING.md) for more details on the workflow.

---

## 4. I’m getting “Failed to fetch” errors when running the app locally. What should I do?

1. **Check your network** – Ensure you’re connected to the internet.  
2. **Verify environment variables** – Make sure `.env.local` contains the correct
   `REACT_APP_FLOW_NETWORK` and any required API keys.  
3. **Run the mock server** – If you’re in mock mode, start the mock server with
   `npm run mock`.  
4. **Consult the Troubleshooting guide** – Many common network errors are
   documented in the
   [Troubleshooting guide](docs/TROUBLESHOOTING.md).

---

## 5. How do I run the test suite locally?

