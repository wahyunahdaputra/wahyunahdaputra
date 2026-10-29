# Content Guide

All content lives in `src/data/`. Edit those files only.

| What | Where |
|---|---|
| Profile photo | Put the image in `public/` (e.g. `public/profile.jpg`), then set `photo: "/profile.jpg"` in `src/data/profile.ts` |
| Name, headline, typing words, description, about text | `src/data/profile.ts` |
| CV PDF | Put it at `public/cv.pdf`, then set `cvUrl: "/cv.pdf"` in `profile.ts` |
| LinkedIn / GitHub / Email | `src/data/socials.ts` (an empty value shows "Coming soon") |
| Work experience, dates, training photos | `src/data/experience.ts` (`photos: ["/training/1.jpg"]`) |
| Skills | `src/data/skills.ts` |
| Projects (status: Draft / In Development / Completed, thumbnail, links, detail page text, screenshots) | `src/data/projects.ts` |
| Certifications | `src/data/certifications.ts` (remove `placeholder: true` when real) |

Contact form: when `socials.email` is set, it opens the visitor's email app with the message filled in. Until then, it tells visitors the message was not sent.
