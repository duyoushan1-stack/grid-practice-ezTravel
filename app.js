import Alpine from 'alpinejs'
import tourList from './data/tourList.json'

window.Alpine = Alpine

const showTabContent = () => ({
  tourList,
  activeTab: '精選推薦',
  init() {
    this.activeTab = '精選推薦'
  },
  // 根据 tab 標題獲取對應卡片數據
  get cards() {
    const tab = this.tourList.find(item => item.title === this.activeTab)
    return tab ? tab.cards : []
  },
  // 切换 tab
  goTourTab(title) {
    this.activeTab = title
  },
})

Alpine.data('showTabContent', showTabContent)

Alpine.start()
