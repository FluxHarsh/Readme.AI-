import { extractRepo } from "../utils/extractRepo.js";
import { getRepoData } from "../services/githubService.js";
import { generateReadme } from "../services/geminiService.js";

// @ts-ignore
export async function generate(req, res) {
  try {
    const { repoUrl } = req.body;

    const { owner, repo } = extractRepo(repoUrl);

    const repoData = await getRepoData(owner, repo);

    const readme = await generateReadme(repoData);

    res.json({ readme }); 

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate README",
    });
  }
}
