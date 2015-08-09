const blakesBirthday = new Date(1994, 7, 14)
const keyuesBirthday = new Date(1996, 7, 12)
const anniversary = new Date(2013, 10, 30)

const primaryEl = <HTMLElement> document.querySelector('.primary')
const blakesEl = <HTMLElement> document.querySelector('.blake')
const keyuesEl = <HTMLElement> document.querySelector('.keyue')

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24
const YEAR = 365.25 * DAY

/**
 * Update each frame.
 */
function update () {
  const now = new Date()
  const duration = now.getTime() - anniversary.getTime()
  const blakesAge = now.getTime() - blakesBirthday.getTime()
  const keyuesAge = now.getTime() - keyuesBirthday.getTime()

  render(primaryEl, now, anniversary, duration * 2 / (blakesAge + keyuesAge))
  render(blakesEl, now, blakesBirthday, duration / blakesAge)
  render(keyuesEl, now, keyuesBirthday, duration / keyuesAge)

  setTimeout(update, 60)
}

setup(primaryEl)
setup(blakesEl)
setup(keyuesEl)

update()

/**
 * Render updates to the stats.
 */
function render (el: HTMLElement, now: Date, milestone: Date, percentage: number): void {
  const nextMilestone = new Date(milestone.getTime())
  const previousMilestone = new Date(milestone.getTime())

  nextMilestone.setFullYear(now.getFullYear())
  previousMilestone.setFullYear(now.getFullYear())

  if (now >= nextMilestone) {
    nextMilestone.setFullYear(now.getFullYear() + 1)
  } else {
    previousMilestone.setFullYear(now.getFullYear() - 1)
  }

  const totalYears = previousMilestone.getFullYear() - milestone.getFullYear()
  const percentageYear = (now.getTime() - previousMilestone.getTime()) /
    (nextMilestone.getTime() - previousMilestone.getTime())

  el.querySelector('.years').textContent = String(totalYears)
  el.querySelector('.decimal').textContent = percentageYear.toFixed(10).substr(1)
  el.querySelector('.percentage').textContent = (percentage * 100).toFixed(6) + '%'
}

/**
 * Setup the element for rendering.
 */
function setup (el: HTMLElement): void {
  el.innerHTML = `
    <div class="timer">
      <span class="years"></span>
      <span class="decimal"></span>
    </div>
    <div class="percentage"></div>
  `
}
