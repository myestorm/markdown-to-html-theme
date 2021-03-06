import $ from 'jquery';
import './index.scss';

import Responsive from '../../assets/scripts/Responsive';
import '../../assets/scripts/scroll';
import '../../assets/scripts/TargetBlank';
import ImgBox from '../../assets/scripts/ImgBox';

$(() => {
  const tree = $('#totonoo--page-tree');
  const header = $('#totonoo--top-header');
  const nav = $('#totonoo--aside');
  new Responsive(header, tree, nav);

  $('.years li').on('click', function () {
    if (!$(this).hasClass('disabled')) {
      const index = $('.years li').index(this);
      $(this).addClass('current').siblings().removeClass('current');
      $('.timeline-list .items').eq(index).show().siblings().hide();
    }
  });
  new ImgBox('.timeline-list');
});
