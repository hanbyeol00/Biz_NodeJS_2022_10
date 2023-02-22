import { Configuration, OpenAIApi } from "openai";

const getAnswering = async (question) => {
  const configuration = new Configuration({
    apiKey: "API 주소",
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: question,
    max_tokens: 1000,
  });
  return completion.data.choices[0].text;
};

export { getAnswering };
