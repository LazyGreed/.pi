# Domain model checks

1. Identity: what makes two instances the same entity? When does identity persist across recreation or restart?
2. States: which states can coexist? What transitions require authorization or external evidence?
3. Ownership: who enforces each invariant and who can mutate its data?
4. Language: do UI strings, APIs, tests, and code names refer to the same thing?
5. Boundaries: which decisions are domain policy versus orchestration or adapter mechanics?
6. Failure: what happens under retries, partial completion, stale input, races, and process death?
7. Compatibility: which persisted values, protocol messages, or user-visible terms must remain stable?

Prefer a handful of representative scenarios over abstract diagrams without falsifiable claims.
