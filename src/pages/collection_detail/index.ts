import $ from 'jquery';
import './index.scss';

import Responsive from '../../assets/scripts/Responsive';
import '../../assets/scripts/scroll';

$(() => {
  const tree = $('#totonoo--page-tree');
  const header = $('#totonoo--top-header');
  const nav = $('#totonoo--article-nav');
  new Responsive(header, tree, nav);
});
