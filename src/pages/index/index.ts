import $ from 'jquery';
import './index.scss';
import Responsive from '../../assets/scripts/Responsive';
import '../../assets/scripts/scroll';

$(() => {
  const tabs = $('#totonoo--tabs');
  const tabsTitle = tabs.find('.tabs-title');
  const tabsContent = tabs.find('.tabs-content-item');
  tabsTitle.find('li').on('click', function () {
    const index = tabsTitle.find('li').index(this);
    $(this).addClass('current').siblings().removeClass('current');
    tabsContent.eq(index).show().siblings().hide();
  });

  const tree = $('#totonoo--page-tree');
  const header = $('#totonoo--top-header');
  const nav = $('#totonoo--aside');
  new Responsive(header, tree, nav);
});
