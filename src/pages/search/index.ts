import $ from 'jquery';
import './index.scss';

import Responsive from '../../assets/scripts/Responsive';
import '../../assets/scripts/scroll';

export interface TempListItem {
  title: string,
  path: string,
  desc: string,
  parent: {
    title: string,
    path: string
  },
  publishDate: string,
  keywords: {
    title: string,
    path: string
  }[],
  cover?: string
}

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

  let result: TempListItem[] = [];
  const render = (data: TempListItem[] = []): void => {
    let html = '';
    const highLight = (str: string, kw: string): string => {
      str = str.replace(new RegExp(kw, 'gmi'), `<span class="high-light">${kw}</span>`);
      return str;
    };

    data.forEach(item => {
      let tags = '';
      item.keywords.forEach(sub => {
        tags += `<a href="${sub.path}">${highLight(sub.title, keyword)}</a>`;
      });
      html += `<div class="item">
      <h3 class="title">
        <a href="${item.path}">${highLight(item.title, keyword)}</a>
      </h3>
      <p class="desc">
        ${highLight(item.desc, keyword)}...
        <a href="${item.path}" class="more">
          <i class="iconfont icon-search"></i>详细
        </a>
      </p>
      <div class="info">
        <ul>
          <li class="a">
            <i class="iconfont icon-folder"></i>
            <a href="${item.parent.path}">${item.parent.title}</a>
          </li>
          <li class="b"><i class="iconfont icon-time"></i>${item.publishDate}</li>
          <li class="c">
            <i class="iconfont icon-tags"></i>
            ${tags}
          </li>
        </ul>
      </div>
    </div>`;
    });

    html = html || `<div class="empty">没有找到与 <strong>${keyword}</strong> 相关的内容！</div>`;
    $('#search-list').html(html);
  };
  $.ajax('search.json').then(res => {
    const _res: TempListItem[] = res || [];
    result = _res.filter(item => {
      const _res = item.keywords.find(sub => sub.title === keyword);
      return (_res || new RegExp(keyword).test(item.title) || new RegExp(keyword).test(item.desc));
    });
    render(result);
  });
});
