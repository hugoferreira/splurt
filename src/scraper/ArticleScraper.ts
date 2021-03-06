import { Scraper } from './Scraper'
import axios from 'axios'

abstract class ArticleScraper extends Scraper {
  public get(url: string, params: any) {
    return axios.get('http://dblp.org/search/publ/api', {params})
  }
}

export { ArticleScraper }
