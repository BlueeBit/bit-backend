## Conventional Commits
Conventional Commits is a specification that seeks to improve commit messages in general. Conventional Commits defines a standard format commit messages. Using Conventional Commits, the reader can glean valuable context about a commit such as whether the commit implements a new feature, refactors existing code, fixes a defect, adds a unit test, or deletes code.

### Commit Types
The `<type>` field provides the context for the commit. The `<type>` field communicates the intent of the change that was made. Did the commit introduce a new feature? Did the commit improve unit testing and code coverage? Did the commit improve the documentation in the project?

The `<type>` field is an enumerated type. Your project can define what values that you want to use. On my projects, I define the following `<type>` values:

**build:** The commit alters the build system or external dependencies of the product (adding, removing, or upgrading dependencies).
**change:**** The commit changes the implementation of an existing feature.
**chore:** The commit includes a technical or preventative maintenance task that is necessary for managing the product or the repository, but it is not tied to any specific feature or user story. For example, releasing the product can be considered a chore. Regenerating generated code that must be included in the repository could be a chore.
**ci:** The commit makes changes to continuous integration or continuous delivery scripts or configuration files.
**deprecate:** The commit deprecates existing functionality, but does not remove it from the product. For example, sometimes older public APIs may get deprecated because newer, more efficient APIs are available. Removing the APIs could break existing integrations so the APIs may be marked as deprecated in order to encourage the integration developers to migrate to the newer APIs while also giving them time before removing older functionality.
**docs:** The commit adds, updates, or revises documentation that is stored in the repository.
**feat:** The commit implements a new feature for the application.
**fix:** The commit fixes a defect in the application.
**perf:** The commit improves the performance of algorithms or general execution time of the product, but does not fundamentally change an existing feature.
**refactor:** The commit refactors existing code in the product, but does not alter or change existing behavior in the product.
**remove:** The commit removes a feature from the product. Typically features are deprecated first for a period of time before being removed. Removing a feature from the product may be considered a breaking change that will require a major version number increment.
**revert:** The commit reverts one or more commits that were previously included in the product, but were accidentally merged or serious issues were discovered that required their removal from the main branch.
**security:** The commit improves the security of the product or resolves a security issue that has been reported.
**style:** The commit updates or reformats the style of the source code, but does not otherwise change the product implementation.
**test:** The commit enhances, adds to, revised, or otherwise changes the suite of automated tests for the product.

### Scopes
The `<scope>` field is optional and is used to tag a package or module of the product that the commit affects. The `<scope>` field is based on an enumeration like the `<type>` field. On new projects, I typically start without a scope and as my app or project becomes more complex, I will start defining scopes.

### Description
The `<description>` field is a very short summary of the intent or content included in the comment. The `<description>` field can be used as a title to introduce the change and then use the `<body>` field to provide more details of the change.

### Example
The whole commits must not exceed 50 characters.
```git
git commit -m "<type>(<scope>): <description>"
```