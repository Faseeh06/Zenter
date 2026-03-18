#!/usr/bin/env bash
set -euo pipefail

git add . ":(exclude)left.md" ":(exclude)let.txt"
git commit -m "$(cat <<'EOF'
Add admin controls, legal pages, and video courses

Wire admin-only video creation, add admin panel/users view, introduce course field and filtering, plus landing and legal pages updates.
EOF
)"
git status --porcelain

