/*eslint-disable*/
'use strict';

// [START speech_quickstart]
// Imports the Google Cloud client library
const Speech = require('@google-cloud/speech');

// Your Google Cloud Platform project ID
const projectId = 'a59e2f4f7fb16a45a5d6eca69bde21d63ce202ef';

// Instantiates a client
const speechClient = Speech({
  projectId,
});

// The name of the audio file to transcribe
const fileName = './eric.flac';
// const fileName = './audio.opus'

// The audio file's encoding and sample rate
const options = {
  // encoding: 'FLAC',
  // sampleRate: 22050,
};

// const options = {
//   encoding: 'FLAC',
//   sampleRate: 22050,
// };

// Detects speech in the audio file
speechClient.recognize(fileName, options)
  .then((results) => {
    const transcription = results[0];
    console.log(`Transcription: ${transcription}`);
  }).catch((err) =>{
    console.log('hubo un error');
    console.log(err);
  });
// [END speech_quickstart]

//
// let ffmpeg = require('ffmpeg-stream').ffmpeg,
//   fs = require('fs'),
//   converter, input;
//
// converter = ffmpeg();
//
// // get a writable input stream and pipe an image file to it
// input = converter.input({ f: 'image2pipe', vcodec: 'libopus' });
// fs.createReadStream(`${__dirname}/cat.jpg`).pipe(input);
//
// // create an output stream, crop/scale image, save to file via node stream
// converter.output({
//   f: 'image2', vcodec: 'FLAC',
//   vf: 'crop=300:300,scale=100:100',
// })
// .pipe(fs.createWriteStream(`${__dirname}/cat_thumb.jpg`));
//
// // same, but save to file directly from ffmpeg
// converter.output(`${__dirname}/cat_full.jpg`, { vf: 'crop=300:300' });
//
// // start processing
// converter.run();
