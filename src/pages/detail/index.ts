import $ from 'jquery';

import 'prismjs';

import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-xml-doc';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-regex';
import 'prismjs/components/prism-mongodb';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-powershell';

import 'prismjs/themes/prism-tomorrow.css';

import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/toolbar/prism-toolbar.css';

import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

import 'prismjs/plugins/show-language/prism-show-language';

import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';

import Responsive from '../../assets/scripts/Responsive';
import '../../assets/scripts/scroll';
import '../../assets/scripts/TargetBlank';
import './index.scss';
import ImgBox from '../../assets/scripts/ImgBox';

$(() => {
  const tree = $('#totonoo--page-tree');
  const header = $('#totonoo--top-header');
  const nav = $('#totonoo--article-nav');
  new Responsive(header, tree, nav);
  new ImgBox('.totonoo--markdown');
});
