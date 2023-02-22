document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("input.question");
  const btn = document.querySelector("button.submit");

  btn.addEventListener("click", async () => {
    const question = input.value;
    if (!question) {
      return alert("질문을 입력해주세요");
    }
    const fetchOption = {
      method: "POST",
      body: JSON.stringify({ text: question }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch("/test/post", fetchOption);
  });
});
