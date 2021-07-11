# check-submit for CodeStates

just `npm install` and `npm run start`
<center><img src="https://user-images.githubusercontent.com/40759230/125211821-2a000f80-e2e4-11eb-9102-8b6f5794d980.png" width="500"></center>

or

`npx codestates-submission ls | sed '/name/!d' | cut -d':' -f2 | cut -d',' -f1 | sort -u` at CodeStates Sprint Directory
