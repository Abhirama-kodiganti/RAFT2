# Our Story — A Cinematic Digital Love Letter

A vintage scrapbook-style storybook built with Next.js 15 + Tailwind + Framer Motion.

## Run locally

You need [Node.js 18+](https://nodejs.org/) and yarn (or npm).

```bash
yarn install          # or: npm install
yarn dev              # starts on http://localhost:3000
```

Open `http://localhost:3000` in your browser.

## Customizing your story

All content lives in **`app/page.js`**.

### Replace the photos
At the top of `app/page.js` you'll find:

```js
const IMG = {
  cover:    '...',
  smile:    '...',
  little1:  '...', little2: '...',
  favorite: '...',
  m1: '...', m2: '...', m3: '...', m4: '...', m5: '...', m6: '...',
}
```

**Option 1 — URLs:** paste any direct image URL (Imgur, Cloudinary, etc.)

**Option 2 — Local photos:**
1. Create folder `public/photos/`
2. Drop your images in there: `public/photos/cover.jpg`, `public/photos/smile.jpg`, etc.
3. Reference them like this in `IMG`:
   ```js
   cover: '/photos/cover.jpg',
   smile: '/photos/smile.jpg',
   ```

### Edit the words
Each chapter is its own function in `app/page.js`:

| Chapter | Function |
|---|---|
| Cover | `CoverSpread()` |
| The Meet | `FirstSmileSpread()` |
| The Little Things | `LittleThingsSpread()` — edit the `items` array |
| You Became My Favorite Place | `FavoritePlaceSpread()` |
| Our Memories | `MemoriesSpread()` — edit `memories` array (the `cap` is the caption) |
| A Love Letter | `LoveLetterSpread()` |

Just change the text inside the JSX. Save → the page auto-reloads.

## Build for production

```bash
yarn build
yarn start
```

## File structure

```
app/
  page.js          ← Your entire storybook (edit here)
  layout.js        ← Fonts (Playfair, Great Vibes, Poppins, Caveat)
  globals.css      ← Paper textures, leather, polaroid styles
components/ui/     ← shadcn components (untouched)
public/            ← Put your photos here
```

Enjoy 💌
