# check-submit for CodeStates

just `npm install` and `npm run start`

or

`npx codestates-submission ls | sed '/name/!d' | cut -d':' -f2 | cut -d',' -f1 | sort -u` at `CodeStates Sprint Directory`