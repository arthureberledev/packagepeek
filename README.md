<a href="https://packagepeek.com">
  <h1 align="center">package peek</h1>
</a>

<p align="center">
  Search and discover GitHub repositories based on specific keywords listed in their package.json file.
</p>

<p align="center">
  <a href="https://twitter.com/arthureberledev">
    <img src="https://img.shields.io/twitter/follow/arthureberledev?style=flat&logo=x&color=0bf&logoColor=fff" alt="Arthur Eberle's X follower count" />
  </a>

  <a href="https://github.com/arthureberledev/packagepeek">
    <img src="https://img.shields.io/github/stars/arthureberledev/packagepeek?label=arthureberledev%2Fpackagepeek" alt="arthureberledev/packagepeek repo star count" />
  </a>
</p>

<p align="center">
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#authors"><strong>Authors</strong></a> ·
  <a href="#credits"><strong>Credits</strong></a> ·
</p>

![packagepeek-dashboard](https://github.com/arthureberledev/packagepeek/assets/58264696/81b185a8-44a5-40b7-9ece-f276e3f9d69a)

<br/>

## Setting Up

package peek only needs one environment variable to get started: `GITHUB_API_TOKEN`.

I've aquired mine from `GitHub` -> `Settings` -> `Developer Settings` -> `Personal Access Token`

Create a token, copy the `.env.example` file, rename it to `.env.local` and paste in the Token. The app should now be working.

## Tech Stack

- [Next.js](https://nextjs.org/docs/app) - App Router, Server Actions
- [Cloudflare](https://www.cloudflare.com/) - Hosting
- [GitHub API](https://docs.github.com/en/rest?apiVersion=2022-11-28) - External API

## Authors

- Arthur Eberle ([@arthureberledev](https://x.com/arthureberledev))

## Credits

- [emojis.sh](https://emojis.sh/) - the layout of this application was inspired by emojis.sh, developed by [@pondorasti](https://twitter.com/pondorasti) and [@dylanplayer](https://twitter.com/dylanplayer)

## Legal

- [AGPL-3.0 License](https://github.com/arthureberledev/packagepeek/blob/main/LICENSE)
