// app/api/analyze/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Input validation schema
const RequestSchema = z.object({
	url: z.string().url(),
	platform: z.enum(['youtube', 'tiktok', 'twitter']),
});

// YouTube video ID extractor
function extractYouTubeVideoId(url: string): string | null {
	const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
	const match = url.match(regExp);
	return match && match[2].length === 11 ? match[2] : null;
}

// TikTok video ID extractor
function extractTikTokVideoId(url: string): string | null {
	const regex = /\/video\/(\d+)/;
	const match = url.match(regex);
	return match ? match[1] : null;
}

// Twitter/X video ID extractor
function extractTwitterVideoId(url: string): string | null {
	const regex = /\/status\/(\d+)/;
	const match = url.match(regex);
	return match ? match[1] : null;
}

async function fetchYouTubeMetadata(videoId: string) {
	const response = await fetch(
		`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`
	);
	const data = await response.json();
	return {
		title: data.items[0]?.snippet?.title,
		description: data.items[0]?.snippet?.description,
	};
}

async function fetchTikTokMetadata(videoId: string) {
	const response = await fetch(`https://api.tiktok.com/v2/videos/${videoId}`, {
		headers: {
			Authorization: `Bearer ${process.env.TIKTOK_ACCESS_TOKEN}`,
		},
	});
	const data = await response.json();
	return {
		title: data.title,
		description: data.description,
	};
}

async function fetchTwitterMetadata(tweetId: string) {
	const response = await fetch(
		`https://api.twitter.com/2/tweets/${tweetId}?expansions=attachments.media_keys&media.fields=url,duration_ms`,
		{
			headers: {
				Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
			},
		}
	);
	const data = await response.json();
	return {
		title: data.data?.text,
		description: data.data?.text,
	};
}

async function analyzeLicensingWithGemini(metadata: { title: string; description: string }) {
	const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

	const prompt = `
      Analyze this video's title and description for licensing information:
      Title: ${metadata.title}
      Description: ${metadata.description}
      
      Please carefully analyze for:
      1. Explicit license types (e.g., Creative Commons)
      2. Licensing contact information or instructions
      3. Mentions of licensing services or companies
      4. Commercial licensing availability
      5. Rights management companies or agencies mentioned
      6. Any specific instructions about usage rights or licensing process
      
      Pay special attention to:
      - Email addresses containing "licensing" or similar terms
      - Phrases like "to license this content" or "for licensing"
      - Company names followed by licensing instructions
      - Any mention of content licensing platforms or services
      
      Format your response as a JSON object with these fields:
      {
        "hasExplicitLicense": boolean,            // true if any form of licensing is mentioned
        "licenseType": string,                    // e.g., "Commercial License through ViralHog", "Creative Commons", etc.
        "canUseCommercially": boolean,            // true if commercial licensing is available
        "requiresAttribution": boolean,           // true if attribution is required
        "licensingContact": string | null,        // licensing contact information if provided
        "licensingCompany": string | null,        // company handling licensing if mentioned
        "notes": string                           // additional details about licensing terms and process
      }
    `;

	const result = await model.generateContent(prompt);
	const response = await result.response;
	const genRes = response
		.text()
		.replace(/```json/g, '')
		.replace(/```/g, '');
	return JSON.parse(genRes);
	return response;
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { url, platform } = RequestSchema.parse(body);

		let videoId: string | null = null;
		let metadata: { title: string; description: string };

		// Extract video ID based on platform
		switch (platform) {
			case 'youtube':
				videoId = extractYouTubeVideoId(url);
				metadata = await fetchYouTubeMetadata(videoId!);
				break;
			case 'tiktok':
				videoId = extractTikTokVideoId(url);
				metadata = await fetchTikTokMetadata(videoId!);
				break;
			case 'twitter':
				videoId = extractTwitterVideoId(url);
				metadata = await fetchTwitterMetadata(videoId!);
				break;
			default:
				throw new Error('Unsupported platform');
		}

		if (!videoId) {
			return NextResponse.json({ error: 'Invalid video URL' }, { status: 400 });
		}

		const licenseAnalysis = await analyzeLicensingWithGemini(metadata);

		return NextResponse.json({
			metadata,
			licenseAnalysis,
			platform,
			videoId,
		});
	} catch (error) {
		console.error('Error processing request:', error);
		return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
	}
}
