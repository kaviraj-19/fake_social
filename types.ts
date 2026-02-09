
export enum RiskLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum Platform {
  TWITTER = 'Twitter',
  INSTAGRAM = 'Instagram',
  FACEBOOK = 'Facebook',
  TELEGRAM = 'Telegram',
  LINKEDIN = 'LinkedIn'
}

export interface BehavioralFingerprint {
  id: string;
  entropyScore: number;
  linguisticRhythm: number[];
  reactionDelayDist: number[];
  scrollEngagementRatio: number;
  personaStability: number;
}

export interface Profile {
  id: string;
  handle: string;
  platform: Platform;
  avatar: string;
  followerCount: number;
  followingCount: number;
  postCount: number;
  riskScore: number;
  riskLevel: RiskLevel;
  tags: string[];
  bio: string;
  behavioralSignature: string;
  detectedAt: string;
  isFlagged: boolean;
}

export interface AnalysisResult {
  trustScore: number;
  findings: {
    category: string;
    description: string;
    severity: RiskLevel;
  }[];
  coordinatedNetworkDetected: boolean;
  crossPlatformMatches: {
    handle: string;
    platform: Platform;
    confidence: number;
  }[];
}

export interface NetworkNode {
  id: string;
  label: string;
  risk: RiskLevel;
}

export interface NetworkLink {
  source: string;
  target: string;
  weight: number;
}
