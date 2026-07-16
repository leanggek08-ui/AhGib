// Add real photos here as you get them. The backend university table has no
// `image` column (and doesn't need one) — this is just a local lookup that
// matches on the university's name, so it works with zero backend changes.
//
// HOW TO ADD AN IMAGE:
// 1. Drop the file in this assets folder (e.g. src/assets/universities/cadt.jpg)
// 2. Import it at the top of this file:
//      import cadtImg from "./universities/cadt.jpg";
// 3. Add an entry below, using the university's exact `name` as it comes back
//    from the backend as the key:
//      "CADT": cadtImg,
//
// Any university not listed here automatically falls back to a gradient
// placeholder card (see getUniversityImage below) — nothing breaks if you
// only add a few images at a time.

const universityImages = {
  // "CADT": cadtImg,
  // "RUPP": ruppImg,
};

export function getUniversityImage(universityName) {
  return universityImages[universityName] || null;
}
