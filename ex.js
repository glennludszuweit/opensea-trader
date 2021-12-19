const val = {
  id: 140479743,
  token_id:
    '72769475846177763276819764985730209835692325617732202308374765244471891197953',
  num_sales: 1,
  background_color: null,
  image_url:
    'https://lh3.googleusercontent.com/1ae90vmi4ShwJTbZNd-ZA51cm0BQa0U6_wK6GhL8-us1vnoVj050K7lCJnOwQGarA8MK_T5EgA7EKoDtvZ1WczMlfUsdm5mfzs2jbHU',
  asset_contract: {
    address: '0x495f947276749ce646f68ac8c248420045cb7b5e',
  },
  permalink:
    'https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/72769475846177763276819764985730209835692325617732202308374765244471891197953',
  collection: {
    banner_image_url:
      'https://lh3.googleusercontent.com/hIuggcobVyo1zxIDrZXi2Wx-P_c4bRtl-_8EMa1mMuFCHowpJdxlNsjHYqWW0D0JgmuK38tu-Q6XzzwhYy3quyxarM3y_GeBoT1vBA=s2500',
    description:
      "After A Deadly Chemical Virus spread, Humans species started showing sign of Severe illness and slowly begin to Die. Wildlife started showing signs of chemical mutations as a result there strength, Speed and Intellectual Abilities exceeded the Humans. Ape's were the One's that were most infected by mutation and showed Adverse signs of Heightened Abilities and were named as Hip Ass Ape's. If Any Part of BAYC was used it was used only after getting the permission from respective owner of the Ape.\n\nAbout the Artist : I am Damon 19 year old, Freshmen at college. In the Day I play in my state's football team and By The Night I make Hip Ass Ape's ",
    featured_image_url:
      'https://lh3.googleusercontent.com/UQuI1PlyWs4V-GphEbQgHIqlj21248Mt6nLMS9AFIPwgTFwgOggm-iZQAK6DcCz-2GDfTFtXWgveA2BYb4DpxFC0VbtilwhkYhyd=s300',
    hidden: false,
    payout_address: '0xa0e21051e8cff35bd7023d73cf4a50095e842d84',
    slug: 'hipassape',
  },
  owner: {
    user: {
      username: 'NullAddress',
    },
    profile_img_url:
      'https://storage.googleapis.com/opensea-static/opensea-profile/1.png',
    address: '0x0000000000000000000000000000000000000000',
    config: '',
  },
  traits: [],
  last_sale: {
    asset: {
      event_type: 'successful',
      event_timestamp: '2021-12-10T18:45:25',
      total_price: '38000000000000000',
      payment_token: {
        id: 1,
        symbol: 'ETH',
        address: '0x0000000000000000000000000000000000000000',
        image_url:
          'https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg',
        name: 'Ether',
        decimals: 18,
        eth_price: '1.000000000000000',
        usd_price: '3874.059999999999945000',
      },
      created_date: '2021-12-10T18:45:55.249404',
      quantity: '1',
    },
  },
  hasSellOrders: [],
  hasOfferOrders: [],
};

const res = {
  id,
  token_id,
  num_sales,
  image_url,
  asset_contract: {
    address,
    created_date,
  },
  collection: {
    banner_image_url,
    description,
    slug,
  },
  owner: {
    user: {
      username,
    },
    profile_img_url,
    address,
  },
  traits,
  last_sale: {
    event_type,
    event_timestamp,
    total_price,
    payment_token: {
      id,
      symbol,
      address,
      image_url,
      name,
      decimals: 18,
      eth_price,
      usd_price,
    },
    transaction: {
      from_account: {
        user: {
          username,
        },
        address,
      },
      timestamp,
      to_account: {
        user: {
          username,
        },
        address,
        config,
      },
    },
    created_date,
  },
};
