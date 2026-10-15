# John Esonu | Personal Portfolio

**Name:** John Esonu
**Matric Number:** 23120111019
**Course:** CSC 419, Advances in Web, Mobile and Blockchain Development
**Institution:** Pan-Atlantic University, Department of Computer Science
**Session:** 2026/2027 (First Semester)

## Live site

https://portfolio-seven-red-60o1w6yc1i.vercel.app

## About

A personal portfolio website showing who I am as a developer: an About section, skills, experience, projects, certifications, and a contact form.

## Built with

- Next.js (App Router) and React
- TypeScript
- Tailwind CSS
- Framer Motion
- Resend (contact form emails)
- Deployed on Vercel

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

The contact form needs a `RESEND_API_KEY` environment variable. Create a `.env.local` file in the project root:

```
RESEND_API_KEY=your_key_here
```

## Project structure

```
app/            Pages, layout, and the contact API route
components/     One component per section (Hero, About, Projects, ...)
hooks/          Custom React hooks
public/         Images, project screenshots, certificates, CV
```
