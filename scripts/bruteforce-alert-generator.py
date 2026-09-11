 cat > generate-alerts.py <<'PY'
#!/usr/bin/env python3

import subprocess
import time
import sys

def ssh_brute_force():
    print("[TriageForge] Simulating SSH brute-force activity...")

    for attempt in range(1, 9):
        print(f"[TriageForge] Attempt {attempt}/8")

        subprocess.run(
            [
                "ssh",
                "-o", "BatchMode=yes",
                "-o", "ConnectTimeout=2",
                "-o", "StrictHostKeyChecking=no",
                "-o", "UserKnownHostsFile=/dev/null",
                "-o", "PreferredAuthentications=password",
                "-o", "PubkeyAuthentication=no",
                "nonexistent-user@127.0.0.1"
            ],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )

        time.sleep(0.5)

    print("[TriageForge] SSH brute-force simulation complete.")

if __name__ == "__main__":
    ssh_brute_force()
PY

chmod +x generate-alerts.py