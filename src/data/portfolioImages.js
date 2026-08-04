import portraitTerracotta from '../assets/images/portrait/terracotta-wall.jpg';
import portraitWindowLight01 from '../assets/images/portrait/window-light-01.jpg';
import portraitWindowLight02 from '../assets/images/portrait/window-light-02.jpg';
import loveStory01 from '../assets/images/love-story/golden-hour-01.jpg';
import loveStory02 from '../assets/images/love-story/golden-hour-02.jpg';
import loveStory03 from '../assets/images/love-story/golden-hour-03.jpg';
import loveStory04 from '../assets/images/love-story/golden-hour-04.jpg';
import loveStory05 from '../assets/images/love-story/golden-hour-05.jpg';
import loveStory06 from '../assets/images/love-story/golden-hour-06.jpg';
import loveStory07 from '../assets/images/love-story/golden-hour-07.jpg';
import loveStory08 from '../assets/images/love-story/golden-hour-08.jpg';
import loveStory09 from '../assets/images/love-story/golden-hour-09.jpg';
import loveStory10 from '../assets/images/love-story/golden-hour-10.jpg';
import familyCheekKiss from '../assets/images/family/cheek-kiss.jpg';
import familyStorytime from '../assets/images/family/storytime.jpg';

// Deliberately interleaved — the "all" view is one continuous, harmonised flow,
// not grouped by shoot type. Each image is tagged with a category so it can
// still be filtered or grouped on demand (Portfolio filter tabs, Home lightbox).
export const portfolioImages = [
  { src: familyStorytime, category: 'family' },
  { src: portraitWindowLight01, category: 'portrait' },
  { src: loveStory06, category: 'loveStory' },
  { src: loveStory07, category: 'loveStory' },
  { src: loveStory08, category: 'loveStory' },
  { src: loveStory09, category: 'loveStory' },
  { src: portraitTerracotta, category: 'portrait' },
  { src: loveStory10, category: 'loveStory' },
  { src: familyCheekKiss, category: 'family' },
  { src: portraitWindowLight02, category: 'portrait' },
  { src: loveStory01, category: 'loveStory' },
  { src: loveStory02, category: 'loveStory' },
  { src: loveStory03, category: 'loveStory' },
  { src: loveStory04, category: 'loveStory' },
  { src: loveStory05, category: 'loveStory' },
];

export function imagesByCategory(category) {
  return portfolioImages.filter((img) => img.category === category);
}
