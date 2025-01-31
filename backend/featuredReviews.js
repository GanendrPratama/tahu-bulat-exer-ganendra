class FeaturedReviews {
    constructor() {
      this.firstID = 20
      this.secondID = 27
      this.thirdID = 28
      this.loadFromFile()
    }
  
    async loadFromFile() {
      try {
        const response = await fetch('/api/editFeaturedReviews')
        if (!response.ok) throw new Error('Failed to load')
        const data = await response.json()
        if (!data.firstID || !data.secondID || !data.thirdID) {
          throw new Error('Invalid data format')
        }
        this.firstID = data.firstID
        this.secondID = data.secondID
        this.thirdID = data.thirdID
      } catch (error) {
        console.error('Failed to load featured reviews:', error)
      }
    }
  
    async setNew(firstID, secondID, thirdID) {
      try {
        const response = await fetch('/api/editFeaturedReviews', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstID, secondID, thirdID })
        })
        
        if (!response.ok) throw new Error('Failed to update')
        
        this.firstID = firstID
        this.secondID = secondID
        this.thirdID = thirdID
      } catch (error) {
        throw new Error('Failed to update featured reviews')
      }
    }
}

const reviews = new FeaturedReviews()
export default reviews