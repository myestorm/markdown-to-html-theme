/**
 * 非本站链接新窗口打开
 */
import $ from 'jquery';
$(() => {
  const items = $('body a');
  const hostname = window.location.hostname;
  items.each(index => {
    const href = $(items[index]).attr('href');
    const urlParams = new URL(href, window.location.origin);
    if (hostname !== urlParams.hostname) {
      $(items[index]).attr('target', '_blank');
    }
  });
});
