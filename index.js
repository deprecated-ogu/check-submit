const { requestDevice, getUser } = require('@codestates-cc/submission-npm/lib/github');
const { writeFileSync, existsSync, readFileSync } = require('fs');
const { join } = require('path');
const { homedir } = require('os');
const { get } = require('axios')
const ENDPOINT = 'https://2j12cf7y29.execute-api.ap-northeast-2.amazonaws.com/dev/sprint/ls';

const getCSVData = (jsonData) => {
	const arr = jsonData;
	let csvData = '';
	const titles = Object.keys(arr[0]);
	
	titles.forEach((title, idx)=>{
		csvData += (idx !== titles.length - 1 ? `${title},` : `${title}\r\n`);
	});
	
	arr.forEach((content, idx)=>{
		let row = '';
		for (let title in content)
			row += (row === '' ? `${content[title]}` : `,${content[title]}`);
		csvData += (idx !== arr.length - 1 ? `${row}\r\n`: `${row}`);
	});

	return csvData;
}

const ls = async (user) => {
	const data = await get(`${ENDPOINT}?user=${user}`);
	const result = data.data.responseTrial.reduce((arr, record) => {
		return record.assessments.reduce((arr, asmt) => {
			return [...arr, {
				name: record.name,
				timestamp: asmt.timestamp,
			}]
		}, arr);
	}, []);

	const uniqueResult = result.filter((el1, idx) => result.findIndex((el2) => el1.name === el2.name) === idx);
	uniqueResult.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
	
	writeFileSync('submitList.csv', getCSVData(uniqueResult)); 
	console.log(`Timestamp based on initial submission date.`);
	console.log(`You can check "${__dirname}/submitList.csv"`);
}

const main = () => {
  const location = join(homedir(), '.codestates-token')
  if (existsSync(location)) {
    const token = readFileSync(location).toString()
    getUser(token.split('\n')[0], ({ data }) => {
      ls(data.id);
    })
  }
  else {
    requestDevice(({ data }) => {
      ls(data.id);
    })
  }
}

main();