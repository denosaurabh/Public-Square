export const STATUS = `
query GlobalProtocolStats {
    globalProtocolStats(request: null) {
      totalProfiles
      totalBurntProfiles
      totalPosts
      totalMirrors
      totalComments
      totalCollects
      totalFollows
      totalRevenue {
        asset {
          name
          symbol
          decimals
          address
        }
        value
      }
    }
  }
`;

export const QEURY_PING = `
  query {
    ping
  }
`;
