
import { RiskLevel, Platform, Profile } from './types';

export const MOCK_PROFILES: Profile[] = [
  {
    id: '1',
    handle: 'crypto_guru_42',
    platform: Platform.TWITTER,
    avatar: 'https://picsum.photos/seed/p1/200/200',
    followerCount: 15400,
    followingCount: 200,
    postCount: 120,
    riskScore: 88,
    riskLevel: RiskLevel.HIGH,
    tags: ['Automation', 'Scam Pattern', 'Coordinated'],
    bio: 'Follow for the best daily alpha! 🚀 #Crypto #NFT #Web3',
    behavioralSignature: 'BSV-TX-882-991',
    detectedAt: '2023-11-20T10:30:00Z',
    isFlagged: true
  },
  {
    id: '2',
    handle: 'sarah_j_doe',
    platform: Platform.INSTAGRAM,
    avatar: 'https://picsum.photos/seed/p2/200/200',
    followerCount: 850,
    followingCount: 920,
    postCount: 45,
    riskScore: 12,
    riskLevel: RiskLevel.LOW,
    tags: ['Authentic'],
    bio: 'Photographer & Coffee lover. Traveling the world.',
    behavioralSignature: 'BSV-IG-012-441',
    detectedAt: '2023-11-19T14:20:00Z',
    isFlagged: false
  },
  {
    id: '3',
    handle: 'urgent_news_today',
    platform: Platform.TELEGRAM,
    avatar: 'https://picsum.photos/seed/p3/200/200',
    followerCount: 45000,
    followingCount: 5,
    postCount: 5000,
    riskScore: 95,
    riskLevel: RiskLevel.CRITICAL,
    tags: ['Misinformation', 'High Entropy', 'Botnet'],
    bio: 'Breaking news from around the globe. Stay informed.',
    behavioralSignature: 'BSV-TG-995-121',
    detectedAt: '2023-11-21T08:15:00Z',
    isFlagged: true
  }
];

export const APP_THEME_KEY = 'sentinai_theme';
