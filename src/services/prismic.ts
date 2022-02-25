import * as Prismic from '@prismicio/client'

export const repositoryName = 'igNewsCardoso'
const endpoint = Prismic.getRepositoryEndpoint(repositoryName)


export const prismic = Prismic.createClient(endpoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
})