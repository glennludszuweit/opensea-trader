import { filterDuplicateObjects } from './utils';

const scrapeEtherScan = Array.from(
  document.querySelectorAll(
    'tr > td > .media > .media-body > h3 > .token-wrap > a[data-original-title]'
  )
).map((item) => {
  return {
    contract: item.getAttribute('data-original-title'),
    name: item.textContent,
  };
});

export const top500Collections = [
  {
    contract: '0x999e88075692bCeE3dBC07e7E64cD32f39A1D3ab',
    name: 'Wizards & Dragons Game (WnD)',
  },
  {
    contract: '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85',
    name: 'Ethereum Name Service (ENS)',
  },
  {
    contract: '0x09233d553058c2f42ba751c87816a8e9fae7ef10',
    name: 'My Pet Hooligan',
  },
  {
    contract: '0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b',
    name: 'CloneX',
  },
  {
    contract: '0x0aa7420c43b8c1a7b165d216948870c8ecfe1ee1',
    name: 'Thingdoms NFT Official',
  },
  {
    contract: '0x0d0167a823c6619d430b1a96ad85b888bcf97c37',
    name: 'ExpansionPunks',
  },
  {
    contract: '0x2050fC00E016c3aDa03211EDc35711E44B8D014e',
    name: 'The Awakening',
  },
  {
    contract: '0x4cf9b49dc50380ee33cdd9995bcc0be9471e3168',
    name: 'Bored Ape Flipped Club',
  },
  {
    contract: '0xf804356349c79a6381206ea9baf3800574fa74d9',
    name: 'Flipped Doodles',
  },
  {
    contract: '0x4e1fd89e224fbd3350af33cbf0a798cc7d486983',
    name: 'Flipped Punks',
  },
  {
    contract: '0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270',
    name: 'Art Blocks',
  },
  {
    contract: '0xAe6EE49AE244Cc6279806c7c301FA5F104Fc5E3D',
    name: 'Mintonians',
  },
  {
    contract: '0x7fcbb823ff16110e5a14c3c897dc0af334423e4f',
    name: 'MistleToadz',
  },
  {
    contract: '0x0B22fE0a2995C5389AC093400e52471DCa8BB48a',
    name: 'Little Lemon Friends',
  },
  {
    contract: '0x25593a50255bfb30ea027f6966417b0bf780401d',
    name: 'Digitals Aniamls',
  },
  {
    contract: '0x989e5f1da336c8a99a89e41594aa197735443563',
    name: 'SuperKongz',
  },
  {
    contract: '0xeDa3b617646B5fc8C9c696e0356390128cE900F8',
    name: 'Jadu Hoverboard',
  },
  {
    contract: '0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405',
    name: 'FND NFT (FNDNFT)',
  },
  {
    contract: '0x1d3ada5856b14d9df178ea5cab137d436dc55f1d',
    name: 'Deathbats Club',
  },
  {
    contract: '0x67504751c5d767deb0122954671cd4623f5b4c59',
    name: 'Punk69',
  },
  {
    contract: '0x66fCA7555CD481545A5e66bA9a2bEC1e256F98e7',
    name: 'GoldHunter (GOLDH)',
  },
  {
    contract: '0x0f78c6eee3c89ff37fd9ef96bd685830993636f2',
    name: 'Nuclear Nerds',
  },
  {
    contract: '0x4e34ec528a663194f4dfe40641e8a3a98abb6e84',
    name: 'Legends of Venari Alpha Pass',
  },
  {
    contract: '0x18Cb9DB75FA62a9717aA98292B939e579b7c7Ccd',
    name: 'PropertyNFT',
  },
  {
    contract: '0x97fe0e9f7e4bf770d57b41da3e77a8140205c970',
    name: 'Billionaire Dogs Club',
  },
  {
    contract: '0x320c1ca2BdDA1375174a98bFd06ED7C2D60e9842',
    name: 'From the Fragments of Tezuka Osamu - Generative Art',
  },
  {
    contract: '0xf9c362cdd6eeba080dd87845e88512aa0a18c615',
    name: 'Meta-Legends',
  },
  {
    contract: '0xfd384bd3b79ed98f0f00ecba8a22230406a700d5',
    name: 'SBS Genesis Card',
  },
  {
    contract: '0x792496a3f678187e59e1d1d5e075799cd1e124c2',
    name: 'Squishy Squad',
  },
  {
    contract: '0x26BAdF693F2b103B021c670c852262b379bBBE8A',
    name: 'Illuminati',
  },
  {
    contract: '0x5181aF2C5Cd19AAECaDA5D8A7aFB7856B7643Aca',
    name: 'Castle Kid',
  },
  {
    contract: '0x9c188f558f8d9f01204e55f2fa484ddb5765cb99',
    name: 'Fat Ape Babies Club',
  },
  {
    contract: '0xa67d63e68715dcf9b65e45e5118b5fcd1e554b5f',
    name: 'Pepsi Mic Drop',
  },
  {
    contract: '0x5217fcfaa7c02b6beb54c8227a81e8dcabebfee0',
    name: 'DragonRichClub',
  },
  {
    contract: '0x0bEed7099AF7514cCEDF642CfEA435731176Fb02',
    name: 'DuskBreakers',
  },
  {
    contract: '0x838E240c0FcBd12fBfFdB327d35A32DD2E73C7ea',
    name: 'Baller Bears',
  },
  {
    contract: '0x7cae7b9b9a235d1d94102598e1f23310a0618914',
    name: 'CROAKZ',
  },
  {
    contract: '0x8d768fc1e3af47acc8d8ed5596379ae05310f470',
    name: 'CVSpoons',
  },
  {
    contract: '0x97a923ed35351a1382e6bcbb5239fc8d93360085',
    name: 'Champions',
  },
  {
    contract: '0x8a479d6b4435e0b82dc9587610c977c138b86ab4',
    name: 'Feudalz Landz',
  },
  {
    contract: '0xca49b939ad0b0b148fa61641d799e7777ad2e5db',
    name: 'Rowdy Roos',
  },
  {
    contract: '0xD9c036e9EEF725E5AcA4a22239A23feb47c3f05d',
    name: 'MidnightBreeze',
  },
  {
    contract: '0x5180db8f5c931aae63c74266b211f580155ecac8',
    name: 'Crypto Coven',
  },
  {
    contract: '0xa6916545a56f75acd43fb6a1527a73a41d2b4081',
    name: 'DemiHuman',
  },
  {
    contract: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    name: 'Uniswap V3: Positions NFT (UNI-V3-POS)',
  },
  {
    contract: '0x0B5Beca80CA90E1658cBfb5f72FFD2f47e14cE70',
    name: 'GhettoSharkhood',
  },
  {
    contract: '0x7af0a49d94ca759a1bb2596b6ce7e1d017266668',
    name: 'striatis',
  },
  {
    contract: '0x2B767222822A53322F88DdcE241c16CfCe9deCe2',
    name: 'Flipped Punks',
  },
  {
    contract: '0xa7d0043760b936c2416e07203ace2546f1dbc9c0',
    name: 'Wizard Treasure Collective',
  },
  {
    contract: '0x5a91f86c4eb5f113575770f99ba8241371961c85',
    name: 'The Everyones',
  },
  {
    contract: '0xbf331d15070494020502c8a1970649a12e067dbb',
    name: 'Rock Dogs',
  },
  {
    contract: '0xc143bbfcdbdbed6d454803804752a064a622c1f3',
    name: 'Async Blueprints',
  },
  {
    contract: '0x44a144f115b11ab052563ca17dfd430c914bd989',
    name: 'Tokenpuss',
  },
  {
    contract: '0xadc28cac9c1d53cc7457b11cc9423903dc09dddc',
    name: 'Sketchy Ape Book Club',
  },
  {
    contract: '0x03f3426fe1c016a96de0da4e26aee7523dbe2c19',
    name: 'Kong VS Kaiju Game - KVK',
  },
  {
    contract: '0x96bE46c50E882dbd373081d08E0CDE2B055Adf6c',
    name: 'ASMAIFAAllStarsCharacter',
  },
  {
    contract: '0x629a673a8242c2ac4b7b8c5d8735fbeac21a6205',
    name: 'Sorare',
  },
  {
    contract: '0x5fdb2b0c56afa73b8ca2228e6ab92be90325961d',
    name: 'Slotie',
  },
  {
    contract: '0xbcdf4823fc65e6aa243963f955fd5ce885066306',
    name: 'SEEDS',
  },
  {
    contract: '0x6d9e65c3e51837171eebbb4c11808bb9c2ea9353',
    name: 'Soulware',
  },
  {
    contract: '0xa048c212449c68eaaf866309c1202db7ab512c5c',
    name: 'Miss Universe NFT',
  },
  {
    contract: '0xc9e77ef4a304b39bea702b882e701b757dcd3730',
    name: 'Roaring Roccstars',
  },
  {
    contract: '0xC84cC1111aDacE071e2a57a61c42450d4e133F16',
    name: 'Doges (Doges)',
  },
  {
    contract: '0x50f5474724e0ee42d9a4e711ccfb275809fd6d4a',
    name: "Sandbox's LANDs",
  },
  {
    contract: '0x2bf2bd6298732ab7f4a9322e4a933d22ddaf68bb',
    name: 'DAPEYC',
  },
  {
    contract: '0xb9eb6d88f38b8cb666926054a6820c01fe2a2a5c',
    name: 'Flipped Doodles',
  },
  {
    contract: '0x128675d4fddbc4a0d3f8aa777d8ee0fb8b427c2f',
    name: 'PUNKS Comic 2',
  },
  {
    contract: '0x79Be9877702537c9BfF2Ad1f51dE94160bAe04A6',
    name: 'Redlion Gazette',
  },
  {
    contract: '0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d',
    name: 'Realms (for Adventurers)',
  },
  {
    contract: '0xf1b9d0d07921400b75849d581862960c1c5ba170',
    name: 'Console NFT Vaults',
  },
  {
    contract: '0x7f41d226d97b61bdf15d2c44c191dc5680337b60',
    name: 'Cryptock',
  },
  {
    contract: '0x3598fff0f78dd8b497e12a3ad91febcfc8f49d9e',
    name: 'Private Jet Pyjama Party',
  },
  {
    contract: '0x570fA0BC16487152cc2B5Ced1533930bb4888b66',
    name: 'Citizenz NFT',
  },
  {
    contract: '0x2ceac5e021efd3d6d770fe9c403996afc4db36a7',
    name: 'Vikings &amp; Villagers',
  },
  {
    contract: '0x8af7abb1c69bf0a8d3b49b252fff2843596504a2',
    name: 'SamuraiDoge',
  },
  {
    contract: '0x4cA4d3B5B01207FfCe9beA2Db9857d4804Aa89F3',
    name: 'Paradise Trippies',
  },
  {
    contract: '0x4e00fD9dBa5Fa7F870314625Fda4C3e8749134dc',
    name: 'AdultFantasySeasonOne',
  },
  {
    contract: '0x48f7a31995fc71baec70c412ed5c1837c86abe84',
    name: 'Mutant Mingos',
  },
  {
    contract: '0x073Ca28E04719C05a5a48C1d992091b4075A0F84',
    name: 'Radioactive Punks',
  },
  {
    contract: '0xE3234e57ac38890a9136247EAdFE1860316Ff6ab',
    name: 'MoodRollers',
  },
  {
    contract: '0x8a5aa86f426919bf5146c23aed4e4eb0ce742efd',
    name: 'Chromospheres',
  },
  {
    contract: '0x734f5d723f27963ba48589170fbd39453196cb0f',
    name: 'Cheeky Cougar Club',
  },
  {
    contract: '0xb82A72453403f350E14B8bF7dcc6FBD045Cc0d3C',
    name: 'WombaTeam',
  },
  {
    contract: '0xeed560b1b0172baa6e137c27aa0a643326f360d1',
    name: 'The Winkybots',
  },
  {
    contract: '0x3abedba3052845ce3f57818032bfa747cded3fca',
    name: 'Ether Orcs Genesis (Orcs)',
  },
  {
    contract: '0x7A3b97a7400E44DAdD929431a3640e4FC47dAEbD',
    name: 'Apes In Space',
  },
  {
    contract: '0x3F691327267993cFE4842CA1364A52DfE6190Ec1',
    name: 'Pluto2',
  },
  {
    contract: '0x9Bf252f97891b907F002F2887EfF9246e3054080',
    name: 'apekidsclub',
  },
  {
    contract: '0x73834c4456b38346013294c9d16b5e172cd5ca69',
    name: 'SupDucklings',
  },
  {
    contract: '0x368ad4a7a7f49b8fa8f34476be0fc4d04ce622f5',
    name: 'OGCR (OG Crystals)',
  },
  {
    contract: '0x8bdca0301ad51ccbb94ca3d25d13bd210225254b',
    name: 'AlmightyPigs',
  },
  {
    contract: '0x030d5ffc1f8a64c58a040e0216b96e52c5cbe569',
    name: 'Baby Ghosts',
  },
  {
    contract: '0x0c6218d95735d3e12ae7c4703106e4b8e0b61010',
    name: 'Purrnelopes Kittens',
  },
  {
    contract: '0xfd1076d80FfF9dC702ae9fDfEa0073467B9B3fb7',
    name: 'Spooky Boys Country Club (sbcc)',
  },
  {
    contract: '0x709ea840f66fb32A762908aFaE673610E169bf5a',
    name: 'Synthopia',
  },
  {
    contract: '0x05fEBF6A40A672854b3549F2B814e9a9946E6CC7',
    name: 'Floor',
  },
  {
    contract: '0x36a196993805e2e57411250864e2faafe33fb945',
    name: 'FastFoodDoge',
  },
  {
    contract: '0xf423550b3f166af3d73f9f07087fa7996ff8af60',
    name: 'Big Shots',
  },
  {
    contract: '0x06012c8cf97bead5deae237070f9587f8e7a266d',
    name: 'CryptoKitties (CK)',
  },
  {
    contract: '0x57a204aa1042f6e66dd7730813f4024114d74f37',
    name: 'CyberKongz',
  },
  {
    contract: '0x3ca5b00ade54365fbd590d4bc397e044a13068e5',
    name: 'Feudalz (FEUDALZ)',
  },
  {
    contract: '0x78898ffa059d170f887555d8fd6443d2abe4e548',
    name: 'Infinite Grid',
  },
  {
    contract: '0xf3114dd5c5b50a573e66596563d15a630ed359b4',
    name: 'Fat Ape Club',
  },
  {
    contract: '0xbad6186E92002E312078b5a1dAfd5ddf63d3f731',
    name: 'Anonymice (MICE)',
  },
  {
    contract: '0x7f7685b4cc34bd19e2b712d8a89f34d219e76c35',
    name: 'Women Rise',
  },
  {
    contract: '0x1c2CD50f9Efb463bDd2ec9E36772c14A8D1658B3',
    name: 'Bees Deluxe',
  },
  {
    contract: '0x2d004b72d8b7d36f9da2e4a14516618bf53bac57',
    name: 'Furballs (FBL)',
  },
  {
    contract: '0x60e4d786628fea6478f785a6d7e704777c86a7c6',
    name: 'MutantApeYachtClub',
  },
  {
    contract: '0x8e8a592a7d8f6a2c9a8b10b7a74b49895523b3f8',
    name: 'Astra Guild Ventures',
  },
  {
    contract: '0x1CB1A5e65610AEFF2551A50f76a87a7d3fB649C6',
    name: 'Cryptoadz (TOADZ)',
  },
  {
    contract: '0x698fbaaca64944376e2cdc4cad86eaa91362cf54',
    name: 'Neo Tokyo: Outer Identities',
  },
  {
    contract: '0x35bfbC3298FD28244b91518D062327adf33CbD23',
    name: 'AntzNFT',
  },
  {
    contract: '0x89d0f4f3b3173f4e47ccf64b5d03d982e2dd6387',
    name: 'ChimpClub',
  },
  {
    contract: '0xb7f7971926cc0ba223a8e36232e6da8b0f5c887d',
    name: 'Mechanized Abstractions',
  },
  {
    contract: '0xc6c817cd60e17fed0af2a759624e02dd6c812e64',
    name: 'MetaBillionaire',
  },
  {
    contract: '0x0b4b2ba334f476c8f41bfe52a428d6891755554d',
    name: 'JRNY NFT Club',
  },
  {
    contract: '0xbe6a2f5960b27c7fde12e073d61b962d9c6c3cb7',
    name: 'Mystic Wizards',
  },
  {
    contract: '0x0f4b28d46cab209bc5fa987a92a26a5680538e45',
    name: 'NonconformistDucks',
  },
  {
    contract: '0xb8f0bb7f5d2bb0d280cc0b60675675d31c105529',
    name: 'Enchanted Game',
  },
  {
    contract: '0x2eFa07CaC3395599db83035D196F2A0e7263F766',
    name: 'FlowerGirls',
  },
  {
    contract: '0x68c70406cebae5901a88cf7e024a2b02a6a0fbba',
    name: 'BabyElonWorld',
  },
  {
    contract: '0xDce194B00d3D496861731Ca230229eC860Ae8b30',
    name: '999PUNKS',
  },
  {
    contract: '0xd75e389dc871e353196c58658918037bc0400aa7',
    name: 'Lotus Collection',
  },
  {
    contract: '0x4cec2ca9cc2dd7e458114b408635a07511c52a45',
    name: 'Lotus Collection',
  },
  {
    contract: '0x62d8aE32B0e6964d2126716cf3Da70C2bD062D94',
    name: 'Alien Secret Society',
  },
  {
    contract: '0xb91d89997e5356a3bb0c33908efc80f12241bc85',
    name: 'ThorDragon Collection',
  },
  {
    contract: '0xf766d873d7548c15c51703dafcf88dcdb068f9f4',
    name: 'Lotus Collection',
  },
  {
    contract: '0xb2dD01ee7B2c7BADC9EC08c97dA7EC01AC53fA29',
    name: 'DINOX',
  },
  {
    contract: '0xb76FBBB30e31F2c3BDaA2466CfB1CfE39b220D06',
    name: 'Wool Pouch',
  },
  {
    contract: '0x92e0b57e6baf085a8fddcd9d60dd701c9ca8a5d6',
    name: 'Midnight Munchies',
  },
  {
    contract: '0x1bc2804bf111a24bd10e39a505e12bc6926bc100',
    name: 'Space Traveler Club',
  },
  {
    contract: '0x66935172bcc9322bf8ac16c41c8e489d237b8fce',
    name: 'Suga Squad',
  },
  {
    contract: '0xf07468ead8cf26c752c676e43c814fee9c8cf402',
    name: 'CryptoPhunksV2',
  },
  {
    contract: '0x5F001a2A283D58192E9aF7181aD10110FBBEEe19',
    name: 'Cyclops Monkey Club',
  },
  {
    contract: '0x1F0Ad1F5280adF7AD971c0f911Cc1F7A882033C5',
    name: 'PuzlPack (Punks)',
  },
  {
    contract: '0x976330a69204E51967Bc55512344e284620aFCB0',
    name: 'Polite Raptors Pack',
  },
  {
    contract: '0xbc6f861928a7b6da05e6295bc081c08849358958',
    name: 'Bored Ape Flipped Club',
  },
  {
    contract: '0xf1268733c6fb05ef6be9cf23d24436dcd6e0b35e',
    name: 'Desperate ApeWives',
  },
  {
    contract: '0x8a9ECe9d8806eB0CdE56Ac89cCB23a36E2C718cf',
    name: 'Humans of the Metaverse',
  },
  {
    contract: '0x61621722798e4370a0d965a5bd1fdd0f527699b1',
    name: 'The Cult DAO',
  },
  {
    contract: '0x41cB4a771FdD019ADBF4685bd4885fbBeedE1784',
    name: 'NOUNDLESTHEORY',
  },
  {
    contract: '0xb3743206c391d71d5234d349c456502d74547805',
    name: 'BitFrenchie',
  },
  {
    contract: '0x134460d32fc66a6d84487c20dcd9fdcf92316017',
    name: 'Woodie',
  },
  {
    contract: '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0',
    name: 'SuperRare',
  },
  {
    contract: '0x4b3406a41399c7FD2BA65cbC93697Ad9E7eA61e5',
    name: 'Lost Poets (POETS)',
  },
  {
    contract: '0x26437d312fb36bdd7ac9f322a6d4ccfe0c4fa313',
    name: 'ASMAIFAAllStarsBoxSet (AIFABOX)',
  },
  {
    contract: '0xabb3738f04dc2ec20f4ae4462c3d069d02ae045b',
    name: 'KnownOriginDigitalAsset',
  },
  {
    contract: '0x13d66DBAce34218fDDaF50f7057092a43507adef',
    name: 'Hungry Wolves',
  },
  {
    contract: '0x96316355c44be69414756d6706c61e61aecbd5f3',
    name: 'Cosmic Labs (CLABS)',
  },
  {
    contract: '0x7EA3Cca10668B8346aeC0bf1844A49e995527c8B',
    name: 'CyberKongz VX (KONGZ VX)',
  },
  {
    contract: '0x9f4564b85cb77ce76cc725f29758cbfe20213aae',
    name: 'Crazy Bunny',
  },
  {
    contract: '0x5df89cC648a6bd179bB4Db68C7CBf8533e8d796e',
    name: 'Honey Hive Deluxe',
  },
  {
    contract: '0xaAdBA140Ae5e4c8a9eF0Cc86EA3124b446e3E46A',
    name: 'MutantCats (MUTCATS)',
  },
  {
    contract: '0x21bf3da0cf0f28da27169239102e26d3d46956e5',
    name: 'Monaco Planet (MONA)',
  },
  {
    contract: '0xEB58af5F7a6e050E170Bf0ebF0dF21d2D713F494',
    name: 'HungryBunz',
  },
  {
    contract: '0x8b19a0b00eadb34ade0803062fee1e96e13a2dfd',
    name: 'Wrapped Etherization',
  },
  {
    contract: '0xb949c195da405aa1fb038eace15ccc73c8798a30',
    name: 'The Meta Art Club',
  },
  {
    contract: '0x8c5029957Bf42c61d19a29075Dc4e00b626E5022',
    name: 'Alpha Girl Club',
  },
  {
    contract: '0x2a7b065165ef89ff796d187a9c9118f304a5c26e',
    name: 'Crocs League',
  },
  {
    contract: '0x031920cc2d9f5c10b444fd44009cd64f829e7be2',
    name: 'CryptoZunks (ZUNK)',
  },
  {
    contract: '0xe27a60f3cf27f716ac998b61492a36090973aac7',
    name: 'BearGame',
  },
  {
    contract: '0x838804a3dd7c717396a68F94E736eAf76b911632',
    name: 'ZenApe',
  },
  {
    contract: '0x7CC78084e8d7B2be045fD23D0cdf749599Db6Eb4',
    name: 'VeeDAO',
  },
  {
    contract: '0x977dc06b51E14277a5ac047B44c78DBCc60A372B',
    name: 'MekaApeClub',
  },
  {
    contract: '0x56d26dcf777da81fca4e9926bda3738d3550398a',
    name: 'GAMA Ship #1',
  },
  {
    contract: '0xa4eacdf4af749060a22aefe06337cb9fb96d45fb',
    name: 'Shark Outlaw Squad',
  },
  {
    contract: '0xc6ec80029cd2aa4b0021ceb11248c07b25d2de34',
    name: 'the littles NFT',
  },
  {
    contract: '0x8a90cab2b38dba80c64b7734e58ee1db38b8992e',
    name: 'Doodles (DOODLE)',
  },
  {
    contract: '0xF6865FCbe5C65c21148f3BE37F71f16A55F29170',
    name: 'OGCATS',
  },
  {
    contract: '0x6828b40960a7ef5ac8efc0e9a139ceeb91dc9ebf',
    name: 'Look At My Raccoon',
  },
  {
    contract: '0x2931B181Ae9Dc8F8109eC41C42480933F411ef94',
    name: 'SlimHoods',
  },
  {
    contract: '0xB524e02A315f48ba077E88c7fB7b2655BC0F9b12',
    name: 'Cryptolex',
  },
  {
    contract: '0xD0318da435DbcE0B347cc6faA330B5A9889e3585',
    name: 'ASMBrain',
  },
  {
    contract: '0x53ae0345d8c53d9fedc880eb20955afdae4034f5',
    name: 'The Dogo',
  },
  {
    contract: '0x741d06382f00ff411c3996895bc6f4d40e0455de',
    name: 'KittyCatNFT',
  },
  {
    contract: '0xE98E81e02a31Dcb3a99Bfc10F83D40b4Faf42903',
    name: 'Shark Game',
  },
  {
    contract: '0xF16a5B64F5a774C24218a83f6FB2C7700FB6469a',
    name: 'Nishikigoi',
  },
  {
    contract: '0xa1d4657e0e6507d5a94d06da93e94dc7c8c44b51',
    name: 'WebbLand',
  },
  {
    contract: '0x7d4a9ab145577ca2fd2810a08db1442c7bffea59',
    name: 'TiKi Bar',
  },
  {
    contract: '0xA5d646e9F239d852B0D4A91fB8BaDaFc30967b86',
    name: 'LegionOfWitches',
  },
  {
    contract: '0x364C828eE171616a39897688A831c2499aD972ec',
    name: 'Sappy Seals',
  },
  {
    contract: '0x0ae114f24a68fa1ef8181cc44fa4c60321605a69',
    name: 'Comedy Monsters Club',
  },
  {
    contract: '0x7350271594848AB8c0371EF4aFeEf199c69c3E05',
    name: 'GUNSLINGERS',
  },
  {
    contract: '0xd0242443f18586c389a1013539e93f3a7b27018c',
    name: 'DSC E-MATES | 4 DA NEXT LEVEL (EMATES)',
  },
  {
    contract: '0xbd275ce24f32d6ce4e9d9519c55abe9bc0ed7fcf',
    name: 'BYOPills (BYOPILL)',
  },
  {
    contract: '0x95784f7b5c8849b0104eaf5d13d6341d8cc40750',
    name: 'Swampverse (SWAMPER)',
  },
  {
    contract: '0x0a239450B2dadfd7D1C5E7F9A2A31b4ed6A417C7',
    name: 'Rich Bulls Club',
  },
  {
    contract: '0x69dafb15ae5d8fa732829c64fd330ebfaa25b0e4',
    name: 'AV Yacht Club',
  },
  {
    contract: '0xdd70af84ba86f29bf437756b655110d134b5651c',
    name: 'iNFT Personality Pod',
  },
  {
    contract: '0x3ecd3Bd68d68b7CAD7eAef9e1c4aBc823962221C',
    name: 'RyukaiTempest',
  },
  {
    contract: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
    name: 'BoredApeYachtClub (BAYC)',
  },
  {
    contract: '0xBa0A8Ff51F281F7E49C6182390cfbe518f965433',
    name: 'Bedlam',
  },
  {
    contract: '0x454cBC099079DC38b145E37e982e524AF3279c44',
    name: 'Yakuza Cats Society',
  },
  {
    contract: '0x5BC1d68F6A9aEa23F2fB54Baf7f67c0662194E9A',
    name: 'Feudalz Animalz',
  },
  {
    contract: '0x1a2F71468F656E97c2F86541E57189F59951efe7',
    name: 'CryptoMories (CRYPTOMORIES)',
  },
  {
    contract: '0x8c1b42672b0d242fc42b3f1bfc81ccc12df13cfe',
    name: 'SeeNoEvilMonkeyArt',
  },
  {
    contract: '0xf6793da657495ffeff9ee6350824910abc21356c',
    name: 'Rarible (RARI)',
  },
  {
    contract: '0xad9fd7cb4fc7a0fbce08d64068f60cbde22ed34c',
    name: 'VOX Series 1 (VOX)',
  },
  {
    contract: '0x6d0de90cdc47047982238fcf69944555d27ecb25',
    name: 'Regulars',
  },
  {
    contract: '0xb184b9414e7d7c436b7097ed2c774bb56fae392f',
    name: 'Society of Derivative Apes',
  },
  {
    contract: '0x7e8fb128cfb2180ed004960323568939a3d6a70f',
    name: 'WOLVERINU 1st Edition',
  },
  {
    contract: '0xf21d1B31b15282592Ff0E48f7b474B57AE418361',
    name: 'Doodled Punks',
  },
  {
    contract: '0x4cff01dbed00a5e95d705f96acf369f210c203c8',
    name: 'NOUNDLES',
  },
  {
    contract: '0x21a574fed114df1874e62600e59aae8b77e9d40b',
    name: 'Time Travel Tots',
  },
  {
    contract: '0x258AEac01672e6857972707fc129a6A39d09758b',
    name: 'Cryptowalkers',
  },
  {
    contract: '0x0e79a2beb4911284e3a5a52e6d977dd90cc93001',
    name: 'The Moon Monsters',
  },
  {
    contract: '0x7dc33b42a4970892163c0f30bda8f54dea9fd6ed',
    name: 'MINTPS',
  },
  {
    contract: '0x5df340b5d1618c543ac81837da1c2d2b17b3b5d8',
    name: 'Party Ape Billionaire Club (PABC)',
  },
  {
    contract: '0x7bb6413c939d9ecc62bdd60d6e23816b1ae9099f',
    name: 'GalacticMonkes',
  },
  {
    contract: '0x84866dd72686de59538be4381cd7acc09beb713c',
    name: 'Holiday Helpers NFT',
  },
  {
    contract: '0x6E2542aecc940ea56A9560A6b8cA34DbbEF3b520',
    name: 'Valhalla Vacation Club',
  },
  {
    contract: '0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d',
    name: 'Decentraland LAND (LAND)',
  },
  {
    contract: '0xe22e1e620dffb03065cd77db0162249c0c91bf01',
    name: 'BearX (BearX)',
  },
  {
    contract: '0x219b8ab790decc32444a6600971c7c3718252539',
    name: 'Sneaky Vampire Syndicate',
  },
  {
    contract: '0xde2942B52e75c327AD4ddD6C7Db7c398fED6199F',
    name: 'Ponpave',
  },
  {
    contract: '0x2d0ee46b804f415be4dc8aa1040834f5125ebd2e',
    name: 'Dapper Dinos',
  },
  {
    contract: '0x79FCDEF22feeD20eDDacbB2587640e45491b757f',
    name: 'mfer',
  },
  {
    contract: '0x163a7af239b409E79a32fC6b437Fda51dd8fa5F0',
    name: 'RoaringLeaders',
  },
  {
    contract: '0x05a46f1e545526fb803ff974c790acea34d1f2d6',
    name: 'n (N)',
  },
  {
    contract: '0x606206c421905cc9e2840e519b7730476e1c7a31',
    name: 'Jabroni Moon House',
  },
  {
    contract: '0xb5e366c938fe38de600a7fe2f3949a9f41157fd6',
    name: 'Spookle',
  },
  {
    contract: '0xabc207502EA88D9BCa29B95Cd2EeE5F0d7936418',
    name: 'Yield Guild Badge',
  },
  {
    contract: '0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2',
    name: 'MetaHero',
  },
  {
    contract: '0x82c7a8f707110f5fbb16184a5933e9f78a34c6ab',
    name: 'Emblem Vault V2 (Emblem.pro)',
  },
  {
    contract: '0x3a5051566b2241285be871f650c445a88a970edd',
    name: 'The Humanoids (HMNDS)',
  },
  {
    contract: '0xb3767b2033cf24334095dc82029dbf0e9528039d',
    name: 'Rocketeer',
  },
  {
    contract: '0xdf5b5ee15cc96ba7d0cb6bd9b2c0fc4417ab6445',
    name: 'Mirror Editions V3',
  },
  {
    contract: '0x7AB2352b1D2e185560494D5e577F9D3c238b78C5',
    name: 'Adam Bomb Squad (ABS)',
  },
  {
    contract: '0xbda2481db91fc0f942ed3f53de378ba45ba9d17e',
    name: 'Farmer',
  },
  {
    contract: '0x2c88aa0956bc9813505d73575f653f69ada60923',
    name: 'Land',
  },
  {
    contract: '0x43a10115280634d788815cd9316df1d07c92e1c5',
    name: 'ratDAO',
  },
  {
    contract: '0x3b3bc9b1dd9f3c8716fff083947b8769e2ff9781',
    name: 'Arabian Camels',
  },
  {
    contract: '0xf1026716Ef967bdac62321D98EB8Dea9943D3CA2',
    name: 'NiftyPistol',
  },
  {
    contract: '0x0ffa87cd27ae121b10b3f044dda4d28f9fb8f079',
    name: 'Sidus NFT Heroes (Sidus)',
  },
  {
    contract: '0x05fe017770d0ca164736537177e1d571d16bbade',
    name: 'MineableWords',
  },
  {
    contract: '0xe0fa9fb0e30ca86513642112bee1cbbaa2a0580d',
    name: 'The Greats',
  },
  {
    contract: '0xa5ae87b40076745895bb7387011ca8de5fde37e0',
    name: 'Bubblegum Kids',
  },
  {
    contract: '0x1a92f7381b9f03921564a437210bb9396471050c',
    name: 'Cool Cats (COOL)',
  },
  {
    contract: '0x218FDc5b352F6560E3ee67DA8112fe663f38AcA1',
    name: 'Chill Ape Club',
  },
  {
    contract: '0xB445F58FE2319A82802f431949F56b8057B66EA4',
    name: 'Rebel Rabbits - Volume 1',
  },
  {
    contract: '0x4BB33f6E69fd62cf3abbcC6F1F43b94A5D572C2B',
    name: 'Bears Deluxe',
  },
  {
    contract: '0xc91d89828cd0d635d0475ec6785c497dc1bf240f',
    name: 'Frame',
  },
  {
    contract: '0xef0182dc0574cd5874494a120750fd222fdb909a',
    name: 'RumbleKongLeague',
  },
  {
    contract: '0x90ca8a3eb2574f937f514749ce619fdcca187d45',
    name: 'Gambling Apes (GA)',
  },
  {
    contract: '0x77d34ce2a73166d82d990432ed2e7c14c39539b2',
    name: 'Toadheadz',
  },
  {
    contract: '0x0Cfb5d82BE2b949e8fa73A656dF91821E2aD99FD',
    name: '10KTF',
  },
  {
    contract: '0x6c94954d0b265f657a4a1b35dfaa8b73d1a3f199',
    name: 'RUG.WTF',
  },
  {
    contract: '0x469823c7B84264D1BAfBcD6010e9cdf1cac305a3',
    name: 'Crypto Bull Society (CBS)',
  },
  {
    contract: '0xc679f22996efcc120626b18f9d01af1603b98952',
    name: 'Agent1',
  },
  {
    contract: '0xafd0ca9f0674b30b0436137177d0327be584fdb9',
    name: 'PolyPixos',
  },
  {
    contract: '0x8c186802b1992f7650ac865d4ca94d55ff3c0d17',
    name: 'Ninja Squad (NINJA)',
  },
  {
    contract: '0x9eEeAF684E228C2D5C89435e010acC02c41Dc86B',
    name: 'Bricktopians',
  },
  {
    contract: '0x322f5577807185adaf3fA6512A7CCbbc32670c55',
    name: 'FoxGame (FOX)',
  },
  {
    contract: '0x5298c6d5ac0f2964bbb27f496a8193ce78e8a8e6',
    name: 'TheEnigma (ENG)',
  },
  {
    contract: '0xf7143ba42d40eaeb49b88dac0067e54af042e963',
    name: 'Metasaurs (MTS)',
  },
  {
    contract: '0xe70da20a2b10d60ca620a4e494fe2b37c9499e97',
    name: 'GenesisApostle (GENESISAPOSTLE)',
  },
  {
    contract: '0x0322f6f11a94cfb1b5b6e95e059d8deb2bf17d6a',
    name: 'CryptoonGoonz',
  },
  {
    contract: '0x9bb26200691a21e8f737424e6d800609e3c5b2fe',
    name: 'YGG Sword and Shield',
  },
  {
    contract: '0xea04d0dbcf5210e1f20d0ea4d18e81f4893118af',
    name: '1687',
  },
  {
    contract: '0xee4446483fb92b6d21488fd4937053a09a53b7b6',
    name: 'Skull Troopers',
  },
  {
    contract: '0x2828Fd113B2459D8872633Da79C421C0275Bff53',
    name: 'Players Only NFT',
  },
  {
    contract: '0x201675fbfaaac3a51371e4c31ff73ac14cee2a5a',
    name: 'Genzee',
  },
  {
    contract: '0xBD4455dA5929D5639EE098ABFaa3241e9ae111Af',
    name: 'NFT Worlds (NFT Worlds)',
  },
  {
    contract: '0x97597002980134bea46250aa0510c9b90d87a587',
    name: 'Chain Runners',
  },
  {
    contract: '0xbf3eb06c55709674504c2181362d09b51aeaf0aa',
    name: 'Strong Ape Club',
  },
  {
    contract: '0x8d4100897447d173289560bc85c5c432be4f44e4',
    name: 'Gray Boys',
  },
  {
    contract: '0xfd1f39c04fc0ca7e54955687b55d858813160ef2',
    name: 'Fierce Models',
  },
  {
    contract: '0xb81d3c6a6b7fd08eb2ab940386a80789ae6feb88',
    name: 'ISLANDverse',
  },
  {
    contract: '0x08D7C0242953446436F34b4C78Fe9da38c73668d',
    name: 'PROOF Collective',
  },
  {
    contract: '0xbee93b0dbcba090a5d73cbdcf4a9f8559472f46d',
    name: 'FreshApes',
  },
  {
    contract: '0xaed39dfa6cb15146c996ee378ca1c2153ed59464',
    name: 'The Viking Club',
  },
  {
    contract: '0xD8682bFA6918b0174F287b888e765b9A1b4dc9c3',
    name: 'The Moon Boyz',
  },
  {
    contract: '0x47bd71b482b27ebdb57af6e372cab46c7280bf44',
    name: 'Blockchain Miners Club',
  },
  {
    contract: '0xde17efac631d766e509c8bb77fc9811b4a3c0750',
    name: 'ZombieCats (ZOMCATS)',
  },
  {
    contract: '0x5a3a79c4519e60b69bccca97bb9496e197e9f164',
    name: 'Doodle Apes',
  },
  {
    contract: '0x8943c7bac1914c9a7aba750bf2b6b09fd21037e0',
    name: 'Lazy Lions (LION)',
  },
  {
    contract: '0x3582379612a58ac8bd9fbd483492c88c55d18794',
    name: 'Elite Doge Club',
  },
  {
    contract: '0xed38e45802139fbe04d0407b85470f9e10791303',
    name: 'FrostyFriends',
  },
  {
    contract: '0xee0ba89699a3dd0f08cb516c069d81a762f65e56',
    name: 'Sneaky Bat Syndicate (SBS)',
  },
  {
    contract: '0x1D20A51F088492A0f1C57f047A9e30c9aB5C07Ea',
    name: 'loomlocknft (LL)',
  },
  {
    contract: '0xa6794DEc66Df7d8B69752956df1b28cA93f77CD7',
    name: 'Savage Droids (SD888)',
  },
  {
    contract: '0x6d4530149e5b4483d2f7e60449c02570531a0751',
    name: 'NFTBoxes',
  },
  {
    contract: '0x5180b83f2ff1eD7a78250EDBe36864dF630e0756',
    name: 'Strange Hands',
  },
  {
    contract: '0xaaF1554F6D075870CABAdAa746BeBFa11bD3dB64',
    name: 'HovercarsAnimetas',
  },
  {
    contract: '0x2963ba471e265e5f51cafafca78310fe87f8e6d1',
    name: 'MakersPlace',
  },
  {
    contract: '0x916758C4588D0614488F2C53dDC6c337a245d7d7',
    name: 'Ghostbusters: Afterlife Collectibles',
  },
  {
    contract: '0x9011CF11924e83A0391B4096D5F054ea1712ba4b',
    name: 'Ancient Cats Club',
  },
  {
    contract: '0x614bd1970f5C19C0424974a354E0D1c3c1441D84',
    name: 'Muhreens',
  },
  {
    contract: '0xf62c6a8e7bcdc96cda11bd765b40afa9ffc19ab9',
    name: 'HeadDAO (HEAD)',
  },
  {
    contract: '0x2acab3dea77832c09420663b0e1cb386031ba17b',
    name: 'DeadFellaz (DEADFELLAZ)',
  },
  {
    contract: '0x35E1402Fa69C60851EA8b86f04d823ff41796a51',
    name: 'ZodiacCapsule',
  },
  {
    contract: '0x9d00d9b009ab80a18013675011c93796d89de6b4',
    name: 'Transponders',
  },
  {
    contract: '0x9dc44047750a972dee1b4b7c9bb7474fe922992f',
    name: 'Rich Fxxk',
  },
  {
    contract: '0x2fE776dD5fD2388F5ccaEFaD214989131B3A8d6b',
    name: 'Crypto Noun Punks',
  },
  {
    contract: '0xba30e5f9bb24caa003e9f2f0497ad287fdf95623',
    name: 'BoredApeKennelClub',
  },
  {
    contract: '0x12d2d1bed91c24f878f37e66bd829ce7197e4d14',
    name: 'Galactic Apes',
  },
  {
    contract: '0xD46814b736Db3C6FEeD576A59e3fF140075c9e0a',
    name: 'DarkHorizon (DH)',
  },
  {
    contract: '0xc2e9678a71e50e5aed036e00e9c5caeb1ac5987d',
    name: 'Zero Name Service',
  },
  {
    contract: '0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7',
    name: 'Meebits (⚇)',
  },
  {
    contract: '0x35c5f264a0fcb8a16216fb8ed594d0c64eea4364',
    name: 'O.G Pixeladz',
  },
  {
    contract: '0x608C2feb6B80993B26ffB6fa84F454Ad3Ac38bF0',
    name: 'Goat Soup (GSOUP)',
  },
  {
    contract: '0x6b47e7066c7db71aa04a1d5872496fe05c4c331f',
    name: 'dcl://rtfkt_x_atari',
  },
  {
    contract: '0xf655377696496746b9bfc09075f0f0ba5745a23b',
    name: 'Cybergoats',
  },
  {
    contract: '0x26454a066c7b4220f9d9a396606e5a1c809362e4',
    name: 'Shitties',
  },
  {
    contract: '0x44467df37184cc452a199fdd60ee4ccdaab5a71a',
    name: 'The Species Pandas',
  },
  {
    contract: '0xc92ceddfb8dd984a89fb494c376f9a48b999aafc',
    name: 'Creature World',
  },
  {
    contract: '0x7cefbb899ec6c317a40d801a4f7ccca0dd6bff33',
    name: 'Squadrons',
  },
  {
    contract: '0xD09828E274D7932A2414bDeb1faA3320fE019cd7',
    name: 'THORChads',
  },
  {
    contract: '0xfd3fd9b793bac60e7f0a9b9fb759db3e250383cb',
    name: 'Ethereans (ETHRS)',
  },
  {
    contract: '0xdbed491efd1dcab8e1a309373aa71724bbb229dc',
    name: 'The FluffyButts',
  },
  {
    contract: '0xbe3026082402c7bb344729ce3a51b259bf1e5915',
    name: 'Staked n',
  },
  {
    contract: '0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7',
    name: 'Zora (ZORA)',
  },
  {
    contract: '0xe3435edbf54b5126e817363900234adfee5b3cee',
    name: 'Voxies',
  },
  {
    contract: '0x6e4bcd1853259c071796a2a92b0153104315c4b8',
    name: 'World Of Norja',
  },
  {
    contract: '0xf24bf668aa087990f1d40ababf841456e771913c',
    name: 'Metamon',
  },
  {
    contract: '0xeafa25e962ee875f75fdc97e152d39bb4c8978ae',
    name: 'Space Capsules',
  },
  {
    contract: '0x63766406100931A257198b58cea68B9356631b11',
    name: 'MTM Characters',
  },
  {
    contract: '0xe785e82358879f061bc3dcac6f0444462d4b5330',
    name: 'World Of Women (WOW)',
  },
  {
    contract: '0x90ee3cf59fcde2fe11838b9075ea4681462362f1',
    name: 'Non Fungible Fungi',
  },
  {
    contract: '0xD6f817FA3823038D9a95B94cB7ad5468a19727FE',
    name: 'Toddlerpillars (TDPL)',
  },
  {
    contract: '0xe3f92992bb4f0f0d173623a52b2922d65172601d',
    name: 'Knights of Degen',
  },
  {
    contract: '0x30a51024cef9e1c16e0d9f0dd4acc9064d01f8da',
    name: 'MetaSharks (MS)',
  },
  {
    contract: '0x6dfcb04b7d2ab2069d9ba81ac643556429eb2d55',
    name: 'Stoned Ape Saturn Club',
  },
  {
    contract: '0xc3f733ca98e0dad0386979eb96fb1722a1a05e69',
    name: 'Acclimated​MoonCats (😺)',
  },
  {
    contract: '0x127e479ac59a1ea76afdedf830fecc2909aa4cae',
    name: 'Avarik Saga (AVARIK)',
  },
  {
    contract: '0xeefc101baf6db9af1874193517cba7d84f4414a4',
    name: 'NFLips',
  },
  {
    contract: '0x0c2E57EFddbA8c768147D1fdF9176a0A6EBd5d83',
    name: 'KaijuKingz (KAIJU)',
  },
  {
    contract: '0xa54E6b99f58b6165228abcdc681e9a16bceFdBe1',
    name: 'Sherbet (SHERBET)',
  },
  {
    contract: '0x138ff21a21dfc06fbfccf15f2d9fd290a660e152',
    name: 'Based Fish Mafia (BFM)',
  },
  {
    contract: '0x9759226b2f8ddeff81583e244ef3bd13aaa7e4a1',
    name: 'Purrnelopes Country Club (PCC)',
  },
  {
    contract: '0x2913d4f7c473ff3b6a070cc0190dfc04c48d6c15',
    name: 'SHOEz',
  },
  {
    contract: '0xdb3b2e1f699caf230ee75bfbe7d97d70f81bc945',
    name: 'DormantDragon',
  },
  {
    contract: '0x094c8e76d9e1e2a9c447d115dd1df043947c8126',
    name: 'Eggzilla',
  },
  {
    contract: '0x63ca35602155945dFeB20b215313d48eBd504347',
    name: 'Unit 410 100',
  },
  {
    contract: '0xb94283dd50406c0c7137ec8436dbe5b808dee856',
    name: 'Caturday Tales',
  },
  {
    contract: '0xf6e2c197e96b63b982ca639262cdf0a5f296d528',
    name: 'ApesOfSpace (AOS)',
  },
  {
    contract: '0x177ef8787ceb5d4596b6f011df08c86eb84380dc',
    name: 'Smilesss',
  },
  {
    contract: '0x90a450629A2E2b5203DbCca29Ce1f266de04AFda',
    name: 'Woofpack NFT',
  },
  {
    contract: '0x055700706718279e089523b5166e423c7537c4f1',
    name: 'Rooftops',
  },
  {
    contract: '0x8104137af7e7f0a124801ecd90f79ed1eb6fc06d',
    name: 'Doadz',
  },
  {
    contract: '0xfc2f56dc926c7fddac4000c0a38e30bd36a43d30',
    name: 'Crypto Hobos Pet Partners',
  },
  {
    contract: '0xc8100dd81e0d8d0901b7b5831e575b03e1489057',
    name: 'Fragment',
  },
  {
    contract: '0x22c1f6050e56d2876009903609a2cc3fef83b415',
    name: 'POAP',
  },
  {
    contract: '0xb1469271ff094d7fb2710b0a69a80a01ec5dbf24',
    name: 'Deez Nuts',
  },
  {
    contract: '0xc5fd1f4dcc8678c5cf5820e096b6db0a10aeeed1',
    name: 'Project3333',
  },
  {
    contract: '0xfc778be06c9a58f8f3e5e99216efbb28f750bc98',
    name: 'ETHEREALS',
  },
  {
    contract: '0x960b7a6BCD451c9968473f7bbFd9Be826EFd549A',
    name: 'OnChainMonkey (OCMONK)',
  },
  {
    contract: '0x0ff6ff088a3dc5f56cf9edfa411acfdfffc59735',
    name: 'CryptoWhaleClub',
  },
  {
    contract: '0x65c234d041f9ef96e2f126263727dfa582206d82',
    name: 'Rabbitars',
  },
  {
    contract: '0x746Db7B1728aF413C4e2b98216C6171B2FC9D00e',
    name: 'Influence Crew',
  },
  {
    contract: '0xbd3531da5cf5857e7cfaa92426877b022e612cf8',
    name: 'PudgyPenguins (PPG)',
  },
  {
    contract: '0x12bb5bf8a166098e1839d3f1396d73ac3fe42926',
    name: 'XOiDs',
  },
  {
    contract: '0xd5dd0814f62a21ab649fb9cb86dfe0a085d0e28a',
    name: 'Loopy Cups',
  },
  {
    contract: '0x4cd0ea8b1bdb5ab9249d96ccf3d8a0d3ada2bc76',
    name: 'Boonji Project (BOONJI)',
  },
  {
    contract: '0x1ca39c7f0f65b4da24b094a9afac7acf626b7f38',
    name: 'GEN.ART',
  },
  {
    contract: '0x5f9e300108fb156cfbe21c48a870876e97745af9',
    name: 'Uncool Cats (UNCOOL)',
  },
  {
    contract: '0x01f9a9ac79044511b7861677dc9f70ed05d09e1f',
    name: '81 Horizons',
  },
  {
    contract: '0xef1bd9175b86cccc9be304a40b4d5528c9215929',
    name: 'Crypto Copy Cats',
  },
  {
    contract: '0x75c804fFb01b16B7592a0B9644835244E2140728',
    name: 'Sophia beingAI iNFT',
  },
  {
    contract: '0xad628A5515A1eE56088aC188633E2AEEaAe474d6',
    name: 'LordsOfLightPacks (RTLOL)',
  },
  {
    contract: '0x880644ddf208e471c6f2230d31f9027578fa6fcc',
    name: 'Jenkins the Valet',
  },
  {
    contract: '0x76e51bc8fa0beebcf3e45de408fa43c9dc5ffb27',
    name: 'Primate Social Society',
  },
  {
    contract: '0x80d77b4ae7cd0d7a21fd3c1b2da25a4a06b63923',
    name: 'Billionaires (BB)',
  },
  {
    contract: '0xf1eF40f5aEa5D1501C1B8BCD216CF305764fca40',
    name: 'Heroes of Evermore',
  },
  {
    contract: '0x918f677b3ab4b9290ca96a95430fd228b2d84817',
    name: 'Lil Baby Ape Club',
  },
  {
    contract: '0x8dd92dd186f05e3e9f1844cd9047617adad8a66d',
    name: 'Lazy Bunny NFT',
  },
  {
    contract: '0x6D3F05A772A7e28A8c10F463683eFf220675FcA9',
    name: 'Power Pups',
  },
  {
    contract: '0x986aea67c7d6a15036e18678065eb663fc5be883',
    name: 'NiftyDegen',
  },
  {
    contract: '0xF4ee95274741437636e748DdAc70818B4ED7d043',
    name: 'The Doge Pound (DOGGY)',
  },
  {
    contract: '0xcdc587359c62140fe4bd1764011643131a980d2f',
    name: 'Superballs',
  },
  {
    contract: '0x3f0785095a660fee131eebcd5aa243e529c21786',
    name: 'Super Yeti (defra)',
  },
  {
    contract: '0x099689220846644f87d1137665cded7bf3422747',
    name: 'Robotos (ROBO)',
  },
  {
    contract: '0x39b780e8062ce299ab60ed3d48f447e97511a2ed',
    name: 'Genesis Rocks: 10,000',
  },
  {
    contract: '0xc3c8a1e1ce5386258176400541922c414e1b35fd',
    name: 'Arcadians',
  },
  {
    contract: '0x15cc16bfe6fac624247490aa29b6d632be549f00',
    name: 'AnonymiceBreeding',
  },
  {
    contract: '0xCcc441ac31f02cD96C153DB6fd5Fe0a2F4e6A68d',
    name: 'FLUF',
  },
  {
    contract: '0x88341d1a8f672d2780c8dc725902aae72f143b0c',
    name: 'NFTfi Promissory Note',
  },
  {
    contract: '0x787cf4212e8840dac775b496ef7e2c06f717e779',
    name: 'ThePenguinAcademy',
  },
  {
    contract: '0x82712d0052c6d8185383b5554a071c440b902992',
    name: 'Curious Addys Trading Club',
  },
  {
    contract: '0x8a6e948a30ee8cb1391712710c1c59be553ab008',
    name: 'EvoSnails (EVOSNAIL)',
  },
  {
    contract: '0x2D366Be8fA4D15c289964dD4Adf7Be6Cc5e896E8',
    name: 'MetaZoo Games Tokens',
  },
  {
    contract: '0xbbe23e96c48030dc5d4906e73c4876c254100d33',
    name: 'RebelBots (RB)',
  },
  {
    contract: '0x4258c7fdfebb1add96f5e3e96163f3c600ce89f7',
    name: 'Ape Kids Yacht Club',
  },
  {
    contract: '0x742eCc8686171beaD0cAa320A280ADFD0596653D',
    name: 'PhudgyPhenguins',
  },
  {
    contract: '0xd7a2c33fd059ff5c6159c51087bace5842060791',
    name: 'WolveSkaters',
  },
  {
    contract: '0x18f87c05325ae47bfe75c039198b3dc1cb2ed23d',
    name: 'Cheeky Lion Club',
  },
  {
    contract: '0x2a187453064356c898cae034eaed119e1663acb8',
    name: 'DCL Registrar',
  },
  {
    contract: '0x71c4658acc7b53ee814a29ce31100ff85ca23ca7',
    name: 'GalaXY Kats (GXYK)',
  },
  {
    contract: '0xdb55584e5104505a6b38776ee4dcba7dd6bb25fe',
    name: 'Visitors of Imma Degen (VOID)',
  },
  {
    contract: '0x537B9AF55daDcaD9D22309e5b8CE35CFFD8c1925',
    name: 'Toad Sockz (Gen 0)',
  },
  {
    contract: '0xe48814b0569b744e6e75ef28403bdd7a6e7b5237',
    name: 'GoonBods',
  },
  {
    contract: '0x164915306034939e89667ba04d400a6a19b820a1',
    name: 'Piss Punks',
  },
  {
    contract: '0x6e4c6d9b0930073e958abd2aba516b885260b8ff',
    name: 'Influence Asteroids',
  },
  {
    contract: '0x2f71b570e0de81e7dac0a84de47af8bac525ebbf',
    name: 'Defi Rangers V2',
  },
  {
    contract: '0xe9f3037c7e035ab4ad286ccb6ce0be60836446cf',
    name: 'Toucan Gang',
  },
  {
    contract: '0xfcB1315C4273954F74Cb16D5b663DBF479EEC62e',
    name: 'Capsule (CAPSULE)',
  },
  {
    contract: '0x9336888c4fc4adae3c7ced55be2b54884c052d59',
    name: 'Cute Pig Club',
  },
  {
    contract: '0x9546eeb89df8f010da4953c2ef456e282b3db25a',
    name: 'Angry Apes United (AAU)',
  },
  {
    contract: '0x10a0cf0fd3b9b2d575d78130b29d61252313423e',
    name: 'M101Shelter (M101Shelter)',
  },
  {
    contract: '0x5372f926b34be60ac1436372107c3ee8c6e056e5',
    name: 'MetaTravelers: Nibiru',
  },
  {
    contract: '0x87b5D8fE6cF8b37678B6CeF7cca23a4852883C48',
    name: 'EightEightEight',
  },
  {
    contract: '0x74ecb5f64363bd663abd3ef08df75dd22d853bfc',
    name: 'Gauntlets (GNT)',
  },
  {
    contract: '0xe0d467bf7ac2780e8b51b40714431a10ea1f2256',
    name: 'Homospacien NFT',
  },
  {
    contract: '0xf36446105ff682999a442b003f2224bcb3d82067',
    name: 'Axolittles (AXOLITTLE)',
  },
  {
    contract: '0x58d2035cc2AA0D9d8b8A02B1192bF20d17bf726F',
    name: 'BlocBurgers',
  },
  {
    contract: '0x69e3fd31d528e6ca6cc6e5ff767138decc073091',
    name: 'ShiryoinuAvatar',
  },
  {
    contract: '0x4f85620beb2c229e34d00b1b1c9f5e76bc212a76',
    name: 'GYMBROs',
  },
  {
    contract: '0xA0F38233688bB578c0a88102A95b846c18bc0bA7',
    name: 'Great Ape Society',
  },
  {
    contract: '0x9aa03df95b6d3c6edfb53c09a4a8473d0d642d32',
    name: 'CryptoPolz',
  },
  {
    contract: '0x45d1f656ca86fc0bf1bacdf4e2fee9def47e0466',
    name: 'Nifkey',
  },
  {
    contract: '0xC9E0649f907aB074fDA75674b9d2E658C7449d5C',
    name: 'MushyBaras',
  },
  {
    contract: '0x41a70a616a35cbfa00cc0319748f281396366736',
    name: 'The SolaVerse: SOLA-STARS',
  },
  {
    contract: '0x57fbb364041d860995ed610579d70727ac51e470',
    name: 'MadRabbitsRiotClub',
  },
  {
    contract: '0x335f04bb577e300637fa2d646a1a3d0cbc7a0b04',
    name: 'Phlipped Phunks',
  },
  {
    contract: '0xb668beB1Fa440F6cF2Da0399f8C28caB993Bdd65',
    name: 'Neo Tokyo Citizen',
  },
  {
    contract: '0x8d2071a02608f337baae8da64f93b37abd6bde39',
    name: 'House of Warlords',
  },
  {
    contract: '0x3702f4c46785bbd947d59a2516ac1ea30f2babf2',
    name: 'GalaxyFightClub',
  },
  {
    contract: '0x34f5c46bc8d76f0484e4368cbe6c12af91c31fb7',
    name: 'Angel Baby Hit Squad',
  },
  {
    contract: '0x03f5cee0d698c24a42a396ec6bdaee014057d4c8',
    name: 'NFTeams (nftms)',
  },
  {
    contract: '0xa383d6bb58e0583bb6cee40f3c442e1b16e6958f',
    name: 'E1337',
  },
  {
    contract: '0xa9fdb3f96fae7c12d70393659867c6115683ada0',
    name: 'CryptoFoxes (CFXS)',
  },
  {
    contract: '0xAb83789d3f152118ebb5AA63190174AE0A6E0e6E',
    name: 'CryptoWolvesClub',
  },
  {
    contract: '0x1fff1e9e963f07ac4486503e5a35e71f4e9fb9fd',
    name: 'Etholvants (ETHOL)',
  },
  {
    contract: '0x56681458e00cafe1206313d2d033946f458fdefd',
    name: 'COOLDOGS',
  },
  {
    contract: '0x4efadff2c961102d9b3296b0e42ce3786b5d6d7d',
    name: 'Yakuza Cats Society - The Killers',
  },
  {
    contract: '0x894e37f02249B922b14561f234D228410cf754E2',
    name: 'FeudalzElvez',
  },
  {
    contract: '0xe3b5da60ee5f7b4b6b1ed418c3f09ded9ca2f95c',
    name: 'Bored Ape Seeking Yacht Club Issue #0',
  },
  {
    contract: '0x6f24A2A5Ecfffb0610F69929e9AA7fceF441897a',
    name: 'Syn City Genesis Passes',
  },
  {
    contract: '0x79da5fa272e8fb280cee4d0649aa6a9e4e62ceb0',
    name: 'Wall Street Bulls (WSB)',
  },
  {
    contract: '0x088dafd1c17c5fdfb9f2f7adaa157334435fe7cd',
    name: 'Polzilla',
  },
  {
    contract: '0xaa18355bcfc8ae878ee4f65fea2158bd159eb521',
    name: 'PocketCows',
  },
  {
    contract: '0xb70B759aD676b227a01F7d406E2dc9c67103aAeB',
    name: 'Shibaku',
  },
  {
    contract: '0xd930560fe9bd66a22e191be426e186249c794b71',
    name: 'Bear Game Gen Y',
  },
  {
    contract: '0xB5C747561a185A146f83cFff25BdfD2455b31fF4',
    name: 'Boss Beauties (BOSSB)',
  },
  {
    contract: '0x9a534628b4062e123ce7ee2222ec20b86e16ca8f',
    name: 'MekaVerse (MEKA)',
  },
  {
    contract: '0xdfde78d2baec499fe18f2be74b6c287eed9511d7',
    name: 'BrainDrops',
  },
  {
    contract: '0x1dcbc2a155fc62b8efa84d2759b23f29b0c7a335',
    name: 'Merry Modz (MM)',
  },
  {
    contract: '0x66C2B73EBd36b06e31b6e417b4C550F10980Ab1d',
    name: 'Prime Apes',
  },
  {
    contract: '0x3db5463a9e2d04334192c6f2dd4b72def4751a61',
    name: 'ALPACADABRAZ',
  },
  {
    contract: '0x09e0df4ae51111ca27d6b85708cfb3f1f7cae982',
    name: 'Sipher NEKO (NEKO)',
  },
  {
    contract: '0x1e988ba4692e52bc50b375bcc8585b95c48aad77',
    name: 'Bufficorn Buidl Brigade (BBB)',
  },
  {
    contract: '0x3d2224B431c359b2876858436d3A94Db777ADEc7',
    name: 'Guracorp',
  },
  {
    contract: '0x9363c2523593442cCf5cDd3B0e2d766767ed6f67',
    name: 'Roo Flex',
  },
  {
    contract: '0x6fc355d4e0ee44b292e50878f49798ff755a5bbc',
    name: 'DeadHeads (DEAD)',
  },
  {
    contract: '0x48e6013ecf4d40ce15c5223b62fc2fe33296c2e4',
    name: 'Diamond Dawgs',
  },
  {
    contract: '0x704bf12276f5c4bc9349d0e119027ead839b081b',
    name: 'Timeless',
  },
  {
    contract: '0x213fde8b7fbb8b9ecf7f34792e604eafb9bd292f',
    name: 'GodsOfRock (GOR)',
  },
  {
    contract: '0x506543b7F2dcE30e235714446DC9BD634eFAE8A1',
    name: 'SKIES',
  },
  {
    contract: '0x80a4B80C653112B789517eb28aC111519b608b19',
    name: 'Crypto Cannabis Club (CCC)',
  },
  {
    contract: '0xd668a2e001f3385b8bbc5a8682ac3c0d83c19122',
    name: 'KingFrogs',
  },
  {
    contract: '0xe8D4a560429A2B29cD12aACAD099624bb9bfeF11',
    name: 'Cyberdoge',
  },
  {
    contract: '0x85f740958906b317de6ed79663012859067e745b',
    name: 'TheWickedCraniums (TWC)',
  },
  {
    contract: '0x7e6bc952d4b4bd814853301bee48e99891424de0',
    name: 'Jungle Freaks (JFRK)',
  },
  {
    contract: '0x1afef6b252cc35ec061efe6a9676c90915a73f18',
    name: 'FLUF World: Thingies',
  },
  {
    contract: '0x60d9b4f9d85695274a5777537f204675082bd745',
    name: 'Party Grandpa Retirement Club (PGRC)',
  },
  {
    contract: '0x95ab7a1f8cf303a9724e077b34483372907e0701',
    name: 'Museum (MUSE)',
  },
  {
    contract: '0x60A0860503D9ECDA03436cA692D948319f5377f7',
    name: 'FeudalzOrcz',
  },
  {
    contract: '0x5BDf397bB2912859Dbd8011F320a222f79A28d2E',
    name: 'Corruptions',
  },
  {
    contract: '0x62e37f664b5945629B6549a87F8e10Ed0B6D923b',
    name: 'Tboa Club',
  },
  {
    contract: '0x3a8778a58993ba4b941f85684d74750043a4bb5f',
    name: 'BullsOnTheBlock (BOTB)',
  },
  {
    contract: '0xA08126f5E1ED91A635987071E6FF5EB2aEb67C48',
    name: 'GalaxyEggs (GLXY)',
  },
  {
    contract: '0xa1CF519debbf6300992A9f7f76c85011d2373744',
    name: 'SussySharks',
  },
  {
    contract: '0x2f14f1b6c350c41801b2b7ba9445670d7e2ffc70',
    name: 'Goat Society (GS)',
  },
  {
    contract: '0xcad169b6128BfBA9892712f1eD90CBe77B897532',
    name: 'Potion Punks',
  },
  {
    contract: '0x0974ec8c00c8c160d88e315579c00da6ca4e5e32',
    name: 'Something For Everyone Open Edition by Gavin Shapiro',
  },
  {
    contract: '0x4be3223f8708ca6b30d1e8b8926cf281ec83e770',
    name: 'PartyDegenerates (PARTY)',
  },
  {
    contract: '0x4f89Cd0CAE1e54D98db6a80150a824a533502EEa',
    name: 'Groupies (GROUPIE)',
  },
  {
    contract: '0x4e2781e3ad94b2dfcf34c51de0d8e9358c69f296',
    name: "Sora's Dreamworld (Sora)",
  },
  {
    contract: '0x77640cf3f89a4f1b5ca3a1e5c87f3f5b12ebf87e',
    name: 'Angry Ape Army',
  },
  {
    contract: '0x913ae503153d9a335398d0785ba60a2d63ddb4e2',
    name: 'Somnium Space Land',
  },
  {
    contract: '0x0f3900a3e4d6e3c8fbe572d94f18027d034c2365',
    name: 'Clone X One',
  },
  {
    contract: '0x3CabF160081387cd7Dcb775434339c42c232e23A',
    name: 'OmniTotems',
  },
  {
    contract: '0x3cfd8cf1ce0dcf673a8747eefa6702ee709ca5d9',
    name: 'Captured Moment. The Masters Process.',
  },
  {
    contract: '0xd0F0C40FCD1598721567F140eBf8aF436e7b97cF',
    name: 'Jadu Jetpack (JETPACK)',
  },
  {
    contract: '0xd2aad45015090f8d45ad78e456b58dd61fb7cd79',
    name: 'Bushidos (BUSHIDO)',
  },
  {
    contract: '0x059edd72cd353df5106d2b9cc5ab83a52287ac3a',
    name: 'Art Blocks',
  },
  {
    contract: '0x13aAe6f9599880edbB7d144BB13F1212CeE99533',
    name: 'Flutter Gen Art',
  },
  {
    contract: '0xfc7d8bbc4391c5d3ca6f96fbab90a867a0d6f37f',
    name: 'TheFungiNFT',
  },
  {
    contract: '0xe45693DbE1f93815265AdF4d4555d8a9100ceb76',
    name: 'Doodle Kongz',
  },
  {
    contract: '0xa5eaa8e87cCfda05932206733656D7539f3C8A2e',
    name: 'Daydreamers',
  },
  {
    contract: '0x1dc50a1d2707e466ab944a8c42ba982e288e28d4',
    name: 'Cryptopus',
  },
  {
    contract: '0x4e962d488412a14aa37eacadcb83f18c7e2271a7',
    name: 'Robopets (ROBOPET)',
  },
  {
    contract: '0x391f64a5a9af0ed15c95fd17c33fe6de81986c47',
    name: 'NFT2040 Crates',
  },
  {
    contract: '0xc49a9ab342b6ea66792d4110e9ca0ab36e3a5674',
    name: 'Chibi Apes (CHIBIAPE)',
  },
  {
    contract: '0xbd091f143ee754f1d755494441aee781d918cb93',
    name: 'Bit Monsters (💰🧟)',
  },
  {
    contract: '0x60f80121c31a0d46b5279700f9df786054aa5ee5',
    name: 'Rarible (RARI)',
  },
  {
    contract: '0x56b391339615fd0e88e0d370f451fa91478bb20f',
    name: 'Ethaliens',
  },
  {
    contract: '0xa98b29a8f5a247802149c268ecf860b8308b7291',
    name: 'ThorGuards (THORGUARDS)',
  },
  {
    contract: '0x6391a41819c699972b75bf61db6b34ef940c96f0',
    name: 'Encryptas',
  },
  {
    contract: '0xe6ef513f7429d92cb54ebd4c14026aeb90849a78',
    name: "Impact Theory Founder's Key (ITFK)",
  },
  {
    contract: '0xB8C78d9C32061dc91406ED0bd7112fF912fa55a7',
    name: 'The Vampire Game',
  },
  {
    contract: '0x6069a6c32cf691f5982febae4faf8a6f3ab2f0f6',
    name: 'BullsOnTheBlock Evo (EVOBOTB)',
  },
  {
    contract: '0x932058328f9D1E781218ae05d9fDaA2f72d8eeD9',
    name: 'DJENERATES - SPIRIT ANIMALS',
  },
  {
    contract: '0x2d6e10561b320c4f31a903bf0fa92a1ed58637c0',
    name: 'War Riders Gun',
  },
  {
    contract: '0xdc51a1f6e6dd40296ea02ffdf9dd7750a2417be1',
    name: 'Astroheads',
  },
  {
    contract: '0xa66f3bd98b4741bad68bcd7511163c6f855d2129',
    name: 'ImpermanentDigital',
  },
  {
    contract: '0xECDD2F733bD20E56865750eBcE33f17Da0bEE461',
    name: 'CryptoDads (DAD)',
  },
  {
    contract: '0xc6735852e181a55f736e9db62831dc63ef8c449a',
    name: 'Rogue Society Bots (RSB)',
  },
  {
    contract: '0x9fdb31f8ce3cb8400c7ccb2299492f2a498330a4',
    name: 'The Colors (thecolors.art) (COLORS)',
  },
];
