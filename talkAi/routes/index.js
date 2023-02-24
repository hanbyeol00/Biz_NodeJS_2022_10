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
import DB from "../models/index.js";

const TALKWISE = DB.models.tbl_talkwise;
const CATEGORY = DB.models.tbl_category;
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("test");
});

router.post("/papago", async (req, res) => {
  const { voice } = req.body;
  // const fetchOption1 = {
  //   headers: {
  //     [CLIENT_ID.KEY]: CLIENT_ID.VALUE,
  //     [CLIENT_SECRET.KEY]: CLIENT_SECRET.VALUE,
  //     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  //   },
  // };
  // const data = new URLSearchParams({
  //   source: "ko",
  //   target: "en",
  //   text: voice,
  // });
  // const result = await axios.post(
  //   "https://openapi.naver.com/v1/papago/n2mt",
  //   data,
  //   fetchOption1
  // );
  let answering = "";
  const test = async () => {
    const answer = await getAnswering(
      // result.data.message.result.translatedText
      voice
    );
    answering = answer;
  };
  await test();

  // const fetchOption2 = {
  //   headers: {
  //     [CLIENT_ID.KEY]: CLIENT_ID.VALUE,
  //     [CLIENT_SECRET.KEY]: CLIENT_SECRET.VALUE,
  //     "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  //   },
  // };
  // const data1 = new URLSearchParams({
  //   source: "en",
  //   target: "ko",
  //   text: answering,
  // });
  // const result2 = await axios.post(
  //   "https://openapi.naver.com/v1/papago/n2mt",
  //   data1,
  //   fetchOption2
  // );

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

      return res.json({ audioContent, text });
    });
  }
  // playTTS(result2.data.message.result.translatedText);
  playTTS(answering);
});

router.get("/bookmark", async (req, res) => {
  try {
    const result = await CATEGORY.findAll({
      include: [{ model: TALKWISE, as: "f_talk_cate" }],
    });
    return res.json(result);
  } catch (e) {
    console.log(e);
  }
});

router.post("/bookmark/insert", async (req, res) => {
  const info = req.body;
  const { answer } = req.body;
  try {
    const data = await TALKWISE.findOne({ where: { answer: answer } });
    if (!data) {
      try {
        await TALKWISE.create(info);
        const result = await TALKWISE.findOne({ where: { answer: answer } });
        const { seq } = result;
        console.log(seq);
        await CATEGORY.create({ t_seq: seq, category: "All" });
        return false;
      } catch (e) {
        return console.log(e);
      }
    }
    return res.json({ err: "이미 저장됨" });
  } catch (e) {
    console.log(e);
  }
});

export default router;
