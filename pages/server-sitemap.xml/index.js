import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
    const responseProjects = await fetch('https://motionbox.uz/api/projects');
    const projects = await responseProjects.json();

    const responsePortfolio = await fetch('https://motionbox.uz/api/portfolio');
    const portfolio = await responsePortfolio.json();

    const projectsMap = projects.data.map(item => ({
        loc: `https://www.motionbox.uz/projects/${item._id}`,
        lastMod: new Date().toISOString(),
    }))
    const portfolioMap = portfolio.data.map(item => ({
        loc: `https://www.motionbox.uz/portfolio/${item._id}`,
        lastMod: new Date().toISOString(),
    }))

    const all = [...projectsMap, ...portfolioMap];

    const fields = all;


    return getServerSideSitemap(ctx, fields);
}


export default function Site() { }