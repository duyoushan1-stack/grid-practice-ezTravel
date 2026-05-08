const tourList = document.querySelector('.tour-list')
const tourContent = document.querySelector('.tour-content')
// DOM 陣列
const liArr = Array.from(tourList.children)
const gridArr = Array.from(tourContent.children)

tourList.addEventListener('click', (e) => {
  const target = e.target
  if (target.nodeName == 'LI') {
    liArr.forEach((el) => {
      el.classList.remove('link-active')
    })
    target.classList.add('link-active')

    // 顯示 grid
    const gridIndex = liArr.indexOf(target)
    gridArr.forEach((el) => (el.style.display = 'none'))
    gridArr[gridIndex].style.display = 'grid'
  }
})
function init() {
  liArr[0].classList.add('link-active')
}
init()
