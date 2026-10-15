# Specifications and decision docs

Only write a design doc when an important decision needs review or the user requests one. Keep: problem and user outcome; goals/non-goals; significant interfaces/data flow; failure modes; alternatives and why rejected; rollout/acceptance; open risks. Omit unused sections.

Requirements should state what changes, which user-visible behavior is expected, constraints under failures, and what proves completion. Mark unsettled choices explicitly instead of burying guesses as requirements. Treat security, privacy, migrations, state compatibility, and external APIs as first-class when relevant.

PR descriptions should focus on behavior changed, evidence, and remaining risk. Do not narrate implementation mechanically.
