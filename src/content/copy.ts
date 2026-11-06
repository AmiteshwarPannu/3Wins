/** Marketing copy, kept apart from rendering. `em` lines get the serif accent. */
export type HeadlineLine = { text: string; em?: boolean }

export const hero = {
  eyebrow: 'Your daily progress, reimagined.',
  headline: [{ text: 'Three wins.' }, { text: 'Every day.' }, { text: 'A different you.', em: true }] as HeadlineLine[],
  body: "Stop measuring your days by everything you didn't do. Focus on three things that matter, build consistency, and see how far you can go.",
  primaryCta: 'Start Winning',
  secondaryCta: 'See How It Works',
}

export const problem = {
  eyebrow: 'The problem',
  headline: [{ text: 'Busy all day.' }, { text: 'But moving nowhere?', em: true }] as HeadlineLine[],
  body: 'You cross things off lists. You answer messages. You stay busy. But at the end of the day, can you honestly say what moved you forward?',
  audience: "Whether you're studying, shipping, building something of your own, or just trying to get back on track, you know this feeling.",
  list: [
    'Clear the inbox',
    'Reply to the group chat',
    'Sit through the status meeting',
    'Rename the project files',
    'Answer one more message',
    'Reschedule the dentist',
    'Tidy the notes app',
    'Follow up on the follow-up',
    'Update the spreadsheet',
    'Skim the newsletter',
    'Find that old receipt',
    'Close forty browser tabs',
  ],
  listQuestion: 'What moved you forward?',
  turn: "Progress doesn't need a longer to-do list.",
}

export const philosophy = {
  eyebrow: 'The idea',
  headline: [{ text: 'Just three.' }, { text: "That's the point.", em: true }] as HeadlineLine[],
  body: 'Not thirty tasks. Three things you actually did that mattered. Write them down, and the day stops being a blur.',
  wins: [
    { n: '01', text: 'Finished my workout.', tag: 'Fitness' },
    { n: '02', text: 'Studied for 90 minutes.', tag: 'Study' },
    { n: '03', text: 'Made progress on my side project.', tag: 'Coding' },
  ],
  closer: "A good day doesn't have to be a perfect day.",
}

export const howItWorks = {
  eyebrow: 'How it works',
  headline: [{ text: 'Three steps.' }, { text: 'Then do it again tomorrow.', em: true }] as HeadlineLine[],
  steps: [
    { n: '1', title: 'Show up.', body: 'Open 3 Wins and record the three things that made your day meaningful.' },
    { n: '2', title: 'Build momentum.', body: 'Organize your wins into personal disciplines and watch consistency turn into streaks.' },
    { n: '3', title: 'See your progress.', body: "Explore your activity, analytics, and monthly reflections to see what you've actually accomplished." },
  ],
}

export const streaks = {
  eyebrow: 'Disciplines and streaks',
  headline: [{ text: 'Consistency looks' }, { text: 'good on you.', em: true }] as HeadlineLine[],
  body: 'Every win is a step forward. Every streak tells the story of showing up.',
  disciplines: [
    { id: 'fitness', label: 'Fitness', seed: 11, current: 12, longest: 31, density: 0.86 },
    { id: 'coding', label: 'Coding', seed: 27, current: 23, longest: 44, density: 0.94 },
    { id: 'study', label: 'Study', seed: 41, current: 8, longest: 26, density: 0.8 },
    { id: 'reading', label: 'Reading', seed: 58, current: 5, longest: 19, density: 0.62 },
    { id: 'business', label: 'Business', seed: 73, current: 16, longest: 22, density: 0.72 },
  ],
  points: [
    { title: 'Name what matters.', body: 'Create your own disciplines, from Fitness to Coding to whatever you are working on.' },
    { title: 'Give every win a home.', body: "Assign a win to a discipline and that discipline's streak keeps moving." },
    { title: 'Watch a year fill in.', body: 'Current streak, longest streak, and a full grid of days you showed up.' },
  ],
  disclaimer: "Illustrative preview. Not a real user's statistics.",
}

export const features = {
  eyebrow: 'Beyond the streak',
  headline: [{ text: 'Small system.' }, { text: 'Serious depth.', em: true }] as HeadlineLine[],
  note: 'Illustrative previews with example data.',
  study: { title: 'Make every minute count.', body: 'Track your focus sessions, understand your study habits, and see the hours add up.' },
  analytics: { title: 'Know where your effort goes.', body: 'Turn daily accomplishments into a clearer picture of your consistency.' },
  wrap: { title: 'A month of effort. One powerful perspective.', body: 'Relive your highlights, study milestones, and consistency with your personal monthly recap.' },
  detox: { title: 'Progress includes slowing down.', body: 'Make room to reset with a simple weekly detox planner.' },
  rewards: { title: 'Work first. Play earned.', body: 'Turn focused study time into gaming time with a reward system you control.' },
  extras: 'Every past day stays one click away, and your wins live in your own secure account.',
}

export const brandMoment = {
  first: "One day won't change your life.",
  second: 'But what you do every day might.',
  closing: ['Three meaningful wins.', 'Repeated.', 'Remembered.', 'Built upon.'],
}

export const reviews = {
  eyebrow: 'Reviews',
  headline: [{ text: 'Real progress.' }, { text: 'Real people.', em: true }] as HeadlineLine[],
  sampleNotice: 'Sample content. These are placeholders, not real reviews.',
}

export const pricingCopy = {
  eyebrow: 'Pricing',
  headline: [{ text: 'Your next chapter' }, { text: 'starts with three wins.', em: true }] as HeadlineLine[],
  body: "Build momentum. Stay consistent. See what you're capable of.",
}

export const finalCta = {
  headline: [{ text: "A year from now, you'll" }, { text: 'wish you started today.', em: true }] as HeadlineLine[],
  body: 'Start with three wins.',
  cta: 'Start Winning',
}

export const footer = { statement: 'Make every day count.' }
