const express = require("express");
const cors = require("cors");
const nn = require("nn");
const brain = require("brain.js");
const fs = require("fs");

const dataTvc = require("./data/json/tcv.json");

const app = express();

// const toNumber = (string) => {
// 	const chars = string.toLowerCase().split("");
// 	const alphabet =
// 		'abcdefghijklmnopqrstuvwxyz1234567890!@#$%&*()_-+={}[]|:;"<>.,?/';
// 	let results = [];

// 	for (char of chars) {
// 		const charPosition = alphabet.indexOf(char);
// 		results.push(charPosition + 1);
// 	}

// 	return results;
// };

// console.log(toNumber("tidak, tidak akan baik hasilnya."));

// this example shows how we could train it to approximate sin(x)
// from a random set of input/output data.

let trainingData = [];
for (data of dataTvc) {
	const input = data.Menurut_Terbanding_Tergugat;
	const output = data.Amar;

	const train = { input: input, output: output };
	trainingData.push(train);
}

const net = new brain.recurrent.LSTM();

net.train(trainingData, {
	iterations: 20000,
	log: true,
	logPeriod: 1,
});

fs.writeFileSync(
	"trained-menurut-terbanding-tergugat.js",
	`export default ${net.toFunction().toString()};`
);

const output = net.run("Koreksi Pajak Masukan tidak berhubungan langsung"); // 'happy'

console.log(output);

app.listen(process.env.PORT || 3000);
