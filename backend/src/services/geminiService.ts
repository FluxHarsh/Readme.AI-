import { GoogleGenAI } from "@google/genai";

let genAI: GoogleGenAI | null = null;

function getGenAI() {
  if (!genAI) {
    genAI = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });
  }
  return genAI;
}
console.log("got api key");
//@ts-ignore
export async function generateReadme(repoData) {
  const ai = getGenAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    // contents: `
    //         You are an expert open source maintainer.

    //         Generate a professional GitHub README.

    //         Repository Information:
    //         ${JSON.stringify(repoData, null, 2)}

    //         Include:
    //         - Project title
    //         - Description
    //         - Installation
    //         - Usage
    //         - Tech stack
    //         - Contributing`
    contents: `
You are a world-class open source developer and technical writer.

Generate a stunning, production-ready GitHub README for the following repository.

Repository Information:
${JSON.stringify(repoData, null, 2)}

Follow these rules strictly:
- Use emojis for section headings to make it visually appealing don't use excessive emojis at everyline only use minimal emojis
- Add relevant shields.io badges at the top (language, license, stars, forks, PRs welcome)
- Write a compelling, detailed project description (3-4 sentences)
- Include a "Table of Contents" section with anchor links
- Features section: use bullet points with bold feature names and descriptions
- Tech Stack: use a proper markdown table with Layer and Technology columns
- Installation: provide clear step-by-step numbered instructions with proper code blocks
- Include a "Project Structure" section showing the folder tree
- Add an "API Reference" section if the project has backend endpoints
- Contributing: include full fork → branch → commit → push → PR workflow
- Add a "Roadmap" section with future features using checkboxes (- [ ] feature)
- License and Contact sections at the end
- Use --- horizontal rules between major sections
- All code snippets must use proper language-tagged code blocks (\`\`\`bash, \`\`\`python etc)
- Make the README specific to THIS project, not generic boilerplate
- Tone: professional yet friendly

Output only the raw markdown. No explanations, no preamble.
`,
  });
  console.log(response.text);

  return response.text;
}
