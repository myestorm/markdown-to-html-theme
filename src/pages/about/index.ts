import $ from 'jquery';
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/toolbar/prism-toolbar.css';

import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

import 'prismjs/plugins/show-language/prism-show-language';

import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';

import Responsive from '../../assets/scripts/Responsive';
import '../../assets/scripts/scroll';

import './index.scss';

$(() => {
  const tree = $('#totonoo--page-tree');
  const header = $('#totonoo--top-header');
  const nav = $('#totonoo--article-nav');
  new Responsive(header, tree, nav);
});
