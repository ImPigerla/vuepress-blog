# 如何进行移动端webapp开发

最近在进行一个小小的移动端开发，开发的同时就在思考，是不是可以总结一套开发规则出来呢。先来描述问题，再谈解决方案。

## 待解决的问题

1. 如何拿到一个设计图进行开发？一般都是750px宽的设计图

1. 能否将设计图的px尺寸转化成目标单位尺寸？例如`vw`，`rem`

1. 字体大小问题，是否改随着屏幕尺寸进行缩放？

1. devicePixelRatio为2/3倍的问题？

1. 限制一个最大宽度问题?

## 逐一解决问题

### 1. 如何拿到一个设计图进行开发？一般都是750px宽的设计图

750px是2倍 x 375px的视口宽度，375px尺寸的手机代表有iphone 6/7/8。750px这个尺寸基本上都覆盖了手机的宽度，又基于2x甚至更高的高清屏，750px是相对合适与折中的尺寸。

回到开发本身，肯定是开发出来的东西，可以根据视口的大小能够调整页面的大小，包括外间距，内间距，边框等。这就要求当我们写CSS对应的属性值的时候，应该是转化后的值，但是在没有工具的情况下，徒手一个个的算出来，甚至还要保留几位小数点，最好再写上去，想想是不是都觉得累🤣。 

因此，我们遇到第二个问题⬇️

### 2. 能否将设计图的px尺寸转化成目标单位尺寸？例如`vw`，`rem`

为了解决这个问题，开发一个webpack leader，详情可见 [px2vw-loader](https://github.com/ImPigerla/px2vw-loader)

### 3. 字体大小问题，是否改随着屏幕尺寸进行缩放？

其实，如果能够百分比做到比例缩放的话，你会发现很怪，大屏时字体也很大，小屏时字体就很小。显然这不是我们想要的。

这里提供的一种方案是，利用媒体查询`@media`, 比如根据不同的`device-pixel-ratio`或者视口宽度去 **微调** font-size的比例。

```css
/* 创建一些mixin，可复用 */

@mixin font-dpr {
    @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
        font-size : 104%;
    }
    @media only screen and (-webkit-min-device-pixel-ratio: 3), only screen and (min-device-pixel-ratio: 3) {
        font-size : 108%;
    }
    @media only screen and (-webkit-min-device-pixel-ratio: 4), only screen and (min-device-pixel-ratio: 4) {
        font-size : 112%;
    }
}


@mixin font-size-scale ($level : 0) {
    font-size: 100% + $level * 5%;
}

/* 应用mixnin */

body {
    ...
    @include font-dpr();
}

p {
    @include font-size-scale(1)
}

```

### 4. devicePixelRatio为2/3倍的问题？

这个问题主要影响的是图片在高清屏下模糊的问题，如果项目使用的图片尺寸是1倍，而高清屏却是2倍，相当于图片放大了1倍，当然模糊。解决问题应该根据不同倍数的屏幕加载相应的图片，这样视觉体验就不错，但是这样却带来流量损耗和加载延时，两者之间需要取舍平衡的。


### 5. 限制一个最大宽度问题?

就是给内容宽度限制一个最大值，为什么有这个概念，源自体验，当屏幕较大时，如果没有限制，则内容充满屏幕，格局都变得很大，大量滚动操作和其他操作都非常不好，因此需要限制宽度。

下面来讲如何实现，利用`rem`，rem原理就是利用在html那声明对应的fontSize，因此需要及时计算不同的fontSize值。

```css
html {
    font-size: 37.5px
}

body {
    max-width: 10rem;
    margin: 0 auto;
}

```

## 总结

想开发好一个项目，要做的可不止这些，以上算是理清相关思路，抛砖引玉而已。

想了解更多，我准备了一个项目模版，包含上面所讲的内容，请戳[prerender-mobile-app](https://github.com/ImPigerla/prerender-mobile-app)
