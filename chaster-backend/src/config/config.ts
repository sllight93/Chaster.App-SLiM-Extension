export let homeActions = [{
    slug: "vote",
    title: "Daily quota not reached!",
    description: "You need to fulfill your daily quota! Send your shared link to more people.",
    icon: "fa-link",
    badge: "5",

}]

export let reasonsPreventingUnlocking = [{
    reason: "You need to collect more votes in order to unlock! Send your shared link to more people.",
    icon: "fa-link",
}]

export let data = {
    data: {
        votes: {
            total: 0,
            eligible: 0,
            today: 0
        }
  } 
}

export const config = {
    config: {
        difficulty: [
        {
            type: "invert",
            weight: 40
        },
        {
            type: "double",
            weight: 40
        },
        {
            type: "double_invert",
            weight: 25
        },
        {
            type: "jackpot",
            weight: 1
        },
        {
            type: "nothing",
            weight: 320
        }
        ],
        votes_target: 56,
        hardcore: false,
        split: 50,
        daily_quota: 5,
        punish_mult: 1.0
    }
}