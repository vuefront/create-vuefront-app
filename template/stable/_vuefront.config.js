export default {<% 
  if (theme !== 'None') { %>
  theme: '@vuefront/theme-<%= theme %>',<% } %>
  image: {
    logo: {
      path: '~/assets/img/logo_header.svg'
    },
    footerLogo: {
      path: '~/assets/img/logo_footer.svg'
    },
  },
  layouts: {
    '*': {
      headerMenu: [
        [
          'Menu',
          {
            items: ['store', 'blog']
          }
        ]
      ],
      footerLeft: ['Pages'],
      footerCenter: ['AccountLinks'],
      footerRight: [
        [
          'ExtraLinks',
          {
            links: [
              {
                to: '/store/special',
                text: 'Special'
              },
              {
                to: '/store/compare',
                text: 'Compare'
              },
              {
                to: '/contact',
                text: 'Contact Us'
              }
            ]
          }
        ]
      ]
    },
    '/': {
      contentTop: [
        [
          'Slideshow',
          {
            sliderNav: true,
            sliderArrows: true,
            items: [
              'https://img.dreamvention.com/vuefront/banners/Banner_demo_1.jpg',
              'https://img.dreamvention.com/vuefront/banners/Banner_demo_2.jpg'
            ]
          }
        ],
        [
          'FeaturedProduct',
          {
            ids: JSON.parse(process.env.FEATURED_PRODUCT)
          }
        ],
        'LatestProduct',
        'SpecialProduct',
        'LatestPost'
      ]
    },
    '/search/*': {
      contentBottom: ['SearchProduct', 'SearchPost']
    },
    '/store/category*': {
      columnLeft: [
        'StoreCategory',
        [
          'LatestProduct',
          {
            column: true
          }
        ]
      ]
    },
    '/blog/category*': {
      columnRight: [
        'Search',
        'BlogCategory',
        [
          'LatestPost',
          {
            column: true
          }
        ]
      ]
    },
    '/store/product/*': {
      contentBottom: ['RelatedProduct']
    },
    '/blog/post*': {
      columnRight: [
        [
          'LatestPost',
          {
            column: true
          }
        ]
      ]
    },
    '/account*': {
      columnRight: ['Account']
    },
    '/store/checkout': {
      contentTop: ['Checkout']
    }
  }
}