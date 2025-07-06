/*
 * W3-VIP Airport Subscription Filter
 *
 * This parser performs two critical functions:
 * 1. REGION FILTER: Only keeps nodes from Hong Kong (HK), Japan (JP),
 * Singapore (SG), and Taiwan (TW).
 * 2. RATE-LIMIT FILTER: Excludes high-magnification nodes containing
 * 'IEPL' or 'IPLC' in their names to prevent accidental high usage.
 */
function operator(proxies) {
    const regionKeywords = ['HK', '香港', 'Hong Kong', 'JP', '日本', 'Japan', 'SG', '新加坡', 'Singapore', 'TW', '台湾', 'Taiwan'];
    const exclusionKeywords = ['IEPL', 'IPLC'];

    return proxies.filter(p => {
        const proxyName = p.name.toUpperCase();
        
        // Step 1: Check if the name contains any required region keyword.
        const hasRegion = regionKeywords.some(keyword => proxyName.includes(keyword.toUpperCase()));
        
        // Step 2: Check if the name contains any excluded keyword.
        const hasExclusion = exclusionKeywords.some(keyword => proxyName.includes(keyword.toUpperCase()));
        
        // Return true only if it's a desired region AND not excluded.
        return hasRegion && !hasExclusion;
    }).map(p => {
        // Optional: You can rename nodes here if needed.
        // p.name = "[AIR] " + p.name;
        return p;
    });
}
