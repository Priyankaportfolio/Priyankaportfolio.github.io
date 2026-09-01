# Priyanka — Portfolio

A single-page portfolio built from scratch: a rotating 3D DNA-helix hero
(three.js), a timeline of education and fieldwork, project write-ups, and a
tilting certificate gallery. Plain HTML/CSS/JS — no build step, no
dependencies to install.

## Files

```
index.html          the whole page
style.css            all styling
script.js             the helix animation + certificate tilt effect
assets/
  Priyanka_CV.pdf    linked from the "Download CV" button
  images/            profile photo, certificates, fieldwork photos
```

## Run it locally

Just open `index.html` in a browser — or, for the smoothest experience,
serve it from a tiny local server:

```
cd portfolio
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Put it on GitHub

1. Create a new repository on GitHub (e.g. `priyanka-portfolio`) — don't
   initialize it with a README, since you already have one here.
2. From this `portfolio` folder:
   ```
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/priyanka-portfolio.git
   git push -u origin main
   ```

### Optional: host it free on GitHub Pages
Repo → **Settings → Pages** → Source: `main` branch, `/ (root)` folder →
Save. Your site goes live at
`https://<your-username>.github.io/priyanka-portfolio/`.

## Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.
2. **Add New… → Project**, then import the `priyanka-portfolio` repo.
3. Leave the settings as-is — this is a static site, so no framework preset
   or build command is needed.
4. Click **Deploy**. Vercel gives you a live URL in under a minute, and
   redeploys automatically every time you push to `main`.

## Things worth personalizing before you share it

- The two project write-up links (`href="#"` in `index.html`, under
  "Smart Street Light" and "Aquaponic System") are placeholders — point them
  at your actual repos or docs once they're online.
- `assets/Priyanka_CV.pdf` is your uploaded CV as-is — swap the file in if
  you update your CV later (keep the filename, or update the link in
  `index.html`).
- The COD-A-FEST certificate is included in the Credentials section since
  you shared it, even though it isn't listed on the CV itself — remove that
  `<figure class="cert-card">` block in `index.html` if you'd rather leave
  it out.
