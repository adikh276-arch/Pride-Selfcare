"use client";
import portrait0 from "../assets/portrait_0.jpg";
import portrait1 from "../assets/portrait_1.jpg";
import portrait2 from "../assets/portrait_2.jpg";
import portrait3 from "../assets/portrait_3.jpg";
import portrait4 from "../assets/portrait_4.jpg";
import portrait5 from "../assets/portrait_5.jpg";
import portrait6 from "../assets/portrait_6.jpg";
import portrait7 from "../assets/portrait_7.jpg";
import portrait8 from "../assets/portrait_8.jpg";

import avatar0 from "../assets/avatar_0.jpg";
import avatar1 from "../assets/avatar_1.jpg";
import avatar2 from "../assets/avatar_2.jpg";
import avatar3 from "../assets/avatar_3.jpg";

export interface StoryColor {
  stripe: string;
  tagBg: string;
  tagText: string;
  hlBg: string;
  takeBg: string;
  border: string;
}

export interface Story {
  name: string;
  age: number;
  color: StoryColor;
  identity: string;
  quote: string;
  story: string[];
  highlight: string;
  takeaway: string;
  portrait: string;
  avatar: string;
}

export const stories: Story[] = [
  {
    name: "Priya",
    age: 17,
    color: {
      stripe: "#e8445a",
      tagBg: "#fde8eb",
      tagText: "#e8445a",
      hlBg: "#fff0f2",
      takeBg: "#fff8f9",
      border: "#e8445a"
    },
    identity: "Bisexual",
    quote: "I thought I had to pick a side. I didn't know being both was allowed.",
    story: [
      "I'd had crushes on girls since I was twelve, but I also liked boys   so I kept telling myself I wasn't 'really' queer. Bisexuality, as I'd heard it described at school, meant you were greedy, or confused, or going through a phase before you picked a team. I internalized that completely. Every time I felt something for a girl, I'd remind myself that I also liked boys   so it didn't count. Every time I felt something for a boy, I'd think: see, you're straight after all.",
      "The mental gymnastics were exhausting. For two years I oscillated between two identities that both felt equally half-true. I'd read articles about bisexuality online late at night, feel something click into place, and then close the tab because it still felt like too much to claim. Like I hadn't earned it. Like someone would test me and I'd fail.",
      "When I finally said the word out loud to my best friend Pooja during a sleepover, my voice shook. She was quiet for a second. And then she said: 'Okay, and?' That 'and' changed everything. Not because she made a big deal of it   but because she didn't. In that second I understood that the only person who had been making this a huge complicated problem was me."
    ],
    highlight: "You don't need to earn your identity. You already own it.",
    takeaway: "If you've been told your feelings are 'just a phase'   that says more about the world's limited imagination than about who you are. Bisexuality is not confusion. It is a complete, valid orientation that doesn't require justification or proof.",
    portrait: portrait0,
    avatar: avatar0
  },
  {
    name: "Arjun",
    age: 19,
    color: {
      stripe: "#9b5de5",
      tagBg: "#f3e8ff",
      tagText: "#9b5de5",
      hlBg: "#f8f0ff",
      takeBg: "#fcf8ff",
      border: "#9b5de5"
    },
    identity: "Gay",
    quote: "My family's reaction wasn't what I feared. It was better   and sometimes worse. Both at once.",
    story: [
      "I rehearsed for six months. Sitting on the edge of my bed, in the shower, on the bus   running through every version of the conversation. I planned for every response: the angry one, the crying one, the silent one. What I didn't plan for was the complicated one. The one where my mom cried not because she was angry, but because she was scared for me. And my dad went quiet for three days   not in rejection, but in processing.",
      "Coming out to South Asian parents is its own particular experience. There's the weight of cultural expectation, of everything unspoken, of 'what will people say.' My parents are good people   I knew that   but good people can still hold beliefs that hurt you. I had to hold both things at once: love for them, and grief for the fact that my truth was, at first, hard for them to receive.",
      "In the weeks after, we had more honest conversations than in the previous nineteen years combined. My mom told me she was worried I'd face discrimination, that life would be harder for me. My dad said he needed time to understand. I gave him time. I gave them both time. Not because I owed it to them   but because I loved them and I could see they were trying."
    ],
    highlight: "You can love your family and need them to grow. That's not weakness   that's hope.",
    takeaway: "Coming out to family can be the hardest thing. Give yourself permission to feel grief if the response isn't what you needed   and give people who love you time to understand, if that feels safe. You deserve both honesty and love. They are not mutually exclusive.",
    portrait: portrait1,
    avatar: avatar1
  },
  {
    name: "Zara",
    age: 15,
    color: {
      stripe: "#f72585",
      tagBg: "#ffe0f0",
      tagText: "#f72585",
      hlBg: "#fff0f8",
      takeBg: "#fff8fc",
      border: "#f72585"
    },
    identity: "Questioning",
    quote: "I don't have a label yet. And someone finally told me that's completely fine.",
    story: [
      "When I was thirteen, everyone around me seemed to know exactly what they were. My friends talked about celebrity crushes with certainty, they knew who they liked, everything seemed settled. I'd look at myself and feel a question mark. Not just about who I liked   but about gender, about how I fit in the world, about whether the categories I'd been given were the right ones for me at all.",
      "I spent a long time pretending to have answers I didn't have. It felt easier than saying 'I don't know yet.' Saying 'I don't know' felt like a failure, like I'd missed a lesson everyone else attended. I tried on labels like clothes in a changing room   none of them quite fit, and that scared me.",
      "At fifteen I found an online community for questioning teens. For the first time I wasn't the only person without an answer. Some people in the group had been questioning for years and were genuinely comfortable there. One person wrote something that I've kept ever since: 'Questioning is not a waiting room. It's a room you're allowed to live in.' I cried when I read that."
    ],
    highlight: "A question mark can be the most honest thing you are right now.",
    takeaway: "You do not need a label to deserve community, support, or celebration. Questioning is a valid and often ongoing experience. Take as long as you need. The only person who gets to decide when you have enough answers is you.",
    portrait: portrait2,
    avatar: avatar2
  },
  {
    name: "Kai",
    age: 20,
    color: {
      stripe: "#4361ee",
      tagBg: "#eaefff",
      tagText: "#4361ee",
      hlBg: "#f0f4ff",
      takeBg: "#f8faff",
      border: "#4361ee"
    },
    identity: "Non-binary",
    quote: "I spent years trying to be a better version of something I was never meant to be.",
    story: [
      "I was assigned female at birth, and for most of my childhood I tried   really sincerely tried   to make 'girl' fit. I wore the clothes, I used the pronouns, I did all of it. But it was like walking around in someone else's shoes every single day. Not agonising, just... persistently wrong. I kept thinking: maybe I just need to try harder. Maybe the discomfort is something everyone feels and I'm being dramatic.",
      "I didn't know the word 'non-binary' until I was seventeen. When I found it, the thing I felt wasn't a firework   it was quieter than that. It was like finally exhaling after holding a long breath. A recognition: oh, this is allowed. This is a thing that exists. There are other people who live in this particular in-between and have built a whole life there.",
      "Changing my name to Kai took six months of private practice. I'd introduce myself to my own reflection. Then I told one friend, then another. When my closest friends started using Kai naturally, without fanfare, I noticed I'd stop tensing when someone called my name. It stopped being a small grief every time."
    ],
    highlight: "Gender isn't a test you pass or fail. It's something you discover, at your own pace, on your own terms.",
    takeaway: "The right people will use your name and pronouns consistently, without making you feel like a burden for asking. You deserve that ease. It exists   you may just need to find your people.",
    portrait: portrait3,
    avatar: avatar3
  },
  {
    name: "Sofia",
    age: 18,
    color: {
      stripe: "#43aa8b",
      tagBg: "#e8f8f3",
      tagText: "#43aa8b",
      hlBg: "#f0fbf7",
      takeBg: "#f8fdfa",
      border: "#43aa8b"
    },
    identity: "Lesbian",
    quote: "I came out through a playlist. Seventeen love songs about girls, and not one was about a boy.",
    story: [
      "I didn't plan to come out. I didn't write a speech or choose a moment. What I did was start, slowly, being more openly myself   the music I let play on speaker in my room, the way I talked about which actors were attractive, the jokes I stopped laughing at because they weren't actually funny. I was becoming more honest by degrees, and the people paying attention noticed before I said anything.",
      "My friend group had a group chat. One day I shared a song   Lucy Dacus, 'Thumbs'   and someone replied with 'wait, wait, wait. Sofia are you ?' And then the messages started coming in. Six people typing at once. An explosion of 'WE KNEW IT' and 'WE HAVE BEEN WAITING' and three rainbow emojis in a row. I was crying and laughing simultaneously. It was the least dramatic coming out in history and also somehow the best.",
      "What followed was a period of actual relief. Not just about the identity   but about the performance I'd been doing without realizing it. I hadn't been lying, exactly. I just hadn't been fully present. After, I could talk about crushes the way my friends did. I could get excited about someone without translating it into neutral language. I could just exist in conversations about love without quietly standing to the side."
    ],
    highlight: "You get to decide how, when, and to whom you come out. There's no script, and there's no wrong way to do it with care.",
    takeaway: "Coming out is not a single event   it's a practice of being honest with yourself and selective others, for the rest of your life. You control the pace, the audience, and the method. There's no deadline.",
    portrait: portrait4,
    avatar: portrait4
  },
  {
    name: "Rama",
    age: 16,
    color: {
      stripe: "#f4824a",
      tagBg: "#fdeee6",
      tagText: "#f4824a",
      hlBg: "#fff4ef",
      takeBg: "#fff9f7",
      border: "#f4824a"
    },
    identity: "Trans boy",
    quote: "Every time someone used my real name, I felt a little more real.",
    story: [
      "For fourteen years I answered to a name that felt like a costume. People meant well   they used it with love, I know that. But every time I heard it, something in me quietly contracted. It was like being constantly, gently misidentified. Not violently   that came later, in other forms   but persistently. A low-grade static that you learn to tune out until suddenly you can't anymore.",
      "When I was thirteen I started researching. I didn't know the word 'transgender'   I just knew I didn't feel like what people were calling me. I found forums, then YouTube videos, then books. I discovered that what I was feeling had language. That there were other people who'd felt exactly this, had named it, had built lives on the other side of naming it.",
      "I told my school counsellor first. Not my parents   I wasn't ready for that yet. She asked me one question: 'What name would you like me to use?' That was it. No interrogation, no therapy referral, no calling my parents. Just: what do you want to be called? I said Rama. She said: 'Okay, Rama.' I shook for an hour afterwards. In the good way."
    ],
    highlight: "A name is not just a word. It's a declaration that you exist as you actually are.",
    takeaway: "If you're trans or questioning your gender, you deserve to be called by the name and pronouns that fit you. You don't have to justify this to anyone. Find one person who gets it   a counsellor, a friend, an online community   and let that be enough, for now.",
    portrait: portrait5,
    avatar: portrait5
  },
  {
    name: "Tina",
    age: 21,
    color: {
      stripe: "#d4a017",
      tagBg: "#fef9e7",
      tagText: "#b8860b",
      hlBg: "#fefae8",
      takeBg: "#fdfcf2",
      border: "#d4a017"
    },
    identity: "Asexual",
    quote: "I thought something was broken in me. Turns out, nothing was missing at all.",
    story: [
      "For most of my teenage years, the world around me seemed to be having an experience I wasn't. Friends talked about physical attraction with this automatic, visceral certainty   they'd see someone and feel pulled. I'd look at the same people and think: yes, they seem kind, or: I can see why people find them interesting. But that urgent pull everyone described? I kept waiting for it to arrive. I assumed I was a late bloomer.",
      "By eighteen, I'd had two relationships that ended partly because of this. I cared about both people. I liked spending time with them, felt affection, wanted their company. But the physical dimension of the relationship felt like something I was performing because it was expected   something I did because I thought I was supposed to want it, not because I actually did. I blamed myself. I read articles about 'low libido,' tried to figure out what was wrong with me.",
      "At twenty I found the word asexual. And then aromantic. I spent two weeks reading   obsessively, relief building with every page. Not because I finally had a label, but because I finally understood that I wasn't broken. The experience I'd been having   experiencing emotional connection without the pull toward physical intimacy   had a name, and a community, and a lot of people who recognised exactly what I was describing."
    ],
    highlight: "The absence of something everyone else describes doesn't make you less. It makes you exactly who you are.",
    takeaway: "Asexuality is a valid orientation, not a phase, not a medical condition, not something to be fixed. If you've ever felt like everyone else was having an experience you weren't, and felt broken because of it   you're not alone, and there's a whole community waiting to tell you so.",
    portrait: portrait6,
    avatar: portrait6
  },
  {
    name: "Jordan",
    age: 23,
    color: {
      stripe: "#00b4d8",
      tagBg: "#e0f7fb",
      tagText: "#0077a8",
      hlBg: "#e8fafd",
      takeBg: "#f4fcfe",
      border: "#00b4d8"
    },
    identity: "Queer",
    quote: "Queer isn't just an identity. For me, it's a community I finally belong to.",
    story: [
      "I grew up in a small town where there wasn't a visible LGBTQ+ community. Or if there was, it was invisible   people quietly existing in their lives without public language for it. I knew I was different from a young age, but 'different' was the only word I had. I didn't have models for what I could be. I just knew that the stories about who was supposed to love whom didn't match what was happening inside me.",
      "At twenty I moved to a city. The first few months I was just surviving   new job, new apartment, no one I knew. Then my coworker mentioned she was going to Pride and asked if I wanted to come. I said yes without thinking. I'd never been to a Pride event before. I didn't know what to expect. Part of me thought it wasn't for me, because I still wasn't sure exactly who I was.",
      "I stood on a street corner in a crowd of people wearing every colour imaginable and I started crying. I didn't know why at first. By the end of the day I did. I had never, not once in my life, been in a space where people like me were the default. Where I didn't have to explain or qualify or shrink or carefully choose my words. Where the assumption was queerness, not heterosexuality. It was the first time I realised how much energy I'd spent, every day, navigating a world that wasn't designed for me."
    ],
    highlight: "The first time you feel truly surrounded by your people   remember that feeling. It's yours. You can return to it whenever the world gets small.",
    takeaway: "Finding community changes things. Even online community counts. Even one person who truly gets it counts. The loneliness many LGBTQ+ people feel is real and valid   and so is the belonging that becomes possible when you find your people.",
    portrait: portrait7,
    avatar: portrait7
  },
  {
    name: "Mila",
    age: 14,
    color: {
      stripe: "#6610f2",
      tagBg: "#ece5ff",
      tagText: "#6610f2",
      hlBg: "#f2ecff",
      takeBg: "#f9f7ff",
      border: "#6610f2"
    },
    identity: "Pan & proud",
    quote: "I came out to myself before anyone else. That was the hardest one.",
    story: [
      "I was thirteen when I wrote it in my diary. I wrote it and then immediately scribbled it out. Then I wrote it again. Then I closed the diary and slid it under my mattress and went and ate cereal at the kitchen table and tried to feel normal. I didn't tell anyone for four months. Not because I was scared of a big reaction   but because saying it out loud felt like making it more real, and I wasn't ready for it to be real yet.",
      "Coming out to yourself is its own thing. I don't think it gets talked about enough. The world focuses on the moment you tell someone else   the speech, the reaction   but before any of that there's this private, internal coming-out that happens in pieces. You notice something. You push it away. You notice it again. You let yourself look at it a little longer. You find a word. You try it on in the mirror. That process can take months or years, and every part of it is valid.",
      "The first person I told was my older cousin Dia, over text message, on a Tuesday afternoon. I typed it and hit send before I could change my mind. She replied in thirty seconds: three rainbow emojis and 'welcome to the family (the fun one).' I screamed into my pillow. Not from fear   from relief, from the specific joy of being known by someone you love."
    ],
    highlight: "Coming out to yourself first is the beginning of everything. You become a little more yours.",
    takeaway: "You are allowed to take all the time you need. You don't owe anyone your coming-out before you're ready. Coming out to yourself first   sitting with the truth privately   is valid and important. The rest can follow at your pace, on your terms.",
    portrait: portrait8,
    avatar: portrait8
  }
]
