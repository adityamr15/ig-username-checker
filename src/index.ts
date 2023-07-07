import axios from 'axios';
import cheerio from 'cheerio';

import { IGUserDetail } from './types/user-detail';

class IGUsernameChecker {
  async getDetail(username: string): Promise<IGUserDetail | string> {
    try {
      const response = await axios.get(
        `https://www.instagram.com/${username}/`
      );

      if (response.status === 200) {
        const $ = cheerio.load(response.data);

        const metaImage = $('meta[property="og:image"]').prop('content');
        const metaUrl = $('meta[property="og:url"]').prop('content');
        const metaDescription = $('meta[property="og:description"]').prop(
          'content'
        );

        if (response.data.includes(`instagram.com/${username}`)) {
          return {
            description: metaDescription,
            image: metaImage,
            url: metaUrl,
            username,
          };
        } else {
          return `Username "${username}" does not exist!`;
        }
      } else {
        return 'An error occurred while fetch the instagram profile.';
      }
    } catch (error: any) {
      return `An error occurred while fetch the instagram profile: ${error.message}`;
    }
  }
}

export default new IGUsernameChecker();

new IGUsernameChecker().getDetail('adityamr15').then((res) => console.log(res));
