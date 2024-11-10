import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    // TODO: Replace with your actual AI/chatbot service
    // This is a simple example response
    const response = getBasicResponse(message);

    res.status(200).json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function getBasicResponse(message: string): string {
  const lowercaseMessage = message.toLowerCase();
  
  if (lowercaseMessage.includes('heart rate')) {
    return 'Normal heart rate ranges from 60-100 beats per minute. Our recording system can help you measure your heart rate accurately.';
  }
  
  if (lowercaseMessage.includes('abnormal')) {
    return 'Our system can detect abnormal heart sounds like murmurs, gallops, and irregular rhythms. Would you like to make a recording to check?';
  }
  
  if (lowercaseMessage.includes('recording')) {
    return 'To make a recording, click the "Start Recording" button above. The recording will automatically stop after 5 seconds.';
  }
  
  return "I can help you understand heart sounds and guide you through the recording process. What would you like to know?";
} 