// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Creates a client
const client = new language.LanguageServiceClient();


exports.helloworld = (req, res) => {
	res.set('Access-Control-Allow-Origin', "*");
  	res.set('Access-Control-Allow-Methods', 'GET, POST');
  	if(req.query.message) {
  		message = req.query.message
  	} else if (req.)
  
  	const document = {
	    content: message,
	    type: 'PLAIN_TEXT',
	};

	client
		.analyzeSentiment({document: document})
		.then(results => {
			const sentiment = results[0].documentSentiment;
			if(sentiment.score < 0) {
				res.status(200).send({
					pass: false,
					problemIndices: -1
				})
			} else {
				let problemSentences = [];
				results[0].sentences.forEach((sentence, index) => {
					if(sentence.sentiment.score < 0) {
						problemSentences.push(index)
					}
				});
				if(problemSentences.length > 0) {
					res.status(200).send({
						pass: false,
						problemIndices: problemSentences
					})
				} else {
					res.status(200).send({
						pass: true
					})
				}
			}
			
		}).catch(err => {
			console.log(err);
			res.status(500).send(err)
		})
	}

