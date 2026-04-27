export const getRecommendations = async (req, res) => {
  try {
    const { topic, level } = req.body;

    // Basic validation
    if (!topic || !level) {
      return res.status(400).json({
        message: "Topic and level are required",
      });
    }

    // 🔥 MOCK Gemini AI response (as per assessment instruction)
    const recommendations = [
      {
        title: `Introduction to ${topic}`,
        level,
        instructor: "John Doe",
        duration: "2 months",
      },
      {
        title: `Advanced ${topic} Mastery`,
        level,
        instructor: "Jane Smith",
        duration: "4 months",
      },
      {
        title: `${topic} Project Bootcamp`,
        level,
        instructor: "Alex Johnson",
        duration: "3 months",
      },
    ];

    res.status(200).json({
      success: true,
      recommendations,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};