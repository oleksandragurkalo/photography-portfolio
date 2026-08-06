import portraitTerracotta from '../assets/images/portrait/terracotta-wall.jpg';
import portraitWindowLight01 from '../assets/images/portrait/window-light-01.jpg';
import portraitWindowLight02 from '../assets/images/portrait/window-light-02.jpg';
import familyCheekKiss from '../assets/images/family/cheek-kiss.jpg';
import familyStorytime from '../assets/images/family/storytime.jpg';
import varvara01 from '../assets/images/family/varvara-01.jpg';
import varvara02 from '../assets/images/family/varvara-02.jpg';
import varvara03 from '../assets/images/family/varvara-03.jpg';
import varvara04 from '../assets/images/family/varvara-04.jpg';
import varvara05 from '../assets/images/family/varvara-05.jpg';
import varvara06 from '../assets/images/family/varvara-06.jpg';
import varvara07 from '../assets/images/family/varvara-07.jpg';
import varvara08 from '../assets/images/family/varvara-08.jpg';
import varvara09 from '../assets/images/family/varvara-09.jpg';

function photosFrom(srcs) {
  return srcs.map((src) => ({ src }));
}

// Each love-story shoot's photos live under assets as `<shootId>-NN.jpg`.
const loveStoryImageModules = import.meta.glob('../assets/images/love-story/*.jpg', {
  eager: true,
  import: 'default',
});

function loveStoryPhotosFor(shootId) {
  const pattern = new RegExp(`/love-story/${shootId}-\\d+\\.jpg$`);
  return Object.keys(loveStoryImageModules)
    .filter((path) => pattern.test(path))
    .sort()
    .map((path) => ({ src: loveStoryImageModules[path] }));
}

// Placeholder shoot groupings — real shoot names/photos to replace these later.
export const shoots = {
  portrait: [
    { id: 'kseniia', name: 'Kseniia', photos: photosFrom([portraitWindowLight01]) },
    { id: 'mariia', name: 'Mariia', photos: photosFrom([portraitTerracotta]) },
    { id: 'kateryna', name: 'Kateryna', photos: photosFrom([portraitWindowLight02]) },
  ],
  loveStory: [
    {
      id: 'daryna-oleksii',
      name: 'Daryna & Oleksii',
      photos: loveStoryPhotosFor('daryna-oleksii'),
    },
    {
      id: 'vitaliia-maksym',
      name: 'Vitaliia & Maksym',
      photos: loveStoryPhotosFor('vitaliia-maksym'),
    },
    {
      id: 'anastasiia-andrii',
      name: 'Anastasiia & Andrii',
      photos: loveStoryPhotosFor('anastasiia-andrii'),
    },
  ],
  family: [
    {
      id: 'urodyny-varvary',
      name: 'Urodyny Varvary',
      photos: photosFrom([
        familyStorytime,
        familyCheekKiss,
        varvara06,
        varvara03,
        varvara02,
        varvara04,
        varvara05,
        varvara07,
        varvara01,
        varvara08,
        varvara09,
      ]),
    },
  ],
};

export function shootsByCategory(category) {
  return shoots[category] ?? [];
}

export function findShoot(category, shootId) {
  return shootsByCategory(category).find((shoot) => shoot.id === shootId);
}
