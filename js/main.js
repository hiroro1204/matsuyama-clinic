/**
 * ビューポートの設定を切り替え
 * 画面の幅が380px未満の場合：ビューポートを380pxに固定
 * それ以上の場合：デバイスの幅に基づいてビューポートを設定
 */
const switchViewport = () => {
  // ビューポート要素を取得
  const viewportMeta = document.querySelector('meta[name="viewport"]');

  // 条件に基づいて適用するビューポートの設定を決定
  const viewportContent =
    window.outerWidth > 380
      ? "width=device-width, initial-scale=1"
      : "width=380";

  // ビューポート要素が存在しない場合はreturn
  if (!viewportMeta) return;

  // 現在のビューポートの設定が目的の設定と異なる場合にのみ、新しい設定を適用します。
  if (viewportMeta.getAttribute("content") !== viewportContent) {
    viewportMeta.setAttribute("content", viewportContent);
  }
};
switchViewport();
window.addEventListener("resize", switchViewport);

/**
 * ハンバーガーメニュー
 */
const initializeHamburgerMenu = () => {
  const menu = document.querySelector(".js-menu");
  const menuOpenButton = document.querySelector(".js-menu-open-button");
  const menuCloseButton = document.querySelector(".js-menu-close-button");

  // コンテンツ Opening Keyframe
  const contentsOpeningKeyframes = {
    transform: ["translateX(100%)", "translateX(0)"],
  };

  // コンテンツ Opening Option
  const contentsOpeningOptions = {
    duration: 200,
    easing: "ease-out",
    fill: "forwards",
  };

  // コンテンツ Closing Keyframe
  const contentsClosingKeyframes = {
    transform: ["translateX(0)", "translateX(100%)"],
  };

  // コンテンツ Closing Option
  const contentsClosingOptions = {
    duration: 200,
    easing: "ease-out",
    fill: "forwards",
  };

  // menuとbuttonがページ内にない場合returnする
  if (!menu || !menuOpenButton || !menuCloseButton) return;

  const openMenu = () => {
    menu.showModal();
    menu.animate(contentsOpeningKeyframes, contentsOpeningOptions);
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    const closeAnimation = menu.animate(
      contentsClosingKeyframes,
      contentsClosingOptions
    );
    closeAnimation.onfinish = () => {
      menu.close();
      document.body.style.overflow = "auto";
    };
  };

  menuOpenButton.addEventListener("click", () => {
    openMenu();
  });

  menuCloseButton.addEventListener("click", () => {
    closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.open) {
      e.preventDefault();
      closeMenu();
    }
  });
};

initializeHamburgerMenu();

console.log(
  "hover:",
  matchMedia("(hover: hover)").matches,
  "any-hover:",
  matchMedia("(any-hover: hover)").matches,
  "pointer fine:",
  matchMedia("(pointer: fine)").matches
);
