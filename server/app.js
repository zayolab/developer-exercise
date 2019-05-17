const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const ResultsCalculation = require('./restApi/ROI-ResultsCalculation');

const app = express();
const v1 = "/v1";

app.use(express.static(__dirname));
app.use(cors());
app.use(bodyParser.json());

//To call rest api for results calculation
app.post(v1 + '/results', function (req, res) {
	let total = ResultsCalculation.calculateResults(req);
	return res.json(total);
});

app.listen(9000, () => console.log('App listening on port 9000!') );