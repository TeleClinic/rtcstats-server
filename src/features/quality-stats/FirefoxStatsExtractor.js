const { getRTTFirefox, getTotalSentPacketsFirefox,
    getTotalReceivedPacketsStandard } = require('../../utils/stats-detection');

/**
 * Collection of functions used to extract data from standard formatted webrtc stats.
 */
class FirefoxStatsExtractor {
    /**
     * Extract round trip time.
     *
     * @param {Object} statsEntry - Complete rtcstats entry
     * @param {Object} report - Individual stat report.
     * @returns {Number|undefined} - Extracted rtt, or undefined if the report isn't of the necessary type.
     */
    extractRtt(statsEntry, report) {
        return getRTTFirefox(statsEntry, report);
    }


    /**
     *
     * @param {Object} statsEntry - Complete rtcstats entry
     * @param {Object} report - Individual stat report.
     */
    // extractJitter(statsEntry, report) {
    //     // TODO
    // }

    /**
     * Extract outbound packet data.
     *
     * @param {Object} statsEntry - Complete rtcstats entry
     * @param {Object} report - Individual stat report.
     * @returns {PacketsSummary|undefined} - Packet summary or undefined if the report isn't of the necessary type.
     */
    extractOutboundPacketLoss(statsEntry, report) {
        return getTotalSentPacketsFirefox(report);
    }

    /**
     * Extract inbound packet data.
     *
     * @param {Object} statsEntry - Complete rtcstats entry
     * @param {Object} report - Individual stat report.
     * @returns {PacketsSummary|undefined} - Packet summary or undefined if the report isn't of the necessary type.
     */
    extractInboundPacketLoss(statsEntry, report) {
        return getTotalReceivedPacketsStandard(statsEntry, report);
    }
}

module.exports = FirefoxStatsExtractor;