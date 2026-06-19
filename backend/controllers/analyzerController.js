const pdfParse = require("pdf-parse");
const groq = require("../services/groqService");

const analyzeResume = async (req, res) => {
  try {
    const { jobDescription } = req.body;
    if (!req.file) {
      return res.status(400).json({
        message: "Resume PDF is required",
      });
    }
    const pdfData = await pdfParse(req.file.buffer);
    const resumeText = pdfData.text;

    const prompt = `
You are an expert ATS system, senior technical recruiter, hiring manager and career coach.
Analyze the candidate resume against the job description.
Return ONLY valid JSON.
{
  "matchScore": 0,
  "summary": "",
  "strengths": [],
  "matchingSkills": [],
  "missingSkills": [],
  "suggestions": [],
  "roadmap": [
    {
      "skill": "",
      "whyImportant": "",
      "timeline": "",
      "resources": []
    }
  ]
}

Instructions:

1. Match Score
- Give realistic ATS score between 0-100.
- Compare ONLY resume skills vs JD skills.
- Do not inflate score.

2. Summary
- 3-4 lines.
- Mention candidate strengths.
- Mention biggest skill gaps.
- Mention overall hiring suitability.

3. Strengths
- Top 5 strongest points.
- Specific to this JD.

4. Matching Skills
- Skills present in BOTH resume and JD.

5. Missing Skills
- Skills required in JD but missing from resume.
- Maximum 6.
- Order by importance.

6. Suggestions
- Give actionable resume improvements.
- Mention keywords that should be added.
- Mention missing project types.
- Mention certifications if useful.

7. Roadmap
For EACH missing skill provide:

{
  "skill":"",
  "whyImportant":"",
  "timeline":"",
  "resources":[
     "Official Documentation",
     "Tutorial / Course",
     "Free Course / YouTube Resource"
  ]
}

Resources MUST NEVER be empty.

Examples:
MySQL:
[
 "MySQL Official Documentation",
 "CodeWithHarry MySQL Playlist"
]

Docker:
[
 "Docker Official Docs",
 "TechWorld with Nana Docker Course"
]

Kubernetes:
[
 "Kubernetes Official Docs",
 "TechWorld with Nana Kubernetes Tutorial"
]

AWS:
[
 "AWS Skill Builder",
 "FreeCodeCamp AWS Course"
]

Return ONLY JSON.
Resume:
${resumeText}

Job Description:
${jobDescription}
`;

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
      });

    const result =
      response.choices[0].message.content;
    const cleanedResult = result.replace(/```json/g, '').replace(/```/g, "").trim();
    res.json(JSON.parse(cleanedResult));
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {analyzeResume,};