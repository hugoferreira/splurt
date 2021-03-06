import { expect } from 'chai'
import { DBLPArticleScraper } from '../src/scraper/DBLPArticleScraper'

describe('DBLPArticleScraper', () => {

  it('should return articles', (done) => {
    const dblp = new DBLPArticleScraper()
    dblp.query('blockchain')
    .then(function(articles) {
      try {
        expect(articles.length).to.be.greaterThan(0)
        done()  
      } catch(err) {
        done(err)
      }
    }, done)
  }),

  it('should contain relevant articles only', (done) => {
    const dblp = new DBLPArticleScraper()
    dblp.query('blockchain')
    .then(function(articles) {
      try {
        const relevant = articles.filter((article : any) => article.title.toLowerCase().includes('blockchain'))
        expect(articles.length).to.be.equal(relevant.length)
        done()  
      } catch(err) {
        done(err)
      }
    }, done)
  })

  it('should contain only the right amount of articles', (done) => {
    const dblp = new DBLPArticleScraper()
    dblp.query('blockchain', 5)
    .then(function(articles) {
      try {
        expect(articles.length).to.be.equal(5)
        done()  
      } catch(err) {
        done(err)
      }
    }, done)
  })

})