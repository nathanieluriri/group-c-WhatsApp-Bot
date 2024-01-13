const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "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",
});

const getBullyWord = async (feedback) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "you are a school guidance counselor on the lookout for chats that have a hint of cyber bullies in a WhatsApp group chat",
        },
        {
          role: "user",
          content: feedback,
        },
      ],
      model: "ft:gpt-3.5-turbo-1106:group-c::8YTKwLjB",
    });
    console.log(completion.choices[0].message.content);
    return completion.choices[0].message.content;
  } catch (error) {
    console.log(error);
    throw new Error("An Error Has Occurred, Couldn't Get Bully Word");
  }
};

module.exports = getBullyWord;
