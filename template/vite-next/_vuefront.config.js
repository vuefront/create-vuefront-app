module.exports = {
  // app: ["@vuefront/checkout-app"],
  image: {
    logo: {
      path: "~/assets/img/VUE_JS.svg",
    },
    footerLogo: {
      path: "~/assets/img/VUE_JS_Footer.svg",
    },
  },
  layouts: {
    "*": {
      headerMenu: [
        [
          "Menu",
          {
            items: ["store", "blog"],
          },
        ],
      ],
      footerLeft: ["Pages"],
      footerCenter: ["AccountLinks"],
      footerRight: [
        [
          "ExtraLinks",
          {
            links: [
              {
                to: "/store/special",
                text: "Special",
              },
              {
                to: "/store/compare",
                text: "Compare",
              },
              {
                to: "/contact",
                text: "Contact Us",
              },
            ],
          },
        ],
      ],
    },
    "/": {
      contentTop: [
        [
          "Slideshow",
          {
            sliderArrows: true,
            sliderNav: true,
            items: [
              "https://img.dreamvention.com/vuefront/banners/Banner_demo_1.jpg",
              "https://img.dreamvention.com/vuefront/banners/Banner_demo_2.jpg",
            ],
          },
        ],
        "LatestProduct",
        "SpecialProduct",
        "LatestPost",
      ],
    },
    "/search/*": {
      contentBottom: ["SearchProduct", "SearchPost"],
    },
    "/store/category*": {
      columnLeft: [
        "StoreCategory",
        [
          "LatestProduct",
          {
            column: true,
          },
        ],
      ],
    },
    "/blog/category*": {
      columnRight: [
        "Search",
        "BlogCategory",
        [
          "LatestPost",
          {
            column: true,
          },
        ],
      ],
    },
    "/store/product/*": {
      contentBottom: ["RelatedProduct"],
    },
    "/blog/post*": {
      columnRight: [
        [
          "LatestPost",
          {
            column: true,
          },
        ],
      ],
    },
    "/account*": {
      columnRight: ["Account"],
    },
    "/store/checkout": {
      contentTop: ["Checkout"],
    },
  },
};
