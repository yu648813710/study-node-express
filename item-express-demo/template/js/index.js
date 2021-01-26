// rem的计算
function resize (originSize, type) {
  let WType = type || 'x'
  let widths = document.documentElement.clientWidth
  let heights = document.documentElement.clientHeight
  if (WType == 'x') {
    var scale = (widths / originSize) * 200 //在X轴下求出比例并放大100倍。
  } else if (WType == 'y') {
    var scale = (heights / originSize) * 100
  }
  document.getElementsByTagName('html')[0].style.fontSize = scale + 'px'
  document.getElementsByTagName('body')[0].style.display = 'block'
}

// 计算首页的高度
function calcIndexHeight () {
  var indexDom = $('.index-box')
  if (!indexDom) return false
  var windowHeight = window.innerHeight
  indexDom.css("height", windowHeight).addClass('block-box')
  var indexBanner = $('.index-banner')
  indexBanner.css("height", windowHeight - 100)
}

// 首页banner
function indexBanner () {
  if (!$('.banner-index')) return false
  var swiper = new Swiper('.banner-index', {
    loop: true,
    direction: 'vertical',
    pagination: {
      el: '.banner-index .swiper-pagination',
    },
  });
}
// 首页nav列表点击
function navListShow () {
  var navDom = $('.common-top .nav img.nav-img')
  var start = false
  $('.nav-list .item a').click(function(e) {
    e.stopPropagation()
  })
  navDom.click(function () {
    if (!start) {
      $('.common-top .nav-list').animate({ right: 0 })
      $('body').addClass('block-box')
      start = !start
      return false
    }
    $('.common-top .nav-list').animate({ right: '-2.1rem' })
      $('body').removeClass('block-box')
      start = !start
  })
}
// 首页的nav的点击
function navItemClick () {
  var navItem = $('.common-top .nav .item p')
  var start = new Array(navItem.length)
  navItem.click(function () {
    var index_ = $(this).parent().index()
    if (!start[index_]) {
      $(this).find('.right').addClass('down')
      $(this).parent().find('ul').slideDown()
      start[index_] = true
      return false
    }
    $(this).find('.right').removeClass('down')
    $(this).parent().find('ul').slideUp()
      start[index_] = false
  })
}
// 公共nav的点击展开
function commonPageNavClick() {
  var navDom = $('.common-page-nav .page-nav')
  navDom.click(function(){
    $('.common-page-nav .page-nav-list').animate({ right: '0' })
  })
}
// 公共nav的点击消失
function commonPageNavClickHide() {
  var navDom = $('.common-page-nav .page-nav-list img')
  navDom.click(function(event){
    event.stopPropagation()
    $('.common-page-nav .page-nav-list').animate({ right: '-100%' })
  })
}
$(document).ready(function () {
  navListShow()
  calcIndexHeight()
  indexBanner()
  navItemClick()
  commonPageNavClick()
  commonPageNavClickHide()
  resize(640)
})