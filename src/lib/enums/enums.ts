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

enum UserState {
    normal = 0,
    global_ban = 1,
    profile_edit_ban = 2,
    ddr_ban = 3, // Unused
    api_ban = 4 // Unused
}

enum UserBotAction {
    approve = 0,
    deny = 1,
    certify = 2,
    ban = 3,
    claim = 4,
    unclaim = 5,
    transfer_ownership = 6,
    edit_bot = 7,
}

enum ReviewType {
    bot = 0,
    server = 1,
}

enum CommandType {
    regular = 0,
    guild_slash = 1,
    global_slash = 2,
}

enum Flag {
    unlocked =     0,
    edit_locked =  1,
    staff_locked =  2,
    stats_locked =  3,
    vote_locked =   4,
    system =        5,
}

enum PageStyle {
    tabs = 0,
    single_view = 1,
}

export let enums = {
    BotState: BotState,
    UserState: UserState,
    UserBotAction: UserBotAction,
    CommandType: CommandType,
    ReviewType: ReviewType,
    PageStyle: PageStyle,
    Flags: Flag,
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
