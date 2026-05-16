import Alpine from 'alpinejs'
import tourList from './data/tourList.json'
import freeTrip from './data/freeTrip.json'

window.Alpine = Alpine

const showTabContent = () => ({
  tourList,
  freeTrip,
  activeTab: tourList[0]?.title || '精選推薦',
  // 自遊最夯
  activeMainTab: freeTrip[0]?.title || '精選推薦',
  activeSubTab: freeTrip[0]?.subTabs?.[0]?.label || '',
  init() {
    this.activeTab = tourList[0]?.title || '精選推薦'
    this.activeMainTab = freeTrip[0]?.title || '精選推薦'
    this.activeSubTab = freeTrip[0]?.subTabs?.[0]?.label || ''
  },
  // 根据 tab 標題獲取對應卡片數據
  get cards() {
    const tab = this.tourList.find((item) => item.title === this.activeTab)
    return tab ? tab.cards : []
  },
  // 根据主題標題獲取對應子選單列表
  get subTabs() {
    const main = this.freeTrip.find((item) => item.title === this.activeMainTab)
    return main ? main.subTabs : []
  },
  get items() {
    const main = this.freeTrip.find((item) => item.title === this.activeMainTab)
    const sub = main?.subTabs?.find((sub) => sub.label === this.activeSubTab)
    return sub?.items || []
  },
  // 切换 tab
  goTourTab(title) {
    this.activeTab = title
  },
  goMainTab(title) {
    this.activeMainTab = title
    const main = this.freeTrip.find((item) => item.title === title)
    // 每次切換都要選到第一個 subTab
    this.activeSubTab = main?.subTabs?.[0]?.label || ''
  },
  goSubTab(title) {
    this.activeSubTab = title
  },
})

Alpine.data('showTabContent', showTabContent)

Alpine.start()
