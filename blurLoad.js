/*
 * author: johnson
 */
function BlurLoad () { // 图片模糊加载构造函数
  var instance
  if (instance) 
    return instance
  instance = this
  if (!BlurLoad.prototype.init) {
    BlurLoad.prototype.init = function (blurArray) {
      var imgs = document.getElementsByTagName('img')
      var needBlurArray = []
      // 过滤需要blurload的图片
      for (var j = 0; j < imgs.length; j++) {
        if (imgs[j].getAttribute('blurload') !== null) {
          needBlurArray.push(imgs[j])
        }
      }
      imgs = needBlurArray
      for (var i = 0; i < imgs.length; i++) {
        // 替换dom
        var realUrl = imgs[i].getAttribute('src');
        var div = document.createElement('div')
        div.setAttribute('class','placeholder-block')
        div.setAttribute('data-large', realUrl)
        var str = `
          <img src="${blurArray[i]}" class="img-small">
          <div style="padding-bottom: 66.6%;"></div>
        `
        div.innerHTML = str
        imgs[i].parentNode.appendChild(div)
        // 处理图片
        var placeholder = div,
            small = placeholder.querySelector('.img-small')
        // 展示小图
        var img = new Image();
        img.src = small.src;

        img.onload = (function(small) {
          return function () {
            console.log('```smallLoad```')
            small.classList.add('loaded');
          }
        })(small);

        // 展示大图
        var imgLarge = new Image();
        imgLarge.src = placeholder.dataset.large;
        imgLarge.onload = (function(imgLarge) {
          return function () {
            console.log('```bigLoad```')
            imgLarge.classList.add('loaded');
          }
        })(imgLarge);
        placeholder.appendChild(imgLarge);
        placeholder.parentNode.removeChild(imgs[i])
      }
      // 样式引入
      var style = document.createElement('style')
      style.innerHTML = 
        `.placeholder-block {
            background-color: #f6f6f6;
            background-size: cover;
            background-repeat: no-repeat;
            position: relative;
            overflow: hidden;
          }

          .placeholder-block img {
            position: absolute;
            opacity: 0.5;
            top: 0;
            left: 0;
            width: 100%;
            transition: opacity 1s linear;
          }

          .placeholder-block img.loaded {
            opacity: 1;
          }

          .placeholder-block .img-small {
            filter: blur(50px);
            transform: scale(1);
          }
        `
      document.head.appendChild(style)
    }
  }
}
