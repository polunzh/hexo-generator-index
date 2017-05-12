'use strict';
var pagination = require('hexo-pagination');
module.exports = function (locals) {
  var config = this.config;
  var posts = locals.posts;

  /*
  置顶基于 https://ehlxr.me/2016/08/30/%E4%BD%BF%E7%94%A8Hexo%E5%9F%BA%E4%BA%8EGitHub-Pages%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2%EF%BC%88%E4%B8%89%EF%BC%89/#%E5%8D%81%E3%80%81%E5%8D%9A%E6%96%87%E7%BD%AE%E9%A1%B6
 修改
*/

  posts.data.forEach(function (post, idx) {
    if (post.top) {
      post.title = '[置顶]' + post.title;
    }
  });

  posts.data = posts.data.sort(function (a, b) {
    if (a.top && b.top) { // 两篇文章top都有定义
      if (a.top == b.top) return b.date - a.date; // 若top值一样则按照文章日期降序排
      else return b.top - a.top; // 否则按照top值降序排
    }
    else if (a.top && !b.top) { // 以下是只有一篇文章top有定义，那么将有top的排在前面（这里用异或操作居然不行233）
      return -1;
    }
    else if (!a.top && b.top) {
      return 1;
    }
    else return b.date - a.date; // 都没定义按照文章日期降序排
  });
  var paginationDir = config.pagination_dir || 'page';
  return pagination('', posts, {
    perPage: config.index_generator.per_page,
    layout: ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
};