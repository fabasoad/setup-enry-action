SHELL := /bin/bash

default:
	@read -p "📦 Package manager that you're going to use. Can be "npm" or "yarn" (yarn): " pm_cli; \
	if [[ -z "$$pm_cli" ]] ; then pm_cli="yarn"; else pm_cli="npm"; fi; \
	export PM_CLI=$$pm_cli; \
	if [[ "$$pm_cli" = "yarn" ]] ; then pm_lock_file='yarn.lock'; else pm_lock_file="package-lock.json"; fi; \
	export PM_LOCK_FILE=$$pm_lock_file; \
	read -p "💡 Project title: " repo_title; \
	export REPO_TITLE=$$repo_title; \
	read -p "🧠 Repository owner ($$(git config user.name)): " repo_owner; \
	[ -z "$$repo_owner" ] && repo_owner=$$(git config user.name); \
	export REPO_OWNER=$$repo_owner; \
	read -p "📝 Project owner's display name ($$(git config user.name)): " repo_owner_display_name; \
	[ -z "$$repo_owner_display_name" ] && repo_owner_display_name=$$(git config user.name); \
	export REPO_OWNER_DISPLAY_NAME=$$repo_owner_display_name; \
	read -p "📃 Project name ($$(basename `git rev-parse --show-toplevel`)): " repo_name; \
	[ -z "$$repo_name" ] && repo_name=$$(basename `git rev-parse --show-toplevel`); \
	export REPO_NAME=$$repo_name; \
	read -p "📈 CodeClimate maintainability badge (leave empty if you do not have it): " cc_maintainability_badge; \
	if [[ -z "$$cc_maintainability_badge" ]] ; then cc_maintainability_badge=''; else cc_maintainability_badge="$$cc_maintainability_badge "; fi; \
	export CC_MAINTAINABILITY_BADGE=$$cc_maintainability_badge; \
	read -p "📊 CodeClimate test coverage badge (leave empty if you do not have it): " cc_test_coverage_badge; \
	if [[ -z "$$cc_test_coverage_badge" ]] ; then cc_test_coverage_badge=''; else cc_test_coverage_badge="$$cc_test_coverage_badge "; fi; \
	export CC_TESTS_COVERAGE_BADGE=$$cc_test_coverage_badge; \
	read -p "🔧 Name of a tool that you want to setup using this GitHub Action: " tool_name; \
	[ -z "$$tool_name" ] && echo '❌ CLI name cannot be empty.' && exit 1; \
	export TOOL_NAME=$$tool_name; \
	read -p "🗄 File extension that this GitHub Action will download to install (zip): " cli_extension; \
	[ -z "$$cli_extension" ] && cli_extension='zip'; \
	export CLI_EXTENSION=$$cli_extension; \
	read -p "🌐 First part of URL that will be used to download CLI tool, e.g. if url to download CLI tool looks like https://github.com/wren-lang/wren-cli/releases/download/0.3.0/wren_cli-linux-0.3.0.zip then you should enter https://github.com/wren-lang/wren-cli/releases/download: " cli_url; \
	[ -z "$$cli_url" ] && echo '❌ CLI URL cannot be empty.' && exit 1; \
	export CLI_URL=$$cli_url; \
	read -p "🔢 Latest available version of $$tool_name tool: " latest_version; \
	[ -z "$$latest_version" ] && echo '❌ Version cannot be empty.' && exit 1; \
	export LATEST_VERSION=$$latest_version; \
	envsubst < README.md.template > README.md; \
	rm -f README.md.template; \
	envsubst < action.yml.template > action.yml; \
	rm -f action.yml.template; \
	envsubst < CONTRIBUTING.md.template > CONTRIBUTING.md; \
	rm -f CONTRIBUTING.md.template; \
	export LICENSE_YEAR=$$(date +'%Y'); \
	envsubst < LICENSE.template > LICENSE; \
	rm -f LICENSE.template; \
	envsubst < package.json.template > package.json; \
	rm -f package.json.template; \
	envsubst < .github.template/pull_request_template.md.template > .github.template/pull_request_template.md; \
	rm -f .github.template/pull_request_template.md.template; \
	envsubst < .github.template/ISSUE_TEMPLATE/bug_report.md.template > .github.template/ISSUE_TEMPLATE/bug_report.md; \
	rm -f .github.template/ISSUE_TEMPLATE/bug_report.md.template; \
	envsubst < .github.template/ISSUE_TEMPLATE/feature_request.md.template > .github.template/ISSUE_TEMPLATE/feature_request.md; \
	rm -f .github.template/ISSUE_TEMPLATE/feature_request.md.template; \
	envsubst < .github.template/workflows/check-updates.yml.template > .github.template/workflows/check-updates.yml; \
	rm -f .github.template/workflows/check-updates.yml.template; \
	envsubst < .github.template/workflows/unit-tests.yml.template > .github.template/workflows/unit-tests.yml; \
	rm -f .github.template/workflows/unit-tests.yml.template; \
	envsubst < .husky.template/pre-commit.template > .husky.template/pre-commit; \
	rm -f .husky.template/pre-commit.template; \
	envsubst < .husky.template/pre-push.template > .husky.template/pre-push; \
	rm -f .husky.template/pre-push.template; \
	envsubst < src/consts.ts.template > src/consts.ts; \
	rm -f src/consts.ts.template
	@rm -rf .github
	@mv .github.template .github
	@mv .husky.template .husky
	@chmod +x .husky/commit-msg
	@chmod +x .husky/pre-commit
	@chmod +x .husky/pre-push
	@chmod +x .husky/prepare-commit-msg
	@echo "🌟 Done"
	@rm -f Makefile
