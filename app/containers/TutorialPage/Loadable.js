/**
 *
 * Asynchronously loads the component for TutorialPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
