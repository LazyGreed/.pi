# Audit and Review Workflow

Evaluate interfaces in descending order of user impact. Structural and interaction problems come before visual polish.

## Audit Sequence

### 1. User Task

- What is the primary task?
- Is it obvious?
- Can it be completed?
- What is the success state?

### 2. Information Architecture

- Is required information available before decisions?
- Are related concepts grouped?
- Is navigation understandable?
- Does the user need to remember information that should remain visible?

### 3. Hierarchy

- Is the most important information visually dominant?
- Are primary and secondary actions clear?
- Is decoration competing with content?

### 4. Interaction

- Are controls understandable?
- Is feedback immediate?
- Are async states handled?
- Can users recover from mistakes?

### 5. State Coverage

Check loading, empty, success, error, disabled, permission-limited, partial, and destructive states.

### 6. Accessibility

Check keyboard, focus, semantics, contrast, target size, zoom/reflow, accessible naming, and reduced motion.

### 7. Responsive Behavior

Check narrow screens, wide screens, touch, pointer, long content, mobile keyboard, and sticky UI.

### 8. Consistency

Check components, typography, spacing, action hierarchy, states, and naming.

### 9. Performance

Check delayed feedback, content shifting, oversized media, unnecessary JavaScript, and excessive animation.

### 10. Trust

Check costs, consequences, privacy, permissions, irreversible changes, and recurring commitments.

### 11. Conversion

Only after the above:

- Is the intended action easy to find?
- Is unnecessary friction present?
- Can the decision be made confidently?
- Can conversion improve without reducing user agency?

## General Audit Rubric

- [ ] **Task Clarity:** The primary purpose and next action are understandable.
- [ ] **Information Architecture:** Information appears in the order needed for decisions.
- [ ] **Visual Hierarchy:** Importance is communicated clearly without excessive decoration.
- [ ] **Interaction Feedback:** Actions visibly acknowledge input and communicate results.
- [ ] **State Coverage:** Loading, empty, success, failure, disabled, and partial states are handled.
- [ ] **Accessibility:** Keyboard, focus, semantics, contrast, zoom, and target sizing are considered.
- [ ] **Responsive Design:** The interface adapts rather than merely shrinking.
- [ ] **Consistency:** Existing patterns and system components are reused.
- [ ] **Content Clarity:** Labels, instructions, and errors communicate precisely.
- [ ] **Performance:** The interface remains responsive and visually stable.
- [ ] **User Control:** Users can cancel, undo, navigate, or recover where appropriate.
- [ ] **Trust:** Costs, permissions, consequences, and commitments are transparent.
- [ ] **Conversion:** Desired actions are low-friction without manipulation.

## Reporting Findings

Report findings in descending order of user impact.

Use this shape:

### `[severity] Finding title`

**Area:** interaction / accessibility / hierarchy / responsive / content / etc.

**Problem:**  
Describe the observable issue.

**Impact:**  
Explain how it affects task completion, comprehension, accessibility, trust, efficiency, or conversion.

**Recommendation:**  
Give the smallest concrete change likely to resolve the issue.

**Evidence:**  
Identify whether the finding comes from direct observation, product data, user research, accessibility/usability guidance, established interaction convention, or design hypothesis.

## Severity

### Blocker

Prevents completion, causes serious accessibility failure, creates substantial risk, or makes the feature effectively unusable.

### Major

Creates significant friction, confusion, repeated errors, or degraded task completion.

### Minor

Creates noticeable but recoverable usability or consistency problems.

### Polish

Primarily visual refinement with limited effect on task completion.

Do not elevate visual preferences into usability blockers.

## Recommendation Discipline

Prefer the smallest change that solves the actual problem.

Before recommending new UI, ask:

1. Can something unnecessary be removed?
2. Can existing information be reordered?
3. Can an existing component solve it?
4. Can wording solve it?
5. Can system feedback solve it?
6. Only then: is new UI required?

Do not recommend additional UI unless it removes greater complexity elsewhere.

When an existing interface already works well, preserve it. Good product design frequently means changing less.
