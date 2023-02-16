document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("input.question");
  const btn = document.querySelector("button.submit");

  btn.addEventListener("click", async () => {
    const question = input.value;
    if (!question) {
      alert("질문을 입력해주세요");
    }
    const fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer `,
      },
      body: JSON.stringify({
        prompt: generatePrompt(question),
        temperature: 0.6,
      }),
    };
    const res = await fetch(
      "https://api.openai.com/v1/engines/text-davinci-002/completions",
      fetchOption
    );
    const result = await res.json();
    await new Promise((r) => setTimeout(r, 100));
    console.log(result);
  });
});
function generatePrompt(question) {
  const capitalizedAnimal =
    question[0].toUpperCase() + question.slice(1).toLowerCase();
  return `Please write your answer in 3 lines or more
Question: ${capitalizedAnimal}
Answer:


`;
}
