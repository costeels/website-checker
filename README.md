# website-checker
This is the website checker script, a tool for generating analytics and identifying SEO errors for a given domain. The script is flexible and can be adapted to produce custom reports for various websites, making it a valuable asset for those offering commercial services in web analysis.  
It relies on the paid API available at https://pr-cy.io/prices/.  

![](https://s3-eu-central-1.amazonaws.com/news.pr-cy.ru/3/images/a75b49e1d93428f0aed73826e86c6fa0.jpg)  
![](https://s3-eu-central-1.amazonaws.com/news.pr-cy.ru/3/images/28302c9df07d5cb18a017c9718fbcea0.jpg)

## Getting Started
1. Create .env.local file in project root folder. (ones time)
2. Copy the contents of the file .env to .env.local and put your variables
3. If you need errors on russian localization, set BASE_URL to https://apis.pr-cy.ru/api/v1.1.0/analysis

## run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
