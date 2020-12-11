import $ from 'jquery';
import './index.scss';

import Responsive from '../../assets/scripts/Responsive';
import '../../assets/scripts/scroll';

$(() => {
  const tree = $('#totonoo--page-tree');
  const header = $('#totonoo--top-header');
  const nav = $('#totonoo--aside');
  new Responsive(header, tree, nav);

  const searchParams = new URLSearchParams(window.location.search);
  const keyword = searchParams.get('keyword');
  const li = $('.totonoo--breadcrumb li').last();
  li.text(`与 “${keyword}” 相关的文章`);
  $('input[name="keyword"]').val(keyword);
});
