# Websites

This is a monorepo for all our React-based editorial products.

## Deployment Status

| Site       | URL                                                                   | Status                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| E-Learning | [eunpdc-elearning.netlify.app](https://eunpdc-elearning.netlify.app/) | [![Netlify Status](https://api.netlify.com/api/v1/badges/be127c78-15e4-457f-8880-078ca5f1128c/deploy-status)](https://app.netlify.com/sites/eunpdc-elearning/deploys) [![Build and deploy](https://github.com/Peace-Research-Institute-Frankfurt/eunpdc-elearning/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/Peace-Research-Institute-Frankfurt/eunpdc-elearning/actions/workflows/deploy.yml) [![[eLearning] Update Treaties](https://github.com/Peace-Research-Institute-Frankfurt/websites/actions/workflows/elearning-update-treaties.yml/badge.svg)](https://github.com/Peace-Research-Institute-Frankfurt/websites/actions/workflows/elearning-update-treaties.yml) |
| New Work   | [leibniz-nw.netlify.app](https://leibniz-nw.netlify.app/)             | [![Netlify Status](https://api.netlify.com/api/v1/badges/a9e50b5c-a39d-4bd7-9324-bf20958b2ecf/deploy-status)](https://app.netlify.com/sites/leibniz-nw/deploys)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

## Workflow

### Setting up your development environment

You only need to do these steps once. If you've never worked in software engineering before, you might want to read [a gentler introduction](https://awesomephant.github.io/untitled-coding-workshop/chapters/tools/) to the process before you get started.

1. Download and install [Node.js](https://nodejs.org/en/), [git,](https://git-scm.com/) and [Visual Studio Code](https://code.visualstudio.com/).
2. Sign up for a free [Github](https://github.com/) account using your work email and let an admin know what your username is, so they can add you to [our organisation](https://github.com/Peace-Research-Institute-Frankfurt). You must [enable two-factor authentication](https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa) to join our organisation.
3. Once you’ve accepted your invitation, run `git clone https://github.com/Peace-Research-Institute-Frankfurt/websites.git` to make a local copy of this repository
4. Open the command line, navigate to the newly-created folder and run `npm install` to download and install all necessary dependencies (this might take a few minutes).

### Making changes

1. Open your project's _subfolder_ (like `/new-work`) in Visual Studio Code
2. Run `npm run start` in the built-in command line to start a live preview at `localhost:8000`.
3. Make your changes
4. Use the command line or the version control panel in Visual Studio Code to `commit` and `push` your changes to the repository. Your changes should be automatically deployed in about 60 seconds. The [deployment status](https://github.com/Peace-Research-Institute-Frankfurt/websites#deployment-status) section at the top of this page shows your project's deployment status in real time.
