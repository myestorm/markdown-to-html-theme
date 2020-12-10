import $ from 'jquery';
import './index.scss';
import '@assets/scripts/scroll';

$(() => {
  const tabs = $('#totonoo--tabs');
  const tabsTitle = tabs.find('.tabs-title');
  const tabsContent = tabs.find('.tabs-content');
  tabsTitle.find('li').on('click', function () {
    const index = tabsTitle.find('li').index(this);
    $(this).addClass('current').siblings().removeClass('current');
    tabsContent.eq(index).show().siblings('.tabs-content').hide();
  });
});
