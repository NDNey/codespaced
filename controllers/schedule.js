const newSteps = [1, 10, 6]
const graduatingInterval = 1
const easyInterval = 4
const startingEase = 250

const easyBonus = 230
const internalModifier = 100
const maximunInterval = 36500

const lapsesSteps = [10]
const newInterval = 70
const minimunInterval = 1

class Card {
    constructor() {
        this.status = 'learning'
        this.stepsIndex = 0
        this.easeFactor = startingEase
        this.interval = null
    }
}

function schedule(card, response) {
    if (card.status == 'learning') {
        if (response == 'repeat') {
            card.stepsIndex = 0
            return minutesToDays(newSteps[card.stepsIndex])
        } else if (response == 'good') {
            card.stepsIndex += 1
            if (card.stepsIndex < newSteps.length) {
                return minutesToDays(newSteps[card.stepsIndex])
            } else {
                card.status = 'learned'
                card.interval = graduatingInterval
                return card.interval
            }
        } else if (response == 'easy') {
            card.status = 'learned'
            card.interval = easyInterval
            return easyInterval
        } else if (response == 'hard') {
            card.stepsIndex = 2
            return minutesToDays(newSteps[card.stepsIndex])
        } else {
            console.log("you can't press this button / we don't know how to deal with this case")
        }
    } else if (card.status == 'learned') {
        if (response == 'repeat') {
            card.status = 'relearning'
            card.stepsIndex = 0
            card.easeFactor = Math.max(230, card.easeFactor - 20)
            card.interval = Math.max(minimunInterval, card.interval * newInterval / 100)
            return minutesToDays(lapsesSteps[0])
        } else if (response == 'hard') {
            if (card.easeFactor < 230) {
                card.status = 'relearning'
                card.stepsIndex = 0
                card.easeFactor = Math.max(230, card.easeFactor - 15)
                card.interval = Math.max(minimunInterval, card.interval * newInterval / 100)
                return card.interval
            }
            card.easeFactor = Math.max(230, card.easeFactor - 15)
            card.interval = card.interval * 0.2 * card.easeFactor / 100 * (internalModifier / 100)
            return Math.min(maximunInterval, card.interval)
        } else if (response == 'good') {
            card.interval = (card.interval * card.easeFactor / 100
                * internalModifier / 100)
            return Math.min(maximunInterval, card.interval)
        } else if (response == 'easy') {
            card.easeFactor += 15
            card.interval = (card.interval * card.easeFactor / 100
                * internalModifier / 100 * easyBonus / 100)
            return Math.min(maximunInterval, card.interval)
        } else {
            console.log("you can't press this button / we don't know how to deal with this case")
        }
    } else if (card.status == 'relearning') {
        if (response == 'repeat') {
            card.stepsIndex = 0
            return minutesToDays(lapsesSteps[0])
        } else if (response == 'good') {
            card.stepsIndex += 1
            if (card.stepsIndex < lapsesSteps.length) {
                return minutesToDays(lapsesSteps[card.stepsIndex])
            } else {
                card.status = 'learned'
                return card.interval
            }
        } else {
            card.status = 'learned'
            return card.interval
        }
    } else {
        console.log("you can't press this button / we don't know how to deal with this case")
    }
}



function minutesToDays(minutes) {
    return minutes / (60 * 24)
}

function humanFrendlyTime(days) {
    if (!days) {
        return days
    }
    if (days < 1) {
        return Math.round(days * 24 * 60) < 60 ? `${Math.round(days * 24 * 60)}  Min` : `${Math.round(days * 24)} H`
    } else if (days < 30) {
        return `${Math.round(days)} D`
    } else if (days < 365) {
        return `${Math.round(days / (365.25 / 12))}  M`
    } else {
        return `${Math.round(days / 365.25)} Y`
    }

}



function newDate(days, date) {
    date = new Date(date)
    let time = 0
    if (!days) {
        return date
    }
    if (days < 1) {
        return date
    } else if (days < 30) {
        time = Math.round(days)
        return new Date(date.setDate(date.getDate() + time))
    } else if (days < 365) {
        time = Math.round(days / (365.25 / 12))
        return new Date(date.setMonth(date.getMonth() + time))
    } else {
        time = Math.round(days / 365.25)
        return new Date(date.setFullYear(date.getFullYear() + time))
    }

}


module.exports = {
    execute: (responses, date) => {
        let nextSession = {}
        let card = new Card
        let nextTime
        console.log(responses)
        for (let i = 0; i < responses.length; i++) {
            nextTime = schedule(card, responses[i])

        }
        nextSession.studyDate = newDate(nextTime, date)

        let hard = card
        let good = card
        let easy = card

        nextSession.hard = humanFrendlyTime(schedule(hard, 'hard'))
        nextSession.good = humanFrendlyTime(schedule(good, 'good'))
        nextSession.easy = humanFrendlyTime(schedule(easy, 'easy'))


        return nextSession

    }

}