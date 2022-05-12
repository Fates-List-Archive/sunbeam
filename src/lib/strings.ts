interface Translation {
    [lang: string]: string;
}

interface TranslationData {
    [key: string]: Translation;
}

// A work in progress

export let translations: TranslationData = {
    "index.best_bots": {
        en: "Find the best bots for your servers!",
    },
    "index.best_servers": {
        en: "Find the best servers to join!",
    },
    "MemberNotFound": {
        en: "You are not on our support server!",
    },
    "Forbidden": {
        en: "You are not allowed to do that!",
    },
    "NotFound": {
        en: "Hmmm... We couldn't find that!",
    },
    "InvalidFields": {
        en: "Something went wrong! We have detected invalid fields!",
    },
    "LoginRequired": {
        en: "You need to be logged in to perform this action (joining login-only servers, adding bots)!",
    },
    "NotAcceptingInvites": {
        en: "This server is private and not accepting invites at this time",
    },
    "Blacklisted": {
        en: "You are blacklisted from joining this server!",
    },
    "StaffReview": {
        en: "This server is currently under review by Fates List Staff and not accepting invites at this time!",
    },
    "ServerBanned": {
        en: "This server has been banned (or denied due to requiring small changes) from Fates List. If you are a staff member of this server, contact Fates List Support for more information.",
    },
    "NoChannelFound": {
        en: "Could not find channel to invite you to... Please ask the owner of this server to set an invite or set the invite channel for this server",
    },
    "SQLError": {
        en: "Whoa there! Something went wrong! We have detected a SQL error!",
    },
    "RequestError": {
        en: "Something went wrong in our internal connections! Please try again later!",
    },
    "NonceTooOld": {
        en: "Nonce too old. Please try logging in again!",
    },
    "CheckBotError.AlreadyExists": {
        en: "This bot already exists on Fates List",
    },
    "CheckBotError.ClientIDImmutable": {
        en: "Client ID cannot be changed once set",
    },
    "CheckBotError.PrefixTooLong": {
        en: "Prefix must be shorter than 9 characters"
    },
    "CheckBotError.NoVanity": {
        en: "You must have a vanity for your bot. This can be your username. You can prefix it with _ (underscore) if you don't want the extra growth from it. For example _mewbot would disable the mewbot vanity"
    },
    "CheckBotError.VanityTaken": {
        en: "This vanity has already been taken. Please contact Fates List staff if you wish to report this!",
    },
    "CheckBotError.InvalidInvitePermNum": {
        en: "This invites permissions are invalid!"
    },
    "CheckBotError.InvalidInvite": {
        en: "Your invite link must start with https://"
    },
    "CheckBotError.ShortDescLengthErr": {
        en: "Your description must be at least 10 characters long and must be a maximum of 200 characters"
    },
    "CheckBotError.LongDescLengthErr": {
        en: "Your long description must be at least 200 characters long"
    },
    "CheckBotError.BotNotFound": {
        en: "According to Discord's API and our cache, your bot does not exist. Please try again after 2 hours."
    },
    "CheckBotError.NoTags": {
        en: "You must select tags for your bot"
    },
    "CheckBotError.TooManyTags": {
        en: "You can only select up to 10 tags for your bot"
    },
    "CheckBotError.TooManyFeatures": {
        en: "You can only select up to 5 features for your bot"
    },
    "CheckBotError.EditLocked": {
        en: "This bot has either been locked by staff or has been edit locked by the main owner of the bot"
    },
    "CheckBotError.OwnerListTooLong": {
        en: "The owner list is too long. You may only have a maximum of 5 extra owners"
    },
    "CheckBotError.ClientIDNeeded": {
        en: "Client ID is required for this bot or is incorrect"
    },
    "CheckBotError.InvalidClientID": {
        en: "Client ID inputted is invalid for this bot"
    },
    "CheckBotError.PrivateBot": {
        en: "This bot is private and cannot be added to Fates List"
    },
    "CheckBotError.OwnerIDParseError": {
        en: "An owner ID in your owner list is invalid (hint: not a snowflake)"
    },
    "CheckBotError.OwnerNotFound": {
        en: "An owner ID in your owner list does not exist",
    },
    "CheckBotError.MainOwnerAddAttempt": {
        en: "You cannot add a main owner as an extra owner",
    },
    "CheckBotError.ExtraLinkKeyTooLong": {
        en: "One of your extra link keys is too long"
    },
    "CheckBotError.ExtraLinkValueTooLong": {
        en: "One of your extra link values is too long"
    },
    "CheckBotError.ExtraLinkValueNotHTTPS": {
        en: "One of your extra link values is not a valid URL (hint: check that its HTTPS and not HTTP)",
    },
    "CheckBotError.ExtraLinksTooManyRendered": {
        en: "You have too many renderable extra links (extra links that do not start with an underscore)",
    },
    "CheckBotError.ExtraLinksTooMany": {
        en: "You have too many extra links. Try removing some?"
    },
    "CheckBotError.BannerPageError": {
        en: "An error occurred while fetching the banner page for validation...",
    },
    "CheckBotError.BannerCardError": {
        en: "An error occurred while fetching the banner card for validation...",
    },
    "CheckBotError.JAPIError": {
        en: "An error occurred while our anti-abuse provider handled your bot...",
    },
    "CheckBotError.JAPIDeserError": {
        en: "An error occurred while our anti-abuse provider handled your bot...",
    }
};

export function getString(key: string, lang: string = "en"): string {
    if(translations[key] && translations[key][lang]) {
        return translations[key][lang]
    } else if(translations[key] && translations[key]["en"]) {
        return translations[key]["en"]
    } else {
        return key
    }
}

export function genError(json): string {
    return getString(json.reason) + "<br/><br/>" + (json.context || "")
}