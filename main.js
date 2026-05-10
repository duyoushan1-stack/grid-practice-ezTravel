const tourList = document.querySelector('.tour-list')
const tourContent = document.querySelector('.tour-content')
const freeTripList = document.querySelector('.top-list')
const freeTripContent = document.querySelector('.free-trip-content')

// 日本跟團 - tab 和 tab 內容陣列
const tourTabArr = Array.from(tourList.children)
const tourGridArr = Array.from(tourContent.children)

// 自遊最夯 - tab 和 tab 內容陣列
const freeTripTabArr = Array.from(freeTripList.children)
const freeTripGridArr = Array.from(freeTripContent.children)

function switchTabs(list, arr, gridArr) {
  list.addEventListener('click', (e) => {
    const target = e.target
    if (target.nodeName == 'LI') {
      arr.forEach((el) => {
        el.classList.remove('link-active')
      })
      target.classList.add('link-active')

      // 顯示 grid
      const gridIndex = arr.indexOf(target)
      if (gridIndex >= 0 && gridIndex < gridArr.length) {
        gridArr.forEach((el) => (el.style.display = 'none'))
        gridArr[gridIndex].style.display = 'grid'
      }
      console.log(target);
    }
  })
}

switchTabs(tourList, tourTabArr, tourGridArr)
switchTabs(freeTripList, freeTripTabArr, freeTripGridArr)

function init() {
  tourTabArr[0].classList.add('link-active')
  freeTripTabArr[0].classList.add('link-active')
}
init()
