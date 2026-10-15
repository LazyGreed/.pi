# Deep modules and change locality

- Interface includes operations, invariants, sequencing, errors, configuration, side effects, and constraints a caller must know.
- Depth is useful behavior hidden behind a small coherent interface, not a lines-of-code ratio.
- Seam is a real point of variation. Introduce a new seam for demonstrated alternate implementations, a volatile dependency, or a meaningful production/test adapter. One stable implementation alone rarely warrants abstraction.
- Locality: one requirement should ideally change in one responsible module plus corresponding tests, rather than scattered checks.
- Deletion test: remove the wrapper mentally. If little complexity returns, the wrapper may add navigation without leverage.
- Verify at the interface that consumers actually use. Overly introspective tests can signal poor seam placement or overspecification.
- Dependency direction should keep domain policy independent of infrastructure mechanisms when doing so eliminates concrete coupling.
