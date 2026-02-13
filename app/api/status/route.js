import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'active',
    message: 'Otonom AI Blog Sistemi çalışıyor',
    features: {
      contentGeneration: 'GitHub Actions',
      aiEngine: 'Groq (Llama 3.1 70B)',
      imageGeneration: 'Pollinations.ai',
      socialMedia: 'Twitter, Facebook, LinkedIn',
      seo: 'Google Indexing API'
    },
    schedule: {
      postsPerDay: 3,
      times: ['09:00', '14:00', '19:00'],
      timezone: 'Europe/Istanbul'
    },
    deployment: {
      platform: 'Vercel',
      automation: 'GitHub Actions',
      cost: '$0.00/month'
    }
  });
}
