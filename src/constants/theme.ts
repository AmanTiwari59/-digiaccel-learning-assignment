/**
 * Application Theme Constants and Color Tokens.
 * Derived from the Figma mobile design specification.
 */
export const THEME_COLORS = {
  primary: '#5B36F4',
  primaryHover: '#4C24D4',
  primaryLight: '#F4F0FF',
  textDark: '#1E1E2F',
  textMuted: '#8E8EA9',
  borderLight: '#ECECF2',
  cardCompleteBg: '#EEF2FF',
  cardCompleteText: '#5B36F4',
  cardPendingBg: '#FFEAEA',
  cardPendingText: '#FF5B5B',
  badgeLow: { bg: '#E8F5E9', text: '#2E7D32', border: '#C8E6C9' },
  badgeMedium: { bg: '#FFF8E1', text: '#F57F17', border: '#FFE082' },
  badgeHigh: { bg: '#FFEBEE', text: '#C62828', border: '#FFCDD2' },
} as const;

export default THEME_COLORS;
