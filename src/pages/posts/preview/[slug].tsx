import { GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { prismic } from "../../../services/prismic";
import * as prismicHelper from "@prismicio/helpers";
import Head from "next/head";

import styles from "../post.module.scss";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { data: Session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (Session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [Session]);

  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.continueReading}>
            Wanna continue reading?
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const response = await prismic.getByUID("post", String(slug), {});

  const post = {
    slug,
    title: prismicHelper.asText(response.data.title),
    content: prismicHelper.asHTML(response.data.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 30,
  };
};
