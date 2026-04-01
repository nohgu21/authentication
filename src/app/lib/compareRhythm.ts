
interface KeyStrokeTiming {
    dwell: number,
    flight: number,
    downTime: number
}

export function compareRhythm (
    profile: KeyStrokeTiming[],
    attempt: KeyStrokeTiming[]
): number {
    const length = Math.min(profile.length, attempt.length)

    if (length < 3) return 0

    let totalError = 0

    for (let i = 0; i < length; i++) {
        const dwellDiff = Math.abs(profile[i].dwell - attempt[i].dwell)
        const flightDiff = Math.abs(profile[i].flight - attempt[i].flight)
        totalError += dwellDiff + flightDiff
    }

    const avgError = totalError / length
    const score = Math.max(0, 1 - avgError / 300)

    return score
}