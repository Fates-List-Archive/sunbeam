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
        fr: "Trouvez les meilleurs bots pour vos serveurs!",
    },
    "index.best_servers": {
        en: "Find the best servers to join!",
        fr: "Trouvez les meilleurs serveurs à rejoindre!",
    },
    "MemberNotFound": {
        en: "You are not on our support server!",
        fr: "Vous n'êtes pas sur notre serveur de support!",
    },
    "Forbidden": {
        en: "You are not allowed to do that!",
        fr: "Vous n'êtes pas autorisé à faire cela!",
    },
    "NotFound": {
        en: "Hmmm... We couldn't find that!",
        fr: "Hum... Nous n'avons pas trouvé ce que vous cherchez!",
    },
    "InvalidFields": {
        en: "Something went wrong! We have detected invalid fields!",
        fr: "Quelque chose s'est mal passé! Nous avons détecté des champs invalides!",
    },
    "LoginRequired": {
        en: "You need to be logged in to perform this action (joining login-only servers, adding bots)!",
        fr: "Vous devez être connecté pour effectuer cette action (rejoindre des serveurs à accès limité, ajouter des bots)!",
    },
    "NotAcceptingInvites": {
        en: "This server is private and not accepting invites at this time",
        fr: "Ce serveur est privé et n'accepte pas les invitations pour le moment",
    },
    "Blacklisted": {
        en: "You are blacklisted from joining this server!",
        fr: "Vous êtes banni de rejoindre ce serveur!",
    },
    "StaffReview": {
        en: "This server is currently under review by Fates List Staff and not accepting invites at this time!",
        fr: "Ce serveur est actuellement en cours de révision par les membres du staff de Fates List et n'accepte pas les invitations pour le moment!",
    },
    "ServerBanned": {
        en: "This server has been banned (or denied due to requiring small changes) from Fates List. If you are a staff member of this server, contact Fates List Support for more information.",
        fr: "Ce serveur a été banni (ou refusé en raison de demander des modifications mineures) de Fates List. Si vous êtes un membre du staff de ce serveur, contactez le support de Fates List pour plus d'informations.",
    },
    "NoChannelFound": {
        en: "Could not find channel to invite you to... Please ask the owner of this server to set an invite or set the invite channel for this server",
        fr: "Impossible de trouver le channel pour vous fournir une invitation... Demandez au propriétaire de ce serveur de configurer un channel d'invitation ou définissez le channel d'invitation pour ce serveur",
    },
    "SQLError": {
        en: "Whoa there! Something went wrong! We have detected a SQL error!",
        fr: "Oups! Quelque chose s'est mal passé! Nous avons détecté une erreur SQL!",
    },
    "RequestError": {
        en: "Something went wrong in our internal connections! Please try again later!",
        fr: "Quelque chose s'est mal passé dans nos connexions internes! Veuillez réessayer plus tard!",
    },
    "NonceTooOld": {
        en: "Nonce too old. Please try logging in again!",
        fr: "Nonce trop vieux. Veuillez vous reconnecter!",
    },
    "BadExchange": {
        en: "Something went wrong while we tried to log you in!",
        fr: "Quelque chose s'est mal passé lors de la connexion!",
    },
    "BadExchangeJson": {
        en: "Something went wrong while we tried to log you in! Could be due to discord bugging out?",
        fr: "Quelque chose s'est mal passé lors de la connexion! Peut-être due à discord buggant?",
    },
    "NoUser": {
        en: "Could not find a user with that ID! Something serious just happened on our end! Contact support.",
        fr: "Impossible de trouver un utilisateur avec cet ID! Quelque chose s'est mal passé sur notre côté! Contactez le support.",
    },
    "CheckBotError.AlreadyExists": {
        en: "This bot already exists on Fates List",
        fr: "Ce bot existe déjà sur Fates List",
    },
    "CheckBotError.ClientIDImmutable": {
        en: "Client ID cannot be changed once set",
        fr: "L'ID client ne peut pas être modifié une fois défini",
    },
    "CheckBotError.PrefixTooLong": {
        en: "Prefix must be shorter than 9 characters",
        fr: "Le préfix doit être plus court que 9 caractères",
    },
    "CheckBotError.NoVanity": {
        en: "You must have a vanity for your bot. This can be your username. You can prefix it with _ (underscore) if you don't want the extra growth from it. For example _mewbot would disable the mewbot vanity",
        fr: "Vous devez avoir un vanity pour votre bot. Cela peut être votre pseudo. Vous pouvez le préfixer avec _ (underscore) si vous ne voulez pas l'extra-croissance de celui-ci. Par exemple _mewbot désactiverai le vanity mewbot",
    },
    "CheckBotError.VanityTaken": {
        en: "This vanity has already been taken. Please contact Fates List staff if you wish to report this!",
        fr: "Ce vanity a déjà été pris. Contactez le staff de Fates List si vous souhaitez signaler ceci!",
    },
    "CheckBotError.InvalidInvitePermNum": {
        en: "This invites permissions are invalid!",
        fr: "Ces permissions d'invitation sont invalides!",
    },
    "CheckBotError.InvalidInvite": {
        en: "Your invite link must start with https://",
        fr: "Votre lien d'invitation doit commencer par https://",
    },
    "CheckBotError.ShortDescLengthErr": {
        en: "Your description must be at least 10 characters long and must be a maximum of 200 characters",
        fr: "Votre description doit être d'au moins 10 caractères et ne doit pas dépasser 200 caractères",
    },
    "CheckBotError.LongDescLengthErr": {
        en: "Your long description must be at least 200 characters long",
        fr: "Votre description longue doit être d'au moins 200 caractères",
    },
    "CheckBotError.BotNotFound": {
        en: "According to Discord's API and our cache, your bot does not exist. Please try again after 2 hours.",
        fr: "Selon l'API de Discord et notre cache, votre bot n'existe pas. Veuillez réessayer après 2 heures.",
    },
    "CheckBotError.NoTags": {
        en: "You must select tags for your bot",
        fr: "Vous devez sélectionner des tags pour votre bot",
    },
    "CheckBotError.TooManyTags": {
        en: "You can only select up to 10 tags for your bot",
        fr: "Vous ne pouvez sélectionner un maximum de 10 tags pour votre bot",
    },
    "CheckBotError.TooManyFeatures": {
        en: "You can only select up to 5 features for your bot",
        fr: "Vous ne pouvez sélectionner qu'un maximum de 5 fonctionnalités pour votre bot",
    },
    "CheckBotError.EditLocked": {
        en: "This bot has either been locked by staff or has been edit locked by the main owner of the bot",
        fr: "Ce bot a été bloqué par le staff ou a été bloqué par le propriétaire principal du bot",
    },
    "CheckBotError.OwnerListTooLong": {
        en: "The owner list is too long. You may only have a maximum of 5 extra owners",
        fr: "La liste des propriétaires est trop longue. Vous ne pouvez avoir un maximum de 5 propriétaires supplémentaires",
    },
    "CheckBotError.ClientIDNeeded": {
        en: "Client ID is required for this bot or is incorrect",
        fr: "L'ID client est requis pour ce bot ou est incorrect",
    },
    "CheckBotError.InvalidClientID": {
        en: "Client ID inputted is invalid for this bot",
        fr: "L'ID client entré est invalide pour ce bot",
    },
    "CheckBotError.PrivateBot": {
        en: "This bot is private and cannot be added to Fates List",
        fr: "Ce bot est privé et ne peut pas être ajouté à Fates List",
    },
    "CheckBotError.OwnerIDParseError": {
        en: "An owner ID in your owner list is invalid (hint: not a snowflake)",
        fr: "Un ID de propriétaire dans votre liste est invalide (indice: pas un snowflake)",
    },
    "CheckBotError.OwnerNotFound": {
        en: "An owner ID in your owner list does not exist",
        fr: "Un ID de propriétaire dans votre liste n'existe pas",
    },
    "CheckBotError.MainOwnerAddAttempt": {
        en: "You cannot add a main owner as an extra owner",
        fr: "Vous ne pouvez pas ajouter un propriétaire principal comme propriétaire supplémentaire",
    },
    "CheckBotError.ExtraLinkKeyTooLong": {
        en: "One of your extra link keys is too long",
        fr: "Une de vos clés de lien supplémentaire est trop longue",
    },
    "CheckBotError.ExtraLinkValueTooLong": {
        en: "One of your extra link values is too long",
        fr: "Une de vos valeurs de lien supplémentaire est trop longue",
    },
    "CheckBotError.ExtraLinkValueNotHTTPS": {
        en: "One of your extra link values is not a valid URL (hint: check that its HTTPS and not HTTP)",
        fr: "Une de vos valeurs de lien supplémentaire n'est pas une URL valide (indice: vérifiez qu'il s'agit d'un HTTPS et non d'un HTTP)",
    },
    "CheckBotError.ExtraLinksTooManyRendered": {
        en: "You have too many renderable extra links (extra links that do not start with an underscore)",
        fr: "Vous avez trop de liens supplémentaires rendus (liens supplémentaires qui ne commencent pas par un underscore)",
    },
    "CheckBotError.ExtraLinksTooMany": {
        en: "You have too many extra links. Try removing some?",
        fr: "Vous avez trop de liens supplémentaires. Essayez de les enlever?",
    },
    "CheckBotError.BannerPageError": {
        en: "An error occurred while fetching the banner page for validation...",
        fr: "Une erreur est survenue lors de la récupération de la page de bannière pour validation...",
    },
    "CheckBotError.BannerCardError": {
        en: "An error occurred while fetching the banner card for validation...",
        fr: "Une erreur est survenue lors de la récupération de la carte de bannière pour validation...",
    },
    "CheckBotError.JAPIError": {
        en: "An error occurred while our anti-abuse provider handled your bot...",
        fr: "Une erreur est survenue lors du traitement de votre bot par notre systeme d'anti-abus...",
    },
    "CheckBotError.JAPIDeserError": {
        en: "An error occurred while our anti-abuse provider handled your bot...",
        fr: "Une erreur est survenue lors du traitement de votre bot par notre systeme d'anti-abus...",
    },
    "InvalidFlag": {
        en: "Illegal or otherwise non-edittable flag set on this profile",
        fr: "Le flag est illégal ou non éditable",
    },
    "VoteBotError.Wait": {
        en: "You've already voted recently!",
        fr: "Vous avez déjà voté récemment!",
    },
    "VoteBotError.UnknownError": {
        en: "An unknown error occurred. Please ask on the Fates List support server",
        fr: "Une erreur inconnue est survenue. Veuillez demander à Fates List sur le serveur de support",
    },
    "VoteBotError.System": {
        en: "This is a system bot or server and as such cannot be voted for at this time",
        fr: "Ceci est un bot système ou serveur et ne peut pas être voté pour pour le moment",
    },
    "VoteBotError.AutoroleError": {
        en: "For some odd reason, we have failed to give you autoroles for voting for this server. Are you on this server?",
        fr: "Pour une raison inconnue, nous n'avons pas pu vous attribuer des rôles automatiquement lors de votre vote pour ce serveur. Êtes-vous sur ce serveur?",
    },
    "ExpNotEnabled": {
        en: "Whoa there! You aren't whitelisted to access this top-secret experiment yet!",
        fr: "Whoa! Vous n'êtes pas autorisé à accéder à cet expérimentation secrète pour le moment!",
    },
    "CommandLengthError": {
        en: "This command is too long! Please try a shorter command name and/or description",
        fr: "Cette commande est trop longue! Veuillez essayer un nom de commande et/ou une description plus courte",
    },
    "StarRatingOutOfRange": {
        en: "Star rating must be between 1 to 10. How did <em>this</em> happen?",
        fr: "Le nombre d'étoiles doit être compris entre 1 et 10. Comment <em>ceci</em> est arrivé?",
    },
    "ReviewTextError": {
        en: "Review text must be between 10 and 20000 characters long!",
        fr: "Le texte de la critique doit être compris entre 10 et 20000 caractères!",
    },
    "ReviewAlreadyExists": {
        en: "You have already made a review for this bot. Please edit that instead!",
        fr: "Vous avez déjà fait une critique pour ce bot. Veuillez la modifier à la place!",
    },
    "ParentReviewInvalid": {
        en: "The parent ID you are trying to reply to is invalid. How did <em>this</em> happen?",
        fr: "L'ID du parent que vous essayez de répondre est invalide. Comment <em>ceci</em> est arrivé?",
    },
    "ReviewAlreadyVoted": {
        en: "You have already voted for this review! Please change that instead?",
        fr: "Vous avez déjà voté pour cette critique! Veuillez la changer à la place?",
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