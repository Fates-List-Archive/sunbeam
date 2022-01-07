enum BotState {
        approved =           0,
        pending =            1,
        denied =             2,
        hidden =             3,
        banned =             4,
        under_review =       5,
        certified =          6,
        archived =           7,
        private_viewable =   8,
        private_staff_only = 9,
}

export let enums = {
    BotState: BotState,
    Flags: {
        unlocked:      0,
        edit_locked:   1,
        staff_locked:  2,
        stats_locked:  3,
        vote_locked:   4,
        system:        5,
    },
    LongDescType: {
	html:                0,
	markdown_pymarkdown: 1,
    	markdown_marked:     2
    },
    helpers: {
        flagCheck: function(flags: number[] | number, allFlags: number[]) {
            // Function start
            let flagsParsed: number[] = []
            if(typeof flags === "number") {
                flagsParsed.push(flags)
            } else {
                flagsParsed = flags
            }

            return flagsParsed.some(item => allFlags.includes(item))
            // End of function
        }
    }
}
