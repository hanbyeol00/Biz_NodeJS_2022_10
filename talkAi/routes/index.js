import express from "express";
import { getAnswering } from "../modules/fetch_module.js";
import {
  CLIENT_ID,
  CLIENT_SECRET,
  PAPAGO_URL,
} from "../config/naver_config.js";
import textToSpeech from "@google-cloud/text-to-speech";
import fs from "fs";
import axios from "axios";

const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("test");
});
router.post("/papago", async (req, res) => {
  const { voice } = req.body;
  const fetchOption1 = {
    headers: {
      [CLIENT_ID.KEY]: CLIENT_ID.VALUE,
      [CLIENT_SECRET.KEY]: CLIENT_SECRET.VALUE,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  };
  const data = new URLSearchParams({
    source: "ko",
    target: "en",
    text: voice,
  });
  const result = await axios.post(
    "https://openapi.naver.com/v1/papago/n2mt",
    data,
    fetchOption1
  );
  // console.log(result.data.message.result.translatedText);
  let answering = "";
  const test = async () => {
    const answer = await getAnswering(
      result.data.message.result.translatedText
    );
    answering = answer;
  };
  await test();
  const fetchOption2 = {
    headers: {
      [CLIENT_ID.KEY]: CLIENT_ID.VALUE,
      [CLIENT_SECRET.KEY]: CLIENT_SECRET.VALUE,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
  };
  const data1 = new URLSearchParams({
    source: "en",
    target: "ko",
    text: answering,
  });
  const result2 = await axios.post(
    "https://openapi.naver.com/v1/papago/n2mt",
    data1,
    fetchOption2
  );

  const client = new textToSpeech.TextToSpeechClient({
    projectId: "promising-saga-378605",
    keyFilename: "./config/promising-saga-378605-196a974a1f7c.json",
  });
  function playTTS(text) {
    const request = {
      input: { text },
      voice: { languageCode: "ko", ssmlGender: "NEUTRAL" },
      audioConfig: { audioEncoding: "MP3" },
    };

    client.synthesizeSpeech(request, (err, response) => {
      if (err) {
        console.error(err);
        return;
      }

      const audioContent = response.audioContent.toString("base64");
      const data = {
        audioContent: audioContent,
      };
      res.json(data);
    });
  }
  playTTS(result2.data.message.result.translatedText);

  return res.json();
});
// router.post("/post", async (req, res) => {
// const { question } = req.body;
// console.log(question);
// const answering = await getAnswering(question);
// console.log(answering);
// return res.json(answering);
// const client = new textToSpeech.TextToSpeechClient({
//   projectId: "promising-saga-378605",
//   keyFilename: "./config/promising-saga-378605-196a974a1f7c.json",
// });
// function playTTS(text) {
//   const request = {
//     input: { text },
//     voice: { languageCode: "ko", ssmlGender: "NEUTRAL" },
//     audioConfig: { audioEncoding: "MP3" },
//   };
//   client.synthesizeSpeech(request, (err, response) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     fs.writeFile("output.mp3", response.audioContent, "binary", (err) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       console.log("TTS file saved!");
//     });
//   });
// }
// playTTS(text);
// });

router.post("/audio", async (req, res) => {});

export default router;
