import Alpine from 'alpinejs'

window.Alpine = Alpine

const showTabContent = () => ({
  tourCards: 'tour-1',
  tourList: [
    '精選推薦',
    '北陸',
    '北海道',
    '東北',
    '東京',
    '關西',
    '九州',
    '四國',
    '沖繩',
    '高雄出發',
  ],
  isActive: false,
  init() {
    this.tourCards = 'tour-1'
  },
  goTourTab() {
    const tour = {
      title: this.tourList,
    }
    this.tourCards = 'tour-2'
  },
})

Alpine.data('showTabContent', showTabContent)

Alpine.start()
