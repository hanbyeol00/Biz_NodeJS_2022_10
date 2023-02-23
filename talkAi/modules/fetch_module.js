import { Configuration, OpenAIApi } from "openai";

const getAnswering = async (question) => {
  const configuration = new Configuration({
    apiKey: "",
  });
  const openai = new OpenAIApi(configuration);
  await new Promise((r) => setTimeout(r, 100));
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: question,
    max_tokens: 1000,
  });
  return completion.data.choices[0].text;
};

export { getAnswering };
