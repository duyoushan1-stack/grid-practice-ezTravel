import Alpine from 'alpinejs'
import tourList from './data/tourList.json'

window.Alpine = Alpine

const showTabContent = () => ({
  tourList,
  tourCards: '精選推薦',
  init() {
    this.tourCards = '精選推薦'
  },
  goTourTab(list) {
    this.tourCards = list.title
    console.log(this.tourCards)
  },
})

Alpine.data('showTabContent', showTabContent)

Alpine.start()
