
#!/usr/bin/env bash
set -ve


GH_PAGES_REPO="github.com:AndreEtienne/github-search-v2.git"
NAME="$(git log --pretty=format:"%an" | head -n1)"
EMAIL="$(git log --pretty=format:"%ae" | head -n1)"


# Push static site to branch `gh-pages` of target repository
npm install
npm run build
cd dist
git init
git remote add origin "https://${GH_TOKEN}@${GH_REF}"
git checkout --orphan gh-pages
git config user.name "${NAME}"
git config user.email "${EMAIL}"

git add -A .
git commit -am "Deploy to GitHub Pages from ${TRAVIS_COMMIT}"
git push --force -u "https://${GH_TOKEN}@${GH_PAGES_REPO}" gh-pages
