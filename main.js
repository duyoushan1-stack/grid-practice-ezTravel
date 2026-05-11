const tourList = document.querySelector('.tour-list')
const tourContentGroup = document.querySelector('.tour-content')
const freeTripList = document.querySelector('.top-list')
const freeTripContentGroup = document.querySelector('.free-trip-content')
const bottomListGroup = document.querySelector('.bottom-list-content')
const bottomList = document.querySelector('.bottom-list')


// 日本跟團 - tab 和 tab 內容陣列
const tourTabArr = Array.from(tourList.children)
const tourGridArr = Array.from(tourContentGroup.children)

// 自遊最夯 - 上方 tab 和 tab 內容陣列
const freeTripTabArr = Array.from(freeTripList.children)
const freeTripGridArr = Array.from(freeTripContentGroup.children)
// 下方 tab 容器群組
const bottomTabGroup = Array.from(bottomListGroup.children) //ul

function switchTabs(list, tabArr, gridArr, bttArr) {
  list.addEventListener('click', (e) => {
    const target = e.target
    if (target.nodeName == 'LI') {
      tabArr.forEach((el) => {
        el.classList.remove('link-active')
      })
      target.classList.add('link-active')

      // 顯示 grid
      const contentIndex = tabArr.indexOf(target)
      if (contentIndex >= 0 && contentIndex < gridArr.length) {
        gridArr.forEach((el) => (el.style.display = 'none'))
        gridArr[contentIndex].style.display = 'grid'
        bttArr.forEach((el) => el.classList.add('hidden'))
        bttArr[contentIndex].classList.remove('hidden')
      }
    }
  })
}

switchTabs(tourList, tourTabArr, tourGridArr)
switchTabs(freeTripList, freeTripTabArr, freeTripGridArr, bottomTabGroup)

function initBottomTabs() {
  bottomListGroup.addEventListener('click', (e) => {
    const target = e.target
    if (target.nodeName !== 'LI') return

    const activeIndex = bottomTabGroup.findIndex((group) => !group.classList.contains('hidden'))
    if (activeIndex === -1) return

    const targetGroup = Array.from(bottomTabGroup[activeIndex].children)
    targetGroup.forEach((el) => el.classList.remove('bottom-list-active'))
    target.classList.add('bottom-list-active')
  })
}

function init() {
  tourTabArr[0].classList.add('link-active')
  freeTripTabArr[0].classList.add('link-active')
  initBottomTabs()
}
init()
