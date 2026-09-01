# Fix Gradle Sync Error: Kotlin Extension Already Registered

The project is using Android Gradle Plugin (AGP) 9.1.1, which has built-in Kotlin support enabled by default. Manually applying the `org.jetbrains.kotlin.android` plugin causes a conflict because AGP already registers the `kotlin` extension.

## Proposed Changes

### Build Configuration

#### [MODIFY] [root build.gradle.kts](file:///C:/Users/PC/.copilot/repos/copilot-worktrees/fidelamharic/manjosaa-miniature-enigma/build.gradle.kts)
- Remove the `kotlin.android` plugin application.

#### [MODIFY] [app/build.gradle.kts](file:///C:/Users/PC/.copilot/repos/copilot-worktrees/fidelamharic/manjosaa-miniature-enigma/app/build.gradle.kts)
- Remove the `kotlin.android` plugin application.
- Migrate `kotlinOptions` to the new `kotlin` DSL or remove if redundant (AGP 9.1 syncs `jvmTarget` automatically).

## Verification Plan

### Automated Tests
- Run Gradle sync to verify the error is resolved.
- Build the project to ensure Kotlin compilation still works.
