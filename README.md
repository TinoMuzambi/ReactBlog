# Blog.TinoMuzambi

My blog site build with Next.js and styled with SCSS.

## Content

This blog makes use of a CMS (Content Management System) to deliver the content. I went with [Storyblok](https://www.storyblok.com/) for its easy to use UI, and API.

## Custom Components

This website makes use of multiple custom components that I built in place of using pre-built JS libraries. Namely:

### Custom Pagination

This component accepts a list of content and breaks it up into multiple pages. It accepts several props which it uses to determine which items to display on which page.

### Custom Comments Section

This component is a full-fledged comments section complete with liking, replying and deleting comments.

It uses Firebase for authentication which allows for signing in with Google as well as signing in anonymously.

It uses Firebase's Firestore for storing comment data as well as user data.
