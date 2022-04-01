const Quotes = [
    "What time did you sleep yesternight?",
    "NEVER, NEVER, NEVER!",
    "What did you get, Megan?",
    "Is that correct, Megan?",
    "I'm shua.",
    "Hey, hey, hey, hey, hey, hey, hey!",
    "Don't, don't, don't!",
    "No two ways about it.",
    "Double attention.",
    "Cenimetas.",
    "Don't quickly round. Why am I saying this?",
    "Am I talking heiroglyphics here?",
    "Jesus, come down!",
    "It is a punishable offence!",
    "If it's not you, I'm sure it's you!",
    "Okey, okey, thank you for that.",
    "How maaaaany?",
    "You are not wrong. You are right. It was only that it wasn't correct.",
    "I don't like tests on Wednesdays.",
    "Clearly, this is the correct answer.",
    "Scattered about.",
    "Next question!",
    "You must go an extra mile.",
    "No playing in the lab!",
    "Please dismantle that big group.",
    "Ah, that Megan. She's a funny girl.",
    "That's very correct.",
    "Physical quantitie.",
    "Don't let this test shatter you in pieces.",
    "Never use an awkward scale!",
    "It may look nice to use a star, but it is not acceptable.",
    "A biiiiig dot is not acceptable.",
    "You could have done even much better.",
    "Ah, I'm getting very tired.",
    "I laughed to myself.",
    "Scala.",
    "Okey, let's look at another situation.",
    "Am I... daydreaming?",
    "That's our other business.",
    "Think of... say... a large stone.",
    "Don't be afraid of the jungle here!",
    "Head, dash, to, dash, tail.",
    "V... V... V!",
    "Not a too big sketch.",
    "How appropriate is appropriate?",
    "We constructed a triangle using two sides of a... triangle.",
    "Much more... easier.",
    "It is not open-book. It is open-mind.",
    "No, no, no, no, no, no, no, NO, NO, NO!",
    "Ella and friend... please pay attention.",
    "I'm thinking of... what point can I give you?",
    "Comma... comma... comma!",
    "I'm always lost.",
    "When choosing the scale, you need to be very careful.",
    "If it covers three quarters... supa!",
    "4 point something else.",
    "They are different but... the same.",
    "Don't talk. Only communicate with your pen and paper.",
    "In that case, it miiight not be accept.",
    "Let's, let's, yehss!",
    "(Kettle noises)",
    "Josh. Ah, not Josh... Jubulani!",
    "Nice notes are nice.",
    "I'm a prophet. Do you believe me? You can't! But I am!",
    "Every hour also has 60... seconds.",
    "No jokes for now.",
    "Please don't start a war!",
    "We can make our discussion much, much, pretty better.",
    "Megan! If I am talking, please listen.",
    "Fertical!",
    "Duncan, tell them to not make noise!",
    "Michael, I saw you kick the ball.",
    "Tawana, sit upright please. Tawana, sit upright please. Tawananyasha!",
    "Ah, your notes are too nice!",
    "How almost is almost?",
    "Jessica! Jessica! How are you Jessica?",
    "Vicious drags!",
    "I'm imprisoning myself!",
    "By a system, I'm talking of a system.",
    "I will give you a feel for the relative speed!",
    "They approach each.",
    "Think, but not too much!",
    "Please, please, please, I'm begging you!",
    "Duncan, can we stop the laughing please?",
    "Reveision test."
]

function getDate() {
    let time = new Date();
    time.setUTCHours(0, 0, 0, 0);

    return time.valueOf();
}

function generateQuote() {
    let seed = getDate();

    let index = Math.sin(seed++) * 10000;
    index -= Math.floor(index);
    index = Math.floor(index * Quotes.length);

    return Quotes[index];
}

document.getElementsByClassName("quote")[0].textContent = generateQuote();