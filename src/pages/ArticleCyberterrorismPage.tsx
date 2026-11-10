import React from 'react';
import { ArticleReaderLayout } from '../components/article/ArticleReaderLayout';
import { getArticleBySlug } from '../data/articlesData';

export const ArticleCyberterrorismPage: React.FC = () => {
  const article = getArticleBySlug('preventing-terrorism-and-cyberterrorism');
  return <ArticleReaderLayout article={article} />;
};

export default ArticleCyberterrorismPage;

