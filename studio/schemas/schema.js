// document schemas
import author from './documents/author'
import category from './documents/category'
import post from './documents/post'
import siteSettings from './documents/siteSettings'

// Object types
import bodyPortableText from './objects/bodyPortableText'
import bioPortableText from './objects/bioPortableText'
import excerptPortableText from './objects/excerptPortableText'
import mainImage from './objects/mainImage'
import authorReference from './objects/authorReference'
import portfolioEntry from './documents/portfolioEntry'
import portfolioImage from './objects/portfolioImage'
import medium from './documents/medium'

// Then we give our schema to the builder and provide the result to Sanity
export default [
  siteSettings,
  post,
  category,
  author,
  mainImage,
  authorReference,
  bodyPortableText,
  bioPortableText,
  excerptPortableText,
  portfolioEntry,
  portfolioImage,
  medium,
]
