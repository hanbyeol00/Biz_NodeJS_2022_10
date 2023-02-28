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

router.post("/audio", async (req, res) => {
  const t_seq = req.body.t_seq;
  try {
    const result = await TALKWISE.findOne({
      where: { seq: t_seq },
      attributes: ["audio"],
    });
    if (!result) {
      return res
        .status(404)
        .json({ error: `seq ${t_seq}에 해당하는 레코드를 찾을 수 없습니다.` });
    }
    return res.json(result);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
});

router.get("/bookmark/:category", async (req, res) => {
  const category = req.params.category;
  try {
    const result = await CATEGORY.findAll({
      where: { category: category },
      include: [
        {
          model: TALKWISE,
          as: "f_talk_cate",
          attributes: ["seq", "question", "answer"],
        },
      ],
    });
    const categoryList = await CATEGORY.findAll({
      include: [
        {
          model: TALKWISE,
          as: "f_talk_cate",
          attributes: ["seq", "question", "answer"],
        },
      ],
    });
    return res.json({ result, categoryList });
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

router.post("/bookmark/edit", async (req, res) => {
  const categoryEdit = req.body;

  try {
    if (
      !categoryEdit ||
      !categoryEdit.t_seq ||
      !categoryEdit.category ||
      !categoryEdit.prevCategory
    ) {
      return res.status(400).json({ error: "잘못된 요청입니다." });
    }

    const { t_seq, category, prevCategory } = categoryEdit;

    if (prevCategory === category) {
      const existingRecords = await CATEGORY.findAll({
        where: { category },
      });

      const existingSeq = existingRecords.map((record) => record.t_seq);
      // console.log("추가할 seq", newSeq, "현재 seq", existingSeq);
      console.log(t_seq.length);

      if (existingSeq.length >= t_seq.length) {
        const promises = await existingSeq.map(async (seq) => {
          if (!t_seq.includes(seq)) {
            await CATEGORY.destroy({
              where: { t_seq: seq, category },
            });
          }
        });
        await Promise.all(promises);
      } else if (t_seq.length > existingSeq.length) {
        const promises = await t_seq.map(async (seq) => {
          const recordExists = existingRecords.some(
            (record) => record.t_seq === seq
          );
          console.log(recordExists);

          if (recordExists) {
            return;
          } else {
            await CATEGORY.create({
              t_seq: seq,
              category,
            });
          }
        });
        await Promise.all(promises);
      }
      return res.status(200).json({ message: "카테고리 수정 완료" });
    } else {
      await CATEGORY.destroy({
        where: { category: prevCategory },
      });

      await Promise.all(
        t_seq.map(async (seq) => {
          await CATEGORY.create({
            t_seq: seq,
            category,
          });
        })
      );

      return res.status(200).json({ message: "카테고리 수정 완료" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "서버 오류" });
  }
});

router.post("/bookmark/add", async (req, res) => {
  const categoryInfo = req.body;

  // categoryInfo가 존재하지 않거나 t_seq와 category가 모두 존재하지 않는 경우
  if (!categoryInfo || !categoryInfo.t_seq || !categoryInfo.category) {
    return res.status(400).json({ error: "잘못된 요청입니다." });
  }

  try {
    const { t_seq, category } = categoryInfo;

    // TALKWISE 레코드 가져오기
    const talkwiseList = await TALKWISE.findAll({
      where: { seq: t_seq },
    });

    // categoryInfo.t_seq에 해당하는 TALKWISE 레코드 중 일부가 존재하지 않는 경우
    if (talkwiseList.length !== t_seq.length) {
      return res.status(400).json({ error: "잘못된 요청입니다." });
    }

    // CATEGORY 레코드 생성
    await Promise.all(
      t_seq.map(async (seq) => {
        const categoryRecord = await CATEGORY.create({
          t_seq: seq,
          category,
        });
        return categoryRecord;
      })
    );

    return res.status(200).json({ message: "카테고리 추가 완료" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "서버 오류" });
  }
});

router.delete("/bookmark/delete", async (req, res) => {
  try {
    const { category } = req.query;

    // category가 전달되지 않은 경우
    if (!category) {
      return res.status(400).json({ error: "잘못된 요청입니다." });
    }

    // category에 해당하는 모든 CATEGORY 레코드를 가져옴
    const categoryRecords = await CATEGORY.findAll({
      where: { category: category },
    });

    // CATEGORY 레코드가 존재하지 않는 경우
    if (categoryRecords.length === 0) {
      return res.status(400).json({ error: "잘못된 요청입니다." });
    }

    // TALKWISE와 CATEGORY를 연결하는 레코드를 삭제
    await CATEGORY.destroy({
      where: {
        category: categoryRecords.map((record) => record.category),
      },
    });

    // CATEGORY 레코드를 삭제
    await CATEGORY.destroy({
      where: {
        category: category,
      },
    });

    return res.status(200).json({ message: "북마크 삭제 완료" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "서버 오류" });
  }
});

export default router;
