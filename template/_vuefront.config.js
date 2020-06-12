export default {
    <% if (theme === 'None') { %>
    // To intall a VueFront WordPress Default theme, run `yarn add @vuefront/theme-wordpress` and uncomment:
    //theme: '@vuefront/theme-wordpress',
    <% } %>
    <% if (theme === 'WordPress') { %>
    theme: '@vuefront/theme-wordpress',
    <% } %>
    <% if (theme === 'OpenCart') { %>
    theme: '@vuefront/theme-opencart',
    <% } %>
    <% if (theme === 'Magento') { %>
    theme: '@vuefront/theme-magento',
    <% } %>
    <% if (theme === 'PrestaShop') { %>
    theme: '@vuefront/theme-prestashop',
    <% } %>
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
                        links: [{
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
                        items: [
                            'https://opencart.vuefront.com/image/cache/catalog/demo/banners/MacBookAir-1140x380.jpg',
                            'https://opencart.vuefront.com/image/cache/catalog/demo/banners/iPhone6-1140x380.jpg'
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
                'StoreCategory', [
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
                'BlogCategory', [
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