export const share = {
  methods: {
    assetsUrl(type) {
      switch (type) {
        case 'media':
          return 'https://i.imgur.com/0eGiXjX.png'
        default: // person
          return 'https://i.imgur.com/Dxczjxd.png'
      }
    },
    getImageUrl(url, width = 185, type) {
      if (!url) return this.assetsUrl(type)

      return `http://image.tmdb.org/t/p/w${width}/${url}`;
    },

    bgcImg(url, bgcUrl = 'https://i.imgur.com/Dxczjxd.png') {
      console.log(url, '11')
      return {
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${url ? this.getImageUrl(url, 1280) : bgcUrl})`
        // backgroundImage: `url(${url ? this.getImageUrl(url, 1280) : 'require("@/assets/person.png")'})`
      }

    },
    getYear(date) {
      return date ? date.split("-")[0] : ''
    },
    toNewPage(url) {
      console.log(url)
      window.open(url, "_blank");
    }
  }
}