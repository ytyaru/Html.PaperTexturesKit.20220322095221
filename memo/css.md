# CSSについて

CSSでメディアクエリはもう必要ないかも -メディアクエリなしで実装するテクニックのまとめ
https://coliss.com/articles/build-websites/operation/css/media-queries-probably-dont-need.html

　メディアクエリでなく計算によって最適解をもとめるように実装すべきではないか、という提案。

　少し前はスマホが普及し、デバイスのサイズやアスペクト比が多様化した。それに伴いメディアクエリによるサイズのブレークポイントだけでは表示を最適化できなくなりつつある。そこで計算によって最適解ないし近似値を算出するように実装すべきだろうとの提案である。

　私もそう思ったのだが、そのために`calc()`などを使用するとパフォーマンスに大きな悪影響があることがわかった。はたしてどう実装するのがベストプラクティスなのか。現状、UXとDXはトレードオフの関係にある。

* メディアクエリ
    * print
    * screen
        * 1〜640（スマホ。20字／行。640/20=32px）
        * 641〜1024（タブレット。1024/25字=40px 25字／行）
        * 641〜1280（タブレット。25字／行）
        * 1281〜1920（PC。2K。35字／行）
        * 1921〜3840（PC。4K）
        * 7680〜（PC。8K）
    * color-scheme
        * light
        * dark

面幅|字幅|字/行
----|----|
320px|16px|20字
480px|20px|24字
640px|24px|26.6字
800px|28px|28.5字
1024px|32px|32字
1280px|32px|40字
1600px|32px|50字
1920px|24px|80字(40*2)
3840px|40px|96字(48*2)
7680px|64px|120字(40*3)

　日本語は一行あたり40字くらいが読みやすいとされている。なるだけそれに合わせる。ブログは大抵25〜35字／行くらい。文庫本も37〜42字くらい。

　字間、行間、傍点、ルビ、段組スペースを考慮すると、字／行数は表より少なくなると思われる。

```css
@media screen and (max-width: 480px) { :root { --line-of-chars:20; } }
@media screen and (max-width: 640px) { :root { --line-of-chars:25; } }
@media screen and (max-width: 800px) { :root { --line-of-chars:28; } }
@media screen and (max-width: 1024px) { :root { --line-of-chars:32; } }
@media screen and (max-width: 1280px) { :root { --line-of-chars:35; } }
@media screen and (max-width: 1920px) { :root { --line-of-chars:40; } }
@media screen and (max-width: 3840px) { :root { --line-of-chars:40; --column-count:2; } }
@media screen and (max-width: 7680px) { :root { --line-of-chars:40; --column-count:3; } }
```
```css
```

## 背景画像の遅延問題

　CSSの`background-image`で背景画像をセットしたとき、そのファイルをロードするまでの間、背景画像が表示されず真っ白になる。そうでなく、前に表示していた画像を表示したままで、ロード完了したら切り替えてほしい。間に真っ白画面をはさまないでほしい。

background-imageの表示ラグ問題を（ほぼ）CSSのみで実装するCSS遅延読み込みで解決
https://zenn.dev/crayfisher_zari/articles/24273afb875d1d

　HTMLで以下のようにする。8枚の画像を`preload`する。

```html
<!-- preload で動的ロード切替時のホワイトアウトを防ぐ -->
<link rel="preload" as="image" href="assets/image/textures/01.jpg">
<link rel="preload" as="image" href="assets/image/textures/02.jpg">
<link rel="preload" as="image" href="assets/image/textures/03.jpg">
<link rel="preload" as="image" href="assets/image/textures/04.jpg">
<link rel="preload" as="image" href="assets/image/textures/05.jpg">
<link rel="preload" as="image" href="assets/image/textures/06.jpg">
<link rel="preload" as="image" href="assets/image/textures/07.jpg">
<link rel="preload" as="image" href="assets/image/textures/08.jpg">
```

## 背景画像の入手元

紙
paper-textures-kit.zip  
    https://coliss.com/articles/products/paper-textures-kit-by-limitlessgraphics.html
    https://pixelbuddha.net/textures/paper-textures-kit

夜空など
https://www.pexels.com/ja-jp

