---
'@geonovum/ogc-checker': patch
---

Update `@geonovum/standards-checker` to 1.4.0, which requires Vitest 5. The change is test tooling
only. It moves the `toContainViolation` type augmentation onto Vitest 5's `Matchers` interface and
drops Vitest from the package's own `dependencies`, so the peer range alone decides which Vitest a
consumer runs. The CLI and the web app behave exactly as before.
