import $ from 'jquery';
import MarkdownNav from './MarkdownNav';
$(() => {
  let prevScrollTop = 0;
  const body = $('body');
  const tree = $('#totonoo--page-tree');
  const header = $('#totonoo--top-header');
  const nav = $('#totonoo--article-nav');
  const fixedClass = 'fixed';
  const headerFixedClass = 'header-fixed';
  const height = 80;
  const markdownNav = new MarkdownNav('.totonoo--markdown', '#totonoo--article-nav', 'body, html');

  const scrollEvent = () => {
    const vh = $(window).height();
    const scrollTop = $(document).scrollTop();
    const d = scrollTop >= prevScrollTop ? 1 : -1;

    // 顶部
    if (d === -1) {
      header.addClass(fixedClass);
      body.addClass(headerFixedClass);
    } else {
      header.removeClass(fixedClass);
      body.removeClass(headerFixedClass);
    }

    // 左侧菜单
    let left = ($(document).width() - 1448) / 2;
    left = left > 0 ? left : 0;
    if (scrollTop > height) {
      tree.addClass(fixedClass).css({
        left: `${left}px`
      });
    } else {
      tree.removeClass(fixedClass);
    }
    if (d === -1) {
      tree.css({
        top: `${height}px`,
        height: `${vh - height}px`
      });
    } else {
      tree.css({
        top: 0,
        height: vh
      });
    }

    // 右侧菜单
    if (nav[0]) {
      if (scrollTop > height) {
        nav.addClass(fixedClass).css({
          right: `${left}px`
        });
      } else {
        nav.removeClass(fixedClass);
      }
      if (d === -1) {
        nav.css({
          top: `${height}px`
        });
      } else {
        nav.css({
          top: 0
        });
      }
      markdownNav.setIndex(scrollTop);
    }
    prevScrollTop = scrollTop || 0;
  };
  $(document).on('scroll', scrollEvent);
  $(window).on('resize', scrollEvent);
  scrollEvent();

  // 点击事件
  $('body').on('click', '.totonoo--post-list .item', (e) => {
    if(e.target.tagName.toLowerCase() !== 'a') {
      window.location.href = $(e.currentTarget).find('.title a').attr('href');
    }
  });
});
