import $ from 'jquery';
import './index.scss';

import Responsive from '../../assets/scripts/Responsive';
import '../../assets/scripts/scroll';
import '../../assets/scripts/TargetBlank';

$(() => {
  const tree = $('#totonoo--page-tree');
  const header = $('#totonoo--top-header');
  const nav = $('#totonoo--aside');
  new Responsive(header, tree, nav);
});
