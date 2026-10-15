# Interaction contracts

Every action needs affordance, meaning, immediate acknowledgement, current state, consequence, and recovery. Specify relevant idle, focus, pressed, loading, disabled, selected, successful, failed, empty, offline, partial, and stale states. Never rely on hover as the only path.

Keep prerequisite information beside its decision. Confirm truly irreversible operations; prefer undo for reversible ones. Preserve user work after validation failure and keep keyboard access during transitions. Use inline errors for local causes and persistent banners for persistent system conditions; avoid critical information only in disappearing toasts.

Motion should convey spatial continuity or causal change, remain interruptible, and respect reduced-motion. Test rapid repeats, partial progress, cancel/back, and interrupted animation state.
